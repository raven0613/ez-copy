import { StateCreator } from 'zustand';
import { IFilter, ITextData } from '../type/type';

const getShownTextList = ({ list, keyword, shownTagList }: IFilter<ITextData>) => {
    const keywordFilteredList: ITextData[] = list.filter(item => item.value.includes(keyword));

    if (!shownTagList || shownTagList.length === 0) return keywordFilteredList;

    const tagSet = new Set<string>(shownTagList);
    const tagFilteredList = (keywordFilteredList as ITextData[]).filter(item => {
        const tags: string[] = item.tagList;
        return tags.some(tag => tagSet.has(tag));
    });
    return tagFilteredList;
}

export interface ICardSlice {
    allTextCard: ITextData[],
    shownTextCard: (keyword: string, shownTagList: string[]) => ITextData[],
    setAllTextCard: (allCard: ITextData[]) => void,
    addTextCard: (newData: ITextData) => void,
    updateTextCard: (newData: ITextData) => void,
    deleteTextCard: (id: string) => void,
}

export const createCardSlice: StateCreator<ICardSlice> = (set, get) => ({
    allTextCard: [],

    shownTextCard: (keyword: string, shownTagList: string[]) => {
        return getShownTextList({
            list: get().allTextCard,
            keyword,
            shownTagList
        })
    },

    setAllTextCard: (allCard) => set(() => ({ allTextCard: allCard })),

    addTextCard: (newData) => set((state) => ({ allTextCard: [newData, ...state.allTextCard] })),

    updateTextCard: (newData) => set((state) => ({
        allTextCard: state.allTextCard.map(item => {
            if (newData.id === item.id) return newData;
            return item;
        })
    })),

    deleteTextCard: (id) => set((state) => ({
        allTextCard: state.allTextCard.filter(item => item.id !== id)
    })),
})