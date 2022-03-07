import axios from 'axios';
import { APIURL } from '../../App';

export default async function submitPost(heading, body, author, image){
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('body', body);
    formData.append('image', image);
    formData.append('author', author);

    const response = await axios.post(`${APIURL}/posts/`, formData);
    return response.data;
}

export async function addLike(post_id, like){
    const response = await axios.put(`${APIURL}/posts/${post_id}?like=${like}`)
    return response.data;
}

export async function getPosts(username){
    const posts = await axios.get(`${APIURL}/posts/user/${username}`)
    return posts.data;
}

export async function getAllPosts(getParams=''){
    const posts = await axios.get(`${APIURL}/posts/${getParams}`);
    return posts.data;
}

export async function getPost(id){
    const posts = await axios.get(`${APIURL}/posts/${id}`)
    return posts.data;
}

export async function submitPostUpdate(heading, body, image, id){
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('image', image);
    formData.append('body', body);
    
    const response = await axios.put(`${APIURL}/posts/${id}`, formData);
    return response.data;
}

export async function submitPostDelete(id){
    return await axios.delete(`${APIURL}/posts/${id}`)
}