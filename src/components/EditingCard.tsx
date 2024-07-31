import DeleteIcon from "./svg/DeleteIcon";
import ColorPicker from "./ColorPicker";
import CardLayout from "./CardLayout";
import CheckIcon from "./svg/CheckIcon";
import { useRef, useState } from "react";
import useAutosizeTextarea from "../hooks/useAutosizeTextarea";
import { ITextData } from "../type/type";
import BgButton from "./button/BgButton";
import OutlineButton from "./button/OutlineButton";

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
                title="Edit"
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
                        className={`w-full bg-secondary-900 p-1.5 rounded-sm no-scrollbar text-light-300 placeholder:brightness-75`}
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
                                    className={`pl-1.5 py-0.5 rounded-md text-sm text-secondary-900 font-semibold
                                        ${duplicatedTag === item ? "  bg-red-300" : " bg-accent-400"}
                                    `}>

                                    {item}
                                    <button
                                        className={`ml-1.5 pr-1.5 text-center bg-transparent
                                        `}
                                        onClick={() => {
                                            setCurrentTagList(pre => pre.filter(currTag => item !== currTag));
                                            setDuplicatedTag("");
                                        }}>×</button>
                                </span>
                            )}
                        </div>
                        <div className="w-full relative">
                            <input
                                placeholder="Input tag and press Enter"
                                onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                                onClick={e => e.stopPropagation()}
                                className={`px-1.5 py-1 text-sm bg-secondary-900 w-full h-8 text-light-300 placeholder:brightness-75`}
                                value={inputTagValue}
                                onChange={e => {
                                    setInputTagValue(e.target.value);
                                    setDuplicatedTag("");
                                }}
                                onKeyDown={(e) => {
                                    if (e.key !== "Enter" || !inputTagValue.trim()) return;
                                    if (currentTagList.some(item => item === inputTagValue)) {
                                        setDuplicatedTag(inputTagValue);
                                        return;
                                    }
                                    setCurrentTagList(pre => [...pre, inputTagValue]);
                                    setInputTagValue("");
                                }}
                            />
                            {inputTagValue && <OutlineButton
                                size={`text-sm`}
                                position={`right-1 top-1/2 -translate-y-1/2 absolute`}
                                padding={`px-1 py-[1px]`}
                                radius={`rounded-sm`}
                                color={`text-accent-300 border-accent-300 hover:brightness-125 bg-primary-900 animate-breathLight brightness-100`}
                                handleClick={() => {
                                    if (currentTagList.some(item => item === inputTagValue)) {
                                        setDuplicatedTag(inputTagValue);
                                        return;
                                    }
                                    setCurrentTagList(pre => [...pre, inputTagValue]);
                                    setInputTagValue("");
                                }}
                            >Enter</OutlineButton>}
                        </div>
                    </div>
                }
                buttonComp={<>
                    <BgButton
                        disabled={isOkDisabled}
                        size={`w-7 h-7`}
                        padding={`p-1`}
                        color={`bg-primary-950`}
                        handleClick={() => {
                            handleSave({
                                ...data,
                                value: inputValue,
                                tagList: currentTagList,
                                description: descriptionValue
                            });
                        }}
                    >
                        <CheckIcon classProps={`${isOkDisabled ? "stroke-primary-600" : "stroke-light-300 group-hover:stroke-accent-400 transition group-hover:duration-150 ease-linear"}`} />
                    </BgButton>
                    <BgButton
                        size={`w-7 h-7`}
                        padding={`p-1`}
                        color={`bg-primary-950`}
                        handleClick={() => {
                            handleDelete(id);
                        }}
                    >
                        <DeleteIcon classProps={"stroke-light-300 group-hover:stroke-warning transition group-hover:duration-150 ease-linear"} />
                    </BgButton>
                </>}
                colorPickerComp={
                    <ColorPicker unitId={id} labelFor={`color_${id}`}
                        handleGetColor={(color: string) => {
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
