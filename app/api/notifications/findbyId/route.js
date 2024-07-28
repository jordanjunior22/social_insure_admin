const connectDB = require('../../../../db');
const Notification = require('../../../../models/Notification');
import { getAuth } from "@clerk/nextjs/server";


export async function POST(Request) {
  const { userId } = getAuth(Request);
  const {_id} = await Request.json();
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    await connectDB();
    const foundF = await Notification.findById(_id)
    return Response.json(foundF);
}
