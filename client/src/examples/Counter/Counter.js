import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increase, reset, increaseByText, increaseAsync } from "./counterSlice";

import NavBar from "../../components/NavBar"

export function Counter() {
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();
    const [text, setText] = useState("one");
    const [delay, setDelay] = useState(0);

    return (
        <div>
            <NavBar />
            <h2>Counter Value: {counter.value}</h2>
            <button onClick={ () => dispatch(increase())}>Increase</button><br/><br/>
            <button onClick={ () => dispatch(reset()) }>Reset</button><br/><br/>
            add by text: <select name="counter2Input" id="counter2" value={text} onChange={ (e) => {setText(e.target.value)}}>
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="three">Three</option>
            </select>
            <button onClick={ () => dispatch(increaseByText(text))}>submit</button><br/><br/>
            async increase: delay: 
            <input type="number" value={delay} onChange={e => setDelay(e.target.value)} min={0}/>
            <button onClick={() => dispatch(increaseAsync(delay))}>submit</button><br/><br/>
            <h3>Status: {counter.status}</h3>
        </div>
    )
}