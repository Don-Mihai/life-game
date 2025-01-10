export interface Characteristic {
  id: string;
  label: string;
  value: any;
}

export interface InitialState {
  characteristics: Characteristic[];
  isLoading: boolean;
}

export const initialState: InitialState = {
  characteristics: [],
  isLoading: false
};
