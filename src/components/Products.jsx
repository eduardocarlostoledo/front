import "../styles/Products.css";
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector, useNavigate } from "react-redux";
import { filterByBrands, filterByPrice, filterByType, getAllBrands, getAllProducts, getAllProductsName, getAllTypes } from "../redux/actions/ProductActions";
import Card from '../components/Card'
import {Marcas} from '../components/Marcas'
import Paginado from "./Paginado";

export const Products = () => {
    const dispatch = useDispatch()
    const product = useSelector((state) => state.products)
    const brand = useSelector((state) => state.brands)
    const type = useSelector((state) => state.types)
    // const navigate = useNavigate();
    
    useEffect(() => {
      dispatch(getAllProducts())
      dispatch(getAllBrands())
      dispatch(getAllTypes())
    },[dispatch]);

    // useEffect(() => {
    //     const isAuthenticated = localStorage.getItem('isAuthenticated');
    //     if (isAuthenticated === "afuera") {
    //       navigate('/login');
    //     }
    //   }, [navigate]);

    const [currentPage, setCurrentPage] = useState(1)
    const [charactersPerPage, ] = useState(9) //setCharactersPerPage
    const indexOfLastCharacter = currentPage * charactersPerPage
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
    const currentProducts = product.slice(indexOfFirstCharacter, indexOfLastCharacter)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

             /* search */

    const [name, setName] = useState('')
    
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
        setCurrentPage(1);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getAllProductsName(name))
        setCurrentPage(1);
    }

    /* Click que trae todos los productos de nuevo */

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getAllProducts());
    }

    const handleFilterBrands = (e) => {
        dispatch(filterByBrands(e.target.value))
        setCurrentPage(1)
    }

    /* Filtrado por Types */
    const handleFilterTypes = (e) => {
        dispatch(filterByType(e.target.value))
        setCurrentPage(1) 
       
    }

    /* Filtrado por precio */

    const [,setPrice] = useState('')
    const handleFilterPrice = (e) => {
        dispatch(filterByPrice(e.target.value));
        setCurrentPage(1);
        setPrice(`Price ${e.target.value}`)
    }

    return (
        <div className="DivProducts">
            <div className="Products">
                <div className="DivCardsFilters">
                    <div className="DivFilter">
                        <h2>Filters</h2>
                        <button className="Todos" onClick={(e) => handleClick(e)}>Reload all Products</button>
                        <div className="SearchButton" id="InputB">
                            <input className='InputB' type='text' placeholder="Search..." onChange={(e) => handleInputChange(e)}/> 
                            <button className='SubmitB' type="submit" onClick={(e) => handleSubmit(e)}> < HiMagnifyingGlass className="icon"/></button>
                        </div>
                        <div className="ContainerFilters">
                            
                            <select id="filterBrandsSelect" className="Filter" onChange={(e) => handleFilterBrands(e)}>
                                <option value="All" defaultValue='default'>All Brands</option>
                                {brand.map((b, index) => ( 
                                    <option key={index} type="reset" value={b.name}>{b.name}</option>
                                ))}
                            </select>
                            
                            <select id="filterTypesSelect" className="Filter" onChange={(e) => handleFilterTypes(e)}>
                                <option value="All" defaultValue='default'>All Types</option>
                                {type.map((t, index) => {
                                    return <option key={index} value={t.name}>{t.name}</option>
                                })} 
                            </select>
                            
                            <select id="filterPriceSelect" className="Filter" onChange={(e) => handleFilterPrice(e)}>
                                <option value="all" disabled={true}>All price</option>
                                <option value="ASC">Lower price</option>
                                <option value="DES">Higher price</option>
                            </select>
                        </div>
                    </div>
                    
                
                    <div className="CardContainer">
                        {currentProducts?.map((p, index) => (
                            <Card
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            image={p.image}
                            key={index}
                        />
                        ))}
                    </div>
                    
                </div>
                <Paginado
                    charactersPerPage={charactersPerPage}
                    product={product.length}
                    paginado={paginado}

                />
            </div>
        </div>
    );
};