import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";
import { useUserActions } from "../userStore";

const LoginForm = () => {
	const username = useField("text");
	const password = useField("password");
	const { login } = useUserActions();
	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		await login(username.value, password.value);
		username.onReset();
		password.onReset();
		navigate("/");
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<TextField
						type={username.type}
						value={username.value}
						onChange={username.onChange}
						label="username"
					/>
				</div>
				<div>
					<TextField
						type={password.type}
						value={password.value}
						onChange={password.onChange}
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
