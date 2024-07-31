import { IButton } from '../../type/type';

const OutlineButton = ({ handleClick, children, size, position, color, padding, radius }: IButton) => {
    return (
        <button
            className={`${size} ${position} ${padding} group ${color} ${radius ?? "rounded-full"} border transition ease-linear hover:duration-150`}
            onClick={e => {
                e.stopPropagation();
                handleClick();
            }}
        >
            {children}
        </button>
    )
}

export default OutlineButton
