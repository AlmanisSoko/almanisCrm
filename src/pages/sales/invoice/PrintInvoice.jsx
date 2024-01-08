// PrintableInvoice.js
import React from 'react';
import navLogo from '../../../assets/logo/logo192.png'

const PrintableInvoice = ({ invoiceData, currentDate }) => (
  <div id="bill">
    <div className="card my-sm-5 my-lg-0">
        <div className="card-header text-center">
            <div className="row justify-content-between">
                <div className="col-md-4 text-start">
                    <img className="mb-2 w-25 p-2" src={navLogo} alt="Logo"/>
                    <h6 className='text-lg1 '>
                        Almanis Soko, <br/> Mutithi, Kenya
                    </h6>
                    <p className="d-block text-secondary text-lg1 ">tel: +254 (0) 792 902809</p>
                </div>
                <div className="col-lg-3 col-md-7 text-md-end text-start mt-5">
                    <h6 className="d-block mt-2 mb-0 text-lg1 ">Billed to: {invoiceData.name}</h6>
                    <p className="text-secondary text-lg1 ">
                        {invoiceData.phone}<br/>
                        {invoiceData.town}
                    </p>
                </div>
            </div>

            <br/>

            <div className="row justify-content-md-between">
                <div className="col-md-4 mt-auto">
                    <h6 className="mb-0 text-start text-secondary text-lg1 ">
                        Invoice no
                    </h6>
                    <h5 className="text-start mb-0 text-lg1 ">
                        #INV{invoiceData.id}
                    </h5>
                </div>
                <div className="col-lg-5 col-md-7 mt-auto">
                    <div className="row mt-md-5 mt-4 text-md-end text-start">
                        <div className="col-md-12">
                            <h6 className="text-secondary mb-0 text-lg1 ">Invoice date:</h6>
                        
                            <h6 className="text-dark mb-0 text-lg1 ">
                                {currentDate.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="card-body">
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive border-radius-lg">
                        {invoiceData.invoice_details.length > 0 && (
                            <table className="table text-right">
                                <thead className="bg-default">
                                    <tr>
                                        <th scope="col" className="pe-2 text-start ps-2 text-white text-lg1 " colSpan="4">
                                            OrderNo
                                        </th>
                                        <th scope="col" className="pe-2 text-white text-lg1 " colSpan="4">
                                           Description
                                        </th>
                                        <th scope="col" className="pe-2 text-white text-lg1 " colSpan="4">
                                            Kilos
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceData.invoice_details.map((detail) => (
                                        <tr key={detail.id}>
                                            <td className="text-start text-lg1 " colSpan="4">{detail.orders.id}</td>
                                            <td className="ps-4 text-lg1 " colSpan="4">{detail.orders.comment}</td>
                                            <td className="ps-4 text-lg1 " colSpan="4">
                                                {detail.orders.kgs}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th className="h5 ps-4 text-lg1 " colSpan="5">
                                            Total
                                        </th>
                                        <th colSpan="4" className="text-right text-lg1 h5 ps-4">
                                            {invoiceData.invoice_details.reduce((acc, detail) => acc + parseFloat(detail.orders.amount), 0).toLocaleString('en-KE', {
                                                style: 'currency',
                                                currency: 'KES',
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className="card-footer mt-md-5 mt-4">
            <div className="row">
                <div className="col-lg-5 text-left text-lg1 ">
                    <h5>Thank you!</h5>
                    <p className="text-secondary text-lg1 ">
                        If you encounter any issues related to the invoice you can contact us at:
                    </p>
                    <h6 className="text-secondary mb-0 text-lg1 ">
                        email:
                        <span className="text-dark text-lg1 "> 
                            almanisenterprise001@gmail.com
                        </span>
                    </h6>
                </div>
                
            </div>
        </div>
    </div>
  </div>
);

export default PrintableInvoice;
