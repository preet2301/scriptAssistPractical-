import { create } from "zustand";

export const useAppStore = create((set) => ({
  persons: [],
  setPersons: (data: any) =>
    set(() => ({ persons: data })),
  person: {},
  setPerson: (data: any) =>
    set(() => ({ person: data })),
  homeWorld: {},
  setHomeWorld: (data: any) =>
    set(() => ({ homeWorld: data })),
}));
