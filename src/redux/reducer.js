import { GET_CART, GET_UPDATE, UPDATE} from './actions/CartActions';
import { ADD_ALL_ORDERS, GET_ALL_SHOPPING } from './actions/OrderActions';

import {
    GET_ALL_PRODUCTS,
    GET_ALL_PRODUCTS_NAME,
    GET_PRODUCT_DETAIL,
    CREATE_PRODUCT,
    UPDATE_PRODUCT,
    GET_ALL_BRANDS,
    GET_ALL_TYPES,
    GET_PAGE,
    FILTER_BY_BRAND,
    FILTER_BY_TYPE,
    FILTER_PRECIO,
    ADD_REVIEW,
    } from './actions/ProductActions'
    
    import{
        GET_ALL_USERS,
        GET_USER_BY_ID,
        USER_REGISTER,
        UPDATE_USER,
        GET_EMAIL,
        USER_ACTIVE,
        GET_ID,
        CHANGE_NAV,
        GET_ALL_QUERY
    } from './actions/UsersActions';
    
    const initialState= {
        products: [],
        allProducts: [],
        paginatedProducts: [],
        brands:[],
        types:[],
        productDetail:{},
        users: [],
        userDetail:{},
        emails : [],
        UserActive : {},
        ChangeNav : JSON.parse(localStorage.getItem("Navbar")),
        cart: [],
        update: false,
        order: [],
        shopping: [],
        idgoogle: {}
    }
    
    const rootReducer = (state=initialState,action) => {
        let fran

        switch(action.type) {

            case GET_ALL_PRODUCTS: 
                
                return{ 
                    ...state, 
                    products: action.payload, 
                    allProducts: action.payload,
                }

            case GET_ALL_PRODUCTS_NAME: 
                
                return{ ...state, products: action.payload, }

            case GET_PRODUCT_DETAIL: 
            
                return { 
                    ...state, 
                    productDetail:action.payload, 
                }

            case CREATE_PRODUCT: 
            
                return { ...state, } 

            case UPDATE_PRODUCT: 
            
                return{ ...state, }

            case GET_ALL_BRANDS: 
            
                return{ ...state, brands:action.payload, }

            case GET_ALL_TYPES: 
            
                return { ...state, types:action.payload }

            case GET_ALL_USERS: 
            
                return{ ...state, users:action.payload }

            case GET_USER_BY_ID: 
            
                return{ ...state, userDetail:action.payload }

            case USER_REGISTER: 
            
                return { ...state }

            case UPDATE_USER: 
            
                return { ...state }

        
            case GET_EMAIL: 

                return { ...state,
                    emails : action.payload }


            case GET_PAGE:

                return {...state, paginatedProducts:action.payload}

            case USER_ACTIVE: 
            
                const userActive = action.payload;
                const uss = localStorage.setItem("USUARIO", JSON.stringify(userActive))
                return { ...state,
                    ChangeNav: true,
                    UserActive : JSON.parse(localStorage.getItem("USUARIO")) 
                }

        
            case FILTER_BY_BRAND:
                const fBrands = state.allProducts;
                const brandsFilter = action.payload === 'All' ? fBrands : fBrands.filter(el => el.brand === action.payload)
        
                return {
                    ...state, 
                    products: brandsFilter
                }

        
            case FILTER_BY_TYPE:
                const fTypes = state.allProducts;
                const typesFilter = action.payload === 'All' ? fTypes : fTypes.filter(el => el.type === action.payload)
        
                return {
                    ...state, 
                    products: typesFilter
                }
                    
            case FILTER_PRECIO: //funciona
        
                let sortPrice;
                if (action.payload === "all") sortPrice = state.allProducts;
                else
                sortPrice =
                action.payload === "ASC"
                ? state.products.sort(
                    (a, b) => a.price - b.price
                )
                : state.products.sort(
                    (a, b) => b.price - a.price
                );
            
                return {
                    ...state,
                    products: sortPrice,
                };        
            
            case "deleteUserLocalStorage":
                localStorage.setItem("Navbar", JSON.stringify(true))
                 fran = JSON.parse(localStorage.getItem("Navbar"))
                return { 
                    ...state, 
                    ChangeNav: fran
                }

                
            case GET_CART: 

                return{
                    ...state,
                    cart:action.payload
                }

            case GET_UPDATE:
                
                return{
                    ...state,
                }
            case UPDATE:
                return {
                    ...state,
                    update: action.payload,
                }
                case ADD_ALL_ORDERS: 
                return{
                    ...state, 
                    order: action.payload,
                }
            
            case GET_ALL_SHOPPING: 
                return{
                    ...state,
                    shopping: action.payload,
                }

            case CHANGE_NAV: 
            localStorage.setItem("Navbar", JSON.stringify(false))
             fran = JSON.parse(localStorage.getItem("Navbar"))
            return { 
                ...state, 
                ChangeNav: fran
            }
            
            case ADD_REVIEW:
                return{...state}
                
            case GET_ID: 
            return {
                ...state, 
                idgoogle: action.payload
            }
                
            case GET_ALL_QUERY:
                return { 
                    ...state, 
                    users: action.payload
                }
            default: return {...state}
            
        }

    }
    
    export default rootReducer;