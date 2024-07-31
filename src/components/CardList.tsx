import { useState } from 'react'
import Card from './Card'
import EditingCard from './EditingCard'
import { IJsonData, ITextData } from '../type/type';
import useStore from '../zustand/index';
import { saveLocalstorage } from '../App';

interface ICardList {
    searchKeyword: string;
    jsonDataRef: React.MutableRefObject<IJsonData | null>;
}

const CardList = ({ searchKeyword, jsonDataRef }: ICardList) => {
    const { allTextCard, setAllTextCard, shownTextCard, shownTag, allTag, setAllTag } = useStore((state) => state);
    const [editingId, setEditingId] = useState<string>("");
    const shownTextList = shownTextCard(searchKeyword, shownTag);

    const handleDelete = (id: string) => {
        const newAllTextList = allTextCard.filter(text => text.id !== id);
        setAllTextCard(newAllTextList);

        const newJsonData = { ...jsonDataRef.current, posts: newAllTextList } as IJsonData;
        jsonDataRef.current = newJsonData;
        saveLocalstorage(JSON.stringify(newJsonData));
    }

    return (
        <>
            <div className="flex flex-col gap-2 overflow-y-scroll overflow-x-hidden flex-1 w-full items-center">
                {allTextCard.length === 0 && <p className="text-accent-400">Press + to add first note</p>}

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

                                const newJsonData = { ...jsonDataRef.current, posts: newAllTextList, tags: [...allTagsSet] } as IJsonData;
                                jsonDataRef.current = newJsonData;
                                saveLocalstorage(JSON.stringify(newJsonData));
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

                                const newJsonData = { ...jsonDataRef.current, posts: newAllTextList } as IJsonData;
                                jsonDataRef.current = newJsonData;
                                saveLocalstorage(JSON.stringify(newJsonData));
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

                                const newJsonData = { ...jsonDataRef.current, posts: newAllTextList };
                                jsonDataRef.current = newJsonData as IJsonData;;
                                saveLocalstorage(JSON.stringify(newJsonData));
                            }}
                        />
                    )
                })}

                <p className="text-[0.75rem] w-fit px-1.5 pt-0.5 rounded-full text-center tracking-widest sticky bottom-0 z-40 backdrop-blur-md">{shownTextList.length}/{allTextCard.length}</p>
            </div>

        </>
    )
}

export default CardList;
