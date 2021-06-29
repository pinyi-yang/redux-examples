import React from "react";

import { useSelector } from "react-redux";
import { selectAllNotifications, allNotificationsRead } from "./notificationSlice";
import { selectAllUsers } from "../Users/userSlice";

export const NotificationsList = () => {

    const notifications = useSelector(selectAllNotifications);
    const users = useSelector(selectAllUsers);

    const renderedNotifications = notifications.map(notification => {
        const date = notification.date.toLocaleString();
        const user = users.find(user => user.id === notification.user) || {name: "Unknown User" };

        return (
            <div key={notification.id} className="notification">
                <div>
                    <b>{user.name}</b> {notification.message}
                </div>
                <div title={notification.date}>
                    <i>{date}</i>
                </div>
            </div>
        )
    });

    return (
        <section className="notificationsList">
            <h2>Notifications</h2>
            {renderedNotifications}
        </section>
    )
}