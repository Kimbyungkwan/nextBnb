import { UserType } from "./user.d";

export type UserState = UserType & {
    isLogged:boolean
};
