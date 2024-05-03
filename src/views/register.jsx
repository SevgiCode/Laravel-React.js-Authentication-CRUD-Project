// import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/contextprovider";

export default function Register() {
    // Renamed component to start with an uppercase letter
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const handleSubmit = (ev) => {
        // Renamed Submit to handleSubmit for consistency
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Create A New Account</h1>
                <form onSubmit={handleSubmit}>
                    <input ref={nameRef} type="name" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Have An Account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
