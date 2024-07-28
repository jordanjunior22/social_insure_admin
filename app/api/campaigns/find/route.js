const connectDB = require('../../../../db');
const Campaign = require('../../../../models/Campaign');
import { getAuth } from "@clerk/nextjs/server";

export async function POST(Request) {
  const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error(401, { error: "Unauthorized" });
    }
    
    const { id } = await Request.json();
    console.log(id);

    try {
        await connectDB();
        const campaign = await Campaign.findById(id);
        if (!campaign) {
          return Response.error(404, { error: "Campaign not found" });
        }
        return Response.json(campaign);
      } catch (error) {
        console.error("Error retrieving campaign:", error);
        return Response.error(500, { error: "Server error" });
      }
}
