export interface ITableRow {
    user: IUser;
}

export interface IUser {
    id: string,
    name: string,
    age: number,
    about_person: string,
}

export interface TableState {
  users: IUser[],
  isLoading: boolean,
  error: string,
}

