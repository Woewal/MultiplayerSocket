interface ButtonProps {
    children?: JSX.Element,
    disabled?: boolean,
    callback: () => void,
    className?: string,
}

const Button : React.FC<ButtonProps> = (props : ButtonProps) => {
    return <button className={ "rounded-lg p-3  transition-all " + (props.disabled ? "bg-gray-300 text-gray-400 " : "bg-primary text-white hover:bg-purple-600 ") + (props.className ? props.className : '') } onClick={props.callback} disabled={props.disabled} >
        {props.children}
    </button>
}

export default Button;