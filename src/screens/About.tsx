import { useEffect, useState } from 'react';
import { version, platform } from '@tauri-apps/api/os';
import { getName, getVersion } from '@tauri-apps/api/app';
import { styled } from '@stitches/react';


const Container = styled(`div`, {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	height: `calc(100% - 32px)`,
	backgroundColor: `rgba(25, 25, 25)`
});

const AppIconPlaceholder = styled('img', {
	height: 100,
	width: 100,
	borderRadius: 16,
	marginTop: 20,
	marginBottom: 36,
	transition: `all 0.2s ease`,
	border: `2px solid rgba(0, 0, 0, 0.3)`,
	boxShadow: `0 8px 24px rgba(65, 0, 203, 0.4)`,

	'&:hover': {
		transform: `scale(1.1) rotate(5deg)`,
		cursor: `pointer`,
	}
});

const AppName = styled('h1', {
	fontSize: 22,
	fontWeight: 700,
	marginBottom: 4,
	textAlign: 'center',
	letterSpacing: `-0.04em`
});

const MetadataSection = styled('div', {
	marginTop: 24
});

const MetadataRow = styled('div', {
	display: 'grid',
	gridTemplateColumns: '1fr 1fr',
	gridColumnGap: 12,
});

const MetadataKey = styled('p', {
	width: 80,
	textAlign: 'right',
	fontSize: 10,
	lineHeight: 1.4,
	opacity: 0.4
});

const MetadataValue = styled('p', {
	width: 80,
	fontSize: 10,
	lineHeight: 1.4,
	opacity: 1,
});

const Paragraph = styled('p', {
	fontSize: 10,
	lineHeight: 1.4,
	opacity: 0.4,
	textAlign: 'center',
	fontWeight: 400
});

const Footer = styled('p', {
	fontSize: 10,
	lineHeight: 1.4,
	opacity: 0.4,
	textAlign: 'center',
	fontWeight: 400,
	marginTop: 'auto',
	marginBottom: 16,
	width: '85%'
});

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
		<>
			<div data-tauri-drag-region style={{
				height: 32,
				zIndex: 1,
				backgroundColor: `rgba(25, 25, 25)`,
			}}></div>
			<Container>
				<AppIconPlaceholder src="avatar.png" />

				<AppName>{data.appName}</AppName>
				<Paragraph>
					Screen recording software.
				</Paragraph>

				<MetadataSection>
					{
						[
							['Version', data.appVersion],
							['Author', 'Siddharth Jha'],
							['Platform', data.osName + ` ` + data.osVersion]
						].map(d => <MetadataRow>
							<MetadataKey>
								{d[0]}
							</MetadataKey>
							<MetadataValue>
								{d[1]}
							</MetadataValue>
						</MetadataRow>)
					}
				</MetadataSection>

				<Footer>
					Helmer is free and open-source software.<br />If you like the project, please consider donating to us. It will allow us to keep it this way.
				</Footer>
			</Container>
		</>
	)
}


export default About