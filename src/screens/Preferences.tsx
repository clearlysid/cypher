

const Preferences = () => {

	// TODO: expose 2-3 most frequent use-cases on system tray
	// TODO: cloud services list finalize among
	// Dropbox, Google Drive, iCloud, Cloudinary, Gfycat, Fanfou, WeTransfer
	// Giphy, imgur, AWS S3, Slate Host, Streamable, Transfer, Vercel

	return (

		<div>
			<ul>
				<li>select camera device</li>
				<li>select audio input</li>
				<li>enable face-cam in quick record</li>
				<li>quick record shortcut</li>
				<li>framerate</li>
				<li>default save location</li>
				<li>system startup app</li>
				<li>auto upload to cloud</li>
				<li>mute notifications</li>
				<li>show keypresses</li>
				<li>show elapsed time</li>
				<li>beautify audio</li>
				<li>hide clock</li>

				<li>quick record naming convention https://github.com/karaggeorge/kap-recording-name#readme</li>
				<li>hide desktop icons: https://github.com/karaggeorge/kap-hide-desktop-icons#readme</li>
			</ul>
		</div >

	)
}


export default Preferences