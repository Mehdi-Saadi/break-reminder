#[cfg(target_os = "windows")]
#[tauri::command]
pub fn check_focused_window_fullscreen() -> bool {
    use winapi::um::winuser::{GetForegroundWindow, GetWindowRect, MonitorFromWindow, GetMonitorInfoW, MONITORINFO, MONITOR_DEFAULTTONEAREST};
    use std::mem::zeroed;

    unsafe {
        let hwnd = GetForegroundWindow();
        if hwnd.is_null() {
            return false;
        }

        let mut window_rect = zeroed();
        if GetWindowRect(hwnd, &mut window_rect) == 0 {
            return false;
        }

        let monitor = MonitorFromWindow(hwnd, MONITOR_DEFAULTTONEAREST);
        let mut monitor_info: MONITORINFO = zeroed();
        monitor_info.cbSize = std::mem::size_of::<MONITORINFO>() as u32;

        if GetMonitorInfoW(monitor, &mut monitor_info) == 0 {
            return false;
        }

        // Compare window rect with monitor rect (not work area!)
        let is_fullscreen = window_rect.left == monitor_info.rcMonitor.left
            && window_rect.top == monitor_info.rcMonitor.top
            && window_rect.right == monitor_info.rcMonitor.right
            && window_rect.bottom == monitor_info.rcMonitor.bottom;

        is_fullscreen
    }
}

#[cfg(target_os = "linux")]
#[tauri::command]
pub fn check_focused_window_fullscreen() -> bool {
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
            return output_str.contains("_NET_WM_STATE_FULLSCREEN");
        }
    }

    false
}

#[cfg(target_os = "macos")]
#[tauri::command]
pub fn check_focused_window_fullscreen() -> bool {
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
