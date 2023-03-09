import '../styles/Search.css'
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAllProductsName } from '../redux/actions/ProductActions';
import { useState } from 'react';

export const Search = () => {


    const dispatch = useDispatch()

    const [name, setName] = useState('')
    
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value); // ver el tema del currentPage
        console.log(name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getAllProductsName(name))
        
    }
    return (
        <div className='SearchButton'>
            <div>
                
                <input className='InputBuscar' type='text' placeholder="Search..." onChange={(e) => handleInputChange(e)}/> 
                <button className='SubmitBuscar' type="submit" onClick={(e) => handleSubmit(e)}> < HiMagnifyingGlass className="icon"/></button>
            </div>
        </div>
    )
}