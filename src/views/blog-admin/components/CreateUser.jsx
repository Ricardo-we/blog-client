import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { submitCreateUser } from "../../libs/UsersRequets";

function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gmail, setGmail] = useState('');
    const navigate = useNavigate();

    const submitForm = async e => {
        e.preventDefault();
        const response = await submitCreateUser(username, password, gmail);
        sessionStorage.setItem('username', username);
        navigate(`/manage-posts/${username}`);
    }

    return ( 
        <div className="container-sm">
            <form className="form" onSubmit={submitForm} style={{width: '60vw', height: '300px', margin: '100px auto'}}>
                <h1 className="text-center">Create user</h1>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="username" 
                    onChange={e => setUsername(e.target.value)}
                />
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="password" 
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="gmail" 
                    onChange={e => setGmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
                    CREATE
                </button>
                <Link to='/login'>Already have an account? Login!</Link>
            </form>
        </div>
    );
}

export default CreateUser;