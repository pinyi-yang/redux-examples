import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./userSlice";

export const AddUserForm = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();

    const onNameChanged = (e) => setName(e.target.value);
    const onSaveUserClicked = () => dispatch(addUser(name));

    return (
        <section>
            <h2>Add a New User</h2>
            <label htmlFor="userName">User Name: </label>
            <input type="text" 
                id="userName"
                name="userName"
                value={name}
                onChange={onNameChanged}
            />
            <button type="button" onClick={onSaveUserClicked} disabled={!name}>Save User</button>

        </section>
    )
}