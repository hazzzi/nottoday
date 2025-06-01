import { create } from 'zustand';
import type { ExcuseTheme } from '../data/excuses';

interface ThemeStore {
  selectedTheme: ExcuseTheme | null;
  setTheme: (theme: ExcuseTheme | null) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  selectedTheme: null,
  setTheme: (theme) => set({ selectedTheme: theme }),
})); 