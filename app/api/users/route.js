const connectDB = require('../../../db');
const User = require('../../../models/User');
import { getAuth } from "@clerk/nextjs/server";

export async function GET(Request) {
    const { userId } = getAuth(Request);
      if (!userId) {
        return Response.error({ error: "Unauthorized" });
      }
      await connectDB();
      return Response.json(
        await User.find()
      );
  }

  export async function PUT(Request){

    const { userId } = getAuth(Request);
    if (!userId) {
      return Response.error({ error: "Unauthorized" });
    }
    const {_id,firstName,lastName,email,phoneNumber,imageUrl,isAWellBeingSubscriber,isVerified,balance,isBlackListed,createdAt,emailVerified} = await Request.json();
    
    await connectDB();
    const user = await User.findById(_id);
    if (!user) {
      return Response(404).json({ error: 'sponsor not found' });
    }
      // Update Contribution fields
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.imageUrl = imageUrl;
      user.isAWellBeingSubscriber = isAWellBeingSubscriber;
      user.isVerified = isVerified;
      user.balance = balance;
      user.isBlackListed = isBlackListed;
      user.createdAt = createdAt;
      user.emailVerified = emailVerified;
      // Save updated Contribution
      await user.save();
  
      // Respond with updated Contribution data
      return Response.json(user);
  }