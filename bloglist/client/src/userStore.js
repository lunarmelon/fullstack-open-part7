import { create } from "zustand";
import useNotificationStore from "./notificationStore";
import blogService from "./services/blogs";
import loginService from "./services/login";

const useUserStore = create((set, get) => ({
	user: null,
	actions: {
		login: async (username, password) => {
			const { setNotification } = useNotificationStore.getState().actions;
			try {
				const user = await loginService.login({ username, password });
				window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
				await blogService.setToken(user.token);
				set(() => ({
					user: user,
				}));
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
		},
		logout: async () => {
			window.localStorage.removeItem("loggedBlogappUser");
			set(() => ({ user: null }));
			await blogService.setToken(null);
		},
		initializeUser: () => {
			const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
			if (loggedUserJSON) {
				const user = JSON.parse(loggedUserJSON);
				set(() => ({ user: user }));
				blogService.setToken(user.token);
			}
		},
	},
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
