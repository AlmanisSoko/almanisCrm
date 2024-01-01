import { 
    // auth
    LOGIN_SUCCESS, LOGIN_FAIL, 
    LOADED_USER_SUCCESS, LOADED_USER_FAIL ,
    AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL,
    PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS, PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS, SIGNUP_FAIL,
    ADMIN_SIGNUP_SUCCESS, ADMIN_SIGNUP_FAIL,
    ACTIVATION_SUCCESS, ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAIL,
    LOGOUT,

    // customers
    CUSTOMER_SEARCH_SUCCESS, CUSTOMER_SEARCH_FAIL,
    EDIT_CUSTOMER_SUCCESS, EDIT_CUSTOMER_FAIL,
    CUSTOMER_ONLY_FETCH_SUCCESS, CUSTOMER_ONLY_FETCH_FAIL,
    CUSTOMER_FETCH_ALL_SUCCESS, CUSTOMER_FETCH_ALL_FAIL,
    CUSTOMER_DELETE_SUCCESS, CUSTOMER_DELETE_FAIL, CUSTOMER_UPDATE_LIST,
    CUSTOMER_FETCH_DETAILS_SUCCESS, CUSTOMER_FETCH_DETAILS_FAIL, 
    SAVE_CUSTOMER_SUCCESS, SAVE_CUSTOMER_FAIL,

    // farmer
    FARMER_SEARCH_SUCCESS, FARMER_SEARCH_FAIL,
    EDIT_FARMER_SUCCESS, EDIT_FARMER_FAIL,
    FARMER_ONLY_FETCH_SUCCESS, FARMER_ONLY_FETCH_FAIL,
    FARMER_FETCH_ALL_SUCCESS, FARMER_FETCH_ALL_FAIL,
    FARMER_DELETE_SUCCESS, FARMER_DELETE_FAIL, FARMER_UPDATE_LIST,
    FARMER_FETCH_DETAILS_SUCCESS, FARMER_FETCH_DETAILS_FAIL, 
    SAVE_FARMER_SUCCESS, SAVE_FARMER_FAIL,

     // orders
     ORDERS_FETCH_ALL_SUCCESS, ORDERS_FETCH_ALL_FAIL,
     ORDERS_FETCH_DETAILS_SUCCESS, ORDERS_FETCH_DETAILS_FAIL,
     ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_UPDATE_LIST,
     SAVE_ORDERS_SUCCESS, SAVE_ORDERS_FAIL,
     ORDER_SEARCH_SUCCESS, ORDER_SEARCH_FAIL,
     EDIT_ORDERS_SUCCESS, EDIT_ORDERS_FAIL,

} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    customer: [],
    customerDetails: null, 
    paymentsDetails: null,
    farmer: [],
    orders: [],
    payments: [],
    invoice: [], 
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        // AUTHENTICATION & AUTHORIZATION REDUCERS
        
        case ADMIN_SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            };

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
            }  ;  

        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            };

        case LOADED_USER_SUCCESS:
            return{
                ...state,
                user: payload
            };

        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false,
            }   ;
        
        case GOOGLE_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access)
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            };

        case SIGNUP_FAIL:
        case ADMIN_SIGNUP_FAIL:
        case GOOGLE_AUTH_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            } ;
            
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:        
            return {
                ...state
            };

        case LOADED_USER_FAIL:
            return {
                ...state,
                user: null
            };
            
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            };
            
        // CUSTOMER MODULE REDUCERS

        case SAVE_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: payload.data,
            };

        case SAVE_CUSTOMER_FAIL:
            return{
                ...state,
            };

        case EDIT_CUSTOMER_SUCCESS:
            return {
                ...state,
                customers: payload.data,
            };

        case EDIT_CUSTOMER_FAIL:
            return{
                ...state,
            };
            
        case CUSTOMER_ONLY_FETCH_SUCCESS:
            return {
                ...state,
                customer: payload.data, // Store the fetched customer data
            };

        case CUSTOMER_ONLY_FETCH_FAIL:
            return {
                ...state,
                customer: [], // Handle the failure case
            }; 
                
        case CUSTOMER_FETCH_ALL_SUCCESS:
            return {
                ...state,
                customers: payload.data, // Store the fetched customer data
            };

        case CUSTOMER_FETCH_ALL_FAIL:
            return {
                ...state,
                customers: [], // Handle the failure case
            }; 

        case CUSTOMER_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                customerDetails: payload.data, // Store the fetched customer data
            };

        case CUSTOMER_FETCH_DETAILS_FAIL:
            return {
                ...state,
                customerDetails: [], // Store the fetched customer data
            };   

        case CUSTOMER_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedCustomer = state.customer.filter((customer) => customer.id !== payload);
            return {
                ...state,
                customer: updatedCustomer,
            };

        case CUSTOMER_DELETE_SUCCESS: 
            const updatedCustomers = state.customer.filter(customer => customer.id !== payload.data);

            return {
                ...state,
                customer: updatedCustomers,
            };

        case CUSTOMER_DELETE_FAIL:
            return {
                ...state,
            };       
            
        // FARMER MODULE REDUCERS

        case SAVE_FARMER_SUCCESS:
            return {
                ...state,
                farmer: payload.data,
            }

        case SAVE_FARMER_FAIL:
            return{
                ...state,
            }

        case EDIT_FARMER_SUCCESS:
            return {
                ...state,
                farmer: payload.data,
            }

        case EDIT_FARMER_FAIL:
            return{
                ...state,
                }
            
        case FARMER_ONLY_FETCH_SUCCESS:
            return {
                ...state,
                farmer: payload.data, // Store the fetched FARMER data
            };

        case FARMER_ONLY_FETCH_FAIL:
            return {
                ...state,
                farmer: [], // Handle the failure case
            }; 
                
        case FARMER_FETCH_ALL_SUCCESS:
            return {
                ...state,
                farmer: payload.data, // Store the fetched FARMER data
            };

        case FARMER_FETCH_ALL_FAIL:
            return {
                ...state,
                farmer: [], // Handle the failure case
            }; 

        case FARMER_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                farmerDetails: payload.data, // Store the fetched FARMER data
            };

        case FARMER_FETCH_DETAILS_FAIL:
            return {
                ...state,
                farmerDetails: [], // Store the fetched FARMER data
            };   

        case FARMER_UPDATE_LIST:
            // Update the FARMER list by removing the deleted FARMER
            const updatedFarmer = state.farmer.filter((farmer) => farmer.id !== payload);
            return {
                ...state,
                farmer: updatedFarmer,
            };

        case FARMER_DELETE_SUCCESS: 
            const updatedFarmers = state.farmer.filter(farmer => farmer.id !== payload.data);

            return {
                ...state,
                farmer: updatedFarmers,
            };

        case FARMER_DELETE_FAIL:
            return {
                ...state,
            };       
        
            // ORDERS MODULE REDUCERS

        case SAVE_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload.data,
            };

        case SAVE_ORDERS_FAIL:
            return{
                ...state,
            } ;

        case EDIT_ORDERS_SUCCESS:
            return {
                ...state,
                orders: payload.data,
            };

        case EDIT_ORDERS_FAIL:
            return {
                ...state,
            };

        case SAVE_ORDERS_FAIL:
            return{
                ...state,
            } ;   

        case ORDERS_FETCH_ALL_SUCCESS:
            return {
                ...state,
                orders: payload.data, // Store the fetched customer data
            };

        case ORDERS_FETCH_ALL_FAIL:
            return {
                ...state,
                orders: [], // Handle the failure case
            };

        case ORDERS_FETCH_DETAILS_SUCCESS:
            return {
                ...state,
                orders: payload.data, // Store the fetched orders data
            };

        case ORDERS_FETCH_DETAILS_FAIL:
            return {
                ...state,
                orders: [], // Store the fetched orders data
            };   
        
        case ORDER_UPDATE_LIST:
            // Update the customer list by removing the deleted customer
            const updatedOrder = state.orders.filter((orders) => orders.id !== payload);
            return {
                ...state,
                orders: updatedOrder,
            };

        case ORDER_DELETE_SUCCESS: 
            const updatedOrders = state.orders.filter(orders => orders.id !== payload.data);

            return {
                ...state,
                orders: updatedOrders,
            };

        case ORDER_DELETE_FAIL:
            return {
                ...state,
            };    
          

        default:
            return state;
    }
}