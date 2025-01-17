import { BeehiivClient } from "@beehiiv/sdk";
import AbortController from "abort-controller";
import fetch from "node-fetch";

// OBS: The AbortController is required by Beehiiv
if (typeof global.AbortController === 'undefined') {
  global.AbortController = AbortController;
}

if (typeof global.fetch === 'undefined') {
  global.fetch = fetch;
}

async function main(args) {
    try {
      if (!process.env.BEEHIIV_API_TOKEN) {
        return {
          statusCode: 500,
          body: { 
            success: false, 
            error: 'Missing BEEHIIV_API_TOKEN environment variable'
          }
        };
      }

      if (!process.env.BEEHIIV_PUBLICATION_ID) {
        return {
          statusCode: 500,
          body: { 
            success: false, 
            error: 'Missing BEEHIIV_PUBLICATION_ID environment variable'
          }
        };
      }

      const client = new BeehiivClient({ 
        token: process.env.BEEHIIV_API_TOKEN
      });

      const result = await client.subscriptions.create(
        process.env.BEEHIIV_PUBLICATION_ID,
        {
          email: args.email,
          reactivateExisting: args.reactivateExisting ?? false,
          sendWelcomeEmail: args.sendWelcomeEmail ?? false,
          utmSource: args.utmSource,
          utmMedium: args.utmMedium,
          utmCampaign: args.utmCampaign,
          referringSite: args.referringSite,
          customFields: args.customFields,
          stripeCustomerId: args.stripeCustomerId
        }
      );

      return {
        statusCode: 200,
        body: { data: result }
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: { 
          success: false, 
          error: error.message || 'Unknown error' 
        }
      };
    }
}

export { main };
