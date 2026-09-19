import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import { useBlogActions, useBlogs } from "./blogStore";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { useNotificationsActions } from "./notificationStore";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const blogs = useBlogs();
	const { initialize } = useBlogActions();
	const { setNotification } = useNotificationsActions();
	const navigate = useNavigate();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
		initialize();
	}, [initialize]);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
			navigate("/");
			setNotification(`${user.name} logged in`, "success");
			setTimeout(() => {
				setNotification(null, null);
			}, 5000);
		} catch {
			setNotification("wrong credentials", "error");
			setTimeout(() => {
				setNotification(null, null);
			}, 5000);
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault();
		window.localStorage.removeItem("loggedBlogappUser");
		setUser(null);
		blogService.setToken(null);
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
					<Route
						path="/login"
						element={
							!user && (
								<LoginForm
									handleLogin={handleLogin}
									username={username}
									password={password}
									handleUsername={({ target }) => setUsername(target.value)}
									handlePassword={({ target }) => setPassword(target.value)}
								/>
							)
						}
					/>
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
