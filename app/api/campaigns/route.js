const connectDB = require('../../../db');
const Campaign = require('../../../models/Campaign');
import { getAuth } from "@clerk/nextjs/server";



export async function POST(Request) {
  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }
  const {title,goal,fees,description,details,feature_id,featureType,imageSource,endAt} = await Request.json();
  const data = {title,goal,fees,description,details,feature_id,featureType,imageSource,endAt};
  await connectDB();
  const newDoc = await Campaign.create(data);
  await newDoc.save();
  return Response.json(true);

}

export async function GET(Request) {
  const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    await connectDB();
    return Response.json(
      await Campaign.find()
    );
}

export async function PUT(Request){

  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }
  const { id, title, goal, endAt, description, details } = await Request.json();
  
  await connectDB();
  const campaign = await Campaign.findById(id);
  if (!campaign) {
    return Response(404).json({ error: 'Campaign not found' });
  }
    // Update campaign fields
    campaign.title = title;
    campaign.goal = goal;
    campaign.endAt = endAt;
    campaign.description = description;
    campaign.details = details;
    // Save updated campaign
    await campaign.save();

    // Respond with updated campaign data
    return Response.json(campaign);
}

export async function DELETE(Request) {
  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }
  await connectDB();
  
  const url = new URL(Request.url);
  const _id = url.searchParams.get('_id');
  await Campaign.deleteOne({_id});

  return Response.json(true);
}