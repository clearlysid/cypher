import { useEffect, useState } from 'react';
import { version, platform } from '@tauri-apps/api/os';
import { getName, getVersion } from '@tauri-apps/api/app';

const About = () => {

	const [data, setData] = useState({
		osVersion: '',
		osPlatform: '',
		appName: '',
		appVersion: '',
		osName: ''
	})

	useEffect(() => {
		const getData = async () => {
			const osVersion = await version()
			const osPlatform = await platform()
			const appName = await getName()
			const appVersion = await getVersion()

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

			setData({ osVersion, osPlatform, appName, appVersion, osName })
		}

		getData()
	}, [])

	return (

		<div>
			<div style={{
				height: 32
			}}
				data-tauri-drag-region
			></div>

			<main
				className='about'
				style={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center'
				}}>

				<div style={{
					height: 100,
					width: 100,
					background: 'lightgrey'
				}}>

				</div>

				<h1>{data.appName}</h1>
				<p>
					Screen recording software.
				</p>

				<section>
					<p>
						Version
					</p>
					<p>
						{data.appVersion}
					</p>
				</section>

				<section>
					<p>
						Author
					</p>
					<p>
						Siddharth Jha
					</p>
				</section>

				<section>
					<p>
						Platform
					</p>
					<p>
						{data.osName} {data.osVersion}
					</p>
				</section>

				<footer>
					Helmer is completely free and open-source software. Please consider sponsoring/donating if you like the project, it will allow us to keep it this way.
				</footer>
			</main>
		</div >
	)
}


export default About