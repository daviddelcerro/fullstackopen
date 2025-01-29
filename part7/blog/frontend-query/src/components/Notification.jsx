import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const Notification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  if (notification === null || notification.message === null) {
    return null;
  }
  const message = notification.message;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: notification.color,
  };

  return (
    <div className="notification" data-testid="notification" style={style}>
      {message}
    </div>
  );
};

export default Notification;
