//Import react library and require react functionality
import React, {Fragment, useState, useEffect} from 'react';

import {Link} from "react-router-dom";

//Import Toastify
import {toast} from "react-toastify";


const Listing = ({setAuth}) => {
    const [name, setName] = useState("");

    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/listing/",{
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await response.json();
            
            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    }

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logout Successfully");
    }

    useEffect(() => {
        getName();
    },[]);

    return(
        <Fragment>
            <div>
                <Link style={{marginRight: '10px'}} to="/add">Add Product</Link>
            <div style={{float: 'right'}}>
                <h5 style={{float: 'left', marginTop: '5px' , marginRight: '10px'}}>Welcome {name}</h5>
                <button className="btn btn-primary" onClick={e => logout(e)}>Logout</button>
            </div>
            </div>
            <h1>Grocery Stock List</h1>

        </Fragment>
    );
};

export default Listing;