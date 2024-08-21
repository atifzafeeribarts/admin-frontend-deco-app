import { format, parseISO  } from "date-fns";

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
        accessor: "purchasedAt",
        Cell: (row) => format(parseISO(row.value), 'MM/dd/yyyy'),
    },
    {
        Header: "Date of request",
        accessor: "requestedAt",
        Cell: (row) => format(parseISO(row.value), 'MM/dd/yyyy'),
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
        Header: "Amount($)",
        accessor: "variantPrice",
    },
    {
        Header: "Return Status",
        accessor: "status",
    }
];