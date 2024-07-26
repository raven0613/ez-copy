import { StateCreator } from 'zustand';

// const getShownTagList = ({ list, keyword }: IFilter<string>) => {
//     const keywordFilteredList: string[] = list.filter(item => item.includes(keyword));
//     return keywordFilteredList;
// }

export interface ITagSlice {
    allTag: string[],
    setAllTag: (allTag: string[]) => void,
    addTag: (newData: string) => void,
    updateTag: (oldData: string, newData: string) => void,
    deleteTag: (tag: string) => void,
}

export const createTagSlice: StateCreator<ITagSlice> = (set) => ({
    allTag: [],

    setAllTag: (allTag) => set(() => ({ allTag })),

    addTag: (newData) => set((state) => ({
        allTag: state.allTag.some(item => item === newData)
            ? state.allTag
            : [...state.allTag, newData]
    })),

    updateTag: (oldData, newData) => set((state) => ({
        allTag: state.allTag.map(item => {
            if (oldData === item) return newData;
            return item;
        })
    })),

    deleteTag: (tag) => set((state) => ({
        allTag: state.allTag.filter(item => item !== tag)
    })),
})

export interface IShownTagSlice {
    shownTag: string[],
    setShownTag: (shownTag: string[]) => void,
    _addShownTag: (newData: string) => void,
    _deleteShownTag: (tag: string) => void,
    updateShownTag: (tag: string) => void,
}

export const createShownTagSlice: StateCreator<IShownTagSlice> = (set, get) => ({
    shownTag: [],

    setShownTag: (shownTag) => set(() => ({ shownTag })),

    _addShownTag: (newData) => set((state) => ({
        shownTag: [...state.shownTag, newData]
    })),

    _deleteShownTag: (tag) => set((state) => ({
        shownTag: state.shownTag.filter(item => item !== tag)
    })),

    updateShownTag: (tag) => {
        get().shownTag.some(item => item === tag)
            ? get()._deleteShownTag(tag)
            : get()._addShownTag(tag)
    },
})