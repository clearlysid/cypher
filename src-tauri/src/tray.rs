use tauri::{
    AppHandle, CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem, TitleBarStyle, WindowBuilder, WindowUrl,
};

// mod record;

pub fn tray_menu() -> SystemTray {
    // TODO: extract all menu items to an array

    let tray_menu = SystemTrayMenu::new()
        .add_item(
            CustomMenuItem::new("record".to_string(), "Start Recording")
                .accelerator("CommandOrControl+Shift+2".to_string()),
        )
        .add_item(
            CustomMenuItem::new("preferences".to_string(), "Preferences")
                .accelerator("CommandOrControl+,".to_string()),
        )
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
        .add_item(
            CustomMenuItem::new("about".to_string(), "About Helmer")
                .accelerator("CommandOrControl+I".to_string()),
        )
        .add_item(
            CustomMenuItem::new("quit".to_string(), "Quit")
                .accelerator("CommandOrControl+Q".to_string()),
        );

    return SystemTray::new().with_menu(tray_menu);
}

pub fn on_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            // record::main();
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "record" => {
                // record::main();
            }
            "preferences" => {
                // TODO: find out what's the best way to "store" preferences?
                if app.get_window("preferences").is_some() {
                    app.get_window("preferences")
                        .unwrap()
                        .show()
                        .expect_err("Failed to show Preferences");
                } else {
                    WindowBuilder::new(
                        app,
                        "preferences", // the unique label
                        WindowUrl::App("/preferences".into()),
                    )
                    .title("Preferences")
                    .focused(true)
                    .resizable(true)
                    .build()
                    .expect("Failed to open Preferences");
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
                    app.get_window("about")
                        .unwrap()
                        .show()
                        .expect_err("Failed to show About");
                } else {
                    WindowBuilder::new(app, "about", WindowUrl::App("/about".into()))
                        .title("About Helmer")
                        .hidden_title(true)
                        .focused(true)
                        .center()
                        .title_bar_style(TitleBarStyle::Overlay)
                        .accept_first_mouse(true)
                        .inner_size(280.0, 480.0)
                        .resizable(false)
                        .always_on_top(true)
                        .build()
                        .expect("Failed to open About");
                }
            }
            "quit" => {
                std::process::exit(0);
            }
            _ => {}
        },
        _ => {}
    }
}
