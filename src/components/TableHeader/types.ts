import { IUser } from "../TableRow/types";

export interface ITableHeader {
    changeSortHandler: (key: keyof IUser) => void;
    isSortedAsc: boolean;
    sortingKey: string;
}