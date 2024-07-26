import { useState } from 'react'
import DeleteIcon from './svg/DeleteIcon';
import CheckIcon from './svg/CheckIcon';

interface ITag {
    tag: string,
    handleSave: (tag: string) => void;
    handleDelete: () => void;
}

const Tag = ({ tag, handleSave, handleDelete }: ITag) => {
    const [inputValue, setInputValue] = useState<string>(tag);

    return (
        <div key={tag} className={`w-full text-base text-start p-1.5  text-stone-700 relative group bg-[#31363F] rounded`}
        >
            <input value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-[#4c5361] px-1 py-0.5 text-[#cfcfcf]"
                onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    handleSave(inputValue);
                }}
            />


            <div className="items-center flex justify-end pt-1.5">
                <button
                    className={`w-6 h-6 p-0.5 bg-transparent group`}
                    onClick={e => {
                        e.stopPropagation();
                        handleSave(inputValue);
                    }}
                >
                    <CheckIcon classProps={"stroke-stone-300 hover:stroke-stone-100 hover:duration-200 ease-in-out"} />
                </button>
                <button
                    className={`w-6 h-6 p-0.5 bg-transparent group`}
                    onClick={e => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                >
                    <DeleteIcon classProps={"stroke-stone-300 hover:stroke-stone-100 hover:duration-200 ease-in-out"} />
                </button>
            </div>


            <></>
        </div>
    )
}

export default Tag