import "../styles/Products.css";
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { 
    filterByBrands, filterByPrice, filterByType, 
    getAllBrands, getAllProducts, getAllProductsName, getAllTypes 
} from "../redux/actions/ProductActions";
import Card from '../components/Card';
import Paginado from "./Paginado";

export const Products = () => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.products);
    const brand = useSelector((state) => state.brands);
    const type = useSelector((state) => state.types);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [charactersPerPage] = useState(9);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            dispatch(getAllProducts()),
            dispatch(getAllBrands()),
            dispatch(getAllTypes())
        ]).then(() => setLoading(false));
    }, [dispatch]);

    const currentProducts = product.slice(
        (currentPage - 1) * charactersPerPage,
        currentPage * charactersPerPage
    );

    const paginado = (pageNumber) => setCurrentPage(pageNumber);

    const handleInputChange = (e) => {
        setName(e.target.value);
        setCurrentPage(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getAllProductsName(name));
        setCurrentPage(1);
    };

    const handleClick = () => {
        dispatch(getAllProducts());
    };

    const handleFilterBrands = (e) => {
        dispatch(filterByBrands(e.target.value));
        setCurrentPage(1);
    };

    const handleFilterTypes = (e) => {
        dispatch(filterByType(e.target.value));
        setCurrentPage(1);
    };

    const handleFilterPrice = (e) => {
        dispatch(filterByPrice(e.target.value));
        setCurrentPage(1);
    };

    if (loading) {
        return (
            <div className="LoaderContainer">
                <div className="Loader">Loading...</div>
            </div>
        );
    }

    return (
        <div className="DivProducts">
            <div className="Products">
                <div className="DivCardsFilters">
                    <div className="DivFilter">
                        <h2>Filters</h2>
                        <button className="Todos" onClick={handleClick}>Reload all Products</button>
                        <div className="SearchButton" id="InputB">
                            <input 
                                className='InputB' 
                                type='text' 
                                placeholder="Search..." 
                                onChange={handleInputChange}
                            /> 
                            <button 
                                className='SubmitB' 
                                type="submit" 
                                onClick={handleSubmit}
                            >
                                <HiMagnifyingGlass className="icon" />
                            </button>
                        </div>
                        <div className="ContainerFilters">
                            <select id="filterBrandsSelect" className="Filter" onChange={handleFilterBrands}>
                                <option value="All" defaultValue='default'>All Brands</option>
                                {brand.map((b, index) => (
                                    <option key={index} value={b.name}>{b.name}</option>
                                ))}
                            </select>
                            <select id="filterTypesSelect" className="Filter" onChange={handleFilterTypes}>
                                <option value="All" defaultValue='default'>All Types</option>
                                {type.map((t, index) => (
                                    <option key={index} value={t.name}>{t.name}</option>
                                ))} 
                            </select>
                            <select id="filterPriceSelect" className="Filter" onChange={handleFilterPrice}>
                                <option value="all" disabled>All price</option>
                                <option value="ASC">Lower price</option>
                                <option value="DES">Higher price</option>
                            </select>
                        </div>
                    </div>
                    <div className="CardContainer">
                        {currentProducts.map((p, index) => (
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
