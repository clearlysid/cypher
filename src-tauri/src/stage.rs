use std::process::Command;

// ffmpeg -f avfoundation -list_devices true -i ""
// ffmpeg -f avfoundation -r 30 -s 1920x1080 -i "1:0"  -t 10 ~/test.mp4

pub fn main() {
    // println!("[dummy] recording started");
    println!("[debug] running ffmpeg");

    // let mut cmd = Command::new("ffmpeg")
    //     .args(["-f", "avfoundation", "-list_devices", "true", "-i", ""])
    //     .spawn()
    //     // Blow up if the OS was unable to start the program
    //     .unwrap();
    // let desktop = desktop_dir();

    // println!("{:?}", desktop);

    let mut cmd = Command::new("ffmpeg")
        .args([
            "-f",
            "avfoundation",
            "-r",
            "60",
            "-s",
            "1920x1080",
            "-i",
            "1:0",
            "-t",
            "10",
            "/Users/siddharth/desktop/test.mp4",
        ])
        .spawn()
        // Blow up if the OS was unable to start the program
        .unwrap();

    // let mut pwd = Command::new("pwd").spawn().unwrap();

    // println!("{:?}", pwd);
}
