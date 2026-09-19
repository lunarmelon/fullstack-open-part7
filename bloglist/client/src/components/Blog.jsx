import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useBlogActions } from "../blogStore";

const Blog = ({ blog, user }) => {
	const id = useParams().id;
	const { like, remove } = useBlogActions();
	const navigate = useNavigate();

	if (!blog) {
		return null;
	}

	const isCreator = user?.id === blog.user || user?.id === blog.user?.id;

	const deleteBlog = (event) => {
		event.preventDefault();
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			remove(id);
			navigate("/");
		}
	};

	return (
		<div className="blog">
			<Card variant="outlined" sx={{ marginTop: 1 }}>
				<CardContent>
					<Typography variant="h4">{blog.title}</Typography>
					<p>by {blog.author}</p>
					<p>
						<a href={blog.url}>{blog.url}</a>
					</p>
					<p>Added by {blog?.user?.name}</p>
					{blog.likes} likes
					{user && (
						<Button
							color="inherit"
							onClick={() => like(blog.id)}
							sx={{
								color: "blue",
								borderColor: "blue",
								borderWidth: 1,
								borderRadius: "5px",
								borderStyle: "solid",
								margin: 1,
							}}
						>
							like
						</Button>
					)}
					{isCreator && user && (
						<Button
							onClick={deleteBlog}
							sx={{
								color: "red",
								borderColor: "red",
								borderWidth: 1,
								borderRadius: "5px",
								borderStyle: "solid",
								margin: 1,
							}}
						>
							remove
						</Button>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default Blog;
