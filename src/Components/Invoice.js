import React, { useState, useRef } from 'react';
import ReactToPrint from 'react-to-print';
import InvoicePreview from './InvoicePreview';

function Invoice() {
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ description: '', amount: 0, quantity: 1, sgst: 2, gst: 2 });
    const [billedTo, setBilledTo] = useState('');
    const [Invno, setInvno] = useState('');
    const [dateOfIssue, setDateOfIssue] = useState('');
    const componentRef = useRef();

    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleBilledToChange = (e) => {
        setBilledTo(e.target.value);
    };

    const handleDateOfIssueChange = (e) => {
        setDateOfIssue(e.target.value);
    };

    const handleInvoNO = (e) => {
        setInvno(e.target.value);
    };

    const addItem = () => {
        const sgstAmount = (newItem.amount * newItem.sgst) / 100;
        const gstAmount = (newItem.amount * newItem.gst) / 100;
        const totalAmount = (Number(newItem.amount) + sgstAmount + gstAmount) * Number(newItem.quantity);

        setInvoiceItems([...invoiceItems, { ...newItem, sgstAmount, gstAmount, total: totalAmount }]);
        setIsModalOpen(false);
        setNewItem({ description: '', amount: 0, quantity: 1, sgst: 0, gst: 0 });
    };

    const removeItem = (index) => {
        const updatedItems = invoiceItems.filter((_, i) => i !== index);
        setInvoiceItems(updatedItems);
    };

    const calculateTotalQuantity = () => {
        return invoiceItems.reduce((total, item) => total + Number(item.quantity), 0);
    };

    const calculateTotalAmount = () => {
        return invoiceItems.reduce((total, item) => total + Number(item.total), 0);
    };

    return (
        <div>
            <div className="HEad">
                <p>INVOICE</p>
                <ul>
                    <li>PHno. 9591 3036</li>
                    <li>Email: Integral@gmail.com</li>
                </ul>
                <ul>
                    <li>#321 521 Bangalore 560047</li>
                </ul>
            </div>

            <div className="SUb-head">
                <div className="BOx1">
                    <p>Billed To</p>
                    <input type='text' value={billedTo} onChange={handleBilledToChange} />
                </div>

                <div className="BOx2">
                    <p>Invoice Number</p>
                    <input type='text' value={Invno} onChange={handleInvoNO} />
                    <br />
                    <p>Date Of Issue</p>
                    <input type='date' value={dateOfIssue} onChange={handleDateOfIssueChange} />
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.amount}</td>
                                <td>{item.sgst}</td>
                                <td>{item.sgstAmount.toFixed(2)}</td>
                                <td>{item.gst}</td>
                                <td>{item.gstAmount.toFixed(2)}</td>
                                <td>{item.quantity}</td>
                                <td>{item.total.toFixed(2)}</td>
                                <td>
                                    <button onClick={() => removeItem(index)} className="REmove-button">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6">Total</td>
                            <td>{calculateTotalQuantity()}</td>
                            <td>{calculateTotalAmount().toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>

                <div className="BUttons">
                    <button className="ADd-button" onClick={() => setIsModalOpen(true)}>ADD ITEM</button>
                    
                    <ReactToPrint
                        trigger={() => <button className="PRint-button">PRINT INVOICE</button>}
                        content={() => componentRef.current}
                    />
                </div>

                <div style={{ display: "none" }}>
                    <InvoicePreview 
                        ref={componentRef} 
                        invoiceItems={invoiceItems} 
                        billedTo={billedTo} 
                        InvNo={Invno} 
                        dateOfIssue={dateOfIssue} 
                        totalQuantity={calculateTotalQuantity()}
                        totalAmount={calculateTotalAmount().toFixed(2)}
                    />
                </div>

                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Add New Item</h3>
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={newItem.description}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                value={newItem.amount}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="sgst"
                                placeholder="SGST (%)"
                                value={newItem.sgst}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="gst"
                                placeholder="GST (%)"
                                value={newItem.gst}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={newItem.quantity}
                                onChange={handleChange}
                            />
                            <button onClick={addItem}>Add</button>
                            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="footer">
                <div className="left-footer">
                    <p>Name:</p>
                    <p>Signature:</p>
                </div>
                <div className="right-footer">
                    <p>Total: <span className="total-amount">{calculateTotalAmount().toFixed(2)}</span></p>
                </div>
            </div>
        </div>
    );
}

export default Invoice;
