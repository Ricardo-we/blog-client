import 'bootswatch/dist/cosmo/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ManagePosts from  './views/blog-admin/components/ManagePosts';
import Login from './views/blog-admin/components/Login';
import CreateUser from './views/blog-admin/components/CreateUser';
import UpdatePostForm from './views/blog-admin/forms/UpdatePostForm';
import ManageUsers from './views/blog-admin/components/ManageUsers';
import Homepage from './views/blog-views/Homepage';
import PostDetail from './views/blog-views/PostDetail';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* ADMIN */}
				<Route path='/login' element={<Login/>}/>
				<Route path='/create-user' element={<CreateUser/>}/>
				<Route path='/manage-posts/:username' element={<ManagePosts/>}/>
				<Route path='/manage-posts/update/:id' element={<UpdatePostForm/>}/>
				<Route path='/manage-users/:username' element={<ManageUsers/>}/>
				<Route path='/manage-users/update/:id' element={<ManagePosts/>}/>
				{/* VIEWS */}
				<Route path='/' element={<Homepage/>}/>
				<Route path='/:pageNum' element={<Homepage/>}/>
				<Route path='post-details/:postid' element={<PostDetail/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
export const APIURL = 'http://localhost:8000';