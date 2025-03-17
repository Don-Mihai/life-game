export interface Category {
  id: string;
  label: string;
  order: number;
}

interface CategoryState {
  categories: Category[];
}

export const initialState: CategoryState = {
  categories: []
};

export interface CategoryDeletePayload {
  categoryId: string;
}
