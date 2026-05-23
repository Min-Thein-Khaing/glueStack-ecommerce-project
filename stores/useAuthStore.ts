import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


type State = {
    isLoggIn: boolean;
    isOtpScreen:boolean;
    isPasswordScreen:boolean;
    _hasHydrated: boolean;
}
type Action = {
    signIn: () => void;
    signOut: () => void;
    setOtpScreen : ()=>void;
    setPasswordScreen:()=>void;
    setHasHydrated: (hasHydrated: boolean) => void;
}

const initialState: State = {
    isLoggIn: false,
    isOtpScreen:false,
    isPasswordScreen:false,
    _hasHydrated: false,
}

export const useAuthStore = create<State & Action>()(persist((set) => ({
    ...initialState,
    signIn: () => set({ isLoggIn: true,isOtpScreen:false,isPasswordScreen:false }),
    signOut: () => set({ isLoggIn: false }),
    setOtpScreen: () => set({isOtpScreen: true}),
    setPasswordScreen:()=> set({isPasswordScreen:true}),
    setHasHydrated: (hasHydrated: boolean) => set({ _hasHydrated: hasHydrated }),
}), {
    name: "auth-store",
    storage: createJSONStorage(() => ({
        getItem: getItemAsync,
        setItem: setItemAsync,
        removeItem: deleteItemAsync
    })),

    onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
    }

}),
)


