export interface IField {
    value: string;
    type: string;
    required: boolean;
    error: string;
}

export interface IConfig {
    [key: string]: IField;
}
