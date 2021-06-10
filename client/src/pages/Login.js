import React, { useState, useRef } from "react";
import API from "../utils/API";
import setAuthToken from "../utils/setAuthToken";
import setAuthUser from "../utils/setAuthUser";

function Login() {

    // const [logUser, setLogin] = useState({
    //     email: "",
    //     password: "",
    // });

    const emailRef = useRef();
    const passwordRef = useRef();

    const submitLogin = (e) => {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        //console.log(user);

        API.loginUser(user).then(response => {
            if (response.status === 200) {
                setAuthToken(response.data.token);
                setAuthUser(response.data.user);
                window.location.replace("/dashboard");
                API.getDash()
                //.then(response => console.log(response));
            }
        });
    }



    return (


        // <div className="row" >
        //     <form onSubmit={e => submitLogin(e)} className="col-md-6 offset-md-3 bodyPad">

        //         <h1>Login</h1>
        //         <p>Please sign up below:</p>

        //         <div className="mb-3">

        //             <label for="email" className="form-label">Email Address</label>
        //             <input type="email" className="form-control" id="email"
        //                 placeholder="name@example.com" ref={emailRef} />

        //             <label for="password" className="form-label">Password</label>
        //             <input type="password" className="form-control" id="password" ref={passwordRef} />
        //             <button className="btn btn-primary" type="submit">Login</button>
        //         </div>
        //     </form>
        // </div>

        <div>
            <div className="w-full">
                <div className="relative h-screen bg-red-light mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24">
                    <form className="relative bg-white shadow-md w-full md:w-1/2 rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
                                Email
                        </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="name@email.com" ref={emailRef} />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                                Password
                        </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="*******" ref={passwordRef} />
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-white transition duration-300 btn-shadow ease-in-out font-bold transform hover:scale-110 mx-3 py-2 px-4 rounded border" type="submit">Login</button>
                        </div>
                    </form>
                </div>


            </div>
        </div>

    );
}


export default Login;