import 'dotenv/config'; // Load environment variables from .env
import fetch from 'node-fetch'; // Ensure node-fetch is installed
import { v4 as uuidv4 } from 'uuid';


// API URL for the points transfer batch
const apiURL = 'https://crescendo-rewards-cxc3jxjjdq-uc.a.run.app';
const createTransferBatchURL = `${apiURL}/points/dapp/transfer/batch`;

// Debug variable for the seconds to finalize
const secondsToFinalize = 300;

// Function to create a Dapp Points Transfer Batch
async function createPointsTransferBatch(jwt, batchId, transfers) {
  try {
    // Prepare the request body
    const requestBody = {
      batchId, // Optional idempotency key
      transfers, // Array of transfers
      secondsToFinalize // Time to finalize
    };

    // Make the POST request to create the transfer batch
    const response = await fetch(createTransferBatchURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}` // Include JWT in the authorization header
      },
      body: JSON.stringify(requestBody)
    });

    // Handle the response
    if (response.ok) {
      const data = await response.json();
      console.log('Transfer Batch Created Successfully:', data);
    } else if (response.status === 400) {
      const errorData = await response.json();
      console.error('Error 400 - Bad Request:', errorData.message);
    } else {
      console.error('Unexpected error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error creating transfer batch:', error);
  }
}

// Example usage
async function executeBatchTransfer() {
  try {
    // Get the JWT from the get-JWT.js script
    // IMPORTANT: Tokens are valid for 24 hours.  You don't need to get one every call.
    const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZGRyZXNzIjoiMHhhNGZlOTE3NmY1NDgwOGE1NDM2MmIxNTY5ZDNmYTBkYmE3ZDRmNTljIiwicm9sZSI6IkRBUFAiLCJpYXQiOjE3MzAxMzk4OTAsImV4cCI6MTczMDIyNjI5MH0.myH9eXQCxlo1svFA-UhZaslDsQgmGE8Yl412Fx_Wp0s';

    // Define batchId and transfers
    const batchId = uuidv4(); // Optional
    const transfers = [
      {
        toAddressId: "0xfeb88a0fcc175a3d", // Example recipient address
        keys: "1", // Number of keys to transfer
        boxes: "1"  // Number of boxes to transfer
      }
    ];

    // Call the function to create the points transfer batch
    await createPointsTransferBatch(jwt, batchId, transfers);
  } catch (error) {
    console.error('Error during batch transfer execution:', error);
  }
}

// Run the example
executeBatchTransfer();

// Sample Response:
// Transfer Batch Created Successfully: {
//   batchId: '17f223ee-b959-40f8-9f49-10c358cfdf61',
//   message: 'Transfer batch created successfully'
// }
