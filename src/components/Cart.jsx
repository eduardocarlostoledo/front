import React, { useState, useEffect } from "react";
import mercadopago from "./mercadopago";
import "../styles/Cart.css";
import swal from "sweetalert";
import ItemCart from "./ItemCart";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/actions/CartActions";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const up = useSelector((state) => state.update);
  const [cartItems, setCartItems] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true); 
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el loader
  const dispatch = useDispatch();
  const userActive =
    localStorage.getItem("USUARIO") !== null
      ? JSON.parse(localStorage.getItem("USUARIO"))
      : null;
  const navigate = useNavigate();

  const products = useSelector((state) => state.allProducts);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK}/cart`)
      .then((response) => response.json())
      .then((data) => setCartItems([...data]))
      .catch((error) => swal("Cart is empty", "Cart is empty", "error"));
  }, [up]);

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.amount, 0)
    .toFixed(1);

  const preferencia = cartItems.map((item) => ({
    product_description: item.name,
    product_name: item.name,
    product_image: item.image,
    product_amount: item.amount,
    product_unit_price: item.price,
    prodId: item.prodId,
  }));
  const description = cartItems.map((item) => item.name);
  const total_order_price = total;
  const buyer_email = userActive === null ? null : userActive.email;
  preferencia.push({
    total_order_price,
    buyer_email,
  });

  const orderData = {
    quantity: 1,
    description: description.toString(),
    price: total,
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!cartItems.length) swal("Cart is empty", "Cart is empty", "error");
    else if (userActive === null) {
      swal("You must log in to buy!", "You must log in to buy!", "error");
      navigate("/login");
    } else {
      setIsButtonVisible(false); 
      setIsLoading(true); // Activar el loader

      fetch(`${process.env.REACT_APP_BACK}/pay/preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferencia.reverse()),
      });
      fetch(`${process.env.REACT_APP_BACK}/pay/create_preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((preference) => {
          createCheckoutButton(preference.id);
          setIsLoading(false); // Desactivar el loader
        })
        .catch(() => {
          alert("Unexpected error");
          setIsLoading(false); // Desactivar el loader en caso de error
        });
    }
  };

  const createCheckoutButton = (preferenceId) => {
    mercadopago.checkout({
      preference: {
        id: preferenceId,
      },
      render: {
        container: "#button-checkout",
        label: "Pagar Con MercadoPago",
      },
    });
  };

  const handleDeleteAllCart = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACK}/cart`, {
        method: "DELETE",
      });
      setCartItems([]);
      dispatch(update(true));
      swal("Cart is empty", "Cart is empty", "error");
    } catch (error) {
      swal("Error", "No se pudo eliminar el carrito", "error");
    }
  };

  return (
    <div className="ContainerCart">
      <h2 className="h2">Shopping Cart</h2>

      <div className="NavCart">
        {cartItems.length === 0 ? (
          <p className="EmptyP">Cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id}>
              <ItemCart
                name={item.name}
                price={item.price}
                amount={item?.amount}
                image={item.image}
                prodId={item.prodId}
                product={products.find((prod) => prod.name === item.name)}
                handleDeleteAllCart={handleDeleteAllCart}
              />
            </div>
          ))
        )}
      </div>
      
      <h3 className="h3">Total: ${total}</h3>

      <div className="botones_de_pago">
        <div className="BotonCheckout">
          {isButtonVisible && cartItems.length !== 0 && (
            <button className="ButtonCart" onClick={handleCheckout}>
              Finalizar Pedido
            </button>
          )}
          {isLoading && <div className="loader">Loading...</div>} {/* Loader */}
          <div id="button-checkout"></div>
        </div>
      </div>
{isButtonVisible && <button className="ButtonDeleteAll" onClick={handleDeleteAllCart}>
        Delete All Cart
      </button> } 
      
    </div>
  );
}
