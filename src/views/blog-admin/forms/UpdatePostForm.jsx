import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { submitPostUpdate, getPost } from '../../libs/PostsRequests';
import SideBar from "../components/SideBar";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function UpdatePostForm() {
    const [heading, setHeading] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    if(!username) navigate('/login');

    const submitForm = async e => {
        e.preventDefault()
        await submitPostUpdate(heading, body,image, id);
        navigate(`/manage-posts/${username}`)
    }

    const getOldPost = async () =>  {
        const data = await getPost(id);
        setHeading(data.heading);
        setBody(data.body)
    }

    useEffect(() => {
        getOldPost()
    }, [])

    return (  
        <div className="container">
            <SideBar />
            <form className="form" style={{marginTop: '100px'}} onSubmit={submitForm}>
                <div className="editor">
                    <h2>Update post</h2>
                    <input  
                        className="form-control"
                        type="text"
                        placeholder="heading" 
                        onChange={e => setHeading(e.target.value)}
                        value={heading}
                    />
                    <input  
                        className="form-control"
                        type="file"
                        accept='image/*'
                        placeholder="heading image" 
                        onChange={e => setImage(e.target.files[0])}
                    />
                    <CKEditor		
                        editor={ClassicEditor}
                        data={body}
                        onChange={(e, editor) => {
                            const data = editor.getData();
                            setBody(data);
                        }}
                    />
                    <button type="submit" className="btn btn-outline-primary" style={{width: '100%'}}>
                        UPDATE
                    </button>
                </div>
            </form> 
        </div>
    );
}

export default UpdatePostForm;