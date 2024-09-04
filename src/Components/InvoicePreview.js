import React, { forwardRef } from 'react';

const InvoicePreview = forwardRef((props, ref) => (
    <div ref={ref} className="A4-size">
        <div className="HEad">
            <p>INVOICE</p>
            <ul>
                <li>PHno. 9591 3036</li>
                <li>Email: COMPAny@gmail.com</li>
            </ul>
            <ul>
                <li>#321 521 Bangalore 560047</li>
            </ul>
        </div>
        <div className="SUb-head">
            <div className="BOx1">
                <p>Billed To</p>
                <p>{props.billedTo}</p>
            </div>
            <div className="BOx2">
                <p>Invoice Number</p>
                <p>{props.InvNo}</p>
                <br />
                <p>Date Of Issue</p>
                <p>{props.dateOfIssue}</p>
            </div>
        </div>
        <div className="BOdy">
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>SGST (%)</th>
                        <th>SGST Amount</th>
                        <th>GST (%)</th>
                        <th>GST Amount</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {props.invoiceItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.description}</td>
                            <td>{item.amount}</td>
                            <td>{item.sgst}</td>
                            <td>{item.sgstAmount.toFixed(2)}</td>
                            <td>{item.gst}</td>
                            <td>{item.gstAmount.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>{item.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="6">Total</td>
                        <td>{props.totalQuantity}</td>
                        <td>{props.totalAmount}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        {/* Footer */}
        <div className="footer">
            <div className="left-footer">
                <p>Name:</p>
                <p>Signature:</p>
            </div>
            <div className="right-footer">
                <p>Total: <span className="total-amount">{props.totalAmount}</span></p>
            </div>
        </div>
    </div>
));

export default InvoicePreview;
