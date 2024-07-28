import { useState } from 'react'
import DeleteIcon from './svg/DeleteIcon';
import CheckIcon from './svg/CheckIcon';
import BgButton from './button/BgButton';

interface ITag {
    tag: string,
    handleSave: (tag: string) => void;
    handleDelete: () => void;
}

const Tag = ({ tag, handleSave, handleDelete }: ITag) => {
    const [inputValue, setInputValue] = useState<string>(tag);

    return (
        <div key={tag} className={`w-full text-base text-start p-1.5  text-stone-700 relative group bg-secondary-900 rounded my-1`}
        >
            <input value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full bg-secondary-700 px-1 py-0.5 text-light-300"
                onKeyDown={(e) => {
                    if (e.key !== "Enter") return;
                    handleSave(inputValue);
                }}
            />


            <div className="items-center flex justify-end pt-1.5 gap-1.5">
                <BgButton
                    size={`w-6 h-6`}
                    padding={`p-0.5`}
                    color={`bg-secondary-900`}
                    handleClick={() => {
                        handleSave(inputValue);
                    }}
                >
                    <CheckIcon classProps={"stroke-light-300 transition hover:brightness-125 hover:duration-150 ease-linear"} />
                </BgButton>
                <BgButton
                    size={`w-6 h-6`}
                    padding={`p-0.5`}
                    color={`bg-secondary-900`}
                    handleClick={() => {
                        handleDelete();
                    }}
                >
                    <DeleteIcon classProps={"stroke-light-300 transition hover:stroke-warning hover:duration-150 ease-linear"} />
                </BgButton>
            </div>


            <></>
        </div>
    )
}

export default Tag