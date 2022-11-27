const Button = ({ text, onclick }: { text: String, onclick: Function }) => {
	return <button onClick={onclick as any}>{text}</button>
}

export default Button