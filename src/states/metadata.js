import { create } from "zustand";
import { produce } from "immer";

const useMetadataStore = create((set) => ({
  systemSettings: {},
  me: {},
  orgUnits: [],
  setSystemSettings: (systemSettings) =>
    set(
      produce((state) => {
        state.systemSettings = systemSettings;
      })
    ),
  setMe: (me) =>
    set(
      produce((state) => {
        state.me = me;
      })
    ),
  setOrgUnits: (orgUnits) =>
    set(
      produce((state) => {
        state.orgUnits = orgUnits;
      })
    )
}));

export default useMetadataStore;
