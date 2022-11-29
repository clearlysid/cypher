#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{ActivationPolicy, GlobalShortcutManager};

mod stage;
mod tray;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    #[allow(unused_mut)]
    let mut app = tauri::Builder::default()
        .setup(|_app| 
            // TODO: add a fancy splashscreen here ?
            // TODO: good place to fetch static resources like wallpaper, etc.
            Ok(())
        )
        .system_tray(tray::tray_menu())
        .on_system_tray_event(tray::on_system_tray_event)
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    #[cfg(target_os = "macos")]
    app.set_activation_policy(ActivationPolicy::Accessory);

    app.run(|_app_handle, event| match event {
        tauri::RunEvent::Ready => {
            _app_handle
                .global_shortcut_manager()
                // TODO: make keyboard shortcut customizable
                .register("CmdOrCtrl+Shift+2", move || {
                    stage::main();
                })
                .unwrap();
        }
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    });
}
