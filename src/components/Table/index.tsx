import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AddingRow } from "../AddingRow";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";
import { IUser } from "../TableRow/types";
import { AddButton, StyledTable } from "./styles";
import { getUsers, selectTableState } from "./tableSlice";

const savedNewUser = localStorage.newUser;

export const Table = () => {
    const dispatch = useAppDispatch();
    const {
        users,
        isLoading,
        error,
    } = useAppSelector(selectTableState);
    const [isAdding, setAdding] = useState<boolean>(!!savedNewUser);
    const [sortingKey, setSortingKey] = useState<keyof IUser>('id');
    const [isSortedAsc, setSortedAsc] = useState<boolean>(true);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [isAdding])

    if (error) {
        return <h1>{error}</h1>
    }
    
    const sortedUsers: IUser[] = users.slice().sort((a: IUser, b: IUser) => {
        if (sortingKey === 'id' || sortingKey === 'age') {
            if (Number(a[sortingKey]) > Number(b[sortingKey])) {
                return isSortedAsc ? 1 : -1;
            } else if (Number(a[sortingKey]) < Number(b[sortingKey])) {
                return !isSortedAsc ? 1 : -1;
            }
        } else if (a[sortingKey].toLowerCase() > b[sortingKey].toLowerCase()) {
            return isSortedAsc ? 1 : -1;
        } else if (a[sortingKey].toLowerCase() < b[sortingKey].toLowerCase()) {
            return !isSortedAsc ? 1 : -1;
        }

        return 1;
    });

    const changeSortHandler = (key: keyof IUser) => {
        if (sortingKey === key) {
            setSortedAsc(!isSortedAsc);
            return;
        } else {
            setSortingKey(key);
            setSortedAsc(true);
        }
    };
    
    return (!isLoading || users.length) ?
        <>
            <StyledTable>
                <TableHeader
                    changeSortHandler={changeSortHandler}
                    sortingKey={sortingKey}
                    isSortedAsc={isSortedAsc}
                />
                <tbody>
                    {sortedUsers.map(user => 
                        <TableRow key={user.id} user={user} />
                    )}
                    {isAdding ? <AddingRow /> : null}
                </tbody>
                
            </StyledTable>
            {!isAdding && <AddButton onClick={() => setAdding(!isAdding)}>+</AddButton>}
        </> 
        : null;
}