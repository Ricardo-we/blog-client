import { useState, useEffect } from "react";
import { getUsers, submitDeleteUser } from "../../libs/UsersRequets";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";

function ManageUsers() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gmail, setGmail] = useState('');
    const [allUsers, setAllUsers] = useState([{id:0}]);
    const author = sessionStorage.getItem('username')
    const navigate = useNavigate();
    if(!author) navigate('/login')

    const getAllUsers = async () => {
        const response = await getUsers();
        setAllUsers(response);
    }

    const submitForm = async e => {
        e.preventDefault()
    }

    const submitDelete = async id => {
        await submitDeleteUser(id);
        getAllUsers()
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return ( 
        <div className="container">
            <SideBar />
            <form onSubmit={submitForm} style={{marginTop: '100px'}} className="form">
                <h2>Create user</h2>
                <input 
                    value={username} 
                    type="text" 
                    className="form-control" 
                    placeholder="username"
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    value={password} 
                    type="password" 
                    className="form-control" 
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    value={gmail} 
                    type="email" 
                    className="form-control" 
                    placeholder="gmail"
                    onChange={e => setGmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                    SUBMIT
                </button>
            </form>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">username</th>
                        <th scope="col">password</th>
                        <th scope="col">gmail</th>
                        <th scope="col">actions</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {allUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.password}</td>
                            <td>{user.gmail}</td>
                            <td>
                                <Link to={`/manage-users/update/${user.id}`} className="btn btn-success">
                                    <FontAwesomeIcon icon={faPenAlt} />
                                </Link>
                                <button onClick={() => submitDelete(user.id)} className="btn btn-danger">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ManageUsers;