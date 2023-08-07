import * as SecureStore from 'expo-secure-store';
import MainConnector from "./MainConnector";

class AuthConnector{
    public static getToken = async (): Promise<string | null> => await SecureStore.getItemAsync("AccessToken")

    public static saveToken = async (token:string) => await SecureStore.setItemAsync("AccessToken", token) 

    public static login = async (email: string, password:string): Promise<string | null> => {
        return await MainConnector
            .post(`/auth/login`, {email, password})
            .then(async (res) => {
                await this.saveToken(res.data.accessToken)
                return res.data.accessToken
            })
    }

    public static logout = async () => await SecureStore.deleteItemAsync("AccessToken")

    public static whoAmI = async (token: string) => await MainConnector
        .get("/auth/whoami", token)
        .then(res => {
            return res.data
        })
        .catch(() => null)
}

export default AuthConnector