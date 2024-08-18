// intercepter will intercept any request we send and automatically add the correct headers
// axios is a clean way to send network requests - checks if we have an access token anytime we send a request, and adds it to the request
import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
    // allows us to import anything that's specified under .env, needs to start with VITE
})

api.interceptors.request.use(
    (config) => {
        // check if we have an access token
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token){
            config.headers.Authorization = `Bearer ${token}`
            // this is the format to pass a JWT access token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api