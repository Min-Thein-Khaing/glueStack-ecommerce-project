import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
    isLoggIn: boolean;
    _hasHydrated: boolean;

}
type Action = {
    signIn: () => void;
    signOut: () => void;
    setHasHydrated: (hasHydrated: boolean) => void;
}

const initialState: State = {
    isLoggIn: false,
    _hasHydrated: false,
}

export const useAuthStore = create<State & Action>()(persist((set) => ({
    ...initialState,
    signIn: () => set({ isLoggIn: true }),
    signOut: () => set({ isLoggIn: false }),
    setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
}), {
    name: "auth",
    storage: createJSONStorage(() => ({ getItem: getItemAsync, setItem: setItemAsync, removeItem: deleteItemAsync })),

    onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
    }

}),
)


