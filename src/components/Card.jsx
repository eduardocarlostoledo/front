import { Link } from "react-router-dom";
import "../styles/Card.css"
import AddToCart from "./AddToCart"

export default function Card({name, image, price, isForBuildPc}) {
    return (
        <div className="DivAllCards">
      
        <div className="contenedor_card">
          <Link className="LinkImage" to={isForBuildPc ? "" : `/detail/${name}`}>
          <div className="card_contenedor_img">
            <img className="Imagen" src={image} width="100px" alt=""/>
            <hr />
          </div>
          </Link>
          <p className="card_p_nombre">{name}</p>
          
          <strong className="card_strong_precio"> $ {price}</strong>
         {!isForBuildPc && <AddToCart name={name} image={image} price={price} />}
        </div>

    </div>
  );
}

