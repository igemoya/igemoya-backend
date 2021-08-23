import { UserType } from '../types';

export interface User {
    idx: string,
    username: string,
    name: string,
    userType: UserType
}