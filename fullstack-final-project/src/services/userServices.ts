import axios from "axios";
import { Users } from "../interfaces/users";
import { jwtDecode, JwtPayload } from "jwt-decode";


const api: string = `${process.env.REACT_APP_API}/users`


export function createUser(user: Users) {
    return axios.post(api, user)
}


export function getUserById(id: string) {
    return axios.get(`${api}/${id}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    })
}

export function getDecodedToken(token: string) {
    return jwtDecode(token) as CustomPayload
}

interface CustomPayload extends JwtPayload {
    _id: string,
    isLoggedIn: boolean,
    isAdmin: boolean,
    iat: number
}

export async function getUserDetails(token: string) {
    try {
        let decode = jwtDecode<CustomPayload>(token)
        let userdId = decode._id
        return getUserById(userdId)
    } catch (error) {
        console.log(error);

    }
}

export function getAllUsers() {
    return axios.get(`${api}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    })
}

export function checkUser(email: string, password: string) {
    return axios.post(`${api}/login`, { email: email, password: password })
}

export function deleteUser(_id: string) {
    return axios.delete(`${api}/${_id}`, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    })
}

export function updateUser(user: Users) {
    return axios.patch(`${api}/${user._id}`, user, {
        headers: {
            "x-auth-token": localStorage.getItem("token")
        }
    })
}