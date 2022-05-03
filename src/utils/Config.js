class Config {
    static loginUrl = "http://127.0.0.1:8000/api/gettoken/";
    static refreshApiUrl = "http://127.0.0.1:8000/api/refresh_token/";
    static farmerApiUrl = "http://127.0.0.1:8000/api/farmer/";
    static customerApiUrl = "http://127.0.0.1:8000/api/customer/";
    static paymentsApiUrl = "http://127.0.0.1:8000/api/payments/";
    static ordersApiUrl = "http://127.0.0.1:8000/api/orders/";
    static orderNameApiUrl = "http://127.0.0.1:8000/api/orderbyname/";
    static orderByNameApiUrl = "http://127.0.0.1:8000/api/ordername/";
    static customerByNameApiUrl = "http://127.0.0.1:8000/api/customerbyname/";
    static customerNameApiUrl = "http://127.0.0.1:8000/api/customername/";
    static FarmerOnly = "http://127.0.0.1:8000/api/farmeronly/";
    static CustomerOnly = "http://127.0.0.1:8000/api/customeronly/";
    static generateBillApiUrl = "http://127.0.0.1:8000/api/generate_bill_api/";
    static homePageApiUrl = "http://127.0.0.1:8000/api/home_api/";
    static homeUrl = "/neworders";
    static logoutPageUrl = "/logout";

    static sidebarItem = [
        {
            index: "1",
            title: "New Orders",
            url: "/neworders",
            icons: "add_shopping_cart"
        },

        {
            index: "2",
            title: "Payments",
            url: "/payments",
            icons: "payment"
        },

        {
            index: "3",
            title: "Orders",
            url: "/orders",
            icons: "assignment_returned"
        },
       
        {
            index: "4",
            title: "Customer",
            url: "/customer",
            icons: "account_box"
        },

        {
            index: "5",
            title: "Farmer",
            url: "/farmer",
            icons: "spa"
        },

        {
            index: "6",
            title: "Customer Bill",
            url: "/customerbillgenerate",
            icons: "assessment"
        },

        {
            index: "7",
            title: "Dashboard ",
            url: "/dashboard",
            icons: "dashboard"
        },
    ]

}

export default Config;