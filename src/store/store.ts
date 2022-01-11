import create from 'zustand'

type TStore = {
	items: string[];
	add: (item: string) => void;
	move: (startIndex: number, endIndex: number) => void;
};

export default create<TStore>((set) => ({
    items:[],
    add: (item) => set((state) => ({ items: [...state.items, item]})),
    move: (startIndex, endIndex) =>
        set((state) => {
            const items = [...state.items];
            const [removed] = items.splice(startIndex, 1);
            items.splice(endIndex, 0, removed);
            return { items };
        }),
}))