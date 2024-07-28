import { StateCreator } from 'zustand';

// const getShownTagList = ({ list, keyword }: IFilter<string>) => {
//     const keywordFilteredList: string[] = list.filter(item => item.includes(keyword));
//     return keywordFilteredList;
// }

export interface ITagSlice {
    allTag: string[],
    setAllTag: (allTag: string[]) => void,
    addTag: (newTags: string[]) => void,
    updateTag: (oldData: string, newData: string) => void,
    deleteTag: (tag: string) => void,
}

export const createTagSlice: StateCreator<ITagSlice> = (set) => ({
    allTag: [],

    setAllTag: (allTag) => set(() => ({ allTag })),

    addTag: (newTags) => set((state) => {
        const allTagsSet = new Set(state.allTag);
        newTags.map(item => allTagsSet.add(item));
        return {
            allTag: [...allTagsSet]
        }
    }),

    updateTag: (oldData, newData) => set((state) => ({
        allTag: state.allTag.map(item => {
            if (oldData === item) return newData;
            return item;
        })
    })),

    deleteTag: (tag) => set((state) => ({
        allTag: state.allTag.filter(item => item !== tag),
    })),
})

export interface IShownTagSlice {
    shownTag: string[],
    setShownTag: (shownTag: string[]) => void,
    addShownTag: (newData: string) => void,
    deleteShownTag: (tag: string) => void,
    toggleShownTag: (tag: string) => void,
}

export const createShownTagSlice: StateCreator<IShownTagSlice> = (set, get) => ({
    shownTag: [],

    setShownTag: (shownTag) => set(() => ({ shownTag })),

    addShownTag: (newData) => set((state) => ({
        shownTag: [...state.shownTag, newData]
    })),

    deleteShownTag: (tag) => set((state) => ({
        shownTag: state.shownTag.filter(item => item !== tag)
    })),

    toggleShownTag: (tag) => {
        get().shownTag.some(item => item === tag)
            ? get().deleteShownTag(tag)
            : get().addShownTag(tag)
    },
})