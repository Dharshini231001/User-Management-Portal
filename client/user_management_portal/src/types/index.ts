export type FieldType = 'text' | 'number' | 'email' | 'date';

export interface Field {
  name: any;
  _id: string;
  label: string;
  fieldKey: string;
  type: FieldType;
  required: boolean;
}

export interface UserData {
  [key: string]: any;
}

export interface User {
  _id: string;
  data: UserData;
  createdAt?: string;
}