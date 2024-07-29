import { useEffect, useState } from "react";
import { IJsonData } from "../type/type";
import Tag from "./Tag";
import EditingTag from "./EditingTag";
import useStore from "../zustand";
import SelectAllIcon from "./svg/SelectAllIcon";
import CancelAllIcon from "./svg/CancelAllIcon";
import { saveLocalstorage } from "../App";

interface ITagList {
    jsonDataRef: React.MutableRefObject<IJsonData | null>;
}

function TagList({ jsonDataRef }: ITagList) {
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
                        if (!jsonDataRef.current) return;
                        setShownTag([...allTag]);
                        setIsSelectAll(true);
                        const newJsonData = {
                            ...jsonDataRef.current,
                            shownTag: [...allTag]
                        }
                        jsonDataRef.current = newJsonData;
                        saveLocalstorage(JSON.stringify(newJsonData));
                    }}
                ><SelectAllIcon classProps="stroke-primary-800" /></button>
                <button
                    className={`w-7 h-7 p-1 rounded-full hover:bg-warning transition hover:duration-150 hover:ease-linear bg-accent-600 
                    `}
                    onClick={() => {
                        if (!jsonDataRef.current) return;
                        setShownTag([]);
                        setIsSelectAll(false);

                        const newJsonData = {
                            ...jsonDataRef.current,
                            shownTag: []
                        }
                        jsonDataRef.current = newJsonData;
                        saveLocalstorage(JSON.stringify(newJsonData));
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
                                if (!jsonDataRef.current) return;
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

                                const newJsonData = {
                                    ...jsonDataRef.current,
                                    posts: updatedAllTextCard,
                                    tags: allTag.map(tag => {
                                        if (tag === item) return newTag;
                                        return tag;
                                    }),
                                    shownTag: shownTag.map(tag => {
                                        if (tag === item) return newTag;
                                        return tag;
                                    })
                                }
                                jsonDataRef.current = newJsonData;
                                saveLocalstorage(JSON.stringify(newJsonData));
                            }}
                            handleDelete={() => {
                                if (!jsonDataRef.current) return;
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

                                const newJsonData = {
                                    ...jsonDataRef.current,
                                    posts: updatedAllTextCard,
                                    tags: allTag.filter(tag => tag !== item),
                                    shownTag: shownTag.filter(tag => tag !== item)
                                }
                                jsonDataRef.current = newJsonData;
                                saveLocalstorage(JSON.stringify(newJsonData));
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
                                if (!jsonDataRef.current) return;
                                toggleShownTag(item);

                                const newJsonData = {
                                    ...jsonDataRef.current,
                                    shownTag: shownTag.some(tag => item === tag)
                                        ? shownTag.filter(tag => item !== tag)
                                        : [...shownTag, item]
                                }
                                jsonDataRef.current = newJsonData;
                                saveLocalstorage(JSON.stringify(newJsonData));
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default TagList;