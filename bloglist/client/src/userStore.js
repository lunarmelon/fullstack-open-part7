import { create } from "zustand";
import useNotificationStore from "./notificationStore";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/persistentUser";

const useUserStore = create((set, get) => ({
	user: null,
	actions: {
		login: async (username, password) => {
			const { setNotification } = useNotificationStore.getState().actions;
			try {
				const user = await loginService.login({ username, password });
				userService.saveUser(user);
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
			userService.removeUser();
			set(() => ({ user: null }));
			await blogService.setToken(null);
		},
		initializeUser: () => {
			const loggedUserJSON = userService.getUser();
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
