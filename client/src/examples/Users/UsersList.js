import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectAllUsers, fetchUsers } from "./userSlice";

export const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const usersStatus = useSelector(state => state.users.status);

    useEffect(() => {
        console.log("UsersList useEffect at status: ", usersStatus);
        if (usersStatus === "idle") {
            dispatch(fetchUsers())
        }
    }, [usersStatus, dispatch])


    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
    ));

    return (
        <section>
            <h2>Users</h2>
            
            <ul>{renderedUsers}</ul>
        </section>
    )
}