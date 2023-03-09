import axios from "axios";

export const ADD_ALL_ORDERS = 'ADD_ALL_ORDERS'; /* todas las ordenes */
export const GET_ALL_SHOPPING = 'GET_ALL_SHOPPING'; /* todas las compras */
export const ORDER_BY_ID = 'ORDER_BY_ID'; /* el id de las ordenes */
export const ORDER_BY_USER = 'ORDER_BY_USER'; /* las ordenes que tiene cada usuario */
export const ORDER_BY_EMAIL = 'ORDER_BY_EMAIL'

export const addAllOrders = () => {
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/order')
        return dispatch({type: ADD_ALL_ORDERS, payload: json.data})
    }
}

export const getAllShopping = () => {
    return async function(dispatch){
        const buys = await axios.get('http://localhost:3001/order/pays')
        return dispatch({type: GET_ALL_SHOPPING, payload: buys.data})
    }
}

export const orderById = (id) => {
    return async function (dispatch){
        const idOrder = await axios.get(`http://localhost:3001/order/${id}`)
        return dispatch({type: ORDER_BY_ID, payload: idOrder.data})
    }
}

export const orderByUser = (cartUserId) => {
    return async function (dispatch) {
        const orderUser = await axios.get(`http://localhost:3001/order/${cartUserId}`)
        return dispatch({type: ORDER_BY_USER, payload: orderUser.data})
    }
}

export const orderByEmail = (email) => {
    return async function (dispatch){
        const ideEmail = await axios.get(`http://localhost:3001/order/${email}`)
        return dispatch({type: ORDER_BY_EMAIL, payload: ideEmail.data})
    }
}
