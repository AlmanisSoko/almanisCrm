import Axios from 'axios';
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

     // orders
     ORDERS_FETCH_ALL_SUCCESS, ORDERS_FETCH_ALL_FAIL,
     ORDERS_FETCH_DETAILS_SUCCESS, ORDERS_FETCH_DETAILS_FAIL,
     ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_UPDATE_LIST,
     SAVE_ORDERS_SUCCESS, SAVE_ORDERS_FAIL,
     ORDER_SEARCH_SUCCESS, ORDER_SEARCH_FAIL,
     EDIT_ORDERS_SUCCESS, EDIT_ORDERS_FAIL,

     // farmer
    FARMER_SEARCH_SUCCESS, FARMER_SEARCH_FAIL,
    EDIT_FARMER_SUCCESS, EDIT_FARMER_FAIL,
    FARMER_ONLY_FETCH_SUCCESS, FARMER_ONLY_FETCH_FAIL,
    FARMER_FETCH_ALL_SUCCESS, FARMER_FETCH_ALL_FAIL,
    FARMER_DELETE_SUCCESS, FARMER_DELETE_FAIL, FARMER_UPDATE_LIST,
    FARMER_FETCH_DETAILS_SUCCESS, FARMER_FETCH_DETAILS_FAIL, 
    SAVE_FARMER_SUCCESS, SAVE_FARMER_FAIL,

    // payments
    PAYMENTS_FETCH_ALL_SUCCESS, PAYMENTS_FETCH_ALL_FAIL,
    PAYMENTS_FETCH_DETAILS_SUCCESS, PAYMENTS_FETCH_DETAILS_FAIL,
    EDIT_PAYMENTS_SUCCESS, EDIT_PAYMENTS_FAIL,
    SAVE_PAYMENTS_SUCCESS, SAVE_PAYMENTS_FAIL,
    PAYMENT_DELETE_SUCCESS, PAYMENT_DELETE_FAIL, PAYMENT_UPDATE_LIST,

    // invoice
    INVOICE_FETCH_ALL_SUCCESS, INVOICE_FETCH_ALL_FAIL,
    INVOICE_FETCH_DETAILS_SUCCESS, INVOICE_FETCH_DETAILS_FAIL,
    INVOICE_DELETE_SUCCESS, INVOICE_DELETE_FAIL, INVOICE_UPDATE_LIST,
    SAVE_INVOICE_SUCCESS, SAVE_INVOICE_FAIL,

     // dashboard
     DASHBOARD_FETCH_SUCCESS, DASHBOARD_FETCH_FAIL,
     BALANCE_FETCH_SUCCESS, BALANCE_FETCH_FAIL,
     BIRDS_FETCH_SUCCESS, BIRDS_FETCH_FAIL,
     DAILYCHART_FETCH_FAIL, DAILYCHART_FETCH_SUCCESS, 
     MONTHLYCHART_FETCH_SUCCESS, MONTHLYCHART_FETCH_FAIL, 
     YEARLYCHART_FETCH_SUCCESS, YEARLYCHART_FETCH_FAIL,
     TRAYS_SOLD_FETCH_SUCCESS, TRAYS_SOLD_FETCH_FAIL,
     OVERPAID_FETCH_SUCCESS, OVERPAID_FETCH_FAIL,
     DEBTORS_FETCH_SUCCESS, DEBTORS_FETCH_FAIL

} from './types';

// Dashboard

export const fetchDashboard = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/dashboard/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const balanceData = response.data;

      console.log("Balance Data:", balanceData); // Log the retrieved data

      dispatch({
        type: BALANCE_FETCH_SUCCESS,
        payload: balanceData,
      });

      return balanceData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: BALANCE_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching balance data:", error);
    dispatch({
      type: BALANCE_FETCH_FAIL,
    });
  }
};

export const fetchDiscount = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/total-discount/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const balanceData = response.data;

      console.log("Balance Data:", balanceData); // Log the retrieved data

      dispatch({
        type: BALANCE_FETCH_SUCCESS,
        payload: balanceData,
      });

      return balanceData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: BALANCE_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching balance data:", error);
    dispatch({
      type: BALANCE_FETCH_FAIL,
    });
  }
};

