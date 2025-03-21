import { Command } from '@tauri-apps/plugin-shell';

const isFullscreenOrMaximized = async (): Promise<boolean> => {
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
          public struct RECT { public int Left, Top, Right, Bottom; }
      }
      "@
      
      $hwnd = [WinAPI]::GetForegroundWindow()
      $rect = New-Object WinAPI+RECT
      [WinAPI]::GetWindowRect($hwnd, [ref]$rect) | Out-Null
      $isMaximized = [WinAPI]::IsZoomed($hwnd)
      
      $screenWidth = (Get-WmiObject Win32_VideoController).CurrentHorizontalResolution
      $screenHeight = (Get-WmiObject Win32_VideoController).CurrentVerticalResolution
      
      $isFullscreen = ($rect.Left -eq 0 -and $rect.Top -eq 0 -and $rect.Right -eq $screenWidth -and $rect.Bottom -eq $screenHeight)
      
      Write-Output ($isMaximized -or $isFullscreen)
      `,
    ]);

    const output = await cmd.execute();
    return output.stdout.trim() === 'True';
  } catch (error) {
    console.error('Error checking fullscreen state:', error);
    return false;
  }
};

export default isFullscreenOrMaximized;
