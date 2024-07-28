import EditIcon from './svg/EditIcon';

interface ITag {
    tag: string,
    handleEdit: () => void,
    handleSelect: () => void,
    isSelected: boolean
}

const Tag = ({ tag, handleEdit, handleSelect, isSelected }: ITag) => {
    return (
        <div key={tag} className={`w-full text-base text-start px-2 py-1.5  hover:duration-150 cursor-pointer relative group hover:brightness-125
            ${isSelected
                ? "bg-accent-400 odd:bg-accent-500 text-primary-950 hover:odd:brightness-110"
                : "odd:bg-secondary-900 bg-primary-950 text-light-300"}
        `}
            onClick={() => {
                handleSelect();
            }}
        >
            {tag}

            <div className="absolute right-1 top-0 bottom-0 items-center group-hover:flex hidden">
                <button
                    className={`w-6 h-6 p-0.5 transition bg-transparent
                    `}
                    onClick={e => {
                        e.stopPropagation();
                        handleEdit();
                    }}
                >
                    <EditIcon classProps={`
                        ${isSelected
                            ? "stroke-primary-950"
                            : "stroke-light-300"}
                    `} />
                </button>

            </div>


            <></>
        </div>
    )
}

export default Tag