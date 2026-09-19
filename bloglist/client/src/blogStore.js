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
