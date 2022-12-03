// use enigo::Enigo;
use std::process::Command;
use std::time::{SystemTime, UNIX_EPOCH};

// ffmpeg -f avfoundation -list_devices true -i ""
// ffmpeg -f avfoundation -r 30 -s 1920x1080 -i "1:0"  -t 10 ~/test.mp4

pub fn main() {
    // println!("[dummy] recording started");
    println!("[debug] running ffmpeg");

    let system_time_str = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis()
        .to_string();

    let output_path = format!("/Users/siddharth/desktop/test-{}.mkv", system_time_str);

    let op_str: &str = &&output_path;

    // let cursor_location: (i32, i32) = Enigo::mouse_location();

    // let mut cmd = Command::new("ffmpeg")
    //     .args(["-f", "avfoundation", "-list_devices", "true", "-i", ""])
    //     .spawn()
    //     // Blow up if the OS was unable to start the program
    //     .unwrap();
    // let desktop = desktop_dir();

    Command::new("ffmpeg")
        .args([
            "-f",
            "avfoundation",
            "-r",
            "30",
            "-s",
            "1920x1080",
            "-i",
            "1:0",
            "-t",
            "10",
            op_str,
        ])
        .spawn()
        // Blow up if the OS was unable to start the program
        .unwrap();
}
