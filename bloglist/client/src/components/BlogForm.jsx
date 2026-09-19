import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useBlogActions } from "../blogStore";

const BlogForm = () => {
	const { add } = useBlogActions();

	const navigate = useNavigate();

	const addBlog = (event) => {
		event.preventDefault();
		const title = event.target.title.value;
		const author = event.target.author.value;
		const url = event.target.url.value;
		add({
			title: title,
			author: author,
			url: url,
		});
		event.target.reset();
		navigate("/");
	};

	return (
		<form onSubmit={addBlog}>
			<h2>create new</h2>
			<TextField name="title" label="title" />
			<br />
			<TextField name="author" label="author" style={{ marginTop: 10 }} />
			<br />
			<TextField name="url" label="url" style={{ marginTop: 10 }} />
			<br />
			<Button type="submit" variant="contained" style={{ marginTop: 10 }}>
				create
			</Button>
		</form>
	);
};

export default BlogForm;
