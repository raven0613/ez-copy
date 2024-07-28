import { useEffect, useRef, useState } from 'react'
import Card from './Card'
import EditingCard from './EditingCard'
import { IJsonData, ITextData } from '../type/type';
import useStore from '../zustand';

interface ICardList {
    searchKeyword: string;
}

const CardList = ({ searchKeyword }: ICardList) => {
    const { allTextCard, setAllTextCard, shownTextCard, shownTag, allTag, setAllTag } = useStore((state) => state);
    const [editingId, setEditingId] = useState<string>("");
    const jsonData = useRef<IJsonData>();
    const shownTextList = shownTextCard(searchKeyword, shownTag);

    useEffect(() => {
        if (!localStorage.getItem("ez-copy")) return;
        const initialData: IJsonData = JSON.parse(localStorage.getItem("ez-copy") || "");
        jsonData.current = initialData;
        setAllTextCard(initialData.posts || []);
    }, [setAllTextCard]);

    const handleDelete = (id: string) => {
        const newAllTextList = allTextCard.filter(text => text.id !== id);
        setAllTextCard(newAllTextList);
        // setShownTextList(pre => pre.filter(text => text.id !== id));

        localStorage.setItem("ez-copy", JSON.stringify({ ...jsonData.current, posts: newAllTextList }));
    }

    return (
        <div className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden flex-1 w-full">
            {allTextCard.length === 0 && <p className="text-accent-400">Add your first note</p>}
            {shownTextList && shownTextList.map((item, i) => {
                if (editingId === item.id) return (
                    <EditingCard
                        key={item.id}
                        data={{
                            id: item.id,
                            value: item.value ?? "",
                            description: item.description ?? "",
                            tagList: item.tagList,
                            bgColor: item.bgColor
                        }}
                        handleSave={(data: ITextData) => {
                            setEditingId("");
                            const newAllTextList = allTextCard.map(text => {
                                if (text.id === data.id) return data;
                                return text;
                            });
                            setAllTextCard(newAllTextList);

                            const allTagsSet = new Set(allTag);
                            data.tagList.map(item => allTagsSet.add(item));
                            setAllTag([...allTagsSet]);

                            localStorage.setItem("ez-copy", JSON.stringify({ ...jsonData.current, posts: newAllTextList, tags: [...allTagsSet] }));
                        }}
                        handleDelete={handleDelete}
                    />
                )
                return (
                    <Card
                        key={item.id}
                        index={i}
                        data={{
                            id: item.id,
                            value: item.value ?? "",
                            description: item.description ?? "",
                            tagList: item.tagList,
                            bgColor: item.bgColor
                        }}
                        handleEdit={() => {
                            setEditingId(item.id);
                        }}
                        handleDelete={handleDelete}
                        handleChangeData={(data: ITextData) => {
                            const newAllTextList = allTextCard.map(text => {
                                if (text.id === data.id) return data;
                                return text;
                            });

                            setAllTextCard(newAllTextList);

                            localStorage.setItem("ez-copy", JSON.stringify({ ...jsonData.current, posts: newAllTextList }));
                        }}
                        handleMoveCard={(dragIndex: number, hoverIndex: number) => {
                            const dragPostId = shownTextList[dragIndex].id;
                            const hoverPostId = shownTextList[hoverIndex].id;
                            let dragPostIndexInAllPost: number = 0;
                            let hoverPostIndexInAllPost: number = 0;
                            for (let i = 0; i < allTextCard.length; i++) {
                                if (allTextCard[i].id === dragPostId) dragPostIndexInAllPost = i;
                                if (allTextCard[i].id === hoverPostId) hoverPostIndexInAllPost = i;
                            }

                            const newAllTextList = [...allTextCard];
                            [newAllTextList[dragPostIndexInAllPost], newAllTextList[hoverPostIndexInAllPost]] = [newAllTextList[hoverPostIndexInAllPost], newAllTextList[dragPostIndexInAllPost]]
                            setAllTextCard(newAllTextList);
                            localStorage.setItem("ez-copy", JSON.stringify({ ...jsonData.current, posts: newAllTextList }));
                        }}
                    />
                )
            })}


        </div>
    )
}

export default CardList;