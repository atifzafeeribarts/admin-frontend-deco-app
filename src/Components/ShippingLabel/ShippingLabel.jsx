import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode.react';
import Barcode from 'react-barcode';
import { useLocation } from "react-router-dom";
import { orderDeatilsApi } from "../../Services/api";
import decoTVLogo from "../../assets/DecoTVLogo.png";
import fmtvTVLogo from "../../assets/FMTVlogo.png";
import madeinUSLogo from "../../assets/made-in-us-logo.jpg";

const ShippingLabel = () => {
    const refhtml = useRef(null);
    const [barcode_id, setBarcode_id] = useState('');
    const [qrcode_id, setQrcode_id] = useState('');
    const [dataforlabel, setDataforlabel] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [shippinglabelgenerate_storename, setShippinglabelgenerate_storename] = useState('');
    const [shippinglabelgenerate_id, setShippinglabelgenerate_id] = useState('');
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        setShippinglabelgenerate_storename(pathname.split('/')[2]);
        setShippinglabelgenerate_id(pathname.split('/')[4]);
        if (shippinglabelgenerate_storename !== "" && shippinglabelgenerate_id !== "") {
            orderDeatilsApi(shippinglabelgenerate_storename, shippinglabelgenerate_id)
                .then((obj) => {
                    setDataforlabel(obj);
                    console.log(obj);
                    setIsLoading(false);
                    setBarcode_id(shippinglabelgenerate_id);
                    setQrcode_id(shippinglabelgenerate_id);
                }).catch((err) => console.log(err));
        }
    }, [pathname, shippinglabelgenerate_storename]);

    const downloadPDF = () => {
        const input = refhtml.current;
        html2canvas(input, { useCORS: true, scale: 1 }).then((canvas) => {
            const link = document.createElement('a');
            link.download = 'shippinglabel.png';
            link.href = canvas.toDataURL();
            link.click();
        }).catch((err) => {
            console.log(err);
        });
    };

    if (isLoading) {
        return (
            <div className="text-center h-[calc(100vh-64px-34px)] flex items-center justify-center gap-3">
                <svg aria-hidden="true" className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-[var(--dark-light-brown)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="text-3xl font-medium text-[var(--dark-light-brown)]"> Loading...</span>
            </div>
        );
    }
    return (
        <>
            <h1 className="text-[var(--text-color)] text-2xl font-semibold mb-4 uppercase text-center max-sm:text-xl">Shipping Label Generator</h1>
            <div className="p-5 bg-[var(--light-cream-background)] flex flex-col items-center justify-center overflow-x-auto">
                <div id="refhtml" className="w-[576px] h-[384px] overflow-hidden aspect-[576/384] bg-white" ref={refhtml}>
                    <div className='flex h-full w-full'>
                        <div className="w-[120px] relative px-2 py-1 flex flex-col bg-[#8DC73F]">
                            <QRCode value={barcode_id} size={100} />
                            <div className="-rotate-90 text-xl font-semibold text-black text-center w-[276px] h-[100px] absolutex left-0x -translate-x-[88px] translate-y-[90px] flex flex-col items-center">
                                <span>Compatible with</span><span>SAMSUNG The Frame</span>
                                <span className='text-3xl font-bold'>2021 - 2023</span>
                            </div>
                        </div>
                        <div className="px-4 py-2">
                            <div className="flex gap-2">
                                <div className='size-[150px] shrink-0'><img className="w-full h-full object-contain" src={dataforlabel?.returnItem.imageUrl} alt="Item" /></div>
                                <div className="text-black text-base">
                                    <div className="pb-2">
                                        <h1 className="text-xl font-bold">{dataforlabel?.returnItem.productName}</h1>
                                        <h2>Fits <b>{dataforlabel?.returnItem.variantTitle}</b> Samsung The Frame TV's</h2>
                                        {dataforlabel?.returnItem.sku ? <h2>SKU: {dataforlabel?.returnItem.sku}</h2> : null}
                                    </div>
                                    <div className="text-center flex flex-col items-center justify-center">
                                        <Barcode value={qrcode_id} className="w-[200px] h-[120px]" />
                                    </div>
                                    <div className="flex justify-between items-center gap-1 py-2">
                                        <div>
                                            <h2>Proudly boxed by Karen K.</h2>
                                            <h2>2024-02-19T:15:50:19</h2>
                                        </div>
                                        <img className="size-[45px] object-contain" src={madeinUSLogo} alt="Made in US" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between gap-4 border-t-2 border-[var(--dark-light-brown)] pt-3">
                                    <div className="w-[140px] shrink-0">
                                        <img className="object-contain" src={shippinglabelgenerate_storename === "deco-tv-frames" ? decoTVLogo : fmtvTVLogo} alt="Store Logo" />
                                    </div>
                                    <div className="font-semibold text-base text-[var(--dark-light-brown)]">
                                        <p>Offered by {shippinglabelgenerate_storename === "deco-tv-frames" ? "Deco TV Frame" : "Frame My TV"}</p>
                                        <p>Made in Methuen, Massachusetts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={downloadPDF} className="bg-[var(--dark-light-brown)] text-[var(--white-color)] border-[var(--dark-light-brown)] py-2 px-4 rounded-md border-2 text-sm font-medium uppercase my-8 mx-auto block">Download</button>
        </>
    );
}

export default ShippingLabel;
