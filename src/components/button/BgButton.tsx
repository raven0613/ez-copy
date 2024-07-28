import { IButton } from '../../type/type';

const BgButton = ({ handleClick, children, size, color, padding, disabled }: IButton) => {
    return (
        <button
            disabled={disabled}
            className={`${size} rounded-full ${padding} group ${color} transition hover:duration-150 ease-linear`}
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