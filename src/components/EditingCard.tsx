import DeleteIcon from "./svg/DeleteIcon";
import ColorPicker from "./ColorPicker";
import CardLayout from "./CardLayout";
import CheckIcon from "./svg/CheckIcon";
import { useRef, useState } from "react";
import useAutosizeTextarea from "../hooks/useAutosizeTextarea";
import { ITextData } from "../type/type";

interface ICard {
    data: ITextData,
    handleSave: (data: ITextData) => void,
    handleDelete: (id: string) => void
}

const EditingCard = ({ data, handleSave, handleDelete }: ICard) => {
    const { id, value, description, tagList, bgColor } = data;
    const [inputValue, setInputValue] = useState<string>(value);
    const [descriptionValue, setDescriptionValue] = useState<string>(description);
    const [inputTagValue, setInputTagValue] = useState<string>("");
    const [currentTagList, setCurrentTagList] = useState<Array<string>>(tagList);
    const [duplicatedTag, setDuplicatedTag] = useState<string>("");

    const valueRef = useRef<HTMLTextAreaElement>(null);
    const desRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextarea(valueRef, inputValue);
    useAutosizeTextarea(desRef, descriptionValue);

    const isOkDisabled = inputTagValue.length > 0;

    return (
        <>
            <CardLayout
                id={id}
                contentComp={
                    <textarea
                        ref={valueRef}
                        autoFocus
                        placeholder="Input your content"
                        className={`w-full bg-secondary-900 p-1.5 rounded-sm no-scrollbar placeholder:brightness-75`}
                        style={{ height: "30px" }}
                        onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                        onClick={e => e.stopPropagation()}
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                }
                descriptionComp={
                    <textarea
                        ref={desRef}
                        autoFocus
                        placeholder="Input your description"
                        className={`w-full bg-secondary-900 p-1.5 rounded-sm no-scrollbar text-light placeholder:brightness-75`}
                        style={{ height: "30px" }}
                        onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                        onClick={e => e.stopPropagation()}
                        value={descriptionValue}
                        onChange={e => setDescriptionValue(e.target.value)}
                    />
                }
                tagComp={
                    <div className="flex flex-col w-full gap-2">
                        <div className="flex flex-wrap gap-1.5">
                            {currentTagList && currentTagList.map(item =>
                                <span key={item}
                                    className={`px-1.5 py-0.5 rounded-md  border text-sm text-secondary-900 font-semibold
                                        ${duplicatedTag === item ? "border-red-300 bg-red-100" : "border-accent-400 bg-accent-400"}
                                    `}>

                                    {item}
                                    <button className="ml-1 px-1.5 text-center bg-accent-400 w-4" onClick={() => {
                                        setCurrentTagList(pre => pre.filter(currTag => item !== currTag));
                                    }}>×</button>
                                </span>
                            )}
                        </div>
                        <input
                            placeholder="Input tag and press Enter"
                            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                            onClick={e => e.stopPropagation()}
                            className={`px-1.5 py-1 text-sm bg-secondary-900 w-full h-8 text-light placeholder:brightness-75`}
                            value={inputTagValue}
                            onChange={e => {
                                setInputTagValue(e.target.value);
                                setDuplicatedTag("");
                            }}
                            onKeyDown={(e) => {
                                if (e.key !== "Enter") return;
                                if (currentTagList.some(item => item === inputTagValue)) {
                                    setDuplicatedTag(inputTagValue);
                                    return;
                                }
                                setCurrentTagList(pre => [...pre, inputTagValue]);
                                setInputTagValue("");
                            }}
                        />
                    </div>
                }
                buttonComp={<>
                    <button
                        disabled={isOkDisabled}
                        className={`w-7 h-7 p-1 rounded-full  transition hover:duration-200 ease-in-out
                        ${isOkDisabled ? "bg-secondary-900" : "bg-accent-400 hover:brightness-125"}
                        `}
                        onClick={e => {
                            e.stopPropagation();
                            handleSave({
                                ...data,
                                value: inputValue,
                                tagList: currentTagList,
                                description: descriptionValue
                            });
                        }}
                    >
                        <CheckIcon classProps={`${isOkDisabled ? "stroke-primary-600" : "stroke-primary-950"}`} />
                    </button>
                    <button
                        className={`w-7 h-7 p-1 rounded-full bg-accent-400 hover:brightness-125 transition hover:duration-200 ease-in-out`}
                        onClick={e => {
                            e.stopPropagation();
                            handleDelete(id);
                        }}
                    >
                        <DeleteIcon classProps={"stroke-primary-950"} />
                    </button>
                </>}
                colorPickerComp={
                    <ColorPicker unitId={id} labelFor={`color_${id}`} handleGetColor={(color: string) => {
                        handleSave({ ...data, bgColor: color })
                    }}
                        color={bgColor}
                    />
                }
                color={bgColor}
                handleClick={() => {
                    navigator.clipboard.writeText(value);
                }}
            />
        </>
    )
}

export default EditingCard;