const connectDB = require('../../../db');
const Contribution = require('../../../models/Contribution');
import { getAuth } from "@clerk/nextjs/server";


export async function POST(Request) {
  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }
  const {campaign_id,campaign_title,user_id,fullName,amount,email,paymentId,createdAt} = await Request.json();
  const data = {campaign_id,campaign_title,user_id,fullName,amount,email,paymentId,createdAt};
  await connectDB();
  const newDoc = await Contribution.create(data);
  await newDoc.save();
  return Response.json(true);
}


export async function PUT(Request){

  const { userId } = getAuth(Request);
  if (!userId) {
    return Response.error({ error: "Unauthorized" });
  }
  const {_id,campaign_id,campaign_title,user_id,fullName,amount,email,paymentId,createdAt} = await Request.json();
  
  await connectDB();
  const contribution = await Contribution.findById(_id);
  if (!contribution) {
    return Response(404).json({ error: 'contribution not found' });
  }
    // Update Contribution fields
    contribution.campaign_id = campaign_id;
    contribution.campaign_title = campaign_title;
    contribution.user_id = user_id;
    contribution.fullName = fullName;
    contribution.amount = amount;
    contribution.email = email;
    contribution.paymentId = paymentId;
    contribution.createdAt = createdAt;

    // Save updated Contribution
    await contribution.save();

    // Respond with updated Contribution data
    return Response.json(contribution);
}

export async function GET(Request) {
  const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    await connectDB();
    return Response.json(
      await Contribution.find()
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
  await Contribution.deleteOne({_id});

  return Response.json(true);
}
