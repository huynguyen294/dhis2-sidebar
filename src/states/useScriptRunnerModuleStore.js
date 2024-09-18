import { create } from "zustand";

export const initialStore = {
  settings: {
    program: null,
    metadata: null,
    function: "whole",
    metadataType: null,
    userGroupsSelected: { admin: [], capture: [], view: [] },
    isDirty: false,
  },
};

const useSharingSettingsModuleStore = create((set) => ({
  ...initialStore,
  actions: {
    setSettings: (settings) => set(() => ({ settings })),
    reset: () => set(() => initialStore),
  },
}));

export default useSharingSettingsModuleStore;
