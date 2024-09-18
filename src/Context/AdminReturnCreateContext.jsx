import React, { useState } from 'react'
import ContextProvider from './ContextProvider';

const AdminReturnCreateContext = ({ children }) => {
    const [requestpage, setrequestpage] = useState(0);
    const [loading, setLoading] = useState(false);
    // Setting Order Details which is coming from API
    const [orderDetailData, setorderDetailData] = useState(null);
    // Setting Choosen Items by Customer with Reason 
    const [choosenItems, setChoosenItems] = useState([]);
    // Setting File for Images Upload
    const [file, setFile] = useState([]);
    // Setting Store Name on First Page
    const [storeName, setstoreName] = useState('');
    const [returnIdOnSubmission, setreturnIdOnSubmission] = useState('');
    const contextValue = {
        requestpage, setrequestpage,
        loading, setLoading,
        orderDetailData, setorderDetailData,
        choosenItems, setChoosenItems,
        file, setFile,
        storeName, setstoreName,
        returnIdOnSubmission, setreturnIdOnSubmission
    };
    return (
        <ContextProvider.Provider value={contextValue}>
            {children}
        </ContextProvider.Provider>
    );
}
export default AdminReturnCreateContext;
