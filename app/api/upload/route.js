import { v2 as cloudinary } from 'cloudinary';
const path = require('path');

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'dhxfi4g8s', 
  api_key: '751699583844473', 
  api_secret: 'ajWs2GzlZX_JNWTlYVXdE1dM3N4' 
});

export async function POST(Request) {
  try {
      const formData = await Request.formData();

      // Access uploaded files
      const files = formData.getAll('files');

      const uploadPromises = [];
      const links = [];

      for (const file of files) {
          const arrayBuffer = await file.arrayBuffer(); // Get file ArrayBuffer
          const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer

          if (buffer.length > 0) {
              const timestamp = Date.now();

              const uploadPromise = new Promise((resolve, reject) => {
                  cloudinary.uploader.upload_stream(
                      {
                          folder: 'socialInsure',
                          public_id: `image_${timestamp}`, // Optional: Provide a custom public_id
                          resource_type: 'auto' // Optional: Automatically determine the resource type
                      },
                      (error, result) => {
                          if (error) {
                              console.error(error);
                              reject('Error uploading image to Cloudinary');
                          } else {
                              links.push(result.secure_url); // Push the URL to the array
                              resolve(result.secure_url);
                          }
                      }
                  ).end(buffer); // Pass the file's Buffer directly to upload_stream
              });

              uploadPromises.push(uploadPromise);
          } else {
              console.error('File is empty or missing necessary data:', file);
          }
      }

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);

      // Respond with uploaded file links
      return Response.json({ data: { links } });
  } catch (error) {
      console.error('Error processing form data:', error);
      return Response.json({ error: error.message });
  }
}