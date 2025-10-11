
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
import { resendclient, sender } from "../lib/resend.js";

export const sendWelcomeEmail = async(email,name, clientURL) => {
    const {data, error} = await resendclient.emails.send({
        from:`${sender.name} <${sender.email}>`,
        to:email,
        subject:"Welcome to Quick_Chat!",
        html:createWelcomeEmailTemplate(name, clientURL)
    })

    if(error){
        console.error("Error sending welcome email", error);
        throw new Error("Failed to send welcome email")
    }
    console.log("Welcome email sent successfully", data);
}