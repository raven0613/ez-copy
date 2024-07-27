import { useEffect, useRef, useState } from "react";
import { ILocalStorageData } from "../type/type";
import Tag from "./Tag";
import EditingTag from "./EditingTag";
import useStore from "../zustand";

// interface ITagList {
//     searchKeyword: string;
// }

function TagList() {
    const { allTag, setAllTag, shownTag, setShownTag, updateShownTag } = useStore((state) => state);

    const [editingTag, setEditingTag] = useState<string>("");
    const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
    const shownTagSet = new Set(shownTag);
    const localStorageData = useRef<ILocalStorageData>();

    useEffect(() => {
        if (!localStorage.getItem("ez-copy")) return;
        const initialData: ILocalStorageData = JSON.parse(localStorage.getItem("ez-copy") || "");
        localStorageData.current = initialData;
        setAllTag(initialData.tags || []);
        setShownTag(initialData.shownTag || []);
    }, [setAllTag, setShownTag]);

    useEffect(() => {
        if (allTag.length === 0 && shownTag.length === 0) return;
        if (allTag.length === shownTag.length) setIsSelectAll(true);
        else setIsSelectAll(false);
    }, [allTag.length, shownTag.length])

    return (
        <div className="col-span-1 w-full h-full px-1.5">
            <div className={`w-full flex bg-slate-300`}>
                <div
                    className={` ${isSelectAll ? "" : ""}`}
                    onClick={() => {
                        // handleClickAll(isSelectAll);
                        setIsSelectAll(pre => !pre);
                    }}
                >全選</div>
                <div
                    className={``}
                    onClick={() => {
                        // handleClear();
                        setIsSelectAll(false);
                    }}
                >全消</div>
            </div>
            <div className={`w-full h-full flex flex-col`}>
                {allTag.map((item) => {
                    if (editingTag === item) return (
                        <EditingTag
                            key={item}
                            tag={item}
                            handleSave={(newTag: string) => {
                                const newAllTag = allTag.map(tag => {
                                    if (tag === item) return newTag;
                                    return tag;
                                });
                                setAllTag(newAllTag);
                                setEditingTag("");
                            }}
                            handleDelete={() => {

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
                                updateShownTag(item);
                                localStorage.setItem("ez-copy", JSON.stringify({
                                    ...localStorageData.current,
                                    shownTag: shownTag.some(tag => item === tag)
                                        ? shownTag.filter(tag => item !== tag)
                                        : [...shownTag, item]
                                }));
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default TagList;