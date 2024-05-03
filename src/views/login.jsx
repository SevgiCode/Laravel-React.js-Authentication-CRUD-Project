import { useRef } from "react";
import { useStateContext } from "../contexts/contextprovider";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function Login() {
    // Renamed component to start with an uppercase letter
    const emailRef = useRef();
    const passwordRef = useRef();

    const { setUser, setToken } = useStateContext();

    const handleSubmit = (ev) => {
        // Renamed Submit to handleSubmit for consistency
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
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
                <h1 className="title">Login To Your Account</h1>
                <form onSubmit={handleSubmit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/register">Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
