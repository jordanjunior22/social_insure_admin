const connectDB = require('../../../../db');
const Contribution = require('../../../../models/Contribution');
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
        const contribution = await Contribution.findById(id);
        if (!contribution) {
          return Response.error(404, { error: "Contribution not found" });
        }
        return Response.json(contribution);
      } catch (error) {
        console.error("Error retrieving Contribution:", error);
        return Response.error(500, { error: "Server error" });
      }
}
