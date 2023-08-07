import axios from "axios"


const getRequestHeaders = (token?: string) => {
    return {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Authorization": `Bearer ${token}`
    }
}

class MainConnector{
    public static baseURL = "https://888f-89-172-74-37.ngrok-free.app"

    public static get= async (link:string, token?: string)=>{
        return await axios.get(`${this.baseURL}${link}`, {headers: getRequestHeaders(token)});
    }
    public static post = async (link:string, data:unknown, token?: string)=>{
        return await axios.post(`${this.baseURL}${link}`, data, {headers: getRequestHeaders(token)});
    }
    public static patch = async (link:string, data:unknown, id:string, token?: string)=>{
        return await axios.patch(`${this.baseURL}${link}/${id}`, data, {headers: getRequestHeaders(token)})
    }
}

export default MainConnector