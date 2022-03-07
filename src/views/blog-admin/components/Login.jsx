import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import submitCheckUser from "../../libs/UsersRequets";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gmail, setGmail] = useState('');
    const navigate = useNavigate();

    const submitForm = async e => {
        e.preventDefault();
        const response = await submitCheckUser(username, password, gmail);
        sessionStorage.setItem('username', username);
        navigate(`/manage-posts/${username}`);
    }

    return ( 
        <div className="container-sm">
            <form className="form" onSubmit={submitForm} style={{width: '60vw', height: '300px', margin: '100px auto'}}>
                <h1 className="text-center">Login</h1>
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
                    LOGIN
                </button>
                <Link to='/create-user'>Doesnt have an account? Sign up!</Link>
            </form>
        </div>
    );
}

export default Login;