import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserActions } from "../userStore";

const LoginForm = () => {
	const { login } = useUserActions();
	const navigate = useNavigate();

	const handleLogin = (event) => {
		event.preventDefault();
		const username = event.target.username.value;
		const password = event.target.password.value;
		login(username, password);
		navigate("/");
		event.target.reset();
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<TextField name="username" label="username" />
				</div>
				<div>
					<TextField
						name="password"
						label="password"
						style={{ marginTop: 10 }}
					/>
				</div>
				<Button type="submit" variant="contained" style={{ marginTop: 10 }}>
					login
				</Button>
			</form>
		</div>
	);
};

export default LoginForm;
