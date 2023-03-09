import React from "react";
import "../styles/Paginado.css";

export default function Paginado({charactersPerPage, product, paginado}){
    
    const pageNumbers = []

    for(let i = 1; i<=Math.ceil(product/charactersPerPage);i++) {
        pageNumbers.push(i) 
    }
    
    return(
        <nav className="containerPaginado">
            <ul className="paginado">
                {pageNumbers && pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}