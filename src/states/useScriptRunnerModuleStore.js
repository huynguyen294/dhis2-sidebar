import { create } from "zustand";

export const initialStore = {
  currentScript: null,
  scripts: [],
};

const useSharingSettingsModuleStore = create((set) => ({
  ...initialStore,
  actions: {
    setCurrentScript: (currentScript) => set(() => ({ currentScript })),
    setScripts: (scripts) => set(() => ({ scripts })),
    reset: () => set(() => initialStore),
  },
}));

export default useSharingSettingsModuleStore;
