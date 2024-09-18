import React, { useState } from 'react'
import { ImNewTab } from "react-icons/im";
import Dropzone from "react-dropzone";
import { TbCirclePlus } from "react-icons/tb";

const ShippingLabelandTracking = ({ data }) => {
    const [file, setFile] = useState(null);
    const [option, setOption] = useState("upload");
    return (
        <>
            {data?.status == "OPEN" ? (
                <div className="at-return-card ">
                    <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                        Return Shipping Options
                    </div>
                    <div className="flex gap-1 items-center pb-3">
                        <input
                            type="radio"
                            id="uploadLabel"
                            name="shippingOption"
                            value="upload"
                            checked={option === "upload"}
                            onChange={() => setOption("upload")}
                            className="rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] border-4 hidden"
                        />
                        <label
                            htmlFor="uploadLabel"
                            className="flex gap-1 cursor-pointer"
                        >
                            <span
                                htmlFor="uploadLabel"
                                className={`rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] block ${option === "upload" ? "border-4" : "border-2"
                                    }`}
                            />
                            <span className="text-sm text-[var(--text-color)] font-medium ml-2">
                                Upload a return label
                            </span>
                        </label>
                    </div>
                    {option === "upload" && (
                        <div>
                            <Dropzone
                                onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}
                                accept={{
                                    "image/png": [],
                                    "image/gif": [],
                                    "image/jpg": [],
                                }}
                                multiple={false}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div className="border-dashed border-2 border-[var(--dark-light-brown)] rounded-xl h-[100px] items-center justify-center cursor-pointer [&>div]:h-full [&>div]:flex">
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <TbCirclePlus
                                                className="m-auto"
                                                color="var(--dark-light-brown)"
                                                size={25}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                            {file && (
                                <div className="mt-4 text-sm text-[var(--text-color)] bg-[var(--white-color)] p-2 rounded-md flex items-center justify-between">
                                    <div>
                                        <p>
                                            <span className="font-medium">File:</span>{" "}
                                            {file.name}
                                        </p>
                                        <p>
                                            <span className="font-medium">Size:</span>{" "}
                                            {(file.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                    <div
                                        className="shrink-0 cursor-pointer"
                                        onClick={() => setFile(null)}
                                    >
                                        <RxCross1 size={20} />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex gap-1 items-center pb-3 mt-4">
                        <input
                            type="radio"
                            id="generateLabel"
                            name="shippingOption"
                            value="upload"
                            checked={option === "generate"}
                            onChange={() => setOption("generate")}
                            className="rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] border-4 hidden"
                        />
                        <label
                            htmlFor="generateLabel"
                            className="flex gap-1 cursor-pointer"
                        >
                            <span
                                htmlFor="generateLabel"
                                className={`rounded-full w-[20px] h-[20px] border-[var(--dark-light-brown)] block ${option === "generate" ? "border-4" : "border-2"
                                    }`}
                            />
                            <span className="text-sm text-[var(--text-color)] font-medium ml-2">
                                Generate a Shipping Label
                            </span>
                        </label>
                    </div>
                    {option === "generate" && (
                        <div>
                            <a
                                // href={`/return-request/${generate_shipping_label_id_store}`}
                                target="_blank"
                                className="bg-[var(--dark-light-brown)] text-sm text-[var(--white-color)] px-6 py-2 rounded mt-2 uppercase flex items-center gap-2 w-fit"
                            >
                                <span>Generate</span> <ImNewTab />
                            </a>
                        </div>
                    )}
                    <hr className="bg-[var(--dark-light-brown)] rounded-lg h-1 w-full my-8" />
                    <div>
                        <div className="flex [&>*]:w-[50%] gap-5 text-[var(--text-color)] text-sm mt-5 max-sm:flex-col max-sm:[&>*]:w-full">
                            <div>
                                <p className="font-medium mb-2">Tracking Number</p>
                                <input className="w-full border-[var(--border-color)] border-2 rounded outline-none p-2" />
                            </div>
                            <div>
                                <p className="font-medium mb-2">Shipping Carrier</p>
                                <input className="w-full border-[var(--border-color)] border-2 rounded outline-none p-2" />
                            </div>
                        </div>
                        <div className="flex gap-5 text-[var(--text-color)] text-sm mt-5 max-sm:flex-col max-sm:[&>*]:w-full">
                            <div className="w-full">
                                <p className="font-medium mb-2">Tracking Link</p>
                                <input
                                    type="url"
                                    className="w-full border-[var(--border-color)] border-2 rounded outline-none p-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : data?.status == "CLOSED" ? (
                <div className="at-return-card ">
                    <div className="text-[var(--dark-light-brown)] font-medium uppercase mb-4">
                        Return Method Information
                    </div>
                    <div className="text-[var(--text-color)]">
                        {/* <div><span className="font-medium">Shipment Status: </span><span>In Progress</span>
            </div> */}
                        <div>
                            <span className="font-medium">Updated: </span>
                            <span>Friday at 9:48 PM</span>
                        </div>
                        <div>
                            <span className="font-medium">
                                USPS tracking number:{" "}
                            </span>
                            <span>9400136106023571104142</span>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default ShippingLabelandTracking