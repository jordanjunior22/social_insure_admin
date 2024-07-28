const connectDB = require('../../../db');
const Feature = require('../../../models/Feature');
import { getAuth } from "@clerk/nextjs/server";


export async function POST(Request) {
  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }

  const {title,description,subReq,details,fees,terms,imageSource} = await Request.json();
  const data = {title,description,subReq,details,fees,terms,imageSource};
  await connectDB();
  const newDoc = await Feature.create(data);
  await newDoc.save();
  return Response.json(true);
}

export async function PUT(Request){

  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }
  const {_id,title,description,subReq,details,fees,terms,imageSource} = await Request.json();
  
  await connectDB();
  const feature = await Feature.findById(_id);
  if (!feature) {
    return Response(404).json({ error: 'feature not found' });
  }
    // Update Contribution fields
    feature.title = title;
    feature.description = description;
    feature.subReq = subReq;
    feature.details = details;
    feature.fees = fees;
    feature.terms = terms;
    feature.imageSource = imageSource;
    // Save updated Contribution
    await feature.save();

    // Respond with updated Contribution data
    return Response.json(feature);
}
export async function GET(Request) {
  const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    await connectDB();
    return Response.json(
      await Feature.find()
    );
}

export async function DELETE(Request) {
  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }
  await connectDB();
  
  const url = new URL(Request.url);
  const _id = url.searchParams.get('_id');
  await Feature.deleteOne({_id});

  return Response.json(true);
}
