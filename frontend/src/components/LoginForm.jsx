import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/LoginForm.css";
import LoadingIndicator from "./LoadingIndicator";

function LoginForm({route, method}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";
    const altname = method === "login" ? "Register" : "Login"
    const alttext = method === "login" ? "Don't have an account?" : "Already have an account?"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        //will prevent reloading the page/ submitting the form???

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    const handleAltButtonClick = () => {
        if (method === "login") {
            navigate("/register")
        } else {
            navigate("/login")
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
            {name}
        </button>
        <p className="form-text">{alttext}</p>
        <button className="form-altbutton" onClick={handleAltButtonClick}>{altname}</button>
    </form>
}

export default LoginForm