import { create } from "zustand";
import { produce } from "immer";
import modules from "@/components/modules";

const useLayoutStore = create((set) => ({
  screen: null,
  module: modules[0],
  loggedIn: false,
  changeScreen: (screen) => set(() => ({ screen })),
  setLoggedIn: (loggedIn) => set(() => ({ loggedIn })),
  selectModule: (module) =>
    set(
      produce((state) => {
        state.module = module;
      })
    ),
}));

export default useLayoutStore;