export const fetchTotalPayments = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/total-payment/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const balanceData = response.data;

      console.log("Balance Data:", balanceData); // Log the retrieved data

      dispatch({
        type: BALANCE_FETCH_SUCCESS,
        payload: balanceData,
      });

      return balanceData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: BALANCE_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching balance data:", error);
    dispatch({
      type: BALANCE_FETCH_FAIL,
    });
  }
};

export const fetchTotalKilos = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/total-kgs/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const balanceData = response.data;

      console.log("Balance Data:", balanceData); // Log the retrieved data

      dispatch({
        type: BALANCE_FETCH_SUCCESS,
        payload: balanceData,
      });

      return balanceData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: BALANCE_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching balance data:", error);
    dispatch({
      type: BALANCE_FETCH_FAIL,
    });
  }
};

export const fetchUnderPaid = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/total-balance/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const balanceData = response.data;

      console.log("Balance Data:", balanceData); // Log the retrieved data

      dispatch({
        type: BALANCE_FETCH_SUCCESS,
        payload: balanceData,
      });

      return balanceData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: BALANCE_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching balance data:", error);
    dispatch({
      type: BALANCE_FETCH_FAIL,
    });
  }
};

export const fetchMonthlyData = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/monthly_chart/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const monthlychartData = response.data;

      console.log("monthlychart Data:", monthlychartData); // Log the retrieved data

      dispatch({
        type: MONTHLYCHART_FETCH_SUCCESS,
        payload: monthlychartData,
      });

      return monthlychartData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: MONTHLYCHART_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching dashboaard data:", error);
    dispatch({
      type: MONTHLYCHART_FETCH_FAIL,
    });
  }
};

export const fetchCustomerRegion = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/customers_region/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const monthlychartData = response.data;

      console.log("monthlychart Data:", monthlychartData); // Log the retrieved data

      dispatch({
        type: MONTHLYCHART_FETCH_SUCCESS,
        payload: monthlychartData,
      });

      return monthlychartData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: MONTHLYCHART_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching dashboaard data:", error);
    dispatch({
      type: MONTHLYCHART_FETCH_FAIL,
    });
  }
};

export const fetchDebtors = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/total-balance/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const monthlychartData = response.data;

      console.log("monthlychart Data:", monthlychartData); // Log the retrieved data

      dispatch({
        type: MONTHLYCHART_FETCH_SUCCESS,
        payload: monthlychartData,
      });

      return monthlychartData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: MONTHLYCHART_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching dashboaard data:", error);
    dispatch({
      type: MONTHLYCHART_FETCH_FAIL,
    });
  }
};

export const fetchDebtorsList = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/debtors/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const debtors = response.data;

      console.log("monthlychart Data:", debtors); // Log the retrieved data

      dispatch({
        type: DEBTORS_FETCH_SUCCESS,
        payload: debtors,
      });

      return debtors;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: DEBTORS_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching dashboaard data:", error);
    dispatch({
      type: DEBTORS_FETCH_FAIL,
    });
  }
};

export const fetchOverdue = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/overpaid/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const monthlychartData = response.data;

      console.log("monthlychart Data:", monthlychartData); // Log the retrieved data

      dispatch({
        type: MONTHLYCHART_FETCH_SUCCESS,
        payload: monthlychartData,
      });

      return monthlychartData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: MONTHLYCHART_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching dashboaard data:", error);
    dispatch({
      type: MONTHLYCHART_FETCH_FAIL,
    });
  }
};

