import * as React from 'react'
import { Edit2, MousePointer, X, Camera } from 'react-feather'
import { machine } from '../components/tldraw/state/machine'
import { styled } from '../stiches.config'

const onToolSelect = (e: React.MouseEvent) => {
	machine.send('SELECTED_TOOL', { name: e.currentTarget.id })
}

// This toolbar needs to be able to manage the state of all Windows
// Defaults need to be picked from the preferences pane.
// Rust can "store" the defaults, but mutable state should be managed from React.

export default function Toolbar() {
	return (
		<ToolbarContainer>
			<PrimaryTools>
				<PrimaryToolButton id="select" isActive={machine.isIn('select')} onClick={onToolSelect}>
					<Highlight>
						<MousePointer />
					</Highlight>
				</PrimaryToolButton>
				<PrimaryToolButton id="pencil" isActive={machine.isIn('pencil')} onClick={onToolSelect}>
					<Highlight>
						<Edit2 />
					</Highlight>
				</PrimaryToolButton>
				<PrimaryToolButton id="eraser" isActive={machine.isIn('eraser')} onClick={onToolSelect}>
					<Highlight>
						<X />
					</Highlight>
				</PrimaryToolButton>
				<PrimaryToolButton id="camera" isActive={machine.isIn('camera')} onClick={onToolSelect}>
					<Highlight>
						<Camera />
					</Highlight>
				</PrimaryToolButton>
			</PrimaryTools>
		</ToolbarContainer>
	)
}

const ToolbarContainer = styled('div', {
	display: 'grid',
	gridTemplateColumns: '1fr',
	gridTemplateRows: 'auto auto',
	gridRowGap: '$5',
	position: 'fixed',
	bottom: '48px',
	width: '100%',
	zIndex: '100'
})

const PrimaryTools = styled('div', {
	display: 'flex',
	width: 'fit-content',
	borderRadius: '100px',
	overflow: 'hidden',
	padding: '2px',
	border: '2px solid rgba(0,0,0, 0.4)',
	justifySelf: 'center',
	backgroundColor: 'lightsalmon',
	boxShadow: '0 8px 16px rgba(0,0,0, 0.4)',
})

const Highlight = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	height: '100%',
	padding: 10,
	borderRadius: '100%',
	transition: 'background-color .025s',
})

const PrimaryToolButton = styled('button', {
	cursor: 'pointer',
	width: '40px',
	height: '40px',
	padding: 2,
	margin: 0,
	background: 'none',
	backgroundColor: 'none',
	border: 'none',
	color: '$text',

	variants: {
		isActive: {
			true: {
				color: '$background',
				[`& > ${Highlight}`]: {
					backgroundColor: '$text',
				},
			},
			false: {
				[`&:hover > ${Highlight}`]: {
					backgroundColor: '$hover',
				},
				'&:active': {
					color: '$background',
				},
				[`&:active > ${Highlight}`]: {
					backgroundColor: '$text',
				},
			},
		},
	},
})

