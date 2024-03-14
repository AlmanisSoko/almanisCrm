import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import HeaderNav from '../../../components/HeaderNav'
import { fetchInvoiceDetails } from '../../../actions/auth'
import { connect } from 'react-redux';
import PrintableInvoice from './PrintInvoice';

const DownloadInvoice = ({ isAuthenticated, fetchInvoiceDetails, invoiceDetails }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentDate, setCurrentDate] = useState(new Date());

    // set responsive styles
    const mobileStyle = {
        width: '100%',
        marginLeft: '0',
    };

    const desktopStyle =  {
        width: 'calc(100% - 265px)',
        marginLeft: '265px',
    };

    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const [invoiceData, setInvoiceData] = useState({
        id: 0,
        name: '',
        phone: '',
        town: '',
        inv_date: '',
        invoice_details: []
    })
    
    useEffect(() => {
        if (!isAuthenticated && !id) {
            navigate('/');
        } else {
            async function fetchData() {
                try {
                  const invoiceData = await fetchInvoiceDetails(id);
                  console.log('Customer Data:', invoiceData); // Debugging statement
          
                  if (invoiceData && invoiceData) {
                    const invoice = invoiceData; // Access the correct structure
                    console.log('Fetched Data:', invoice); // Debugging statement
                    
                    const invoices = invoiceData; 
                    console.log('All data: ', invoices)
                    // setinvoices(invoices)
          
                    setInvoiceData({
                      id: invoice?.id || '',
                      name: invoice?.customer.name || '',
                      phone: invoice?.customer.phone || '',
                      town: invoice?.customer.town || '',
                      inv_date: invoice?.added_on || '',
                      invoice_details: invoice?.invoice_details || []
                    });
                  }
                  // Additional logic to set other state variables if needed
                  
                } catch (error) {
                  console.error('Error fetching customer data:', error);
                  // Handle error, e.g., show an error message to the user
                }
              }
              fetchData();
        }
    }, [isAuthenticated, navigate, fetchInvoiceDetails, id]);

    const Print = () => {   
        let printContents = document.getElementById('bill').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents; 
    }

    return (
        <>
            <div className="min-height-300 bg-dark position-absolute w-100"></div>
            <HeaderNav />
            
            <div style={mediaQuery.matches ? desktopStyle : mobileStyle}>
                <div className="container-fluid my-5 py-2">
                    <div className="d-sm-flex justify-content-between">
                        <div className="dropdown d-inline">
                            <Link to="/invoice" className="btn btn-outline-white">
                                <i className="ni ni-curved-next"></i> Back
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8 col-sm-10 mx-auto" >
                            <form className="" action="index.html" method="post" >
                               
                                <PrintableInvoice invoiceData={invoiceData} currentDate={currentDate} id="bill" />
                            </form>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-12 text-md-end ">
                            <button className="btn btn-primary mt-lg-7 mb-0" onClick={() => Print()} type="button" name="button">
                            <i className="fa-solid fa-print"></i> Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    invoiceDetails: state.auth.invoiceDetails,
    invoice: state.auth.invoice
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchInvoiceDetails: (invoice_id) => dispatch(fetchInvoiceDetails(invoice_id))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(DownloadInvoice)
