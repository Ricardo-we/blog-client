import { APIURL } from "../../App";
import axios from "axios";

export default async function getComments(post_id){
    const response = await axios.get(`${APIURL}/post-comments/${post_id}`)
    return response.data;
}

export async function submitComment(comment, post_id){
    const formData = new FormData();
    formData.append('comment', comment)

    const response = await axios.post(`${APIURL}/post-comments/${post_id}`,formData)
    return response.data;
}

export async function submitCommentUpdate(comment, comment_id){
    const formData = new FormData();
    formData.append('comment', comment);
    formData.append('comment-id', comment_id);
    
    const response = await axios.put(`${APIURL}/post-comments/`, formData)
    return response.data;
}

export async function submitCommentDelete(comment_id){
    const response = await axios.delete(`${APIURL}/post-comments/?comment-id=${comment_id}`);
    return response.data;
}