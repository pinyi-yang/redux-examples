import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increase, reset } from "./counter2Slice";

import NavBar from "../../components/NavBar"

export function Counter2() {
    const counter = useSelector(state => state.counter2.value);
    const dispatch = useDispatch();
    const [text, setText] = useState("one");

    return (
        <div>
            <h2>Counter Value: {counter}</h2>
            add: <select name="counter2Input" id="counter2" value={text} onChange={ (e) => {setText(e.target.value)}}>
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="three">Three</option>
            </select>
            <button onClick={ () => dispatch(increase(text))}>submit</button><br/>
            <button onClick={ () => {
                    dispatch(reset());
                    setText("one");
                } }
            >Reset</button>
        </div>
    )
}