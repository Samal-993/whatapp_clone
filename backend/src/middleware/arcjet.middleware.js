import aj from "../lib/atcjet.js";
import { isSpoofedBot } from "@arcjet/inspect"; // Import the bot inspection utility



export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req); 

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message:"Rate limit exceeded. Please try again later."})

            }else if (decision.reason.isBot()){
                return res.status(403).json({message:"Bot access denied"})
            }else{
                return res.status(403).json({message:"Access denied"})
            }
        }

        //check for spoofed bots
        if (decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error:"spoofed bot detected",
                message:"Malicious bot actively detected"
            })
        }
        

        next()
        
    } catch (error) {
        console.log("Arcjet Protection  error :", error)
        next()
    }
}