import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotifications = createAsyncThunk("notifications/fetchNotifications", async (_, {getState}) => {
    const notifications = selectAllNotifications(getState());
    const [latestNotification] = notifications;
    const latestTimestamp = latestNotification ? latestNotification.date : "";
    const response = await axios.get(`/postexample/notifications?since=${latestTimestamp}`);

    return response.data;
});

const notificationSlice = createSlice({
    name: "notifications",
    initialState: [],
    reducers: {
        allNotificationsRead: (state, action) => {
            state.forEach(notification => {
                notification.read = true;
            })
        }
    },
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            state.forEach(notification => {
                notification.isNew = !notification.read;
            })
            state.push(...action.payload);
            state.sort((a, b) => b.date.localeCompare(a.date))
        }
    }
});

export default notificationSlice.reducer;

export const { allNotificationsRead } = notificationSlice.actions;

export const selectAllNotifications = state => state.notifications;