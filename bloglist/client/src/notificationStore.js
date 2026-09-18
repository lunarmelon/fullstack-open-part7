import { create } from "zustand";

const useNotificationStore = create((set) => ({
	message: null,
	type: null,
	actions: {
		setNotification: (message, type) =>
			set(() => ({ message: message, type: type })),
	},
}));

export const useNotificationsActions = () =>
	useNotificationStore((state) => state.actions);
export const useNotificationMessage = () =>
	useNotificationStore((state) => state.message);
export const useNotificationType = () =>
	useNotificationStore((state) => state.type);
