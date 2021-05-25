//Import react library and require react functionality
import React, {Fragment, useState, useEffect} from 'react';

import {Link} from "react-router-dom";

import CurrencyInput from '../utils/CurrencyInput'

//import NumericInput from 'react-numeric-input';

//Import Toastify
import {toast} from "react-toastify";

//import axios from 'axios';


const AddItem = ({setAuth}) => {
    const [name, setName] = useState("");

    const [photo, setPhoto] = useState(null);
    const [imgData, setImgData] = useState(null);
    
    const [inputs, setInputs] = useState({
        product_name: "",
        product_desc: "",
        product_price: "$0.00",
        product_quantity: 0
    });
   
    const {product_name, product_desc, product_price, product_quantity } = inputs; 

    const onChange = e => {
            setInputs({...inputs, [e.target.name]: e.target.value });
    };

    const onChangePicture = e => {
        if (e.target.files[0]) {
          console.log("picture: ", e.target.files);
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            setImgData(reader.result);
            setPhoto(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);
        }
      };


    async function getName() {
        try {
            const response = await fetch("http://localhost:5000/add/",{
                method: "GET",
                headers: {token: localStorage.token }
            });

            const parseRes = await response.json();
            
            setName(parseRes.user_name);
        } catch (err) {
            console.error(err.message);
        }
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { photo, product_name, product_desc, product_price, product_quantity }
            console.log(body);
            const response = await fetch("http://localhost:5000/add/submit", {
                method: "POST",
                headers: {"token": localStorage.token, "Content-Type" : "application/json" },
                body: JSON.stringify(body)
            });

        const parseRes = await response.json();

            if(parseRes.id) {
                toast.success("Item inserted with id: " + parseRes.id)
            } else {
                setAuth(false)
                toast.error(parseRes);
                //console.error(parseRes);
            }
         
        } catch (err) {
            console.error(err.message);
        }
    };

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logout Successfully");
    };

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
            <h1>Add New Grocery Item</h1>
            <form>
                <img className="form-control my-3" src={imgData} style={{height: "120px", width: "120px"}} alt="preview" />
                <input className="form-control my-3" type="file" name="product_image" autoComplete="off" accept=".jpeg, .png, .jpg" onChange={e => onChangePicture(e)}/>
                <input className="form-control my-3" type="product_name" name="product_name" placeholder="product_name"  autoComplete="off" value={product_name} onChange={e =>onChange(e)}/>
                <input className="form-control my-3" type="product_desc" name="product_desc" placeholder="product_desc" autoComplete="off" value={product_desc} onChange={e =>onChange(e)}/>
                <CurrencyInput className="form-control my-3" type="product_price" name="product_price" placeholder="product_price" autoComplete="off" value={product_price} onChange={e =>onChange(e)} />
                <input className="form-control my-3" type="number" name="product_quantity" placeholder="product_quantity" autoComplete="off" value={product_quantity} onChange={e =>onChange(e)}/>
                <button className="btn btn-success btn-block" onClick={onSubmitForm}>Submit</button>
            </form>
        </Fragment>
    );
};

export default AddItem;