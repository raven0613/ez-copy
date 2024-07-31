import { IButton } from '../../type/type';

const BgButton = ({ handleClick, children, size, position, color, padding, disabled, radius }: IButton) => {
    return (
        <button
            disabled={disabled}
            className={`${size} ${position} ${padding} group ${color} ${radius ?? "rounded-full"} transition hover:duration-150 ease-linear`}
            onClick={e => {
                e.stopPropagation();
                handleClick();
            }}
        >
            {children}
        </button>
    )
}

export default BgButton
