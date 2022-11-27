#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{
    ActivationPolicy, CustomMenuItem, Manager, Menu, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, TitleBarStyle, WindowBuilder, WindowUrl,
};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn main() {
    // TODO: extract all menu items to an array
    let menu = Menu::new();

    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("record".to_string(), "Start Recording"))
        .add_item(CustomMenuItem::new(
            "preferences".to_string(),
            "Preferences",
        ))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new(
            "feedback".to_string(),
            "Send Feedback...",
        ))
        .add_item(CustomMenuItem::new(
            "changelog".to_string(),
            "View Changelog",
        ))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("about".to_string(), "About Helmer"))
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));

    let tray = SystemTray::new().with_menu(tray_menu);

    #[allow(unused_mut)]
    let mut app = tauri::Builder::default()
        .menu(menu)
        .setup(|app| {
            // let _window = app.get_window("editor").unwrap();
            Ok(())
        })
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                position: _,
                size: _,
                ..
            } => {
                // println!("menu icon left clicked");
            }
            SystemTrayEvent::RightClick {
                position: _,
                size: _,
                ..
            } => {
                // println!("menu icon right clicked");
            }
            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "record" => {
                    // TODO: open canvas, continue product flow
                }
                "preferences" => {
                    // TODO: find out what's the best way to "store" preferences?
                    if app.get_window("preferences").is_some() {
                        app.get_window("preferences").unwrap().show();
                    } else {
                        WindowBuilder::new(
                            app,
                            "preferences", // the unique label
                            WindowUrl::App("/preferences".into()),
                        )
                        .title("Preferences")
                        .focused(true)
                        .skip_taskbar(true)
                        .resizable(true)
                        .build()
                        .expect("failed to create example window");
                    }
                }
                "feedback" => {
                    // For a better UX, we should check if the given URL is already open.
                    // If yes, we should focus the window/tab instead of opening a new one.
                    if webbrowser::open("https://www.helmer.app/feedback").is_ok() {
                        println!("Feedback Form Opened");
                    }
                }
                "changelog" => {
                    if webbrowser::open("https://www.helmer.app/changelog").is_ok() {
                        println!("Changelog Opened");
                    }
                }
                "about" => {
                    if app.get_window("about").is_some() {
                        app.get_window("about").unwrap().show();
                    } else {
                        WindowBuilder::new(
                            app,
                            "about", // the unique label
                            WindowUrl::App("/about".into()),
                        )
                        .title("About Helmer")
                        .focused(true)
                        .skip_taskbar(true)
                        .title_bar_style(TitleBarStyle::Overlay)
                        .accept_first_mouse(true)
                        .inner_size(300.0, 300.0)
                        .resizable(false)
                        .always_on_top(true)
                        .build()
                        .expect("failed to create example window");
                    }
                }
                "quit" => {
                    std::process::exit(0);
                }
                _ => {}
            },
            _ => {}
        })
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    #[cfg(target_os = "macos")]
    app.set_activation_policy(ActivationPolicy::Accessory);

    app.run(|_app_handle, event| match event {
        tauri::RunEvent::ExitRequested { api, .. } => {
            api.prevent_exit();
        }
        _ => {}
    });
}
