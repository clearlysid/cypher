use tauri::{AppHandle, Manager, WindowBuilder, WindowUrl};
// ffmpeg -f avfoundation -list_devices true -i ""
// ffmpeg -f avfoundation -r 30 -s 1920x1080 -i "1:0"  -t 10 ~/test.mp4

pub fn init(app: &AppHandle) {
    println!("[debug] open stage window");

    // if app.get_window("stage").is_some() {
    //     app.get_window("stage")
    //         .unwrap()
    //         .show()
    //         .expect_err("Failed to show Stage");
    // } else {
    //     WindowBuilder::new(app, "stage", WindowUrl::App("/stage".into()))
    //         .title("Stage")
    //         .hidden_title(true)
    //         .decorations(false)
    //         .transparent(true)
    //         .focused(true)
    //         .inner_size(300.0, 300.0)
    //         .accept_first_mouse(true)
    //         .resizable(false)
    //         .always_on_top(true)
    //         .build()
    //         .expect("Failed to open Stage");
    // }

    if app.get_window("whiteboard").is_some() {
        app.get_window("whiteboard")
            .unwrap()
            .show()
            .expect_err("Failed to show Stage");
    } else {
        WindowBuilder::new(app, "whiteboard", WindowUrl::App("/whiteboard".into()))
            .hidden_title(true)
            .decorations(false)
            .transparent(true)
            .focused(true)
            .maximized(true)
            // .inner_size(800.0, 600.0)
            .accept_first_mouse(true)
            .resizable(true)
            // .always_on_top(true)
            .build()
            .expect("Failed to open Stage");
    }
}
