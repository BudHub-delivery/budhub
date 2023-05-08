/**
 * Takes in the firstname and messagecontent of the mailer object to create an HTML email to send
 * to the recipient
 * @param {STRING} firstName 
 * @param {STRING} messageContent 
 * @returns 
 */

const notificationEmailTemplate = (firstName: string, messageContent: string) => {

   return `
   <html
     xmlns="http://www.w3.org/1999/xhtml"
     xmlns:v="urn:schemas-microsoft-com:vml"
     xmlns:o="urn:schemas-microsoft-com:office:office"
     lang="EN"
   >
     <head>
       <!--[if gte mso 15]>
         <xml>
           <o:OfficeDocumentSettings>
             <o:AllowPNG />
             <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
         <style type="text/css">
           body,
           table tr,
           table td,
           a,
           span,
           table.MsoNormalTable {
             font-family: 'Poppins', Helvetica, sans-serif !important;
           }
         </style>
       <![endif]-->
       <title></title>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       <meta name="x-apple-disable-message-reformatting" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
       <!--[if !mso]><!-->
       <link
         href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700,800"
         rel="stylesheet"
       />
       <!--<![endif]-->
       <meta name="format-detection" content="telephone=no" />
       <style type="text/css">
         .ReadMsgBody {
           width: 100%;
           background-color: #ffffff;
         }
         .ExternalClass {
           width: 100%;
           background-color: #ffffff;
         }
         .ExternalClass,
         .ExternalClass p,
         .ExternalClass span,
         .ExternalClass font,
         .ExternalClass td,
         .ExternalClass div {
           line-height: 100%;
         }
         html {
           width: 100%;
         }
         table {
           border-spacing: 0;
           border-collapse: collapse;
           mso-table-lspace: 0px;
           mso-table-rspace: 0px;
           margin: 0 auto;
         }
         table table table {
           table-layout: auto;
         }
         img {
           display: block !important;
           overflow: hidden !important;
           border: 0 !important;
           outline: none !important;
         }
         body {
           -ms-text-size-adjust: none;
           margin: 0 auto !important;
           padding: 0 !important;
           -webkit-text-size-adjust: 100% !important;
           -ms-text-size-adjust: 100% !important;
           -webkit-font-smoothing: antialiased !important;
         }
   
         #MessageViewBody,
         #MessageWebViewDiv {
           width: 100% !important;
           min-width: 100vw;
           margin: 0 !important;
           zoom: 1 !important;
         }
   
         p {
           margin: 0px !important;
           padding: 0px !important;
         }
   
         td,
         a,
         span {
           border-collapse: collapse;
           mso-line-height-rule: exactly;
         }
         .ExternalClass * {
           line-height: 100%;
         }
   
         @media only screen and (max-width: 600px) {
           .em_main_table {
             width: 100% !important;
           }
           .em_wrapper {
             width: 100% !important;
             max-width: 100% !important;
           }
           .em_hide {
             display: none !important;
           }
           .em_align_center {
             text-align: center !important;
           }
           .em_pad_top {
             padding-top: 20px !important;
           }
           .em_side_space {
             padding-left: 20px !important;
             padding-right: 20px !important;
           }
           .em_bg_center {
             background-position: center !important;
           }
   
           .em_full_width {
             width: 100% !important;
             height: auto !important;
             max-width: 100% !important;
           }
           .em_pad_btm {
             padding-bottom: 28px !important;
           }
           .showphone {
             display: block !important;
             mso-hide: none !important;
           }
           u + .em_body .em_full_wrap {
             width: 100% !important;
             width: 100vw !important;
           }
         }
       </style>
       <style type="text/css">
         @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
           .em_main_table {
             min-width: 375px !important;
           }
         }
       </style>
     </head>
     <body
       class="em_body"
       style="
         min-width: 100%;
         background-color: #f9f9f9;
         margin: 0 auto !important;
         padding: 0;
       "
     >
       <!--Full width table start-->
       <table
         class="em_full_wrap"
         width="100%"
         border="0"
         cellspacing="0"
         cellpadding="0"
         align="center"
         style="background-color: #f9f9f9"
       >
         <tbody>
           <tr>
             <td align="center" valign="top">
               <table
                 align="center"
                 class="em_main_table"
                 width="600"
                 border="0"
                 cellspacing="0"
                 cellpadding="0"
                 style="table-layout: fixed"
               >
                 <tbody>
                   <tr>
                     <td
                       class="em_hide"
                       style="line-height: 1px; min-width: 600px"
                       bgcolor="#ffffff"
                     >
                       <img
                         src="https://www.theemailtemplate.com/wp-content/uploads/2019/03/spacer.gif"
                         height="1"
                         width="600"
                         style="
                           max-height: 1px;
                           min-height: 1px;
                           display: block;
                           width: 600px;
                           min-width: 600px;
                         "
                         border="0"
                       />
                     </td>
                   </tr>
   
                   <tr>
                     <td
                       height="35"
                       class="em_hide"
                       style="line-height: 1px; font-size: 1px"
                     >
                       &nbsp;
                     </td>
                   </tr>
   
                   <tr>
                     <td
                       bgcolor="#ffffff"
                       style="
                         background-color: #ffffff;
                         border-radius: 5px;
                         box-shadow: 1px 1px 10px 1px #dddddd;
                       "
                     >
                       <table
                         width="100%"
                         border="0"
                         cellspacing="0"
                         cellpadding="0"
                       >
                         <tbody>
                           <tr>
                             <td
                               bgcolor="#000000"
                               style="border-radius: 5px 5px 0px 0px"
                             >
                               <table
                                 width="100%"
                                 border="0"
                                 cellspacing="0"
                                 cellpadding="0"
                               >
                                 <tbody>
                                   <tr>
                                     <td width="35" class="em_hide">&nbsp;</td>
                                     <td class="em_side_space">
                                       <table
                                         width="100%"
                                         border="0"
                                         cellspacing="0"
                                         cellpadding="0"
                                       >
                                         <tbody>
                                           <tr>
                                             <td
                                               height="30"
                                               style="
                                                 line-height: 1px;
                                                 font-size: 1px;
                                               "
                                             >
                                               &nbsp;
                                             </td>
                                           </tr>
   
                                           <tr>
                                             <td>
                                               <table
                                                 width="214"
                                                 border="0"
                                                 cellspacing="0"
                                                 cellpadding="0"
                                                 align="left"
                                               >
                                                 <tbody>
                                                   <tr>
                                                     <td>
                                                       <a
                                                         target="_blank"
                                                         style="
                                                           text-decoration: none;
                                                           color: #ffffff;
                                                         "
                                                         href="https://www.total-ticket.com/"
                                                         ><img
                                                           editable=""
                                                           alt="Total Ticket"
                                                           src="https://www.total-ticket.com/static/media/total-ticket-logo-smaller.5afc9bba.png"
                                                           width="100%"
                                                           height="auto"
                                                           style="
                                                             max-width: 214px;
                                                             color: #ffffff;
                                                             font-size: 20px;
                                                             text-align: left;
                                                           "
                                                       /></a>
                                                     </td>
                                                   </tr>
                                                 </tbody>
                                               </table>
                                               <h3 align="right" style="font-size: 3rem;font-family:Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;color:white">Total Ticket</h3>
                                             </td>
                                           </tr>
   
                                           <tr>
                                             <td
                                               height="30"
                                               style="
                                                 line-height: 1px;
                                                 font-size: 1px;
                                               "
                                             >
                                               &nbsp;
                                             </td>
                                           </tr>
                                         </tbody>
                                       </table>
                                     </td>
                                     <td width="35" class="em_hide">&nbsp;</td>
                                   </tr>
                                 </tbody>
                               </table>
                             </td>
                           </tr>
   
                           <!-- ===== //BANNER SECTION ===== -->
   
                           <tr>
                             <td>
                               <table
                                 width="100%"
                                 border="0"
                                 cellspacing="0"
                                 cellpadding="0"
                               >
                                 <tbody>
                                   <tr>
                                     <td width="50" class="em_hide">&nbsp;</td>
                                     <td valign="top" class="em_side_space">
                                       <repeater>
                                         <layout label="bold_text">
                                         </layout></repeater
                                       ><layout label="offer1"> </layout
                                       ><layout label="2_col_offer"> </layout
                                       ><layout label="single_line"> </layout>
                                       <table
                                         width="100%"
                                         border="0"
                                         cellspacing="0"
                                         cellpadding="0"
                                       >
                                         <tbody>
                                           <tr>
                                             <td>
                                               <table
                                                 width="100%"
                                                 border="0"
                                                 cellspacing="0"
                                                 cellpadding="0"
                                               >
                                                 <tbody>
                                                   <tr>
                                                     <td
                                                       height="50"
                                                       style="
                                                         line-height: 1px;
                                                         font-size: 1px;
                                                       "
                                                     >
                                                       &nbsp;
                                                     </td>
                                                   </tr>
   
                                                   <tr>
                                                     <td
                                                       class="em_dark_grey_txt"
                                                       style="
                                                         font-family: 'Poppins',
                                                           Avenir, Arial,
                                                           sans-serif;
                                                         font-size: 24px;
                                                         text-align: left;
                                                         color: #423f48;
                                                         font-weight: 700;
                                                       "
                                                     >
                                                       <multiline>${firstName},</multiline>
                                                     </td>
                                                   </tr>
   
                                                   <tr>
                                                     <td
                                                       class="em_dark_grey_txt"
                                                       style="
                                                         font-family: 'Poppins',
                                                           Avenir, Arial,
                                                           sans-serif;
                                                         font-size: 24px;
                                                         text-align: center;
                                                         color: #423f48;
                                                         font-weight: 700;
                                                       "
                                                     >
                                                       <multiline>${messageContent}</multiline>
                                                     </td>
                                                   </tr>
                                                 </tbody>
                                               </table>
                                             </td>
                                           </tr>
   
                                           <tr></tr>
   
                                           <tr>
                                             <td>
                                               <table
                                                 width="100%"
                                                 border="0"
                                                 cellspacing="0"
                                                 cellpadding="0"
                                               >
                                                 <tbody>
                                                   <tr>
                                                     <td
                                                       height="40"
                                                       style="
                                                         line-height: 1px;
                                                         font-size: 1px;
                                                       "
                                                     >
                                                       &nbsp;
                                                     </td>
                                                   </tr>
   
                                                   <tr>
                                                     <td
                                                       class="em_dark_grey_txt"
                                                       style="
                                                         font-family: 'Poppins',
                                                           Avenir, Arial,
                                                           sans-serif;
                                                         font-size: 24px;
                                                         text-align: center;
                                                         color: #423f48;
                                                         font-weight: 400;
                                                       "
                                                     >
                                                       <multiline
                                                         >Thanks for being with
                                                         us!</multiline
                                                       >
                                                     </td>
                                                   </tr>
   
                                                   <tr>
                                                     <td
                                                       height="40"
                                                       style="
                                                         line-height: 1px;
                                                         font-size: 1px;
                                                       "
                                                     >
                                                       &nbsp;
                                                     </td>
                                                   </tr>
                                                 </tbody>
                                               </table>
                                             </td>
                                           </tr>
                                         </tbody>
                                       </table>
                                     </td>
                                     <td width="50" class="em_hide">&nbsp;</td>
                                   </tr>
                                 </tbody>
                               </table>
                             </td>
                           </tr>
   
                           <tr>
                             <td
                               bgcolor="#000000"
                               style="border-radius: 0px 0px 5px 5px"
                             >
                               <table
                                 width="100%"
                                 border="0"
                                 cellspacing="0"
                                 cellpadding="0"
                               >
                                 <tbody>
                                   <tr>
                                     <td width="30" class="em_hide">&nbsp;</td>
                                     <td valign="top" class="em_side_space">
                                       <table
                                         width="100%"
                                         border="0"
                                         cellspacing="0"
                                         cellpadding="0"
                                       >
                                         <tbody>
                                           <tr>
                                             <td
                                               height="10"
                                               style="
                                                 line-height: 1px;
                                                 font-size: 1px;
                                               "
                                             >
                                               &nbsp;
                                             </td>
                                           </tr>
   
                                           <tr>
                                             <td
                                               class="em_grey_txt"
                                               style="
                                                 font-family: 'Poppins', Avenir,
                                                   Arial, sans-serif;
                                                 font-size: 14px;
                                                 text-align: center;
                                                 color: #ffffff;
                                                 line-height: 24px;
                                               "
                                             >
                                               <singleline
                                                 >© 2021 All Rights Reserved By
                                                 Total Ticket</singleline
                                               >
                                             </td>
                                           </tr>
                                           <tr>
                                             <td
                                               height="10"
                                               style="
                                                 line-height: 1px;
                                                 font-size: 1px;
                                               "
                                             >
                                               &nbsp;
                                             </td>
                                           </tr>
                                         </tbody>
                                       </table>
                                     </td>
                                     <td width="30" class="em_hide">&nbsp;</td>
                                   </tr>
                                 </tbody>
                               </table>
                             </td>
                           </tr>
                         </tbody>
                       </table>
                     </td>
                   </tr>
   
                   <tr>
                     <td height="30" style="line-height: 1px; font-size: 1px">
                       &nbsp;
                     </td>
                   </tr>
                 </tbody>
               </table>
             </td>
           </tr>
         </tbody>
       </table>
       <!--Full width table End-->
       <div
         style="
           display: none;
           white-space: nowrap;
           font: 20px courier;
           color: #ffffff;
           background-color: #ffffff;
         "
       >
         - - - - - - - - - - - - - - - - - - - - - - -
       </div>
     </body>
   </html>`;


}

export default notificationEmailTemplate;