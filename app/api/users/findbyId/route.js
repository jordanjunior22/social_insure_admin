const connectDB = require('../../../../db');
const User = require('../../../../models/User');
import { getAuth } from "@clerk/nextjs/server";


export async function POST(Request) {
  const { userId } = getAuth(Request);
  const {_id} = await Request.json();
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    await connectDB();

    const foundF = await User.findById(_id)
    //console.log(foundF)
    return Response.json(foundF);
}
