import React from "react";
import { Link } from "react-router-dom";
import { examples } from "../examples";

import { useDispatch } from "react-redux";
import { fetchNotifications } from "../examples/Notifications/notificationSlice";

export default function NavBar() {
    const dispatch = useDispatch();
    const links = [];
    const style = {
        width: "fit-content",
        borderRight: "1px black solid",
        padding: 5,
        margin: 5,
    }
    let index = 0;
    for (let name in examples) {
        links.push(
            <div key={index} style={style}>
                <Link to={`/${name.toLowerCase()}`}>{name}</Link>
            </div>
        )
        index += 1;
    }

    return (
        <div style={{background: "lightgrey", display: "flex"}}>
            {links}
            <button onClick={() => dispatch(fetchNotifications())}>Refresh Notifications</button>
        </div>
    )
}