import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increase, reset } from "./counterSlice";

import NavBar from "../../components/NavBar"

export function Counter() {
    const counter = useSelector(state => state.counter.value);
    const dispatch = useDispatch();

    return (
        <div>
            <NavBar />
            <h2>Counter Value: {counter}</h2>
            <button onClick={ () => dispatch(increase())}>Increase</button>
            <button onClick={ () => dispatch(reset()) }>Reset</button>
        </div>
    )
}