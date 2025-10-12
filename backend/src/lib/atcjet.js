import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

import { ENV } from "./env.js";

const aj = arcjet({  // Initialize Arcjet with your API key
  
  key:ENV.ARCJET_KEY,
  rules: [    // Basic protection rules
   
    shield({ mode: "LIVE" }), // Use "LIVE" in production
   
    detectBot({   // Bot detection rule
      mode: "LIVE",  // Use 
      allow: [      // Allowlist certain categories
        "CATEGORY:SEARCH_ENGINE", // Allow search engine bots
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    slidingWindow({
        mode: "LIVE", // Use "LIVE" in production
        max: 100, // Max 100 requests
        interval: 60, // per 60 seconds
    })
  ],
});


export default aj;
