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
                ? "bg-accent-400 even:bg-accent-500 text-primary-950 hover:even:brightness-110"
                : "even:bg-secondary-900 bg-primary-950 text-light"}
        `}
            onClick={() => {
                handleSelect();
            }}
        >
            {tag}

            <div className="absolute right-1 top-0 bottom-0 items-center group-hover:flex hidden">
                <button
                    className={`w-6 h-6 p-0.5 transition hover:duration-200 ease-in-out 
                        ${isSelected
                            ? " text-primary-950 hover:even:brightness-125 group-even:bg-accent-500 bg-accent-400"
                            : " text-light group-even:bg-secondary-900 bg-primary-950"}
                    `}
                    onClick={e => {
                        e.stopPropagation();
                        handleEdit();
                    }}
                >
                    <EditIcon classProps={`
                        ${isSelected
                            ? "stroke-primary-950"
                            : "stroke-light brightness-75"}
                    `} />
                </button>

            </div>


            <></>
        </div>
    )
}

export default Tag