import { Link } from "react-router-dom";
import { useBlogs } from "../blogStore";

const BlogList = () => {
	const blogs = useBlogs();

	return (
		<div>
			<h1>Blogs</h1>
			<ul>
				{blogs.map((blog) => (
					<li key={blog.id}>
						<Link to={`/blogs/${blog.id}`}>
							{blog.title} by {blog.author}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default BlogList;