export const fetchOverdueList = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/overpaid/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const monthlychartData = response.data;

      console.log("monthlychart Data:", monthlychartData); // Log the retrieved data

      dispatch({
        type: MONTHLYCHART_FETCH_SUCCESS,
        payload: monthlychartData,
      });

      return monthlychartData;
    } else {
      console.error("API Request Failed with Status Code:", response.status);
      dispatch({
        type: MONTHLYCHART_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching dashboaard data:", error);
    dispatch({
      type: MONTHLYCHART_FETCH_FAIL,
    });
  }
};

// Application authentication and authorization 

export const load_user = () => async (dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'ACCEPT': 'application/json',
            },
        };

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/me/`, config);
            const data = await res.json();

            if (!res.ok) {
                if (data.code === 'user_not_found') {
                    // Handle the case when the user is not found (redirect to login)
                    dispatch({
                        type: LOADED_USER_FAIL,
                        payload: 'User not found',
                    });
                } else {
                    // Handle other errors
                    throw Error(res.statusText);
                }
            } else {
                // User loaded successfully
                dispatch({
                    type: LOADED_USER_SUCCESS,
                    payload: data,
                });
            }
        } catch (error) {
            // Handle other errors
            dispatch({
                type: LOADED_USER_FAIL,
                payload: error.message,
            });
        }
    } else {
        // Handle the case when access token is not available
        dispatch({
            type: LOADED_USER_FAIL,
            payload: 'Access token not available',
        });
    }
};

export const googleAuthenticate = (code, state) => async (dispatch) => {
    if (code && state && !localStorage.getItem('access')) {
        const details = {
            code: code,
            state: state,
        };

        const formBody = Object.keys(details)
            .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(details[key]))
            .join('&');

        const url = `${import.meta.env.VITE_REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`;

        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ACCEPT: 'application/x-www-form-urlencoded',
            },
        };

        try {
            const res = await fetch(url, config);
            const data = await res.json();

            dispatch({
                type: GOOGLE_AUTH_SUCCESS,
                payload: data,
            });

            dispatch(load_user()); // Make sure to load user information after successful Google authentication.
        } catch (error) {
            dispatch({
                type: GOOGLE_AUTH_FAIL,
            });
        }
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'ACCEPT': 'application/json'
            }
        }

        const body = JSON.stringify({ token: localStorage.getItem('access') })
        console.log(body)

        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/verify/`, {
                method: 'POST',
                headers: config.headers,
                body: body
            });

            const data = await res.json();

            if (data.code !== 'token not valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
            
        } catch (error) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email, password })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/jwt/create/`, config);
        console.log()

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });

            dispatch(load_user());

            // Return a success response
            return { success: true };
        } else {
            dispatch({
                type: LOGIN_FAIL
            });

            // Extract the error message and return an error response
            const errorData = await res.json();
            return { error: errorData.detail };
        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });

        // Return an error response for network or other errors
        return { error: 'An error occurred. Please try again.' };
    }
}

export const signup = (first_name, last_name, phone, email, user_type, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, phone, user_type, email, password, re_password })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/`, config);

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: SIGNUP_SUCCESS,
                payload: data
            });

          return { success: true, data };

        } else {
          const error = await res.json();
            dispatch({
                type: SIGNUP_FAIL,
                payload: error
            });
 
          return { success: false, error };
        }
    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
}

export const adminSignup = (first_name, last_name, phone, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, phone, email, password, re_password })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/superuser/`, config);

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: ADMIN_SIGNUP_SUCCESS,
                payload: data
            });

          return { success: true, data };

        } else {
          const error = await res.json();
            dispatch({
                type: ADMIN_SIGNUP_FAIL,
                payload: error
            });
 
          return { success: false, error };
        }
    } catch (error) {
        dispatch({
            type: ADMIN_SIGNUP_FAIL
        });
    }
}

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ uid, token })
    };

    try {
        await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/activation/`, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/reset_password/`, config);

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: PASSWORD_RESET_SUCCESS,
                payload: data
            });

            dispatch(load_user());
        } else {
            dispatch({
                type: PASSWORD_RESET_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password ) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ uid, token, new_password, re_new_password })
    };

    try {
        const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/users/reset_password_confirm/`, config);

        if (res.ok) {
            const data = await res.json();

            dispatch({
                type: PASSWORD_RESET_CONFIRM_SUCCESS,
                payload: data
            });

            dispatch(load_user());
        } else {
            dispatch({
                type: PASSWORD_RESET_CONFIRM_FAIL
            });
        }
    } catch (error) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
}

