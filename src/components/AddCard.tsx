import ColorPicker from "./ColorPicker";
import CardLayout from "./CardLayout";
import CheckIcon from "./svg/CheckIcon";
import { useRef, useState } from "react";
import useAutosizeTextarea from "../hooks/useAutosizeTextarea";
import EraseIcon from "./svg/EraseIcon";
import { v4 as uuidv4 } from 'uuid';
import useStore from "../zustand";
import { IJsonData } from "../type/type";
import BgButton from "./button/BgButton";
import { saveLocalstorage } from "../App";

interface ICard {
    isAddShowing: boolean,
    jsonData?: IJsonData;
}

const AddCard = ({ isAddShowing, jsonData }: ICard) => {
    const { allTextCard, setAllTextCard, allTag, addTag } = useStore((state) => state);
    const [inputValue, setInputValue] = useState<string>("");
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [inputTagValue, setInputTagValue] = useState<string>("");
    const [currentTagList, setCurrentTagList] = useState<Array<string>>([]);
    const [duplicatedTag, setDuplicatedTag] = useState<string>("");
    const [color, setColor] = useState<string>("");
    const id = "new";

    const valueRef = useRef<HTMLTextAreaElement>(null);
    const desRef = useRef<HTMLTextAreaElement>(null);
    useAutosizeTextarea(valueRef, inputValue);
    useAutosizeTextarea(desRef, descriptionValue);

    const isOkDisabled = inputTagValue.length > 0;

    return (
        <div className={`w-full pr-[6px] transition duration-150 ease-linear overflow-hidden 
        ${isAddShowing ? "h-fit mb-2" : "h-0"}`}>
            <CardLayout
                id={id}
                title={"Add New"}
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
                                    className={`px-1.5 py-0.5 rounded-md  border text-sm text-secondary-900 font-semibold
                                        ${duplicatedTag === item ? "border-red-300  bg-accent-300" : "border-accent-400 bg-accent-400"}
                                    `}>

                                    {item}
                                    <button
                                        className={`ml-1 px-1.5 text-center bg-accent-400 w-4
                                        ${duplicatedTag === item ? "border-red-300  bg-accent-300" : "border-accent-400 bg-accent-400"}
                                        `}
                                        onClick={() => {
                                            setCurrentTagList(pre => pre.filter(currTag => item !== currTag));
                                            setDuplicatedTag("");
                                        }}>×</button>
                                </span>
                            )}
                        </div>
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
                    </div>
                }
                buttonComp={<>
                    <BgButton
                        disabled={isOkDisabled}
                        size={`w-7 h-7`}
                        padding={`p-1`}
                        color={`bg-primary-950 ${isOkDisabled ? "" : "hover:brightness-125"}`}
                        handleClick={() => {
                            if (!inputValue) return;
                            const newData = {
                                id: uuidv4(),
                                value: inputValue,
                                tagList: currentTagList,
                                description: descriptionValue,
                                bgColor: color
                            };
                            const newAllTextList = [newData, ...allTextCard];
                            setAllTextCard(newAllTextList);
                            addTag(currentTagList);

                            const allTagsSet = new Set(allTag);
                            currentTagList.map(item => allTagsSet.add(item));

                            const strData = JSON.stringify({ ...jsonData, posts: newAllTextList, tags: [...allTagsSet] })
                            saveLocalstorage(strData);

                            setDescriptionValue("");
                            setInputValue("");
                        }}
                    >
                        <CheckIcon classProps={`${isOkDisabled ? "stroke-primary-600" : "stroke-light-300"}`} />
                    </BgButton>
                    <BgButton
                        size={`w-7 h-7`}
                        padding={`p-1`}
                        color={`bg-primary-950`}
                        handleClick={() => {
                            setInputTagValue("");
                            setDescriptionValue("");
                            setCurrentTagList([]);
                            setDuplicatedTag("");
                            setColor("");
                            setInputValue("");
                        }}
                    >
                        <EraseIcon classProps={"fill-light-300 group-hover:fill-warning transition group-hover:duration-150 ease-linear"} />
                    </BgButton>
                </>}
                colorPickerComp={
                    <ColorPicker unitId={id} labelFor={`color_${id}`} handleGetColor={(color: string) => {
                        setColor(color);
                    }}
                        color={color}
                    />
                }
                color={color}
                handleClick={() => { }}
            />
        </div>
    )
}

export default AddCard;