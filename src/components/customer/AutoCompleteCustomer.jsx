import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { searchCustomer } from '../../actions/auth'

const AutoCompleteCustomer = (props) => {
    const [onFocus, setOnFocus] = useState(false);
    const [datalist, setDatalist] = useState([]);
    const inputData = useRef(null);
    const dispatch = useDispatch();

    const onFocusChange = () => {
        setOnFocus(true);
    };

    const onBlurChange = () => {
        setOnFocus(false);
    };

    const handleSearchCustomer = async (phone) => {
        try {
            const customerData = await dispatch(searchCustomer(phone));

            if (Array.isArray(customerData)) {
                setDatalist(customerData);
            } else {
                setDatalist([]);
            }
        } catch (error) {
            console.error("Error fetching customer data:", error);
            setDatalist([]);
        }
    };

    const onShowItem = (item) => {
        inputData.current.value = item.phone;
        props.showDataInInputs(props.itemPosition, item);
        onBlurChange();
    };    

    return (
        <div style={{ position: 'relative' }}>
            <label>Phone</label>
            <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                placeholder="Phone"
                onFocus={onFocusChange}
                autoComplete="off"
                onChange={(e) => {
                    handleSearchCustomer(e.target.value);
                }}
                ref={inputData}
            />
            {onFocus === true && datalist.length > 0 ? (
                <ul
                    style={{
                        listStyle: "none",
                        margin: 0,
                        padding: 0,
                        border: "1px solid lightgrey",
                        boxShadow: "1px 1px 1px lightgrey",
                        position: "absolute",
                        top: "100%",
                        width: "100%",
                        zIndex: 1,
                        background: "white",
                        maxHeight: "150px",
                        overflowY: "auto",
                    }}
                >
                    {datalist.map((item) => (
                        <li
                            key={item}
                            style={{ padding: 5, borderBottom: "1px solid lightgrey" }}
                            onClick={() => onShowItem(item)}
                        >
                            {item.phone}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default AutoCompleteCustomer;
