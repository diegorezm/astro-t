import {create} from "zustand"

type ShouldUpdateState = {
  shouldUpdate: boolean
  onShouldUpdate(): void
  onShouldUpdateReset(): void
}

export const useShouldUpdate = create<ShouldUpdateState>((set) => ({
  shouldUpdate: false,
  onShouldUpdate: () => set({shouldUpdate: true}),
  onShouldUpdateReset: () => set({shouldUpdate: false}),
}))
