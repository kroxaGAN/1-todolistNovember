import axios from "axios";

const settings={
    withCredentials:true
}
export const todolistAPI={
    getTodolists() {
       return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',settings)
    }
}
