import { format, parseISO } from "date-fns";

export const columns_header = [
    {
        Header: "Serial No.",
        accessor: "id",
    },
    {
        Header: "Return ID",
        accessor: "shopifyReturnId",
    },
    {
        Header: "Order Sid",
        accessor: "shopifyOrderId",
    },
    {
        Header: "Order",
        accessor: "orderName",
    },
    {
        Header: "Date of purchase",
        accessor: (value) => {
            if(value.purchasedAt){
                return format(parseISO(value.purchasedAt), 'MM/dd/yyyy');
            }else{
                return "N/A";
            }
        },
    },
    {
        Header: "Date of request",
        accessor: (value) => {
            if(value.requestedAt){
                return format(parseISO(value.requestedAt), 'MM/dd/yyyy');
            }else{
                return "--/--/----";
            }
        },
    },
    {
        Header: "Customer name",
        accessor: "customerName",
    },
    {
        Header: "Reason",
        accessor: "returnReason",
    },
    {
        Header: "Amount",
        // accessor: "variantPrice",
        accessor: (value) => {
            return `$${value.variantPrice}`;
        },
    },
    {
        Header: "Return Status",
        accessor: "status",
    }
];