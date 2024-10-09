import type {Employee} from "@/models/employee";
import {create} from "zustand";

type UpdateEmployeeState = {
  employee: Employee | null;
  open: boolean;
  onOpen: (employee: Employee) => void;
  onClose: () => void;
};

export const useOpenUpdateEmployeeSheet = create<UpdateEmployeeState>((set) => ({
  open: false,
  employee: null,
  onOpen: (employee) => set({open: true, employee}),
  onClose: () => set({open: false, employee: null}),
}))
