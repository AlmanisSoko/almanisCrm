import { reactLocalStorage } from "reactjs-localstorage";
import Axios from "axios";

const { default: AuthHandler } = require("./AuthHandler");
//const { default: Axios } = require("axios");
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

    // Register user
    async saveUserData(
        name, 
        phone,
        email,
        password
        ) {

        var response = await Axios.post(Config.RegisterApiUrl, {
            name: name, 
            phone: phone,
            email: email,
            password: password
        });

        return response;
    } 

    async resetUserData(
        email
        ) {

        var response = await Axios.post(Config.ResetUserApiUrl, {
            email: email
        });

        return response;
    } 

    async fetchUserData() {
        await this.checkLogin();

        var response = await Axios.get(Config.userApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }
 
    // Dashboard api 
    
    async fetchHomePage() {
        await this.checkLogin();

        var response = await Axios.get(Config.homePageApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    // Customer Location api

    async fetchCustomerLocation() {
        await this.checkLogin();

        var response = await Axios.get(Config.customerLocationUrl, {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
        });

        return response;
    }

    // Rice Price api
    
    async saveRicePrice(
        paddy_rice,
        paddy_date,
        paddy_komboka,
        komboka_date,
        pishori,
        pishori_date,
        komboka,
        rice_date,
    ) {
        // wait for token to be updated
        await this.checkLogin();

        var response = await Axios.post(Config.RicePriceApiUrl, {
            paddy_rice: paddy_rice,
            paddy_date: paddy_date,
            paddy_komboka: paddy_komboka,
            komboka_date: komboka_date,
            pishori: pishori,
            pishori_date: pishori_date,
            komboka: komboka,
            rice_date: rice_date,
        },
        {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
        });

        return response;
    }

    async fetchRicePrice() {
        await this.checkLogin();

        var response = await Axios.get(Config.RicePriceApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchRicePriceDetails(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.RicePriceApiUrl + "" + id + "/", {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async editRicePrice(
        paddy_rice,
        paddy_date,
        paddy_komboka,
        komboka_date,
        pishori,
        pishori_date,
        komboka,
        rice_date,
        id,
    ) {
        // wait for token to be updated
        await this.checkLogin();

        var response = await Axios.put(Config.RicePriceApiUrl + "" + id + "/", {
            paddy_rice: paddy_rice,
            paddy_date: paddy_date,
            paddy_komboka: paddy_komboka,
            komboka_date: komboka_date,
            pishori: pishori,
            pishori_date: pishori_date,
            komboka: komboka,
            rice_date: rice_date,
        },
        {
            headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() }
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
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}
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
        secondary_phone,
        alternative_phone,
        town, 
        region,
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.post(Config.customerApiUrl, {
            name: name,
            phone: phone,
            secondary_phone: secondary_phone, 
            alternative_phone: alternative_phone,
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
        secondary_phone,
        alternative_phone,
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
                secondary_phone: secondary_phone, 
                alternative_phone: alternative_phone,
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

    async fetchPaymentDetails(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.paymentsApiUrl + "" + id + "/", {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async editPaymentData(
        orders_id,
        paying_number,
        amount,
        payment_mode,
        payment,
        customer_id,  
        id
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.put(
            Config.paymentsApiUrl + "" + id + "/", {
                orders_id: orders_id,  
                paying_number: paying_number,
                amount: amount,
                payment_mode: payment_mode,
                payment: payment,
                customer_id: customer_id,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
        });

        return response;
    } 

    async deletePayment(id) {
        // wait for token to be updated    
        await this.checkLogin();

        try {
            var response = await Axios.delete(Config.paymentsApiUrl + id + "/", {
                headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
            });
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async fetchUnderPayment() {
        await this.checkLogin();

        var response = await Axios.get(Config.debtorsApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchOverPayment() {
        await this.checkLogin();

        var response = await Axios.get(Config.overdueApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchOverPaid() {
        await this.checkLogin();

        var response = await Axios.get(Config.totalOverdueApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchUnderPaid() {
        await this.checkLogin();

        var response = await Axios.get(Config.totalUnderdueApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    // tickets api

    async fetchAllTickets() {
        await this.checkLogin();

        var response = await Axios.get(Config.ticketApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchTicketDetails(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.ticketApiUrl + "" + id + "/", {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    // invoice api

    async saveInvoiceData(
        name,
        phone,
        town,
        total,
        invoice_details
    ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.post(Config.invoiceApiUrl, {
            name: name,
            phone: phone,
            town: town,
            total: total,
            invoice_details: invoice_details
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}
        });

        return response;
    }

    async fetchAllInvoice() {
        await this.checkLogin();

        var response = await Axios.get(Config.invoiceApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchInvoiceDetails(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.invoiceApiUrl + "" + id + "/", {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async deleteInvoiceData(id){
        // wait for token to be updated    
        await this.checkLogin();

        try {
            var response = await Axios.delete(Config.invoiceApiUrl + id + "/", {
                headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
            });
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    

    // orders api

    async saveOrdersData(
        phone, 
        name,
        customer_id,
        town, 
        kgs,
        packaging,
        discount,
        transport,
        rider,
        comment,
        farmer_id,
        rice_type,
        vat,
        farmer_price,
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
            kgs: kgs, 
            packaging: packaging,
            discount: discount,
            transport: transport,
            rider: rider,
            comment: comment,
            farmer_id: farmer_id,
            rice_type: rice_type,
            vat: vat,
            farmer_price: farmer_price,
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
        phone,
        name,
        customer_id,
        town,
        kgs,
        packaging,
        discount,
        transport,
        rider,
        comment,
        farmer_id,
        rice_type,
        vat,
        farmer_price,
        price,
        amount,
        ) {
        await this.checkLogin();
        //Wait Until Token Get Updated
    
        var response = await Axios.put(
          Config.ordersApiUrl + "" + customer_id + "/",
          { 
            phone: phone, 
            name: name,
            customer_id: customer_id, 
            town: town,
            kgs: kgs, 
            packaging: packaging,
            discount: discount,
            transport: transport,
            rider: rider,
            comment: comment,
            farmer_id: farmer_id,
            rice_type: rice_type,
            vat: vat,
            farmer_price: farmer_price,
            price: price,
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
        kgs,
        packaging,
        discount,
        transport,
        rider,
        comment,
        farmer_id,
        rice_type,
        vat,
        farmer_price,
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
            kgs: kgs, 
            packaging: packaging,
            discount: discount,
            transport: transport,
            rider: rider,
            comment: comment,
            farmer_id: farmer_id,
            rice_type: rice_type,
            vat: vat,
            farmer_price: farmer_price,
            price: price,
            amount: amount,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
        });

        return response;
    } 

    async deleteOrdersData(id){
        // wait for token to be updated    
        await this.checkLogin();

        try {
            var response = await Axios.delete(Config.ordersApiUrl + id + "/", {
                headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
            });
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // farmeronly api

    async fetchFarmerOnly() {
        await this.checkLogin();
    
        var response = await Axios.get(Config.FarmerOnly, {
          headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });
    
        return response;
    }

    // Stock Only Api

    async fetchStockOnly() {
        await this.checkLogin();
    
        var response = await Axios.get(Config.FarmerStockName, {
          headers: { Authorization: "Bearer " + AuthHandler.getLoginToken() },
        });
    
        return response;
    }

    // stock api

    async saveStockData( 
        farmer_id,
        rice_type,
        in_stock
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.post(Config.stockApiUrl, { 
            farmer_id: farmer_id,
            rice_type: rice_type,
            in_stock: in_stock,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()}
        });

        return response;
    } 

    async fetchAllStock() {
        await this.checkLogin();

        var response = await Axios.get(Config.stockApiUrl, {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async fetchStockDetails(id) {
        await this.checkLogin();

        var response = await Axios.get(Config.stockApiUrl + "" + id + "/", {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()} 
        });

        return response;
    }

    async editStockData( 
        farmer_id, 
        rice_type,
        in_stock,
        id
        ) {
        // wait for token to be updated    
        await this.checkLogin();

        var response = await Axios.put(
            Config.stockApiUrl + "" + id + "/", {
            farmer_id: farmer_id,
            rice_type: rice_type,
            in_stock: in_stock,
        },
        {
            headers: {Authorization: "Bearer " + AuthHandler.getLoginToken()
        }
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