export const logout= () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}

// API handler for the customer

const fetchCustomerByName = async (phone, token) => {
    try {
      // Make an HTTP GET request to your API endpoint
      const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/customerbyname/${phone}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
};

export const searchCustomer = (phone) => async (dispatch) => {
    try {
      if (localStorage.getItem('access')) {
        const token = localStorage.getItem('access');
        const response = await fetchCustomerByName(phone, token);
  
        if (response && response.status === 200) {
          const customerData = await response.json();
          console.log("Customer Data:", customerData); // Log the customer data
          dispatch({
            type: CUSTOMER_SEARCH_SUCCESS,
            payload: customerData
          })
          return customerData; // Return the data received from the API
        } else {
          console.log("API Error:", response); // Log the API response in case of an error
          dispatch({
            type: CUSTOMER_SEARCH_SUCCESS,
            payload: response
          })
          return response; // Return the error response for debugging
        }
      } else {
        // Handle unauthenticated user
        dispatch({
          type: CUSTOMER_SEARCH_FAIL,
        })
        return [];
      }
    } catch (error) {
      console.error("Error fetching customer data:", error); // Log any network errors
      return [];
    }
};

export const fetchCustomerOnly = () => async (dispatch, getState) => {
    const { access } = getState().auth;
  
    try {
      // Make an HTTP GET request to fetch batch data using the environment variable
      const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/customeronly/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
  
      if (response.status === 200) {
        const customerData = response.data;
        dispatch({
          type: CUSTOMER_ONLY_FETCH_SUCCESS,
          payload: customerData,
        });
        return customerData;
      } else {
        dispatch({
          type: CUSTOMER_ONLY_FETCH_FAIL,
        });
      }
    } catch (error) {
      console.error("Error ONLY_fetching CUSTOMER data:", error);
      dispatch({
        type: CUSTOMER_ONLY_FETCH_FAIL,
      });
    }
};
  
export const fetchAllCustomer = () => async (dispatch, getState) => {
    const { access } = getState().auth;

    try {
    // Make an HTTP GET request to fetch customer data using the environment variable
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/customer/`, {
        headers: {
        Authorization: `Bearer ${access}`,
        },
    });

    if (response.status === 200) {
        const customerData = response.data;
        dispatch({
        type: CUSTOMER_FETCH_ALL_SUCCESS,
        payload: customerData,
        });
    } else {
        dispatch({
        type: CUSTOMER_FETCH_ALL_FAIL,
        });
    }
    } catch (error) {
    console.error("Error fetching customer data:", error);
    dispatch({
        type: CUSTOMER_FETCH_ALL_FAIL,
    });
    }
};

export const deleteCustomer = (id) => async (dispatch, getState) => {
    const { access } = getState().auth;

    try {
        const response = await Axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/customer/${id}/`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });

        if (response.status === 200) {
            // Dispatch a success action if the delete was successful
            dispatch({ type: CUSTOMER_DELETE_SUCCESS });

            // Dispatch an action to update the customer list
            dispatch({ type: CUSTOMER_UPDATE_LIST, payload: id }); // Send the deleted customer ID
        } else {
            // Dispatch a failure action if the delete failed
            dispatch({ type: CUSTOMER_DELETE_FAIL });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: CUSTOMER_DELETE_FAIL });
    }
};

export const fetchCustomerDetails = (id) => async (dispatch, getState) => {
const { access } = getState().auth;

try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/customer/${id}/`, {
    headers: {
        Authorization: `Bearer ${access}`,
    },
    });
    if (response.status === 200) {
    const customerData = response.data; // Access data from the "data" key
    dispatch({
        type: CUSTOMER_FETCH_DETAILS_SUCCESS,
        payload: customerData,
    });
    return customerData;
    } else {
    dispatch({
        type: CUSTOMER_FETCH_DETAILS_FAIL,
    });
    }
} catch (error) {
    console.error("Error fetching customer data:", error);
    dispatch({
    type: CUSTOMER_FETCH_DETAILS_FAIL,
    });
}
};
    
export const saveCustomer = (name, phone, secondary_phone, alternative_phone, town, region) => async (dispatch, getState) => {
const { access } = getState().auth;

const config = {
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${access}`,
    },
    method: 'POST',
    body: JSON.stringify({ name, phone, secondary_phone, alternative_phone, town, region })
};

