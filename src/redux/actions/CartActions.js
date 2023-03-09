import axios from "axios";
export const GET_CART = 'GET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART';
export const DELETE_ONE_CART = 'DELETE_ONE_CART';
export const POST_CART = 'POST_CART';
export const GET_UPDATE = 'GET_UPDATE';
export const UPDATE = 'UPDATE';

// export const getCart = () => {
//     return async function(dispatch) {
//         const carts = await axios('http://localhost:3001/cart')
//         console.log(carts)
//         return dispatch({type: GET_CART, payload:carts.data})
//     }
// }
export const getCart = () => async (dispatch) =>{
    try {
        return await axios('http://localhost:3001/cart').then(r=>
            dispatch({type: GET_CART, payload:r.data}))
    } catch (error) {
            console.log(error)
    }
}

export const addToCart = (payload) => {
    return async function (dispatch){
        const cart = await axios.post('http://localhost:3001/cart', payload)
        return dispatch({type: ADD_TO_CART, payload:cart.data})
    }
}

export const deleteOneCart = (prodId) => {
    return async function (dispatch){
        const cart = await axios.delete(`http://localhost:3001/cart/${prodId}`)
        return dispatch({type: DELETE_ONE_CART, payload: cart.data})
    }
}
export const deleteAllFromCart = () => {
    return async function (dispatch){
        const cart = await axios.delete('http://localhost:3001/cart/')
        return dispatch({type: DELETE_ALL_FROM_CART, payload: cart.data})
    }
}


export function postCart(payload, preferenceId){
    return async function (dispatch){
        const response = await axios.post('http://localhost:3001/cart', payload);
        console.log(response);
        // Enviar el preferenceId como payload en la acción
        return dispatch({type: POST_CART, payload: {cart: response.data, preferenceId: preferenceId}});
    }           
};

export const getUpdate=()=> async (dispatch) => {
    dispatch({type:GET_UPDATE})
}

export const update=(update)=> async (dispatch) => {
    dispatch({type:UPDATE, payload:update})
}