#[cfg(target_os = "windows")]
#[tauri::command]
pub fn is_fullscreen_or_maximized() -> bool {
    use winapi::um::winuser::{GetForegroundWindow, GetSystemMetrics, GetWindowRect, IsZoomed};
    use winapi::um::winuser::{SM_CXSCREEN, SM_CYSCREEN};

    unsafe {
        let hwnd = GetForegroundWindow();
        if hwnd.is_null() {
            return false;
        }

        let mut rect = std::mem::zeroed();
        if GetWindowRect(hwnd, &mut rect) == 0 {
            return false;
        }

        let is_maximized = IsZoomed(hwnd) != 0;

        let screen_width = GetSystemMetrics(SM_CXSCREEN);
        let screen_height = GetSystemMetrics(SM_CYSCREEN);

        let is_fullscreen = rect.left == 0
            && rect.top == 0
            && rect.right == screen_width
            && rect.bottom == screen_height;

        is_maximized || is_fullscreen
    }
}

#[cfg(target_os = "linux")]
#[tauri::command]
pub fn is_fullscreen_or_maximized() -> bool {
    use std::process::Command;

    // Check if xdotool is installed
    let check_cmd = Command::new("which").arg("xdotool").output();
    if check_cmd.is_err() || check_cmd.unwrap().stdout.is_empty() {
        eprintln!("xdotool is not installed.");
        return false;
    }

    let active_window_cmd = Command::new("xdotool").arg("getactivewindow").output();
    if active_window_cmd.is_err() {
        eprintln!("Failed to get active window.");
        return false;
    }

    let window_id = String::from_utf8_lossy(&active_window_cmd.unwrap().stdout)
        .trim()
        .to_string();
    if window_id.is_empty() {
        eprintln!("No active window found.");
        return false;
    }

    let xprop_cmd = Command::new("xprop").arg("-id").arg(&window_id).output();
    if xprop_cmd.is_err() {
        eprintln!("Failed to get window properties.");
        return false;
    }

    let output = String::from_utf8_lossy(&xprop_cmd.unwrap().stdout);

    output.contains("_NET_WM_STATE_FULLSCREEN")
        || output.contains("_NET_WM_STATE_MAXIMIZED_VERT")
        || output.contains("_NET_WM_STATE_MAXIMIZED_HORZ")
}

#[cfg(target_os = "macos")]
#[tauri::command]
pub fn is_fullscreen_or_maximized() -> bool {
    use std::process::Command;

    let cmd = Command::new("osascript")
        .arg("-e")
        .arg(
            r#"
        tell application "System Events"
            set frontApp to name of first application process whose frontmost is true
            tell application frontApp
                try
                    if (count of windows) > 0 then
                        set isFullscreen to window 1's fullscreen
                        set isZoomed to window 1's zoomed
                        return (isFullscreen or isZoomed)
                    else
                        return false
                    end if
                on error
                    return false
                end try
            end tell
        end tell
        "#,
        )
        .output();

    if let Ok(output) = cmd {
        let stdout = String::from_utf8_lossy(&output.stdout)
            .trim()
            .to_lowercase();
        stdout == "true"
    } else {
        eprintln!("Failed to execute osascript.");
        false
    }
}
