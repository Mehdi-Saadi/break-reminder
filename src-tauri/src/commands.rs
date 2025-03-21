#[cfg(target_os = "windows")]
#[tauri::command]
pub fn check_focused_window_maximized() -> bool {
    use winapi::um::winuser::{GetForegroundWindow, GetSystemMetrics, GetWindowRect};
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

        let screen_width = GetSystemMetrics(SM_CXSCREEN);
        let screen_height = GetSystemMetrics(SM_CYSCREEN);

        // Check if the window covers the entire screen
        rect.left == 0
            && rect.top == 0
            && rect.right == screen_width
            && rect.bottom == screen_height
    }
}

#[cfg(target_os = "linux")]
#[tauri::command]
pub fn check_focused_window_maximized() -> bool {
    use std::process::Command;

    // Get the active window ID
    let active_window_cmd = Command::new("xdotool").arg("getactivewindow").output();
    if active_window_cmd.is_err() {
        return false;
    }

    let window_id = String::from_utf8_lossy(&active_window_cmd.unwrap().stdout)
        .trim()
        .to_string();
    if window_id.is_empty() {
        return false;
    }

    // Check if the window is in fullscreen mode
    let xprop_cmd = Command::new("xprop").arg("-id").arg(&window_id).output();
    if xprop_cmd.is_err() {
        return false;
    }

    let output = String::from_utf8_lossy(&xprop_cmd.unwrap().stdout);
    output.contains("_NET_WM_STATE_FULLSCREEN")
}

#[cfg(target_os = "macos")]
#[tauri::command]
pub fn check_focused_window_maximized() -> bool {
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
                        return window 1's fullscreen
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
        false
    }
}
