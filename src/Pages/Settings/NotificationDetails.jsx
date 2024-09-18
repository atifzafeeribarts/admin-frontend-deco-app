import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { notificationDetails, notificationUpdate } from '../../Services/api';
import ButtonLoadingSpinner from '../../Components/ButtonLoadingSpinner';
const NotificationDetails = () => {
    const [subject, setSubject] = useState(null);
    const [body, setBody] = useState(null);
    // Fetch the Data based on the ID(URL)
    const { id } = useParams();
    const [Loading, setLoading] = useState(true);
    const [data, setdata] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    useEffect(() => {
        id && notificationDetails(id).then((resp) => {
            if (resp) {
                setdata(data);
                setSubject(resp.subject);
                setBody(resp.body);
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            // Remove this when api is ready
            setdata({
                "title": "Return Confirmation"
            });
            setSubject("{{shop_name}} Return Confirmation");
            setBody(`<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width" initial-scale="1">
            <!--[if !mso]>
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <![endif]-->
            <meta name="x-apple-disable-message-reformatting">
            <title>{{shop_name}} Return Confirmation</title>
            <!--[if mso]>
            <style>
                * { font-family: sans-serif !important; }
            </style>
            <![endif]-->
            <!--[if !mso]><!-->
            <!-- Insert font reference, e.g. <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700" rel="stylesheet"> -->
            <!--<![endif]-->
            <style>
                *,
                *:after,
                *:before {
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                }
                * {
                    -ms-text-size-adjust: 100%;
                    -webkit-text-size-adjust: 100%;
                }
                html,
                body,
                .document{
                    width: 100% !important;
                    height: 100% !important;
                    margin: 0;
                    padding: 0;
                    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue", Helvetica, Arial,sans-serif; font-size: 16px; font-style: normal; font-variant: normal; font-weight: 400; line-height: 24px;
                    color: #777777;
                }
                body {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    text-rendering: optimizeLegibility;
                }
                div[style*="margin: 16px 0"] {
                    margin: 0 !important;
                }
                table,
                td {
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                }
                table {
                    border-spacing: 0;
                    border-collapse: collapse;
                    table-layout: fixed;
                    margin: 0 auto;
                }
                img {
                    -ms-interpolation-mode: bicubic;
                    max-width: 100%;
                    border: 0;
                }
                *[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: none !important;
                }
                .x-gmail-data-detectors,
                .x-gmail-data-detectors *,
                .aBn {
                    border-bottom: 0 !important;
                    cursor: default !important;
                }import Loading from './../../Components/CreateReturn/Loading';
        
                .btn {
                    -webkit-transition: all 200ms ease;
                    transition: all 200ms ease;
                }
                .btn:hover {
                    background-color: dodgerblue;
                }
                .primary {
                color: {{primary}};
                }
                @media screen and (max-width: 750px) {
                    .container {
                        width: 100%;
                        margin: auto;
                    }
                    .stack {
                        display: block;
                        width: 100%;
                        max-width: 100%;
                    }
                }
            </style>
        </head>
        <body>
        <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" class="document" width="100%">
            <tr>
                <td width="10">&nbsp;</td>
                <td width="100%" valign="top" style="padding-top: 45px;">
                    <table role="presentation" aria-hidden="true" cellspacing="0" cellpadding="0" border="0" align="center" class="container" width="100%" style="max-width: 600px;">
                        <tr>
                            <td width="100%" valign="top">
                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <!-- Top section -->
                                    <tr>
                                        <td width="100%" valign="top">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <!-- Header -->
                                                <tr>
                                                    <td width="100%" valign="top">
                                                        <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                            <tr>
                                                                <td align="left" style="font-size: 24px; line-height: 32px; color: #222222; text-align: left; font-weight: 500;" width="60%">{{image}}</td>
                                                                <td align="right" style="font-size: 16px; line-height: 28px; color: #999999; text-align: right; text-transform: uppercase;" width="40%">Order {{order}}</td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <!-- //End Header -->
        
                                                <!-- Thank you text -->
                                                <tr>
                                                    <td width="100%" valign="top" style="padding-top: 60px;">
                                                        <h1 style="font-size: 28px; line-height: 125%; text-align:left; color: #222222; font-weight: 600; display: block;">Thank you for your return!</h1>
                                                        <p style="padding-top: 15px; text-align: left; display: block;">Please click the "View your return" button below to access your return instuctions.</p>
                                                    </td>
                                                </tr>
                                                <!-- //End Thank you text -->
        
                                                <!-- Button link -->
                                                <tr>
                                                    <td width="100%" valign="top" style="padding-top: 24px; padding-bottom: 64px;">
                                                        <table style="width:100%;border-spacing:0;border-collapse:collapse">
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <table style="border-spacing:0;border-collapse:collapse;float:left;margin-right:24px">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td style="border-radius:4px" align="center" bgcolor="{{primary}}"><a href="{{status_page_url}}" title="Shipping Label" style="font-size:16px;text-decoration:none;display:block;color:#fff;padding:20px 24px" target="_blank">View your return</a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <!-- //End Button link -->
        
                                                <!-- divider line -->
                                                <tr>
                                                    <td width="100%" height="1" style="font-size: 1px; line-height: 1px; border-bottom: 1px solid #dddddd;"></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- // End top section -->
        
                                    <!-- Middle top section -->
                                    <tr>
                                        <td width="100%" valign="top" style="padding-bottom: 35px; padding-top: 40px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td>
                                                        <h5 style="font-size: 20px; font-weight: 500;  color: #212b36; margin: 0; display: block;">Requested store credit or an exchange?</h5>
                                                        <p style="margin: 0; margin-top: 10px; display: block;">You’ll receive an email with a new tracking confirmation as soon as your new order ships out. If you opted for store credit, you’ll receive an email with a digital gift card to use towards your next purchase.</p>
                                                        <h5 style="font-size: 20px; font-weight: 500; color: #212b36; margin: 0; margin-top: 40px; display: block;">Requested a refund?</h5>
                                                        <p style="margin: 0; margin-top: 10px; display: block;">We’ll process your return once we receive the original items. You’ll receive an email confirmation letting you know that the process is complete.</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- // End Middle top section -->
        
                                    <!-- Divider -->
                                    <tr>
                                        <td width="100%" valign="top">
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <td width="100%" height="1" style="font-size: 1px; line-height: 1px; border-bottom: 1px solid #dddddd;"></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
        
                                    <!-- Middle section -->
                                    <tr>
                                        <td width="100%" valign="top" style="padding-top: 40px; padding-bottom: 40px;">
                                            <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                <tr>
                                                    <td style="text-align: center">
                                                        If you have any questions, reply to this email or contact us at <a href="mailto:{{support_email}}" style="text-decoration: none; color: {{primary}};">{{support_email}}</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- //End Middle section -->
        
                                    <!-- Divider -->
                                    <tr>
                                        <td width="100%" valign="top">
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <td width="100%" height="1" style="font-size: 1px; line-height: 1px; border-bottom: 1px solid #dddddd;"></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
        
                                    <!-- Footer section -->
                                    <tr>
                                        <td width="100%" valign="top" style="padding-top: 40px; padding-bottom: 40px;">
                                            <table cellspacing="0" cellpadding="0" border="0"  width="100%">
                                                <tr>
                                                    <td style="text-align: center;">
                                                        <p style="margin: 0; display: block;">Copyright © <span id="year">{{current_year}}</span> {{shop_name}}. All rights reserved.</p>
                                                        <p style="margin: 0; display: block;">Powered by <a href="https://loopreturns.com/" style="display: inline-block; vertical-align: middle;">Atif</a></p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <!-- End top section -->
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
                <td width="10">&nbsp;</td>
            </tr>
        </table>
        </body>
        </html>`);
        });
    }, [id])
    const [updateBtnLoading, setupdateBtnLoading] = useState(false);
    const handleUpdate = async () => {
        setupdateBtnLoading(true);
        try {
            const reqBody = { id, subject, body };
            const resp = await notificationUpdate(reqBody);
            if (resp) {
                setupdateBtnLoading(false);
            }
        } catch (error) {
            console.log(error);
            setupdateBtnLoading(false);
        }
    }
    if (Loading) {
        return <p>Loading...</p>;
    } else {
        return (
            <>
                <div className='text-[var(--text-color)]'>
                    <div className='flex item center justify-between  mb-6'>
                        <h1 className='text-2xl font-medium'>{data?.title}</h1>
                        <div className='flex gap-3'>
                            <button className="py-2 px-8 w-[150px] at-dark-btn-hover text-sm" onClick={() => setPreviewOpen(!previewOpen)}>
                               {previewOpen ? "Edit": "Preview"}
                            </button>
                            <button className="py-2 px-8 w-[150px] at-dark-btn-hover text-sm" onClick={() => updateBtnLoading ? null : handleUpdate()}>
                                {updateBtnLoading ? <ButtonLoadingSpinner sizeClass={"size-5"}/> : "Update"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`${previewOpen ? "hidden" : "block"} text-[var(--text-color)]`}>
                    <h2 className="block text-lg font-medium mb-3">Email Subject</h2>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded mb-6"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <h2 className="block text-lg font-medium mb-3">Email Body (HTML)</h2>
                    <textarea
                        className="w-full h-full mt-1 p-2 border rounded"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>

                <div className={`${previewOpen ? "block" : "hidden"}`}>
                    <h3 className="text-lg font-medium mb-2">Preview</h3>
                    <div className="border p-4 rounded ">
                        <div dangerouslySetInnerHTML={{ __html: body }} />
                    </div>
                </div>

            </>
        )
    }
}

export default NotificationDetails