try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/customer/`, config);

    if (res.ok) {
        const data = await res.json();
        dispatch({
            type: SAVE_CUSTOMER_SUCCESS,
            payload: data,
        });
        return data;
    } else {
        const error = await res.json();
        dispatch({
            type: SAVE_CUSTOMER_FAIL,
            payload: error,
        });
        return { success: false, error };
    }
} catch (error) { 
    dispatch({
    type: SAVE_CUSTOMER_FAIL,
    });
    return { success: false, error: 'Network error' };
}
}

export const editCustomer = (name, phone, secondary_phone, alternative_phone, town, region, id) => async (dispatch, getState) => {
const { access } = getState().auth;

const config = {
    headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${access}`,
    },
    method: 'PUT',
    body: JSON.stringify({ name, phone, secondary_phone, alternative_phone, town, region}),
};

try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/customer/${id}/`, config);

    if (res.ok) {
    const data = await res.json();
    dispatch({
        type: EDIT_CUSTOMER_SUCCESS,
        payload: data,
    });
    return data;
    } else {
    const error = await res.json();
    dispatch({
        type: EDIT_CUSTOMER_FAIL,
        payload: error,
    });
    return { success: false, error };
    }
} catch (error) {
    dispatch({
    type: EDIT_CUSTOMER_FAIL, // Change this to the correct action type
    });
    return { success: false, error: 'Network error' };
}
};

// API handler for the farmer

export const fetchFarmerOnly = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    // Make an HTTP GET request to fetch batch data using the environment variable
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/farmeronly/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const farmerData = response.data;
      dispatch({
        type: FARMER_ONLY_FETCH_SUCCESS,
        payload: farmerData,
      });
      return farmerData;
    } else {
      dispatch({
        type: FARMER_ONLY_FETCH_FAIL,
      });
    }
  } catch (error) {
    console.error("Error ONLY_fetching FARMER data:", error);
    dispatch({
      type: FARMER_ONLY_FETCH_FAIL,
    });
  }
};

export const fetchAllFarmer = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
  // Make an HTTP GET request to fetch FARMER data using the environment variable
  const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/farmer/`, {
      headers: {
      Authorization: `Bearer ${access}`,
      },
  });

  if (response.status === 200) {
      const farmerData = response.data;
      dispatch({
      type: FARMER_FETCH_ALL_SUCCESS,
      payload: farmerData,
      });
  } else {
      dispatch({
      type: FARMER_FETCH_ALL_FAIL,
      });
  }
  } catch (error) {
  console.error("Error fetching FARMER data:", error);
  dispatch({
      type: FARMER_FETCH_ALL_FAIL,
  });
  }
};

export const deleteFarmer = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
      const response = await Axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/farmer/${id}/`, {
          headers: {
              Authorization: `Bearer ${access}`,
          },
      });

      if (response.status === 200) {
          // Dispatch a success action if the delete was successful
          dispatch({ type: FARMER_DELETE_SUCCESS });

          // Dispatch an action to update the FARMER list
          dispatch({ type: FARMER_UPDATE_LIST, payload: id }); // Send the deleted FARMER ID
      } else {
          // Dispatch a failure action if the delete failed
          dispatch({ type: FARMER_DELETE_FAIL });
      }
  } catch (error) {
      console.log(error);
      dispatch({ type: FARMER_DELETE_FAIL });
  }
};

export const fetchFarmerDetails = (id) => async (dispatch, getState) => {
const { access } = getState().auth;

try {
  const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/farmer/${id}/`, {
  headers: {
      Authorization: `Bearer ${access}`,
  },
  });
  if (response.status === 200) {
  const farmerData = response.data; // Access data from the "data" key
  dispatch({
      type: FARMER_FETCH_DETAILS_SUCCESS,
      payload: farmerData,
  });
  return farmerData;
  } else {
  dispatch({
      type: FARMER_FETCH_DETAILS_FAIL,
  });
  }
} catch (error) {
  console.error("Error fetching FARMER data:", error);
  dispatch({
  type: FARMER_FETCH_DETAILS_FAIL,
  });
}
};
  
