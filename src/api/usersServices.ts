import axios from "axios";
import { IUser } from "../components/TableRow/types";
import { BASE_API_URL } from "./urls";

const BASE_API_URL_USERS = `${BASE_API_URL}/users`;

export function fetchUsers() {
    const response = axios.get(BASE_API_URL_USERS)
    .then(res => res.data)
    .catch(err => err.message);

    return response;
}

export function addUser(params: IUser) {
    const response = axios.post(BASE_API_URL_USERS, params)
    .then(res => res.data)
    .catch(err => err.message);

    return response;
}

export function editUser(params: IUser) {
    const { id, ...rest } = params;
    const response = axios.put(`${BASE_API_URL_USERS}/${id}`, {...rest})
    .then(res => res.data)
    .catch(err => err.message);

    return response;
}

export function deleteUser(id: string) {
    const response = axios.delete(`${BASE_API_URL_USERS}/${id}`)
    .then(res => res.data)
    .catch(err => err.message);

    return response;
}