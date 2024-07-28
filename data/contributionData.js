const contributionData = [
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa613" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f3" },
    "campaign_title": "Lee Contributions",
    "user_id": { "$oid": "6643189336e6befd0d6c466b" },
    "fullName": "John Doe",
    "amount": { "$numberInt": "120" },
    "email": "john.doe@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0n",
    "createdAt": { "$date": { "$numberLong": "1705680013000" } },
    "__v": { "$numberInt": "0" }
  },
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa614" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f4" },
    "campaign_title": "Community Fundraiser",
    "user_id": { "$oid": "6643189336e6befd0d6c466c" },
    "fullName": "Emily White",
    "amount": { "$numberInt": "85" },
    "email": "emily.white@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0o",
    "createdAt": { "$date": { "$numberLong": "1708358413000" } },
    "__v": { "$numberInt": "0" }
  },
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa615" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f5" },
    "campaign_title": "Educational Scholarships",
    "user_id": { "$oid": "6643189336e6befd0d6c466d" },
    "fullName": "Sophie Brown",
    "amount": { "$numberInt": "95" },
    "email": "sophie.brown@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0p",
    "createdAt": { "$date": { "$numberLong": "1708704013000" } },
    "__v": { "$numberInt": "0" }
  },
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa616" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f6" },
    "campaign_title": "Environmental Conservation",
    "user_id": { "$oid": "6643189336e6befd0d6c466e" },
    "fullName": "Lucas Smith",
    "amount": { "$numberInt": "130" },
    "email": "lucas.smith@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0q",
    "createdAt": { "$date": { "$numberLong": "1713888013000" } },
    "__v": { "$numberInt": "0" }
  },
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa617" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f7" },
    "campaign_title": "Animal Welfare",
    "user_id": { "$oid": "6643189336e6befd0d6c466f" },
    "fullName": "Ella Johnson",
    "amount": { "$numberInt": "75" },
    "email": "ella.johnson@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0r",
    "createdAt": { "$date": { "$numberLong": "1716480013000" } },
    "__v": { "$numberInt": "0" }
  },
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa618" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f3" },
    "campaign_title": "Lee Contributions",
    "user_id": { "$oid": "6643189336e6befd0d6c4670" },
    "fullName": "Mia Anderson",
    "amount": { "$numberInt": "110" },
    "email": "mia.anderson@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0s",
    "createdAt": { "$date": { "$numberLong": "1719158413000" } },
    "__v": { "$numberInt": "0" }
  },
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa619" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f4" },
    "campaign_title": "Community Fundraiser",
    "user_id": { "$oid": "6643189336e6befd0d6c4671" },
    "fullName": "Logan Martinez",
    "amount": { "$numberInt": "60" },
    "email": "logan.martinez@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0t",
    "createdAt": { "$date": { "$numberLong": "1717614765000" } },
    "__v": { "$numberInt": "0" }
  },
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa620" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f5" },
    "campaign_title": "Educational Scholarships",
    "user_id": { "$oid": "6643189336e6befd0d6c4672" },
    "fullName": "Harper Wilson",
    "amount": { "$numberInt": "70" },
    "email": "harper.wilson@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0u",
    "createdAt": { "$date": { "$numberLong": "1712937613000" } },
    "__v": { "$numberInt": "0" }
  },
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa621" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f6" },
    "campaign_title": "Environmental Conservation",
    "user_id": { "$oid": "6643189336e6befd0d6c4673" },
    "fullName": "William Davis",
    "amount": { "$numberInt": "100" },
    "email": "william.davis@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0v",
    "createdAt": { "$date": { "$numberLong": "1706284813000" } },
    "__v": { "$numberInt": "0" }
  },
  {
    "_id": { "$oid": "6660b89cdcaa1fea48ffa622" },
    "campaign_id": { "$oid": "665d9d312ec8285db737e0f7" },
    "campaign_title": "Animal Welfare",
    "user_id": { "$oid": "6643189336e6befd0d6c4674" },
    "fullName": "James Garcia",
    "amount": { "$numberInt": "55" },
    "email": "james.garcia@example.com",
    "paymentId": "pi_3POPFZDOkNDlRQgb1tM1Vi0w",
    "createdAt": { "$date": { "$numberLong": "1717614768000" } },
    "__v": { "$numberInt": "0" }
  }
];

export default contributionData;
