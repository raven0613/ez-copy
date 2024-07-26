import EditIcon from './svg/EditIcon';

interface ITag {
    tag: string,
    handleEdit: () => void,
    handleSelect: () => void,
    isSelected: boolean
}

const Tag = ({ tag, handleEdit, handleSelect, isSelected }: ITag) => {
    return (
        <div key={tag} className={`w-full text-base text-start px-2 py-1.5  hover:duration-150 cursor-pointer  relative group 
            ${isSelected
                ? "bg-[#76ABAE] even:bg-[#84bcbe] text-[#222831] hover:bg-[#7eb6b9] hover:even:bg-[#90cfd1]"
                : "even:bg-[#31363F] hover:bg-[#3e4450] text-[#dddcdc]"}
        `}
            onClick={() => {
                handleSelect();
            }}
        >
            {tag}

            <div className="absolute right-1 top-0 bottom-0 items-center group-hover:flex hidden">
                <button
                    className={`w-6 h-6 p-0.5 bg-transparent hover:bg-stone-300 transition hover:duration-200 ease-in-out`}
                    onClick={e => {
                        e.stopPropagation();
                        handleEdit();
                    }}
                >
                    <EditIcon classProps={"stroke-stone-500"} />
                </button>

            </div>


            <></>
        </div>
    )
}

export default Tag