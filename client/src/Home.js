import React from "react";
import NavBar from "./components/NavBar";


export default function Home() {
    return (
        <div >
            <h1>Home Page</h1>
            <NavBar/>
            <ul style={{textAlign: "left"}}>
                <li>Counter <br/>
                    <ul>
                        <li>Simple couter</li>
                        <li>Payload repare</li>
                        <li>Async couter</li>
                    </ul>
                </li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    )
}