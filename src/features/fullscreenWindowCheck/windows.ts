import { Command } from '@tauri-apps/plugin-shell';

const isFullscreenOrMaximizedWindows = async (): Promise<boolean> => {
  try {
    const cmd = Command.create('powershell', [
      '-Command',
      `
      Add-Type @"
      using System;
      using System.Runtime.InteropServices;
      public class WinAPI {
          [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
          [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
          [DllImport("user32.dll")] public static extern bool IsZoomed(IntPtr hWnd);
          [DllImport("user32.dll")] public static extern int GetSystemMetrics(int nIndex);
          public struct RECT { public int Left, Top, Right, Bottom; }
      }
      "@
      
      $hwnd = [WinAPI]::GetForegroundWindow()
      if ($hwnd -eq [IntPtr]::Zero) {
        Write-Output "false"
        exit
      }

      $rect = New-Object WinAPI+RECT
      [WinAPI]::GetWindowRect($hwnd, [ref]$rect) | Out-Null
      $isMaximized = [WinAPI]::IsZoomed($hwnd)
      
      $screenWidth = [WinAPI]::GetSystemMetrics(0)
      $screenHeight = [WinAPI]::GetSystemMetrics(1)
      
      $isFullscreen = ($rect.Left -eq 0 -and $rect.Top -eq 0 -and $rect.Right -eq $screenWidth -and $rect.Bottom -eq $screenHeight)
      
      Write-Output ($isMaximized -or $isFullscreen) | Out-String
      `,
    ]);

    const output = await cmd.execute();
    return output.stdout.trim().toLowerCase() === 'true';
  } catch (error) {
    console.error('Error checking fullscreen state on Windows:', error);
    return false;
  }
};

export default isFullscreenOrMaximizedWindows;
