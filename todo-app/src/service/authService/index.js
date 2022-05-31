import axios from "axios";
import authHeader from "./authHeader";

const BASE_URL = "http://localhost:81";

export default axios.create({
    baseURL: BASE_URL
});

export const getTodoList = () => {
    axios.get(BASE_URL + '/todo', { headers: authHeader})
}