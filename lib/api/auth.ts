import axios from ".";
import { UserType } from "../../types/user";

interface SignUpAPIBody {
  email: string;
  lastname: string;
  firstname: string;
  password: string;
  birthday: string;
}

export const signupAPI = (body: SignUpAPIBody) => axios.post<UserType>("/api/auth/signup", body);
