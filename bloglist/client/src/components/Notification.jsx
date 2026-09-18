import { Alert } from "@mui/material";
import {
	useNotificationMessage,
	useNotificationType,
} from "../notificationStore";

const Notification = () => {
	const message = useNotificationMessage();
	const type = useNotificationType();

	if (message === null && type === null) {
		return null;
	}

	return (
		<Alert style={{ marginTop: 10, marginBottom: 10 }} severity={type}>
			{message}
		</Alert>
	);
};

export default Notification;
