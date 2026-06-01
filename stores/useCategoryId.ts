

import {create} from 'zustand';

type CategoryIdState ={
  categoryId: number | null;
  setCategoryId: (id: number) => void;
}

export const useCategoryId = create<CategoryIdState>((set) => ({
  categoryId: null,
  setCategoryId: (id: number) => set({ categoryId: id }),
}));
