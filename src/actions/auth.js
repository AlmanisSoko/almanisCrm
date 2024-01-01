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

} from './types';

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
      const response = await Axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/api/customer-only/`, {
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

export const saveOrder = (customer_name, phone, customer_id, town, trays, discount, vat, price, amount) => async (dispatch, getState) => {
  const { access } = getState().auth;

  const config = {
      headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${access}`,
      },
      method: 'POST',
      body: JSON.stringify({ customer_name, phone, customer_id, town, trays, discount, vat, price, amount })
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

export const editOrder = (customer_name, phone, customer_id, town, trays, discount, vat, price, amount, id) => async (dispatch, getState) => {
  const { access } = getState().auth;

  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${access}`,
    },
    method: 'PUT',
    body: JSON.stringify({ customer_name, phone, customer_id, town, trays, discount, vat, price, amount}),
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
