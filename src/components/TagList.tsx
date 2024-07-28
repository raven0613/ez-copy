import { useEffect, useState } from "react";
import { IJsonData } from "../type/type";
import Tag from "./Tag";
import EditingTag from "./EditingTag";
import useStore from "../zustand";
import SelectAllIcon from "./svg/SelectAllIcon";
import CancelAllIcon from "./svg/CancelAllIcon";
import { saveLocalstorage } from "../App";

interface ITagList {
    jsonData?: IJsonData;
}

function TagList({ jsonData }: ITagList) {
    const { allTag, setAllTag, shownTag, setShownTag, toggleShownTag: toggleShownTag, deleteShownTag, deleteTag, setAllTextCard, allTextCard } = useStore((state) => state);

    const [editingTag, setEditingTag] = useState<string>("");
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
    const shownTagSet = new Set(shownTag);

    useEffect(() => {
        if (allTag.length === 0 && shownTag.length === 0) return;
        if (allTag.length === shownTag.length) setIsSelectAll(true);
        else setIsSelectAll(false);
    }, [allTag.length, shownTag.length])

    return (
        <div className="col-span-1 w-full px-2 h-full flex flex-col justify-between">
            {/* buttons */}
            <div className={`w-full flex justify-end gap-2`}>
                <button
                    className={`w-7 h-7 p-1 rounded-full hover:brightness-125 transition hover:duration-150 hover:ease-linear 
                    ${isSelectAll ? "bg-accent-400" : "bg-accent-400"}
                    `}
                    onClick={() => {
                        if (!jsonData) return;
                        setShownTag([...allTag]);
                        setIsSelectAll(true);
                        const strData = JSON.stringify({
                            ...jsonData,
                            shownTag: [...allTag]
                        })
                        saveLocalstorage(strData);
                    }}
                ><SelectAllIcon classProps="stroke-primary-800" /></button>
                <button
                    className={`w-7 h-7 p-1 rounded-full hover:bg-warning transition hover:duration-150 hover:ease-linear bg-accent-600 
                    `}
                    onClick={() => {
                        if (!jsonData) return;
                        setShownTag([]);
                        setIsSelectAll(false);
                        const strData = JSON.stringify({
                            ...jsonData,
                            shownTag: []
                        })
                        saveLocalstorage(strData);
                    }}
                ><CancelAllIcon classProps="stroke-primary-800" /></button>
            </div>
            {/* tags */}
            <div className={`w-full max-h-[29.25rem] flex-1 flex flex-col overflow-y-scroll overflow-x-hidden`}>
                {allTag.map((item) => {
                    if (editingTag === item) return (
                        <EditingTag
                            key={item}
                            tag={item}
                            handleSave={(newTag: string) => {
                                if (!jsonData) return;
                                const newAllTag = allTag.map(tag => {
                                    if (tag === item) return newTag;
                                    return tag;
                                });
                                setAllTag(newAllTag);
                                setEditingTag("");
                                const updatedAllTextCard = allTextCard.map(card => {
                                    return {
                                        ...card,
                                        tagList: card.tagList.map(tag => {
                                            if (tag === item) return newTag;
                                            return tag;
                                        })
                                    }
                                })
                                setAllTextCard(updatedAllTextCard);
                                const strData = JSON.stringify({
                                    ...jsonData,
                                    posts: updatedAllTextCard,
                                    tags: allTag.map(tag => {
                                        if (tag === item) return newTag;
                                        return tag;
                                    }),
                                    shownTag: shownTag.map(tag => {
                                        if (tag === item) return newTag;
                                        return tag;
                                    })
                                })
                                saveLocalstorage(strData);
                            }}
                            handleDelete={() => {
                                if (!jsonData) return;
                                setEditingTag("");
                                deleteTag(item);
                                deleteShownTag(item);
                                const updatedAllTextCard = allTextCard.map(card => {
                                    return {
                                        ...card,
                                        tagList: card.tagList.filter(tag => tag !== item)
                                    }
                                })
                                setAllTextCard(updatedAllTextCard);

                                const strData = JSON.stringify({
                                    ...jsonData,
                                    posts: updatedAllTextCard,
                                    tags: allTag.filter(tag => tag !== item),
                                    shownTag: shownTag.filter(tag => tag !== item)
                                })
                                saveLocalstorage(strData);
                            }}
                        />
                    )
                    return (
                        <Tag
                            key={item}
                            tag={item}
                            isSelected={shownTagSet.has(item)}
                            handleEdit={() => {
                                setEditingTag(item);
                            }}
                            handleSelect={() => {
                                if (!jsonData) return;
                                toggleShownTag(item);

                                const strData = JSON.stringify({
                                    ...jsonData,
                                    shownTag: shownTag.some(tag => item === tag)
                                        ? shownTag.filter(tag => item !== tag)
                                        : [...shownTag, item]
                                })
                                saveLocalstorage(strData);
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default TagList;