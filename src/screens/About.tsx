import { useEffect, useState } from 'react';
import { version, platform } from '@tauri-apps/api/os';
import { getName, getVersion } from '@tauri-apps/api/app';
import styled from '@emotion/styled';


const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: calc(100% - 32px);
`

const AppIconPlaceholder = styled.img`
	height: 100px;
	width: 100px;
	border-radius: 16px;
	margin-top: 20px;
	margin-bottom: 36px;
	transition: all 0.2s ease;
	border: 2px solid rgba(0, 0, 0, 0.3);
	box-shadow: 0px 8px 24px rgba(65, 0, 203, 0.4);

	:hover {
		transform: scale(1.1) rotate(4deg);
		cursor: pointer;
	}
`

const AppName = styled.h1`
	text-align: center;
	font-weight: 700;
	letter-spacing: -0.04em;
	font-size: 22px;
	margin-bottom: 4px;
`

const MetadataSection = styled.div`
	margin-top: 24px;
`

const MetadataRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 12px;
`

const MetadataKey = styled.p`
	width: 80px;
	text-align: right;
	font-size: 10px;
	line-height: 140%;
	opacity: 0.4;
`

const MetadataValue = styled.p`
	width: 80px;
	opacity: 1;
	font-size: 10px;
	line-height: 140%;
`

const Paragraph = styled.p`
	text-align: center;
	font-weight: 400;
	font-size: 10px;
	line-height: 140%;
	opacity: 0.4;
`

const Footer = styled.p`
	text-align: center;
	font-weight: 400;
	font-size: 10px;
	line-height: 140%;
	opacity: 0.4;
	width: 85%;
	margin-top: auto;
	margin-bottom: 16px;
`

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
				zIndex: 1
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