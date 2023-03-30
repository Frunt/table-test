import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addUserThunk } from "../Table/tableSlice";
import { AgeInput, Icon, TextInput } from "../TableRow/styles";
import { config } from "./utils";
import confirmIcon from '../../img/confirm.png';
import { AddNewRow, ErrorSpan, RelativeTd } from "./styles";

const savedNewUser = localStorage.newUser && JSON.parse(localStorage.newUser);

export const AddingRow = () => {
    const [newUser, setNewUser] = useState(savedNewUser || config);
    const dispatch = useAppDispatch();
    const [isError, setError] = useState<boolean>(false);

    const onChangeHandler = ({name, value}: HTMLInputElement) => {
        localStorage.newUser = JSON.stringify({
            ...newUser,
            [name]: {
                ...newUser[name as keyof typeof newUser],
                value,
            },
        });
        setNewUser({
            ...newUser,
            [name]: {
                ...newUser[name as keyof typeof newUser],
                value,
            },
        });
    };

    const validation = (name: string) => {
        if (!newUser[name as keyof typeof newUser].value) {
            setNewUser({
                ...newUser,
                [name]: {
                    ...newUser[name as keyof typeof newUser],
                    error: 'This field is required',
                },
            });
        } else {
            setNewUser({
                ...newUser,
                [name]: {
                    ...newUser[name as keyof typeof newUser],
                    error: '',
                },
            });
        }
    };

    const currentParams: any = {};
    Object.keys(newUser).forEach((field: string) => {
        currentParams[field as keyof typeof currentParams] = newUser[field as keyof typeof newUser].value;
    });

    const onSubmit = () => {
        setError(false);
        if (!newUser.about_person.value || !newUser.name.value || !newUser.age.value) {
            setError(true);
            return;
        }
        const params: any  = {
            name: '',
            age: 0,
            about_person: '',
        };
        Object.keys(newUser).forEach((field: string) => {
            params[field as keyof typeof params] = newUser[field as keyof typeof newUser].value;
        });
        localStorage.removeItem('newUser');
        dispatch(addUserThunk(params));
    };

    

    return(
        <AddNewRow>
            <RelativeTd>{isError && <ErrorSpan>All field are required</ErrorSpan>}</RelativeTd>
            {Object.keys(config).map((key) => 
                <RelativeTd key={key}>
                    {key === 'age' ? 
                        <AgeInput
                            className={`input${newUser[key as keyof typeof newUser].error ? ' invalid' : ''}`}
                            name={key}
                            type={config[key as keyof typeof config].type} 
                            value={newUser[key as keyof typeof config].value}
                            onChange={({target}) => onChangeHandler(target)}
                            onBlur={({target}) => validation(target.name)}
                            placeholder={`*${key}`}
                        />
                        : <TextInput
                            className={`input${newUser[key as keyof typeof newUser].error ? ' invalid' : ''}`}
                            name={key}
                            type={config[key as keyof typeof config].type} 
                            value={newUser[key as keyof typeof config].value}
                            onChange={({target}) => onChangeHandler(target)}
                            onBlur={({target}) => validation(target.name)}
                            placeholder={`*${key}`}
                        />} 
                </RelativeTd>    
            )}
            <RelativeTd><Icon src={confirmIcon} onClick={() => onSubmit()} /></RelativeTd>
        </AddNewRow> 
    );
};