import { create } from "zustand";
import { produce } from "immer";
import modules from "@/components/modules";

const useLayoutStore = create((set) => ({
  screen: null,
  module: modules[0],
  lastLogin: "",
  changeScreen: (screen) => set(() => ({ screen })),
  setLastLogin: (lastLogin) =>
    set(
      produce((state) => {
        state.lastLogin = lastLogin;
      })
    ),
  selectModule: (module) =>
    set(
      produce((state) => {
        state.module = module;
      })
    ),
}));

export default useLayoutStore;
