import { UserType } from "../models/User"

class Helpers{
    public static checkUser = (user: UserType): string => {
        if(user.firstName == '') return "Please enter your first name.";
        if(user.lastName == '') return "Please enter your last name.";
        if(user.email == '') return "Please enter your email.";
        if(user.password == '') return "Please enter password.";
        return "SUCCESS";
    }
}

export default Helpers