import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/CreateProduct.css";
import swal from 'sweetalert';
import { NavAdmin } from "./navAdmin";

import {
  getAllBrands,
  getAllTypes,
  createProduct,
} from "../redux/actions/ProductActions";
import { useNavigate } from "react-router-dom";

function validate(input) {
    let errors = {};
    const regexName = /^[A-Za-z0-9\s]+$/g;
    

    if (input.name && !regexName.test(input.name)) {
        errors.name = "can't include special characters or numbers";
    }
    if (!input.name) {
        errors.name = "Name is required";
    }
    if (input.name.length > 35) {
        errors.name = "Max 35 characters";
    }
    if (input.name.length < 6) {
        errors.name = "Min 6 characters";
    }
    
    if (!input.description) {
        errors.description = "Description is required";
    }
    
    if (input.description.length < 10) {
        errors.description = "Min 10 characters";
    }
    if (isNaN(input.stock)) 
        errors.stock= "Stock has to be a number"

    if(!input.stock) 
        errors.stock="Stock is required";
    if(input.stock < 1 || input.stock > 1000) 
        errors.stock="Stock from 1 to 1000";
  
    if (!input.price) {
        errors.price = "Price is required";
    }
    
    if(!input.type.length){
        errors.type = 'Place the name of a type and select the same'    
    }
    if(!input.brand.length){
        errors.brand = 'Place the name of a brand and select the same'    
    }
    return errors;
}

export const CreateProducts = () => {
    
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const brands = useSelector((state) => state.brands);
    const types = useSelector((state) => state.types);

    useEffect(() => {
        dispatch(getAllBrands());
        dispatch(getAllTypes());
    }, [dispatch]);



    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        image: "",
        price: "",
        description: "",
        stock: 1,
        brand: [],
        type: [],
        info_adicional:{ "socket" : ""}
    });

    const handleChange = (e) => {
        
        setErrors( validate({ ...input, [e.target.name]: e.target.value}));
        setInput({...input, [e.target.name]: e.target.value});
        console.log(input)
    }
    const handleChangeImage =(e) => {
        setInput({ ...input, image: e.target.files[0]})
    }

    const handleSocketChange = (event) => {
        const { value } = event.target;
        console.log(value)
        setInput((input) => ({
          ...input,
          "info_adicional": {"socket": value},
        }));
        console.log(input, 'ACA ESTA EL INPUT MOTHERBOARD O PROCESS')
    };
    
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!input.name || !input.image || !input.price || !input.description || !input.type.length || !input.brand.length) {
            return swal('Cannot create product', '', 'error')
        } else {
            
            const data = new FormData()
            data.append("name", input.name)
            data.append("image", input.image)
            data.append("price", input.price)
            data.append("description", input.description)
            data.append("brand", input.brand)
            data.append("type", input.type)
            data.append("stock", input.stock)
            data.append("info_adicional", input.info_adicional.socket)
            
            setErrors(validate(input))
            dispatch(createProduct(data));
            console.log(data)
            swal('Created product', "", 'success');
            setInput({
                name: "",
                image: "",
                price: "",
                description: "",
                stock: 1,
                brand: [],
                type: [],
                info_adicional:{ "socket" : ""}
            });
            navigate('/Products')
        }
    }

    const [typeInput, setTypeInput] = useState('');
    const [brandInput, setBrandInput] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');

    const handleChangeStock = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: name === "stock" ? parseInt(value) : value,
          });
    }


    return (
        <div>
  <NavAdmin />
        <div className="container">
             <NavAdmin />           
            <div className='containerForm'>
            <h1 className='title'>Create Product</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='name'>
                        <label className='nameLabel'>Name Product</label>
                        <input className='input' type='text' value={input.name} name='name' placeholder="Name Product" onChange={(e) => handleChange(e)} required={true}></input>                   
                        {errors.name && (<p className='spanError'>{errors.name}</p>)}
                    </div>


                    <div className='name'>
                        <label className='nameLabel'><i className="bi bi-image-fill"></i> Image</label>
                        <input className='input' type='file' name= 'image' placeholder="Image Product" onChange={(e) => handleChangeImage(e)} required={true}></input>                   
                    </div>


                    <div className='name'>
                        <label className='nameLabel'>Price</label>
                        <input className='input' type='number' value={input.price} min="1" name = 'price' placeholder="Price" onChange={(e) => handleChange(e)} required={true}></input>                  
                        {errors.price && (<p className='spanError'>{errors.price}</p>)}
                    </div>
                    <div className='name'>
                        <label className='nameLabel'>Description</label>
                        <textarea style={{height: "100px"}} className='input' name='description' placeholder="Description" onChange={(e) => handleChange(e)} required={true}></textarea>                 
                        {errors.description && (<p className='spanError'>{errors.description}</p>)}
                    </div>

                    <div className='name'>
                        <label className='nameLabel'>Stock</label>
                        <input className='input' type='number' value={input.stock} min="1" max="1000" name = 'stock' placeholder="Stock" onChange={(e) => handleChangeStock(e)} required={true}></input>                  
                        {errors.stock && (<p className='spanError'>{errors.stock}</p>)}
                    </div>
                    <div>
                        <div className='name'>
                            <label className='nameLabelMap'>New Type</label>
                            <div className="ContainerTypeBrand">
                                <input className='inputNew' type='text' value={typeInput} name='type' placeholder="Type Name" onChange={(e) => setTypeInput(e.target.value)}></input> 
                                <select className='selectName' name='type' placeholder="Select Type" onChange={e=>handleChange(e)} required={true}defaultValue="">
                                    <option value="" disabled>Select Type</option>
                                    {types && types.map((type, index) => (
                                        <option key={index} value={type.name}>{type.name}</option>
                                        ))}
                                    {typeInput && <option value={typeInput}>{typeInput}</option>}
                                </select>
                                {errors.type && (<p className='spanSError'>{errors.type}</p>)}
                            </div>
                        </div>
                        <div className='name'>
                            <label className='nameLabelMap'>New Brand</label>
                            <div className="ContainerTypeBrand">
                                <input className='inputNew' type='text' value={brandInput} name='brand' placeholder="Brand Name" onChange={(e) => setBrandInput(e.target.value)}></input> 
                                <select className='selectName' name='brand' placeholder="Select Brand" onChange={e=>handleChange(e)} required={true} defaultValue="">
                                    <option value="" disabled>Select Brand</option>
                                    {brands && brands.map((brand, index) => (
                                        <option key={index} value={brand.name}>{brand.name}</option>
                                    ))}
                                    {brandInput && <option value={brandInput}>{brandInput}</option>}
                                </select>
                                {errors.brand && (<p className='spanSError'>{errors.brand}</p>)}
                            </div>
                        </div>
                    </div>

                    {(input.type === "Processor" || input.type === "Motherboard") && 
                        <div className="name">
                            <label className="nameLabel">Socket</label>
                            <input  className="input" type="text" name="socket" value={input.info_adicional.socket} onChange={(e) => handleSocketChange(e)} />
                        </div>
                    }
                    
                    <button className='buttonCrear' type="submit">Create Product</button>                          
                </form>
            </div>                  
        </div>
                                        </div>
    );
};