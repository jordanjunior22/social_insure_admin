const connectDB = require('../../../../db');
const Verification = require('../../../../models/Verification');
import { getAuth } from "@clerk/nextjs/server";
const User = require('../../../../models/User');

  export async function PUT(Request){

    const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    const {_id, user_id, newStatus} = await Request.json();
    
    await connectDB();
    const updatedVerification = await Verification.findOneAndUpdate(
      { _id:_id },
      { $set: { status: newStatus } },
      { new: true } // Return the updated document
    );
    const updateUser = await User.findOneAndUpdate(
      {_id:user_id},
      {$set:{isAWellBeingSubscriber:false}},
      {new:true}
    );

    if (!updatedVerification || !updateUser ) {
      return res.status(404).json({ error: 'Verification or User record not found' });
    }
  
      return Response.json(updatedVerification);
  }