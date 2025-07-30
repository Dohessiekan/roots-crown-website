"use strict";(()=>{var a={};a.id=171,a.ids=[171],a.modules={173:(a,b,c)=>{c.d(b,{z:()=>e});var d=c(6330);let e=globalThis.prisma??new d.PrismaClient},5600:a=>{a.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6330:a=>{a.exports=require("@prisma/client")},9488:(a,b,c)=>{c.r(b),c.d(b,{config:()=>t,default:()=>s,handler:()=>v});var d={};c.r(d),c.d(d,{default:()=>n});var e=c(9046),f=c(8667),g=c(3480),h=c(6435),i=c(173);let j=require("nodemailer"),k=c.n(j)().createTransport({service:"gmail",auth:{user:process.env.EMAIL_USER||"your-salon-email@gmail.com",pass:process.env.EMAIL_PASS||"your-app-password"}});async function l(a){let{customerName:b,customerEmail:c,serviceName:d,staffName:e,appointmentDate:f,appointmentTime:g,bookingId:h,totalPrice:i}=a,j=new Date(f).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),l=`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #C7A15A, #34893F); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .booking-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .detail-label { font-weight: bold; color: #34893F; }
        .booking-id { font-size: 24px; font-weight: bold; color: #C7A15A; text-align: center; margin: 20px 0; }
        .button { background: #C7A15A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 5px; }
        .footer { background: #f8f8f8; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Confirmed!</h1>
          <p>Thank you for choosing Roots & Crown</p>
        </div>
        
        <div class="content">
          <p>Dear ${b},</p>
          
          <p>Your appointment has been successfully confirmed. We're excited to see you!</p>
          
          <div class="booking-id">
            Booking ID: ${h}
          </div>
          
          <div class="booking-details">
            <h3 style="color: #34893F; margin-top: 0;">Appointment Details</h3>
            <div class="detail-row">
              <span class="detail-label">Service:</span>
              <span>${d}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Staff Member:</span>
              <span>${e}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span>${j}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span>${g}</span>
            </div>
            ${i?`
            <div class="detail-row">
              <span class="detail-label">Price:</span>
              <span>${i}</span>
            </div>
            `:""}
          </div>
          
          <p><strong>Important Information:</strong></p>
          <ul>
            <li>Please arrive 10 minutes before your appointment time</li>
            <li>If you need to reschedule or cancel, please call us at least 24 hours in advance</li>
            <li>Bring a valid ID and any relevant medical information</li>
          </ul>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/feedback?bookingId=${h}" class="button">
              Share Your Feedback
            </a>
            <a href="http://localhost:3000/contact" class="button">
              Contact Us
            </a>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Roots & Crown</strong></p>
          <p>123 Beauty Street, Suite 456, City, State 12345</p>
          <p>Phone: (555) 123-4567</p>
          <p>Email: gnondoyixavier@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `,m={from:"gnondoyixavier@gmail.com",to:c,subject:`Booking Confirmed - ${d} at Roots & Crown`,html:l};try{await k.sendMail(m),console.log("Customer confirmation email sent successfully")}catch(a){throw console.error("Error sending customer email:",a),a}}async function m(a){let{customerName:b,customerEmail:c,serviceName:d,staffName:e,appointmentDate:f,appointmentTime:g,bookingId:h,totalPrice:i}=a,j=new Date(f).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),l=`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #34893F; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .booking-details { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .detail-label { font-weight: bold; color: #34893F; }
        .customer-info { background: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0; }
        .alert { background: #e8f5e8; padding: 15px; border-left: 4px solid #34893F; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
            <h1>🗓️ New Booking Alert</h1>
          <p>Booking ID: ${h}</p>
        </div>
        
        <div class="content">
          <div class="alert">
            <strong>📋 Information:</strong> A new appointment has been automatically confirmed and added to your schedule.
          </div>
          
          <div class="booking-details">
            <h3 style="color: #34893F; margin-top: 0;">Appointment Details</h3>
            <div class="detail-row">
              <span class="detail-label">Service:</span>
              <span>${d}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Staff Member:</span>
              <span>${e}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Date:</span>
              <span>${j}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Time:</span>
              <span>${g}</span>
            </div>
            ${i?`
            <div class="detail-row">
              <span class="detail-label">Price:</span>
              <span>${i}</span>
            </div>
            `:""}
          </div>
          
          <div class="customer-info">
            <h3 style="color: #34893F; margin-top: 0;">Customer Information</h3>
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span>${b}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span>${c}</span>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3000/admin" 
               style="background: #34893F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View in Admin Dashboard
            </a>
          </div>
          
          <p><small>This email was automatically generated when a customer completed their online booking. The appointment is confirmed and has been added to your schedule.</small></p>
        </div>
      </div>
    </body>
    </html>
  `,m={from:"gnondoyixavier@gmail.com",to:"gnondoyixavier@gmail.com",subject:`� New Appointment: ${d} - ${j} at ${g}`,html:l};try{await k.sendMail(m),console.log("Salon notification email sent successfully")}catch(a){throw console.error("Error sending salon notification email:",a),a}}async function n(a,b){switch(a.method){case"GET":return await o(a,b);case"POST":return await p(a,b);default:return b.status(405).json({message:"Method not allowed"})}}async function o(a,b){try{let{staffId:c,status:d,date:e}=a.query,f={};if(c&&"string"==typeof c&&(f.staffId=c),d&&"string"==typeof d&&(f.status=d),e&&"string"==typeof e){let a=new Date(e),b=new Date(e);b.setDate(b.getDate()+1),f.appointmentDate={gte:a,lt:b}}let g=await i.z.booking.findMany({where:f,include:{service:{include:{category:!0}},staff:!0},orderBy:[{appointmentDate:"asc"},{appointmentTime:"asc"}]});return b.status(200).json(g)}catch(a){return console.error("Error fetching bookings:",a),b.status(500).json({message:"Internal server error"})}}async function p(a,b){try{let{customerName:c,customerEmail:d,customerPhone:e,serviceId:f,staffId:g,appointmentDate:h,appointmentTime:j,notes:k}=a.body;if(!c||!d||!f||!g||!h||!j)return b.status(400).json({message:"Missing required fields"});let n=Math.floor(1e5+9e5*Math.random()).toString(),o=await i.z.service.findUnique({where:{id:f}});if(!o)return b.status(404).json({message:"Service not found"});let p=await i.z.staff.findUnique({where:{id:g}});if(!p)return b.status(404).json({message:"Staff not found"});if(await i.z.booking.findFirst({where:{staffId:g,appointmentDate:new Date(h),appointmentTime:j,status:{not:"CANCELLED"}}}))return b.status(409).json({message:"Time slot is already booked"});let q=await i.z.booking.create({data:{bookingId:n,customerName:c,customerEmail:d,customerPhone:e,serviceId:f,staffId:g,staffName:p.name,appointmentDate:new Date(h),appointmentTime:j,notes:k,totalPrice:o.price,status:"CONFIRMED"},include:{service:{include:{category:!0}},staff:!0}});try{let a={customerName:c,customerEmail:d,serviceName:o.name,staffName:p.name,appointmentDate:h,appointmentTime:j,bookingId:n,totalPrice:o.price};await l(a),await m(a),console.log("Booking confirmation emails sent successfully")}catch(a){console.error("Error sending emails:",a)}return b.status(201).json(q)}catch(a){return console.error("Error creating booking:",a),b.status(500).json({message:"Internal server error"})}}var q=c(8112),r=c(8766);let s=(0,h.M)(d,"default"),t=(0,h.M)(d,"config"),u=new g.PagesAPIRouteModule({definition:{kind:f.A.PAGES_API,page:"/api/bookings",pathname:"/api/bookings",bundlePath:"",filename:""},userland:d,distDir:".next",projectDir:""});async function v(a,b,c){let d=await u.prepare(a,b,{srcPage:"/api/bookings"});if(!d){b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve());return}let{query:f,params:g,prerenderManifest:h}=d;try{let c=a.method||"GET",d=(0,q.getTracer)(),e=d.getActiveScopeSpan(),i=u.instrumentationOnRequestError.bind(u),j=async e=>u.render(a,b,{query:{...f,...g},params:g,allowedRevalidateHeaderKeys:void 0,multiZoneDraftMode:!0,trustHostHeader:void 0,previewProps:h.preview,propagateError:!1,dev:u.isDev,page:"/api/bookings",projectDir:"",onError:(...b)=>i(a,...b)}).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let f=d.getRootSpanAttributes();if(!f)return;if(f.get("next.span_type")!==r.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${f.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let g=f.get("next.route");if(g){let a=`${c} ${g}`;e.setAttributes({"next.route":g,"http.route":g,"next.span_name":a}),e.updateName(a)}else e.updateName(`${c} ${a.url}`)});e?await j(e):await d.withPropagatedContext(a.headers,()=>d.trace(r.BaseServerSpan.handleRequest,{spanName:`${c} ${a.url}`,kind:q.SpanKind.SERVER,attributes:{"http.method":c,"http.target":a.url}},j))}catch(a){if(u.isDev)throw a;(0,e.sendError)(b,500,"Internal Server Error")}finally{null==c.waitUntil||c.waitUntil.call(c,Promise.resolve())}}}};var b=require("../../webpack-api-runtime.js");b.C(a);var c=b.X(0,[169],()=>b(b.s=9488));module.exports=c})();