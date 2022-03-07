import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost, addLike } from "../libs/PostsRequests";
import getComments, { submitComment } from '../libs/CommentRequests';
import parse from 'html-react-parser'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import BlogNavBar from "./BlogNavBar";
import '../../css/PostDetail.css';

function PostDetail() {
    const [postData, setPostData] = useState({body:'<h1>Loading....</h1>'});
    const [allComments, setAllComments] = useState([{id:0}])
    const [comment, setComment] = useState('')
    const [postLikes, setPostLikes] = useState(0)
    const [liked, setLiked] = useState(true);
    const { postid } = useParams();
    
    const getPostData = async () => {
        const response = await getPost(postid);
        setPostData(response);     
        setPostLikes(response.likes)   
    }

    const getAllPostComments = async () => {
        const response = await getComments(postid);
        setAllComments(response) 
    }

    const submitCommentForm = async e => {
        e.preventDefault()
        await submitComment(comment, postid);
        setComment('')
        getAllPostComments()
    }

    const handleLikes = async () =>  {
        if(liked) setLiked(false);
        else setLiked(true);

        const response = await addLike(postid, liked);
        setPostLikes(response.likes);
    }

    useEffect(() => {
        getPostData()
        getAllPostComments()
    }, [postid])

    return ( 
        <>
            <BlogNavBar/>
            <div className="container">
                <div className="container d-flex flex-column align-items-flex-start justify-content-evenly">
                    <h1>{postData.heading}</h1>
                    {parse(postData.body)}
                </div>
            </div>


            <div className="container-xxl my-5">
                <div>
                    <button 
                        onClick={handleLikes}
                        className={liked?"likes-btn" : "likes-btn likes-btn-active"}
                    >
                        <FontAwesomeIcon icon={faThumbsUp}/>
                    </button>
                    <span>{postLikes}</span>
                </div>
                <form onSubmit={submitCommentForm} className="form">
                    <h4>Comment</h4>
                    <textarea
                        className="form-control" 
                        placeholder="Comment" 
                        onChange={e => setComment(e.target.value)} 
                        value={comment}
                        cols="25" rows="5" style={{resize: "none"}}
                    ></textarea>
                    <button type="submit" className="btn btn-outline-primary" style={{width: '100%'}}>Add comment</button>
                </form>

                <div style={{width: '100%'}} className="d-flex flex-column justify-content-evenly align-items-center mt-5">
                    {allComments.map(comment => (
                        <div className="container" key={comment.id}>
                            <strong style={{textDecoration: 'underline'}}>{comment.comment_date}</strong>
                            <p>
                                {comment.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    ); 
}

export default PostDetail;