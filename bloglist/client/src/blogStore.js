import { useMemo } from "react";
import { create } from "zustand";
import blogService from "./services/blogs";

const useBlogStore = create((set, get) => ({
	blogs: [],
	actions: {
		add: async (content) => {
			const newBlog = await blogService.create(content);
			set((state) => ({ blogs: state.blogs.concat(newBlog) }));
		},
		like: async (id) => {
			const blog = get().blogs.find((b) => b.id === id);
			const updated = await blogService.update(id, {
				...blog,
				likes: blog.likes + 1,
				user: blog.user._id,
			});
			set((state) => ({
				blogs: state.blogs.map((b) => (b.id === id ? updated : b)),
			}));
			get().actions.initialize();
		},
		remove: async (id) => {
			await blogService.remove(id);
			set((state) => ({
				blogs: state.blogs.filter((b) => b.id !== id),
			}));
		},
		initialize: async () => {
			const blogs = await blogService.getAll();
			set(() => ({ blogs }));
		},
	},
}));

export const useBlogs = () => {
	const blogs = useBlogStore((state) => state.blogs);
	const sortedBlogs = useMemo(
		() => [...blogs].sort((a, b) => b.likes - a.likes),
		[blogs],
	);

	return sortedBlogs;
};

export const useBlogActions = () => useBlogStore((state) => state.actions);
