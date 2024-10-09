import {create} from "zustand";

type CreateEmployeeState = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useOpenCreateEmployeeSheet = create<CreateEmployeeState>((set) => ({
  open: false,
  onOpen: () => set({open: true}),
  onClose: () => set({open: false}),
}))
