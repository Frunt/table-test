import { IConfig } from "./types";

export const config: IConfig = {
    name: {
        value: '',
        type: 'text',
        required: true,
        error: '',
    },
    age: {
        value: '',
        type: 'number',
        required: true,
        error: '',
    },
    about_person: {
        value: '',
        type: 'text',
        required: true,
        error: '',
    }
};
