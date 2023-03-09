import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import "../styles/StarsCalification.css";
const StarsCalification = ({calif, setCalif, width}) => {
    const [calification, setCalification] = useState(1)
    const [hover,setHover]=useState('')
    const size = width? width: 50
    
    // primero se obtiene la parte entera y decimal de la calificación
    const intPart = Math.floor(calif)
    const decimalPart = calif - intPart

    useEffect(()=>{ if(setCalif) setCalif(calification)} ,[calification])

    return (
        <div className='starsCalification'>
            {[... new Array(5)].map((star, i)=>{
                const califValue=i+1;
                let starComponent = null
                if (califValue <= intPart) {
                    // para mostrar la estrella completa
                    starComponent = <FaStar color="yellow" size ={size}/>
                } else if (califValue === intPart + 1 && decimalPart > 0) {
                    // mostrar estrella parcialmente amarilla
                    starComponent = <FaStarHalfAlt color="yellow" size ={size}/>
                } else {
                    // mostrar estrella gris
                    starComponent = <FaStar color="gray" size ={size}/>
                }
                {return calif||calif===0?
                    starComponent
                    : <label >
                        <input 
                            type="radio" 
                            name="calification" 
                            value={califValue} 
                            onClick={()=>setCalification(califValue)}
                        />
                        <FaStar 
                            className="star" 
                            color={califValue <= (hover||calification) ? "yellow" : "gray"}
                            size ={size}
                            onMouseEnter={()=>setHover(califValue)}
                            onMouseLeave={()=>setHover(null)}
                        />
                    </label> 
                }  
            })}
        </div>
    );
};

export default StarsCalification;