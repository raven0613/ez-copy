import { useEffect, useRef, useState } from 'react'
import Card from './Card'
import EditingCard from './EditingCard'
import { ILocalStorageData, ITextData } from '../type/type';
import useStore from '../zustand';

interface ICardList {
    searchKeyword: string;
}

const CardList = ({ searchKeyword }: ICardList) => {
    const { allTextCard, setAllTextCard, shownTextCard, shownTag } = useStore((state) => state);
    const [editingId, setEditingId] = useState<string>("");
    const localStorageData = useRef<ILocalStorageData>();
    const shownTextList = shownTextCard(searchKeyword, shownTag);

    useEffect(() => {
        if (!localStorage.getItem("ez-copy")) {
            localStorage.setItem("ez-copy", JSON.stringify({
                user: {},
                posts: [],
                tags: [],
                shownTag: []
            }))
            return;
        }
        const initialData: ILocalStorageData = JSON.parse(localStorage.getItem("ez-copy") || "");
        localStorageData.current = initialData;
        setAllTextCard(initialData.posts || []);
    }, [setAllTextCard]);

    const handleDelete = (id: string) => {
        const newAllTextList = allTextCard.filter(text => text.id !== id);
        setAllTextCard(newAllTextList);
        // setShownTextList(pre => pre.filter(text => text.id !== id));

        localStorage.setItem("ez-copy", JSON.stringify({ ...localStorageData.current, posts: newAllTextList }));
    }

    return (
        <div className="flex-1 flex flex-col gap-2 overflow-y-scroll">
            {allTextCard.length === 0 && <p className="text-[#76ABAE]">Add your first note</p>}
            {shownTextList && shownTextList.map(item => {
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

                            localStorage.setItem("ez-copy", JSON.stringify({ ...localStorageData.current, posts: newAllTextList }));
                        }}
                        handleDelete={handleDelete}
                    />
                )
                return (
                    <Card
                        key={item.id}
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

                            localStorage.setItem("ez-copy", JSON.stringify({ ...localStorageData.current, posts: newAllTextList }));
                        }}
                    />
                )
            })}


        </div>
    )
}

export default CardList;