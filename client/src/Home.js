import React from "react";
import NavBar from "./components/NavBar";


export default function Home() {
    return (
        <div >
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