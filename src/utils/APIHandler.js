import { reactLocalStorage } from "reactjs-localstorage";

const { default: AuthHandler } = require("./AuthHandler");
const { default: Axios } = require("axios");
const { default: Config } = require("./Config");

class APIHandler {
    async checkLogin() {
        if (AuthHandler.checkTokenExpiry()) {
            try{
            var response = await Axios.post(Config.refreshApiUrl, {
                refresh: AuthHandler.getRefreshToken()
            });

            reactLocalStorage.set("token", response.data.access);
        } catch (error) {
            console.log(error);

            //Not using valid refresh token logout user
            AuthHandler.logoutUser();
            window.location = "/";
        }
      }
    }

    // homepage api
    
    async fetchHomePage() {
        await this.checkLogin();

        var response = await Axios.get(Config.homePageApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }


    // farmer api

    async saveFarmerData(
        name, 
        phone
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.post(Config.farmerApiUrl, {
            name: name, 
            phone: phone,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
        });

        return response;
    } 

    async fetchAllFarmer() {
        await this.checkLogin();

        var response = await Axios.get(Config.farmerApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchFarmerDetails(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.farmerApiUrl + "" + id + "/", {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async editFarmerData(
        name, 
        phone, 
        id
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.put(
            Config.farmerApiUrl + "" + id + "/", {
            name: name, 
            phone: phone,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
        });

        return response;
    } 

    // Customer api

    async saveCustomerData(
        name, 
        phone,
        town, 
        region,
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.post(Config.customerApiUrl, {
            name: name,
            phone: phone, 
            town: town, 
            region: region,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
        });

        return response;
    } 

    async fetchAllCustomer() {
        await this.checkLogin();

        var response = await Axios.get(Config.customerApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchCustomerDetails(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.customerApiUrl + "" + id + "/", {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async editCustomerData(
        name, 
        phone,
        town, 
        region, 
        id
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.put(
            Config.customerApiUrl + "" + id + "/", {
                name: name,
                phone: phone, 
                town: town, 
                region: region,
            
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
        });

        return response;
    } 

    // customer by name api

    async fetchCustomerByName(phone)  {
        if (phone !== "") {
            await this.checkLogin();
      
            var response = await Axios.get(Config.customerByNameApiUrl + "" + phone, {
              headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
            });
      
            return response;
          } else {
            return { data: [] };
          }
    }

    async fetchCustomerName(name)  {
        if (name !== "") {
            await this.checkLogin();
      
            var response = await Axios.get(Config.customerNameApiUrl + "" + name, {
              headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
            });
      
            return response;
          } else {
            return { data: [] };
          }
    }

    //payments api

    async savePaymentsData(
        orders_id,
        paying_number,
        amount,
        payment_mode,
        payment,
        balance, 
        customer_id, 
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.post(Config.paymentsApiUrl, {
            orders_id: orders_id,  
            paying_number: paying_number,
            amount: amount,
            payment_mode: payment_mode,
            payment: payment,
            balance: balance,
            customer_id: customer_id,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
        });

        return response;
    } 

    async fetchAllPayment() {
        await this.checkLogin();

        var response = await Axios.get(Config.paymentsApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    // orders api

    async saveOrdersData(
        phone, 
        name,
        customer_id,
        town,
        region, 
        kgs,
        packaging,
        discount,
        transport,
        comment,
        farmer_id,
        price,
        amount,
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.post(Config.ordersApiUrl, {
            phone: phone, 
            name: name,
            customer_id: customer_id,
            town: town,
            region: region,
            kgs: kgs, 
            packaging: packaging,
            discount: discount,
            transport: transport,
            comment: comment,
            farmer_id: farmer_id,
            price: price,
            amount: amount,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
        });

        return response;
    } 

    async fetchAllOrders() {
        await this.checkLogin();

        var response = await Axios.get(Config.ordersApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchOrdersDetails(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.ordersApiUrl + "" + id + "/", {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async updateOrdersRequest(
        //id,
        customer_id,
        name,
        town,
        kgs,
        packaging,
        discount,
        transport,
        farmer_id,
        amount,
        ) {
        await this.checkLogin();
        //Wait Until Token Get Updated
    
        var response = await Axios.put(
          Config.ordersApiUrl + "" + customer_id + "/",
          { 
           // phone: phone, 
           name: name,
           // customer_id: customer_id, 
            town: town,
          //  region: region,
            kgs: kgs, 
            packaging: packaging,
            discount: discount,
            transport: transport,
           // comment: comment,
            farmer_id: farmer_id,
          //  price: price,
            amount: amount,
            status: 1,
          },
          { headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() } }
        );
        return response;
    }

    async editOrdersData(
        phone, 
        name,
        customer_id,
        town,
        region, 
        kgs,
        packaging,
        discount,
        transport,
        comment,
        farmer_id,
        price,
        amount, 
        id
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.put(
            Config.ordersApiUrl + "" + id + "/", {
            phone: phone, 
            name: name,
            customer_id: customer_id,
            town: town,
            region: region,
            kgs: kgs, 
            packaging: packaging,
            discount: discount,
            transport: transport,
            comment: comment,
            farmer_id: farmer_id,
            price: price,
            amount: amount,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
        });

        return response;
    } 

    // farmeronly api

    async fetchFarmerOnly() {
        await this.checkLogin();
    
        var response = await Axios.get(Config.FarmerOnly, {
          headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });
    
        return response;
    }

    // customeronly api

    async fetchCustomerOnly() {
        await this.checkLogin();
    
        var response = await Axios.get(Config.CustomerOnly, {
          headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });
    
        return response;
    }  

    // orderbyname
    
    async fetchOrderByName(customer_name) {
        if (customer_name !== "") {
          await this.checkLogin();
    
          var response = await Axios.get(Config.orderNameApiUrl + "" + customer_name, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
          });
    
          return response;
        } else {
          return { data: [] };
        }
    }

    async fetchOrderName(id) {
        if (id !== "") {
            await this.checkLogin();
      
            var response = await Axios.get(Config.orderByNameApiUrl + "" + id, {
              headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
            });
      
            return response;
          } else {
            return { data: [] };
          }
    }

    // generate bill api

    async generateBill(
            name,
            phone,
            ordersDetails
        ) {
        await this.checkLogin();
    
        var response = await Axios.post(
          Config.generateBillApiUrl,
          {
            name: name,
            phone: phone,
            order_details: ordersDetails,
          },
          {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
          }
        );
    
        return response;
    }

}

export default APIHandler;
