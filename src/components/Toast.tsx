interface IToast {
    text: string,
    position: string
}

const Toast = ({ text, position }: IToast) => {
    return (
        <div className={`text-sm px-2 py-1 text-light-300 rounded bg-primary-700 animate-hideFast absolute ${position} opacity-0 pointer-events-none `}>
            {text}
        </div>
    )
}

export default Toast
