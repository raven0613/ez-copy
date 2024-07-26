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
                        className={`w-full bg-[#4c5361] p-1.5 rounded-sm no-scrollbar`}
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
                        className={`w-full bg-[#4c5361] p-1.5 rounded-sm no-scrollbar text-[#d6d5d5]`}
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
                                    className={`px-1.5 py-0.5 rounded-md  border text-sm text-[#31363F] font-semibold
                                        ${duplicatedTag === item ? "border-red-300 bg-red-100" : "border-[#76ABAE] bg-[#76ABAE]"}
                                    `}>

                                    {item}
                                    <button className="ml-1 px-1.5 text-center bg-transparent w-4" onClick={() => {
                                        setCurrentTagList(pre => pre.filter(currTag => item !== currTag));
                                    }}>×</button>
                                </span>
                            )}
                        </div>
                        <input
                            placeholder="Input tag and press Enter"
                            onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                            onClick={e => e.stopPropagation()}
                            className={`px-1.5 py-1 text-sm bg-[#4c5361] w-full h-8 text-[#d6d5d5]`}
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
                        ${isOkDisabled ? "bg-[#31363F]" : "bg-[#76ABAE] hover:bg-[#87d3da]"}
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
                        <CheckIcon classProps={`${isOkDisabled ? "stroke-[#505968]" : "stroke-[#222831]"}`} />
                    </button>
                    <button
                        className={`w-7 h-7 p-1 rounded-full bg-[#76ABAE] hover:bg-[#87d3da] transition hover:duration-200 ease-in-out`}
                        onClick={e => {
                            e.stopPropagation();
                            handleDelete(id);
                        }}
                    >
                        <DeleteIcon classProps={"stroke-[#222831]"} />
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