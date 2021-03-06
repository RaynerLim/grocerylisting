//Import react library and require react functionality
import React, { Fragment, useState } from 'react';
import {Link} from "react-router-dom";

//Import Toastify
import {toast} from "react-toastify";

const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    const {email, password, name} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] :e.target.value})
    };

    const onSubmitForm = async(e) => {
        //Prevent refreshing of page on submit of data
        e.preventDefault()
        
        try {
            const body = {email, password, name};

            const response = await fetch("http://localhost:5000/auth/register",{
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if(parseRes.token){
                localStorage.setItem("token", parseRes.token)
                setAuth(true);
                toast.success("Registered Successfully");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
        } catch (err) {
            console.error(err.message)
        }

    }

    return(
        <Fragment>
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={onSubmitForm}>
                <input className="form-control my-3" type="text" name="name" placeholder="name"  autoComplete="off" value={name} onChange={e => onChange(e)} />
                <input className="form-control my-3" type="email" name="email" placeholder="email"  autoComplete="off" value={email} onChange={e => onChange(e)} />
                <input className="form-control my-3" type="password" name="password" placeholder="password"  autoComplete="off" value={password} onChange={e => onChange(e)} />
                <button className="btn btn-success btn-block">Submit</button>
            </form>
            <Link to="/login">Login</Link>
        </Fragment>
    );
};

export default Register;