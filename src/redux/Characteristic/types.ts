export interface Characteristic {
  id: string;
  label: string;
  value: any;
}

export interface InitialState {
  characteristics: Characteristic[];
  isLoading: boolean;
}
