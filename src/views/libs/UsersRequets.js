import axios from "axios";
import { APIURL } from '../../App';

export default async function submitCheckUser(username, password, gmail){
    const formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)
    formData.append('gmail', gmail)
    const response = await axios.post(`${APIURL}/check-user/`, formData);
    return response.data;
}

export async function submitCreateUser(username, password, gmail){
    const formData = new FormData();
    formData.append('username', username)
    formData.append('password', password)
    formData.append('gmail', gmail)
    const response = await axios.post(`${APIURL}/users/`, formData);
    return response.data;
}

export async function submitDeleteUser(id){
    const response = await axios.delete(`${APIURL}/users/${id}`);
    return response.data;
}

export async function getUser(id){
    const response = await axios.get(`${APIURL}/users/${id}`)
    return response.data;
}

export async function getUsers(){
    const response = await axios.get(`${APIURL}/users/`) 
    return response.data;
}