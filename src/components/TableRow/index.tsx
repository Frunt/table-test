import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { deleteUserThunk, editUserThunk } from "../Table/tableSlice";
import { ITableRow, IUser } from "./types";
import deleteIcon from '../../img/delete.png';
import saveIcon from '../../img/save.png';
import editIcon from '../../img/edit-icon.png';
import { AgeInput, Icon, StyledTd, TextInput } from "./styles";

const savedEditedUser = localStorage.editedUser && JSON.parse(localStorage.editedUser)

export const TableRow = ({user}: ITableRow) => {
    const [isEdit, setEdit] = useState<boolean>(savedEditedUser && savedEditedUser.id === user.id);
    const [currentUser, setCurrentUser] = useState<IUser>((savedEditedUser && savedEditedUser.id === user.id) ? savedEditedUser : user);
    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        if (isEdit) {
            dispatch(editUserThunk(currentUser));
            setEdit(false);
        } else setEdit(true);
    };
    const onChangeHandler = ({target}: ChangeEvent<HTMLInputElement>) => {
        localStorage.editedUser = JSON.stringify({
            ...currentUser,
            [target.name]: target.value,
        });
        setCurrentUser({
            ...currentUser,
            [target.name]: target.value,
        });
    }
    return (
        <tr>
            <StyledTd>{currentUser.id}</StyledTd>
            <StyledTd>{isEdit ? <TextInput name="name" onChange={(e) => onChangeHandler(e)} type="text" value={currentUser.name} /> : currentUser.name}</StyledTd>
            <StyledTd>{isEdit ? <AgeInput name="age" onChange={(e) => onChangeHandler(e)} type="number" value={currentUser.age} /> : currentUser.age}</StyledTd>
            <StyledTd>{isEdit ? <TextInput name="about_person" onChange={(e) => onChangeHandler(e)} type="text" value={currentUser.about_person} /> : currentUser.about_person}</StyledTd>
            <StyledTd><Icon onClick={onClickHandler} src={isEdit ? saveIcon : editIcon} /></StyledTd>
            <StyledTd><Icon src={deleteIcon} onClick={() => {
                dispatch(deleteUserThunk(currentUser.id));
                localStorage.removeItem('editedUser')
                }} alt="delete" /></StyledTd>
        </tr>
    );
}