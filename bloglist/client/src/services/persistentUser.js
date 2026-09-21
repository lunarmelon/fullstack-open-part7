const getUser = () => {
	const userJSON = window.localStorage.getItem("loggedBlogappUser");
	return userJSON;
};

const saveUser = (user) => {
	window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
};

const removeUser = () => {
	window.localStorage.removeItem("loggedBlogappUser");
};

export default { getUser, saveUser, removeUser };
