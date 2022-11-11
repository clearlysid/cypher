#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

extern crate repng;
extern crate scrap;

use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("displays".to_string(), "Displays"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));

    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            let border_radius = 10.0;

            #[cfg(target_os = "macos")]
            apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
            Ok(())
        })
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a left click");
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                println!("system tray received a right click");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => {
                match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "hide" => {
                        //   let window = app.get_window("main").unwrap();
                        //   window.hide().unwrap();
                    }
                    "displays" => {
                        use scrap::{Capturer, Display};
                        use std::io::ErrorKind::WouldBlock;
                        use std::io::Write;
                        use std::process::{Command, Stdio};

                        let d = Display::primary().unwrap();
                        let (w, h) = (d.width(), d.height());

                        let child = Command::new("ffplay")
                            .args(&[
                                "-f",
                                "rawvideo",
                                "-pixel_format",
                                "bgr0",
                                "-video_size",
                                &format!("{}x{}", w, h),
                                "-framerate",
                                "60",
                                "-",
                            ])
                            .stdin(Stdio::piped())
                            .spawn()
                            .expect("This example requires ffplay.");

                        let mut capturer = Capturer::new(d).unwrap();
                        let mut out = child.stdin.unwrap();

                        loop {
                            match capturer.frame() {
                                Ok(frame) => {
                                    // Write the frame, removing end-of-row padding.
                                    let stride = frame.len() / h;
                                    let rowlen = 4 * w;
                                    for row in frame.chunks(stride) {
                                        let row = &row[..rowlen];
                                        out.write_all(row).unwrap();
                                    }
                                }
                                Err(ref e) if e.kind() == WouldBlock => {
                                    // Wait for the frame.
                                }
                                Err(_) => {
                                    // We're done here.
                                    break;
                                }
                            }
                        }
                    }
                    _ => {}
                }
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
