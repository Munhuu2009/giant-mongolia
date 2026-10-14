import { create } from "zustand";

export const MAX_LINE_QUANTITY = 5;

export type CartLine = {
  key: string;
  productId: string;
  name: string;
  category: string;
  size: string;
  priceMnt: number;
  image: string;
  quantity: number;
};

type AddInput = Omit<CartLine, "key" | "quantity">;

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  lastAdded: { key: string; name: string; size: string; at: number } | null;
  /** Returns false when the line is already at the maximum quantity. */
  add: (input: AddInput) => boolean;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  open: () => void;
  close: () => void;
  dismissLastAdded: () => void;
};

export const useCart = create<CartState>((set, get) => ({
  lines: [],
  isOpen: false,
  lastAdded: null,
  add: (input) => {
    const key = `${input.productId}:${input.size}`;
    const existing = get().lines.find((line) => line.key === key);
    if (existing && existing.quantity >= MAX_LINE_QUANTITY) return false;

    set((state) => ({
      lines: existing
        ? state.lines.map((line) => (line.key === key ? { ...line, quantity: line.quantity + 1 } : line))
        : [...state.lines, { ...input, key, quantity: 1 }],
      lastAdded: { key, name: input.name, size: input.size, at: Date.now() },
    }));
    return true;
  },
  setQuantity: (key, quantity) => {
    const next = Math.max(1, Math.min(MAX_LINE_QUANTITY, Math.floor(quantity)));
    set((state) => ({
      lines: state.lines.map((line) => (line.key === key ? { ...line, quantity: next } : line)),
    }));
  },
  remove: (key) => set((state) => ({ lines: state.lines.filter((line) => line.key !== key) })),
  open: () => set({ isOpen: true, lastAdded: null }),
  close: () => set({ isOpen: false }),
  dismissLastAdded: () => set({ lastAdded: null }),
}));

export const selectCount = (state: CartState) => state.lines.reduce((total, line) => total + line.quantity, 0);
export const selectSubtotal = (state: CartState) =>
  state.lines.reduce((total, line) => total + line.quantity * line.priceMnt, 0);