export const saveFarmer = (name, phone) => async (dispatch, getState) => {
const { access } = getState().auth;

const config = {
  headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${access}`,
  },
  method: 'POST',
  body: JSON.stringify({ name, phone })
};

try {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/farmer/`, config);

  if (res.ok) {
      const data = await res.json();
      dispatch({
          type: SAVE_FARMER_SUCCESS,
          payload: data,
      });
      return data;
  } else {
      const error = await res.json();
      dispatch({
          type: SAVE_FARMER_FAIL,
          payload: error,
      });
      return { success: false, error };
  }
} catch (error) { 
  dispatch({
  type: SAVE_FARMER_FAIL,
  });
  return { success: false, error: 'Network error' };
}
}

export const editFarmer = (name, phone, id) => async (dispatch, getState) => {
const { access } = getState().auth;

const config = {
  headers: {
  'Content-type': 'application/json',
  Authorization: `Bearer ${access}`,
  },
  method: 'PUT',
  body: JSON.stringify({ name, phone}),
};

try {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/farmer/${id}/`, config);

  if (res.ok) {
  const data = await res.json();
  dispatch({
      type: EDIT_FARMER_SUCCESS,
      payload: data,
  });
  return data;
  } else {
  const error = await res.json();
  dispatch({
      type: EDIT_FARMER_FAIL,
      payload: error,
  });
  return { success: false, error };
  }
} catch (error) {
  dispatch({
  type: EDIT_FARMER_FAIL, // Change this to the correct action type
  });
  return { success: false, error: 'Network error' };
}
};

// Api Handler for Orders

export const fetchAllOrders = () => async (dispatch, getState) => {
    const { access } = getState().auth;
  
    try {
      // Make an HTTP GET request to fetch orders data using the environment variable
      const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
  
      if (response.status === 200) {
        const ordersData = response.data;
        dispatch({
          type: ORDERS_FETCH_ALL_SUCCESS,
          payload: ordersData,
        });
      } else {
        dispatch({
          type: ORDERS_FETCH_ALL_FAIL,
        });
      }
    } catch (error) {
      console.error("Error fetching orders data:", error);
      dispatch({
        type: ORDERS_FETCH_ALL_FAIL,
      });
    }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
    const { access } = getState().auth;

    try {
        const response = await Axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/${id}/`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });

        if (response.status === 200) {
            // Dispatch a success action if the delete was successful
            dispatch({ type: ORDER_DELETE_SUCCESS });

            // Dispatch an action to update the customer list
            dispatch({ type: ORDER_UPDATE_LIST, payload: id }); // Send the deleted ORDER ID
        } else {
            // Dispatch a failure action if the delete failed
            dispatch({ type: ORDER_DELETE_FAIL });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: ORDER_DELETE_FAIL });
    }
};

export const fetchOrdersDetails = (id) => async (dispatch, getState) => {
    const { access } = getState().auth;
  
    try {
      const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/${id}/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
  
      if (response.status === 200) {
        const ordersData = response.data.data; // Access data from the "data" key
        dispatch({
          type: ORDERS_FETCH_DETAILS_SUCCESS,
          payload: ordersData,
        });
        return ordersData
      } else {
        dispatch({
          type: ORDERS_FETCH_DETAILS_FAIL,
        });
      }
    } catch (error) {
      console.error("Error fetching orders data:", error);
      dispatch({
        type: ORDERS_FETCH_DETAILS_FAIL,
      });
    }
};

