import axios from "axios";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_ALL_PRODUCTS_NAME="GET_ALL_PRODUCTS_NAME"
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT='UPDATE_PRODUCT';
export const GET_ALL_BRANDS= 'GET_ALL_BRANDS';
export const GET_ALL_TYPES= 'GET_ALL_TYPES';
export const GET_PAGE = 'GET_PAGE';
export const FILTER_BY_BRAND = 'FILTER_BY_BRAND';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_PRECIO = 'FILTER_PRECIO';
export const ADD_REVIEW = 'ADD_REVIEW';

export const getAllProducts = () => async (dispatch) => {
    try {
        return await axios('http://localhost:3001/products').then(r=>
            dispatch({type: GET_ALL_PRODUCTS, payload:r.data}))
    } catch (error) {
            console.log(error)
    }
}

export const getAdminProducts = () => async (dispatch) => {
    try {
        return await axios('http://localhost:3001/products/ForAdmin').then(r=>
            dispatch({type: GET_ALL_PRODUCTS, payload:r.data}))
    } catch (error) {
            console.log(error)
    }
}

export const getAllProductsName =(name)=>async (dispatch)=>{
  try {
    return await axios(`http://localhost:3001/products?name=${name}`).then((r)=>
      dispatch({type:GET_ALL_PRODUCTS_NAME, payload: r.data}))
  } catch (error) {
    console.log(error)
  }
}

export const getAllProductsNameForAdmin = (name) => async (dispatch)=>{
  try {
    return await axios(`http://localhost:3001/products/ForAdmin?name=${name}`).then((r)=>
      dispatch({type:GET_ALL_PRODUCTS_NAME, payload: r.data}))
  } catch (error) {
    console.log(error)
  }
}

export const getProductDetail = (name) => async (dispatch) => {
  return await axios.get(`http://localhost:3001/products/${name}`).then(r=>
    dispatch({type: GET_PRODUCT_DETAIL, payload:{...r.data.data[0]}}))
};


export const createProduct =  (payload)=> async(dispatch)=>{
  return await axios.post("http://localhost:3001/products",payload).then(r=>
  dispatch({type: CREATE_PRODUCT, payload}))
};

// export const createProduct = (product) => {
//   return async (dispatch) => {
//     console.log("/products", product);
//     try {
//       const response = await fetch("http://localhost:3001/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(product),
//       });

//       console.log("CREATE_PRODUCT", response);
//       const data = await response.json();
//       dispatch({ type: "CREATE_PRODUCT", payload: data });

//     } catch (error) {
//       console.error(error);
//     }
//   };
// };


export const updateProduct= (id,payload)=> async()=>{
    return await axios.put(`http://localhost:3001/products/${id}`,payload)
};


export const banOrUnbanProd= (id)=> async()=>{
    return await axios.put(`http://localhost:3001/products/ban/${id}`)
};



export const getAllBrands = () => {
  return async function(dispatch){
    const json = await axios.get('http://localhost:3001/products/brands')
    return dispatch({type: GET_ALL_BRANDS, payload: json.data})
  }
}


export const getAllTypes = () => {
  return async function(dispatch){
    const json = await axios.get('http://localhost:3001/products/types')
    return dispatch({type: GET_ALL_TYPES, payload: json.data})
  }
}

// export const getPage = (page,brand,type,price) => async (dispatch) => {
//   return await axios.get(`localhost:3001/filter?page=${page}&brand=${brand}&type=${type}&price=${price}`)
//   .then(r => dispatch({ type : GET_PAGE, payload : r}))
//   .catch(e => console.error(e))

// }

export const getPage = (page,brand,type,price) => {
  return async function(dispatch) {
    const json = await axios.get(`http://localhost:3001/filter?page=${page}&brand=${brand}&type=${type}&price=${price}`)
    console.log(json)
    return dispatch({type: GET_PAGE, payload: json.data})
  }
}

export const filterByBrands = (payload) => {
  return { type: FILTER_BY_BRAND, payload}
}

export const filterByType = (payload) => {
  return { type: FILTER_BY_TYPE, payload}
}

export const filterByPrice = (payload) => {
  return { type: FILTER_PRECIO, payload}
}

export const addReview=(id,payload) =>async(dispatch) => {
  return await axios.put(`http://localhost:3001/products/review/${id}`,payload).then(r=>
  dispatch({type: ADD_REVIEW, payload}))
}