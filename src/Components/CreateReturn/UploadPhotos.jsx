import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import Dropzone from "react-dropzone";
import { TbCirclePlus } from "react-icons/tb";
import { RxCross1 } from "react-icons/rx";
import ContextProvider from '../../Context/ContextProvider';
const UploadPhotos = () => {
    // ----> Using Context States
    const { setrequestpage, file, setFile } = useContext(ContextProvider);
    // END Using Context States
    const [imagesSelectError, setimagesSelectError] = useState('');
    const imagesSelected = () => {
        if (file.length) {
            setimagesSelectError('');
            // Info: Send to the Next Page
            setrequestpage(3);
        } else {
            setimagesSelectError('Please choose Images');
        }
    }
    return (
        <div className="w-full">
            <div onClick={() => setrequestpage(1)} className='text-sm flex items-center gap-2 font-medium cursor-pointer hover:translate-x-[-4px] transition-all mb-2 uppercase w-fit m-auto'><FaArrowLeft size={18} /> <span>Back</span></div>
            <h1 className="text-2xl font-semibold mb-4 max-sm:text-xl text-center">Upload Photos</h1>
            {imagesSelectError ? (
                <div className="sm:w-10/12 text-red-500 flex gap-2 text-sm items-center mb-4 m-auto">
                    <MdError />
                    <span>{imagesSelectError}</span>
                </div>
            ) : null}
            <div>
                <Dropzone
                    onDrop={(acceptedFiles) => setFile((prev) => {
                        return [...prev, ...acceptedFiles];
                    })}
                    accept={{
                        "image/png": [],
                        "image/jpg": [],
                        "image/jpeg": [],
                        "image/webp": [],
                        "image/avif": [],
                        "image/heic": []
                    }}
                    multiple={true}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div className="sm:w-10/12 m-auto border-dashed border-2 border-[var(--dark-light-brown)] rounded-xl h-[200px] items-center justify-center cursor-pointer [&>div]:h-full [&>div]:flex">
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
                <div className='mt-4 flex flex-col gap-2'>
                    {file?.map((fileVal, index) => {
                        return (
                            <div key={index} className="text-sm text-[var(--text-color)] bg-[var(--light-cream-background)] p-2 rounded-md flex items-center justify-between">
                                <div className='flex items-center gap-2'>
                                    <img src={URL.createObjectURL(fileVal)} className="shrink-0object-contain size-[60px]" />
                                    <div>
                                        <p>
                                            <span className="font-medium">File:</span>{" "}
                                            {fileVal.name}
                                        </p>
                                        <p>
                                            <span className="font-medium">Size:</span>{" "}
                                            {(fileVal.size / 1024).toFixed(2)} KB
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="shrink-0 cursor-pointer"
                                    onClick={() => setFile(prevState => prevState.filter((f, i) => i !== index))}
                                >
                                    <RxCross1 size={20} />
                                </div>
                            </div>
                        )
                    })}
                </div>
                <button className='py-2 px-10 bg-[var(--dark-light-brown)] border-2 border-transparent text-[var(--white-color)] rounded-md hover:bg-[var(--light-cream-background)] hover:border-[var(--dark-light-brown)] hover:text-[var(--dark-light-brown)] transition block m-auto mt-8 uppercase text-sm hover:scale-[1.03]' onClick={() => imagesSelected()}>Next</button>
            </div>
        </div>
    )
}

export default UploadPhotos