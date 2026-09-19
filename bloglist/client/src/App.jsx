import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { useEffect } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { useBlogActions, useBlogs } from "./blogStore";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { useUser, useUserActions } from "./userStore";

const App = () => {
	const blogs = useBlogs();
	const user = useUser();
	const { initialize } = useBlogActions();
	const { initializeUser, logout } = useUserActions();
	const navigate = useNavigate();

	useEffect(() => {
		initializeUser();
		initialize();
	}, [initializeUser, initialize]);

	const handleLogout = async (event) => {
		event.preventDefault();
		await logout();
		navigate("/login");
	};

	const match = useMatch("/blogs/:id");
	const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;

	const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };

	return (
		<Container>
			<AppBar position="static">
				<Toolbar>
					<Button color="inherit" component={Link} to="/" sx={style}>
						blogs
					</Button>
					{!user && (
						<Button color="inherit" component={Link} to="/login" sx={style}>
							login
						</Button>
					)}
					{user && (
						<Button color="inherit" component={Link} to="/create" sx={style}>
							new blog
						</Button>
					)}
					{user && (
						<Button color="inherit" onClick={handleLogout} sx={style}>
							logout
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Notification className="notification" />
			<ErrorBoundary>
				<Routes>
					<Route path="/*" element={<h1>404 - Page not found</h1>} />
					<Route path="/create" element={<BlogForm />} />
					<Route path="/blogs/:id" element={<Blog blog={blog} user={user} />} />
					<Route path="/login" element={!user && <LoginForm />} />
					<Route
						path="/"
						element={
							<div className="bloglist">
								<BlogList blogs={blogs} user={user} />
							</div>
						}
					/>
				</Routes>
			</ErrorBoundary>
		</Container>
	);
};

export default App;
