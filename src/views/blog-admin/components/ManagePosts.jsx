import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState, useEffect } from 'react';
import submitPost,{ getPosts, submitPostDelete } from '../../libs/PostsRequests';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt, faTrash, faArrowDownShortWide  } from '@fortawesome/free-solid-svg-icons';
import SideBar from './SideBar';
import { Link, useNavigate } from 'react-router-dom';
import  orderTableByLowerToBiggerIds, { orderTableByBiggerToLowerIds } from '../../libs/OrderPostsTable';

function ManagePosts() {
    const [heading, setHeading] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [userPosts, setUserPosts] = useState([{id:0}])
    const author = sessionStorage.getItem('username')
    const navigate = useNavigate();
    if(!author) navigate('/login')

    const getAllPosts = async () => {
        const response = await getPosts(author);
        setUserPosts(orderTableByBiggerToLowerIds(response))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        await submitPost(heading, body, author, image)
        getAllPosts()
    }

    const submitDelete = async id => {
        await submitPostDelete(id)
        getAllPosts()
    } 

    useEffect(() => {
        getAllPosts();
    }, [])    

    return ( 
        <div className='container'>
            <SideBar />
            <form onSubmit={submitForm} style={{marginTop: '100px'}}>
                <div className="editor">
                    <h2>Create a post</h2>
                    <input  
                        className="form-control"
                        type="text"
                        placeholder="heading" 
                        onChange={e => setHeading(e.target.value)}
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
                    <button className="btn btn-outline-primary" style={{width: '100%'}}>SUBMIT</button>
                </div>
            </form>
            <div className="container-xxl mt-5">
                <button 
                    className="btn btn-secondary" 
                    onClick={() => setUserPosts(orderTableByLowerToBiggerIds(userPosts))} 
                    title="order" 
                >
                    <FontAwesomeIcon icon={faArrowDownShortWide}/>
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">heading</th>
                            <th scope="col">last update</th>
                            <th scope="col">actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPosts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.heading}</td>
                                <td>{post.last_update}</td>
                                <td>
                                    <Link to={`/manage-posts/update/${post.id}`} className="btn btn-success">
                                        <FontAwesomeIcon icon={faPenAlt} />
                                        </Link>
                                        <button onClick={() => submitDelete(post.id)} className="btn btn-danger">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody> 
            </table>
            </div>
        </div>
    );
}

export default ManagePosts;