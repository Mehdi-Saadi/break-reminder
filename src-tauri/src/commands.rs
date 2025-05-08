#[cfg(target_os = "windows")]
#[tauri::command]
pub fn check_focused_window_maximized() -> bool {
    use winapi::um::winuser::{GetForegroundWindow, GetSystemMetrics, GetWindowRect, IsZoomed};
    use winapi::um::winuser::{SM_CXSCREEN, SM_CYSCREEN};

    unsafe {
        let hwnd = GetForegroundWindow();
        if hwnd.is_null() {
            return false;
        }

        // Check if the window is maximized (Zoomed)
        if IsZoomed(hwnd) != 0 {
            return true;
        }

        // Check if window matches screen dimensions
        let mut rect = std::mem::zeroed();
        if GetWindowRect(hwnd, &mut rect) == 0 {
            return false;
        }

        let screen_width = GetSystemMetrics(SM_CXSCREEN);
        let screen_height = GetSystemMetrics(SM_CYSCREEN);

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

    let active_window_id = Command::new("xdotool").arg("getactivewindow").output();
    if let Ok(output) = active_window_id {
        let window_id = String::from_utf8_lossy(&output.stdout).trim().to_string();
        if window_id.is_empty() {
            return false;
        }

        let xprop_output = Command::new("xprop").arg("-id").arg(&window_id).output();
        if let Ok(prop) = xprop_output {
            let output_str = String::from_utf8_lossy(&prop.stdout);
            return output_str.contains("_NET_WM_STATE_FULLSCREEN")
                || (output_str.contains("_NET_WM_STATE_MAXIMIZED_VERT")
                    && output_str.contains("_NET_WM_STATE_MAXIMIZED_HORZ"));
        }
    }

    false
}

#[cfg(target_os = "macos")]
#[tauri::command]
pub fn check_focused_window_maximized() -> bool {
    use std::process::Command;

    let script = r#"
        tell application "System Events"
            set frontApp to name of first application process whose frontmost is true
            tell application frontApp
                try
                    if (count of windows) > 0 then
                        set isFull to value of attribute "AXFullScreen" of window 1
                        return isFull
                    else
                        return false
                    end if
                on error
                    return false
                end try
            end tell
        end tell
    "#;

    let result = Command::new("osascript")
        .arg("-e")
        .arg(script)
        .output();

    if let Ok(output) = result {
        let stdout = String::from_utf8_lossy(&output.stdout)
            .trim()
            .to_lowercase();
        stdout == "true"
    } else {
        false
    }
}
