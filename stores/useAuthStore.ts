import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type State = {
  isLoggIn: boolean;
  isOtpScreen: boolean;
  isPasswordScreen: boolean;
  _hasHydrated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  randomToken: string | null;
  token: string | null;
  phone: string | null;
};
type Action = {
  signIn: ({ accessToken, refreshToken, randomToken }: { accessToken: string; refreshToken: string; randomToken: string }) => void;
  signOut: () => void;
  setOtpScreen: ({token, phone}: {token: string, phone: string}) => void;
  setPasswordScreen: ({token}: {token: string}) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  setAccessToken :({accessToken,refreshToken,randomToken}: {accessToken: string,refreshToken: string,randomToken: string}) => void;
};

const initialState: State = {
  isLoggIn: false,
  isOtpScreen: false,
  isPasswordScreen: false,
  _hasHydrated: false,
  accessToken: null,
  refreshToken: null,
  randomToken: null,
  token: null,
  phone: null,
};

export const useAuthStore = create<State & Action>()(
  persist(
    (set) => ({
      ...initialState,
      signIn: ({ accessToken, refreshToken, randomToken }) =>
        set({ isLoggIn: true, isOtpScreen: false, isPasswordScreen: false, accessToken, refreshToken, randomToken }),
      setAccessToken :({accessToken,refreshToken,randomToken}) => set({ accessToken, refreshToken, randomToken }),
      signOut: () => set({ isLoggIn: false, accessToken: null, refreshToken: null, randomToken: null }),
      setOtpScreen: ({token, phone}) => set({ isOtpScreen: true, token, phone }),
      setPasswordScreen: ({token}) => set({ isPasswordScreen: true, token }),
      setHasHydrated: (hasHydrated: boolean) =>
        set({ _hasHydrated: hasHydrated }),
    }),
    
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        getItem: getItemAsync,
        setItem: setItemAsync,
        removeItem: deleteItemAsync,
      })),

      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
