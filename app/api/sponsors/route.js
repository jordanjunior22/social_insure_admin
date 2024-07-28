const connectDB = require('../../../db');
const Sponsor = require('../../../models/Sponsor');
import { getAuth } from "@clerk/nextjs/server";


export async function POST(Request) {
  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }

  const {title,description,details,website,imageSource} = await Request.json();
  const data = {title,description,details,website,imageSource};
  await connectDB();
  const newDoc = await Sponsor.create(data);
  await newDoc.save();
  return Response.json(true);
}

export async function PUT(Request){

  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }
  const {_id,title,description,details,website,imageSource} = await Request.json();
  
  await connectDB();
  const sponsor = await Sponsor.findById(_id);
  if (!sponsor) {
    return Response(404).json({ error: 'sponsor not found' });
  }
    // Update Contribution fields
    sponsor.title = title;
    sponsor.description = description;
    sponsor.details = details;
    sponsor.website = website;
    sponsor.imageSource = imageSource;
    // Save updated Contribution
    await sponsor.save();

    // Respond with updated Contribution data
    return Response.json(sponsor);
}

export async function GET(Request) {
  const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    await connectDB();
    return Response.json(
      await Sponsor.find()
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
  await Sponsor.deleteOne({_id});

  return Response.json(true);
}
