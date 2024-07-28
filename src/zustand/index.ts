import { create } from 'zustand';
import { ICardSlice, createCardSlice } from './card';
import { IShownTagSlice, ITagSlice, createShownTagSlice, createTagSlice } from './tag';

const useStore = create<ICardSlice & ITagSlice & IShownTagSlice>((...a) => ({
    ...createCardSlice(...a),
    ...createTagSlice(...a),
    ...createShownTagSlice(...a),
}))

export default useStore;