const fetchOrderById = async (id, token) => {
  try {
    // Make an HTTP GET request to your API endpoint
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/ordername/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
  
export const searchOrder = (id) => async (dispatch) => {
    try {
      if (localStorage.getItem('access')) {
        const token = localStorage.getItem('access');
        const response = await fetchOrderById(id, token);
  
        if (response && response.status === 200) {
          const ordersData = await response.json();
          console.log("Customer Data:", ordersData); // Log the customer data
          dispatch({
            type: ORDER_SEARCH_SUCCESS,
            payload: ordersData
          })
          return ordersData; // Return the data received from the API
        } else {
          console.log("API Error:", response); // Log the API response in case of an error
          dispatch({
            type: ORDER_SEARCH_SUCCESS,
            payload: response
          })
          return response; // Return the error response for debugging
        }
      } else {
        // Handle unauthenticated user
        dispatch({
          type: ORDER_SEARCH_FAIL,
        })
        return [];
      }
    } catch (error) {
      console.error("Error fetching customer data:", error); // Log any network errors
      return [];
    }
};

export const saveOrder = (name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount) => async (dispatch, getState) => {
  const { access } = getState().auth;

  const config = {
      headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${access}`,
      },
      method: 'POST',
      body: JSON.stringify({ name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount })
  };

  try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/`, config);

      if (res.ok) {
          const data = await res.json();
          dispatch({
            type: SAVE_ORDERS_SUCCESS,
            payload: data
          });
          return { success: true, data };
      } else {
          const error = await res.json();
          dispatch({
            type: SAVE_ORDERS_FAIL,
            payload: error
          });
          return { success: false, error };
      }
  } catch (error) {
      return { success: false, error: 'Network error' };
  }
}  

export const editOrder = (name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount, id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
    method: 'PUT',
    body: JSON.stringify({ name, phone, customer_id, town, kgs, packaging, discount, transport, transporters, rider, comment, farmer_id, rice_type, vat, farmer_price, price, amount}),
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/orders/${id}/`, config);

    if (res.ok) {
      const data = await res.json();
      dispatch({
        type: EDIT_ORDERS_SUCCESS,
        payload: data,
      });
      return data;
    } else {
      const error = await res.json();
      dispatch({
        type: EDIT_ORDERS_FAIL,
        payload: error,
      });
      return { success: false, error };
    }
  } catch (error) {
    dispatch({
      type: EDIT_ORDERS_FAIL, // Change this to the correct action type
    });
    return { success: false, error: 'Network error' };
  }
};

// Api Handler for Payments

export const fetchAllPayments = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    // Make an HTTP GET request to fetch orders data using the environment variable
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/payments/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const paymentsData = response.data;
      dispatch({
        type: PAYMENTS_FETCH_ALL_SUCCESS,
        payload: paymentsData,
      });
    } else {
      dispatch({
        type: PAYMENTS_FETCH_ALL_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching payment data:", error);
    dispatch({
      type: PAYMENTS_FETCH_ALL_FAIL,
    });
  }
};

export const deletePayment = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
      const response = await Axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/payments/${id}/`, {
          headers: {
              Authorization: `Bearer ${access}`,
          },
      });

      if (response.status === 200) {
          // Dispatch a success action if the delete was successful
          dispatch({ type: PAYMENT_DELETE_SUCCESS });

          // Dispatch an action to update the customer list
          dispatch({ type: PAYMENT_UPDATE_LIST, payload: id }); // Send the deleted PAYMENT ID
      } else {
          // Dispatch a failure action if the delete failed
          dispatch({ type: PAYMENT_DELETE_FAIL });
      }
  } catch (error) {
      console.log(error);
      dispatch({ type: PAYMENT_DELETE_FAIL });
  }
};

