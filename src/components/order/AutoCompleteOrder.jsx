import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { searchOrder } from '../../actions/auth';

const AutoCompleteOrder = (props) => {
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

    const handleSearchOrder = async (id) => {
        try {
            const ordersData = await dispatch(searchOrder(id));

            if (Array.isArray(ordersData)) {
                setDatalist(ordersData);
            } else {
                setDatalist([]);
            }
        } catch (error) {
            console.error("Error fetching Order data:", error);
            setDatalist([]);
        }
    };

    const onShowItem = (item) => {
        inputData.current.value = item.id;
        props.showDataInInputs(props.itemPosition, item);
        onBlurChange();
    };    

    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                id="orders_id"
                name="orders_id"
                className="form-control"
                placeholder="Order Number"
                onFocus={onFocusChange}
                autoComplete="off"
                onChange={(e) => {
                    handleSearchOrder(e.target.value);
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
                            {item.id}
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default AutoCompleteOrder;
