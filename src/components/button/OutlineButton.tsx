import { IButton } from '../../type/type';

const OutlineButton = ({ handleClick, children, size, color, padding }: IButton) => {
    return (
        <button
            className={`${size} ${padding} group ${color} border transition ease-linear  hover:duration-150`}
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