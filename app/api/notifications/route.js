const connectDB = require('../../../db');
const Notification = require('../../../models/Notification');
import { getAuth } from "@clerk/nextjs/server";

export async function GET(Request) {
    const { userId } = getAuth(Request);
      if (!userId) {
        return Response.error({ error: "Unauthorized" });
      }
      await connectDB();
      return Response.json(
        await Notification.find()
      );
  }

  export async function POST(Request) {
    const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    const {title,message} = await Request.json();
    const data = {title,message};
    await connectDB();
    const newDoc = await Notification.create(data);
    await newDoc.save();
    return Response.json(true);
  }

  export async function PUT(Request){
    const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    const {_id,title,message} = await Request.json();
    
    await connectDB();
    const notification = await Notification.findById(_id);
    if (!notification) {
      return Response(404).json({ error: 'contribution not found' });
    }
      // Update Contribution fields
      notification.title = title;
      notification.message = message;
  
      // Save updated Contribution
      await notification.save();
      // Respond with updated Contribution data
      return Response.json(notification);
  }

  export async function DELETE(Request) {
    const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    await connectDB();
    
    const url = new URL(Request.url);
    const _id = url.searchParams.get('_id');
    await Notification.deleteOne({_id});
  
    return Response.json(true);
  }
  