export const fetchPaymentDetails = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/payments/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const paymentsData = response.data.data; // Access data from the "data" key
      dispatch({
        type: PAYMENTS_FETCH_DETAILS_SUCCESS,
        payload: paymentsData,
      });
      return paymentsData
    } else {
      dispatch({
        type: PAYMENTS_FETCH_DETAILS_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching orders data:", error);
    dispatch({
      type: PAYMENTS_FETCH_DETAILS_FAIL,
    });
  }
};  

export const savePayment = (orders_id, paying_number, amount, payment_mode, payment, customer_id) => async (dispatch, getState) => {
const { access } = getState().auth;

const config = {
    headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${access}`,
    },
    method: 'POST',
    body: JSON.stringify({ orders_id, paying_number, amount, payment_mode, payment, customer_id })
};

try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/payments/`, config);

    if (res.ok) {
        const data = await res.json();
        dispatch({
          type: SAVE_PAYMENTS_SUCCESS,
          payload: data
        });
        return { success: true, data };
    } else {
        const error = await res.json();
        dispatch({
          type: SAVE_PAYMENTS_FAIL,
          payload: error
        });
        return { success: false, error };
    }
} catch (error) {
    return { success: false, error: 'Network error' };
}
}   

export const editPayment = (orders_id, paying_number, amount, payment_mode, payment, customer_id, id) => async (dispatch, getState) => {
const { access } = getState().auth;

const config = {
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${access}`,
  },
  method: 'PUT',
  body: JSON.stringify({ orders_id, paying_number, amount, payment_mode, payment, customer_id }),
};

try {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/payments/${id}/`, config);

  if (res.ok) {
    const data = await res.json();
    dispatch({
      type: EDIT_PAYMENTS_SUCCESS,
      payload: data,
    });
    return data;
  } else {
    const error = await res.json();
    dispatch({
      type: EDIT_PAYMENTS_FAIL,
      payload: error,
    });
    return { success: false, error };
  }
} catch (error) {
  dispatch({
    type: EDIT_PAYMENTS_FAIL, // Change this to the correct action type
  });
  return { success: false, error: 'Network error' };
}
};

// Api Handler for Invoice

export const fetchAllInvoice = () => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    // Make an HTTP GET request to fetch orders data using the environment variable
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/invoice/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const invoiceData = response.data;
      dispatch({
        type: INVOICE_FETCH_ALL_SUCCESS,
        payload: invoiceData,
      });
    } else {
      dispatch({
        type: INVOICE_FETCH_ALL_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching INVOICE data:", error);
    dispatch({
      type: INVOICE_FETCH_ALL_FAIL,
    });
  }
};

export const deleteInvoice = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
      const response = await Axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/api/invoice/${id}/`, {
          headers: {
              Authorization: `Bearer ${access}`,
          },
      });

      if (response.status === 200) {
          // Dispatch a success action if the delete was successful
          dispatch({ type: INVOICE_DELETE_SUCCESS });

          // Dispatch an action to update the customer list
          dispatch({ type: INVOICE_UPDATE_LIST, payload: id }); // Send the deleted INVOICE ID
      } else {
          // Dispatch a failure action if the delete failed
          dispatch({ type: INVOICE_DELETE_FAIL });
      }
  } catch (error) {
      console.log(error);
      dispatch({ type: INVOICE_DELETE_FAIL });
  }
};

export const fetchInvoiceDetails = (id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  try {
    const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/invoice/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (response.status === 200) {
      const invoiceData = response.data.data; // Access data from the "data" key
      dispatch({
        type: INVOICE_FETCH_DETAILS_SUCCESS,
        payload: invoiceData,
      });
      return invoiceData
    } else {
      dispatch({
        type: INVOICE_FETCH_DETAILS_FAIL,
      });
    }
  } catch (error) {
    console.error("Error fetching INVOICE data:", error);
    dispatch({
      type: INVOICE_FETCH_DETAILS_FAIL,
    });
  }
};

export const saveInvoice = (customer_id, invoice_details) => async (dispatch, getState) => {
  const { access } = getState().auth;

  const config = {
      headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${access}`,
      },
      method: 'POST',
      body: JSON.stringify({ customer_id, invoice_details })
  };

  try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/invoice/`, config);

      if (res.ok) {
          const data = await res.json();
          dispatch({
            type: SAVE_INVOICE_SUCCESS,
            payload: data
          });
          return { success: true, data };
      } else {
          const error = await res.json();
          dispatch({
            type: SAVE_INVOICE_FAIL,
            payload: error
          });
          return { success: false, error };
      }
  } catch (error) {
      return { success: false, error: 'Network error' };
  }
}  