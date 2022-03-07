import { useState } from "react";
import '../../../css/SideBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function SideBar() {
    const [navVisible, setNavVisible] = useState(false)
    const username = sessionStorage.getItem('username');

    return ( 
        <>
            <button className="btn btn-link open-nav-btn" onClick={() => setNavVisible(true)}>
                <FontAwesomeIcon icon={faBars}/>
            </button>
            <div className={navVisible?'sidebar nav-open':'sidebar'}>
                <button className="btn btn-link close-nav-btn" onClick={() => setNavVisible(false)}>
                    <FontAwesomeIcon icon={faClose}/>
                </button>

                <Link className="btn btn-primary navbar-link" style={{marginTop: '30px'}} to={`/manage-posts/${username}`}>
                    Posts
                </Link>
                <Link className="btn btn-primary navbar-link" to={`/manage-users/${username}`}>
                    Users
                </Link>
            </div>
        </>
    );
}

export default SideBar;