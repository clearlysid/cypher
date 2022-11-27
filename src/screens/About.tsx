import { version, platform } from '@tauri-apps/api/os';
import { getName, getVersion } from '@tauri-apps/api/app';

const appName = await getName();
const appVersion = await getVersion();
const osVersion = await version();
const osPlatform = await platform();

const About = () => {


	let osName = ""

	switch (osPlatform) {
		case 'darwin':
			osName = "macOS"
			break;
		case 'win32':
			osName = "Windows"
			break;
		default:
			osName = "Linux"
			break;
	}


	return (

		<div>
			<div style={{
				height: 32
			}}
				data-tauri-drag-region
			></div>

			<p>
				This is a simple app to record your screen.
			</p>
			<p>
				{appName} {appVersion}
			</p>
			<p>
				{osName} {osVersion}
			</p>
		</div >
	)
}


export default About