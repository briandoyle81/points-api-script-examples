import 'dotenv/config'; // Load environment variables from .env
import fetch from 'node-fetch'; // Ensure node-fetch is installed

// API URL for the points transfer batch
const apiURL = 'https://crescendo-rewards-cxc3jxjjdq-uc.a.run.app';
const getAllTransferBatchesURL = `${apiURL}/points/dapp/transfer/batch`;

// Function to get all transfer batches
async function getAllTransferBatches(jwt) {
  try {
    // Make the GET request to retrieve all transfer batches
    const response = await fetch(getAllTransferBatchesURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}` // Include JWT in the authorization header
      }
    });

    // Handle the response
    if (response.ok) {
      const data = await response.json();
      // Log the full response with proper formatting
      console.log('All Transfer Batches Retrieved Successfully:', JSON.stringify(data, null, 2));
    } else {
      console.error('Unexpected error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error retrieving all transfer batches:', error);
  }
}

// Example usage
async function executeGetAllTransferBatches() {
  try {
    // Get the JWT from the getJWT.js script or use a cached token
    // Note:  You likely **don't** want your JWT in an envar.  This is for testing convenience.
    const jwt = process.env.VALID_JWT;

    // Call the function to retrieve all transfer batches
    await getAllTransferBatches(jwt);
  } catch (error) {
    console.error('Error during get all transfer batches execution:', error);
  }
}

// Run the example
executeGetAllTransferBatches();


// Sample Response:
// All Transfer Batches Retrieved Successfully: [
//   {
//     "batchId": "17f223ee-b559-40f8-9f49-00c358cfdf60",
//     "transfers": [
//       {
//         "keys": "1",
//         "boxes": "1",
//         "points": "0",
//         "toAddressId": "0x9750A76F91C48A339f8595Fbe40898111A70aD7C"
//       }
//     ],
//     "status": "FINALIZED",
//     "secondsToFinalize": 300
//   }
// ]