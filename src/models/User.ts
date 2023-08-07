import UserRoleType from "./UserRole"

export type UserType={
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    role:UserRoleType
}