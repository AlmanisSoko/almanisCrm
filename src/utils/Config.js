class Config {
    // static RegisterApiUrl = "http://127.0.0.1:8000/api/register/";
    // static ResetUserApiUrl = "http://127.0.0.1:8000/api/reset-password/";
    // static loginUrl = "http://127.0.0.1:8000/api/gettoken/";
    // static refreshApiUrl = "http://127.0.0.1:8000/api/refresh_token/";
    // static farmerApiUrl = "http://127.0.0.1:8000/api/farmer/";
    // static customerApiUrl = "http://127.0.0.1:8000/api/customer/";
    // static paymentsApiUrl = "http://127.0.0.1:8000/api/payments/";
    // static debtorsApiUrl = "http://127.0.0.1:8000/api/debtors/";
    // static overdueApiUrl = "http://127.0.0.1:8000/api/overdue/";
    // static totalOverdueApiUrl = "http://127.0.0.1:8000/api/overpaid/";
    // static totalUnderdueApiUrl = "http://127.0.0.1:8000/api/underpaid/";
    // static ordersApiUrl = "http://127.0.0.1:8000/api/orders/";
    // static regionApiUrl = "http://127.0.0.1:8000/api/region/";
    // static RicePriceApiUrl = "http://127.0.0.1:8000/api/rice/";
    // static orderNameApiUrl = "http://127.0.0.1:8000/api/orderbyname/";
    // static orderByNameApiUrl = "http://127.0.0.1:8000/api/ordername/";
    // static invoiceApiUrl = "http://127.0.0.1:8000/api/invoice/";
    // static ticketApiUrl = "http://127.0.0.1:8000/api/tickets/";
    // static stockApiUrl = "http://127.0.0.1:8000/api/stock/";
    // static customerByNameApiUrl = "http://127.0.0.1:8000/api/customerbyname/";
    // static customerNameApiUrl = "http://127.0.0.1:8000/api/customername/";
    // static FarmerOnly = "http://127.0.0.1:8000/api/farmeronly/";
    // static FarmerStockName = "http://127.0.0.1:8000/api/farmerstockname/";
    // static userApiUrl = "http://127.0.0.1:8000/api/userinfo/"
    // static CustomerOnly = "http://127.0.0.1:8000/api/customeronly/";
    // static RegionOnly = "http://127.0.0.1:8000/api/regiononly/";
    // static generateBillApiUrl = "http://127.0.0.1:8000/api/generate_bill_api/";
    // static homePageApiUrl = "http://127.0.0.1:8000/api/home_api/";
    // static customerLocationUrl = "http://127.0.0.1:8000/api/customer_location/";
    // static homeUrl = "/neworders";
    // static baseUrl = "/base";
    // static logoutPageUrl = "/logout";
    // Almanis_Soko@2023
    
    BASE_URL = "https://soko.barakapishoriricemillers.co.ke/"

    static RegisterApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/register/";
    static ResetUserApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/reset-password/";
    static loginUrl = "https://soko.barakapishoriricemillers.co.ke/api/gettoken/";
    static refreshApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/refresh_token/";
    static farmerApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/farmer/";
    static customerApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/customer/";
    static paymentsApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/payments/";
    static debtorsApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/debtors/";
    static overdueApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/overdue/";
    static totalOverdueApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/overpaid/";
    static totalUnderdueApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/underpaid/";
    static ordersApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/orders/";
    static regionApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/region/";
    static orderNameApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/orderbyname/";
    static invoiceApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/invoice/";
    static orderByNameApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/ordername/";
    static RicePriceApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/rice/";
    static customerByNameApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/customerbyname/";
    static customerNameApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/customername/";
    static FarmerOnly = "https://soko.barakapishoriricemillers.co.ke/api/farmeronly/";
    static CustomerOnly = "https://soko.barakapishoriricemillers.co.ke/api/customeronly/";
    static ticketApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/tickets/";
    static stockApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/stock/";
    static FarmerStockName = "https://soko.barakapishoriricemillers.co.ke/api/farmerstockname/";
    static generateBillApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/generate_bill_api/";
    static homePageApiUrl = "https://soko.barakapishoriricemillers.co.ke/api/home_api/";
    static customerLocationUrl = "https://soko.barakapishoriricemillers.co.ke/api/customer_location/";
    static homeUrl = "/neworders";
    static baseUrl = "/base"
    static logoutPageUrl = "/logout";

    static sidebarItem = [
        {
            index: "1",
            title: " New Orders",
            url: "/neworders",
            icons: "mdi mdi-cart-plus icon-sm"
        },

        // {
        //     index: "2",
        //     title: "Mpesa Payments",
        //     url: "/mpesapayments",
        //     icons: "phonelink_ring"
        // },

        {
            index: "3",
            title: "Payments",
            url: "/payments",
            icons: "mdi mdi-credit-card icon-sm"
        },

        {
            index: "4",
            title: "Orders",
            url: "/orders",
            icons: "mdi mdi-cart icon-sm"
        },
       
        {
            index: "5",
            title: "Customer",
            url: "/customer",
            icons: "mdi mdi-account-multiple icon-sm"
        },

        {
            index: "6",
            title: "Farmer",
            url: "/farmer",
            icons: "mdi mdi-cow icon-sm"
        },

        {
            index: "16",
            title: "Farmer Stock",
            url: "/stock",
            icons: "mdi mdi-barley icon-sm"
        },

        {
            index: "7",
            title: "Customer Invoice",
            url: "/customerbillgenerate",
            icons: "mdi mdi-poll-box icon-sm"
        },

        {
            index: "13",
            title: "Deliver Note",
            url: "/delivery",
            icons: "mdi mdi-truck-delivery icon-sm"
        },

        {
            index: "14",
            title: "Invoices",
            url: "/invoice",
            icons: "mdi mdi-barcode-scan icon-sm"
        },

        {
            index: "15",
            title: "Tickets",
            url: "/tickets",
            icons: "mdi mdi-ticket icon-sm"
        },

        {
            index: "8",
            title: "PKT",
            url: "/analytics",
            icons: "mdi mdi-chart-pie icon-sm"
        },

        {
            index: "9",
            title: "Dashboard ",
            url: "/dashboard",
            icons: "mdi mdi-blackberry icon-sm"
        },
    ]
    
    static sidebar = [
        {
            index: "1",
            title: "Select Extension",
            url: "/base",
            icons: "error_outline"
        },
    ]

}

export default Config;

