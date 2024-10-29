import 'dotenv/config'; // Load environment variables from .env
import fetch from 'node-fetch'; // Ensure node-fetch is installed

// API URL for the points transfer batch
const apiURL = 'https://crescendo-rewards-cxc3jxjjdq-uc.a.run.app';
const getTransferBatchURL = `${apiURL}/points/dapp/transfer/batch`;

// Function to get transfer batch by ID
async function getTransferBatchById(jwt, batchId) {
  try {
    // Make the GET request to retrieve the transfer batch by ID
    const response = await fetch(`${getTransferBatchURL}/${batchId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}` // Include JWT in the authorization header
      }
    });

    // Handle the response
    if (response.ok) {
      const data = await response.json();
      console.log('Transfer Batch Retrieved Successfully:', data);
    } else if (response.status === 404) {
      const errorData = await response.json();
      console.error('Error 404 - Not Found:', errorData.message);
    } else {
      console.error('Unexpected error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error retrieving transfer batch:', error);
  }
}

// Example usage
async function executeGetTransferBatch() {
  try {
    // Get the JWT from the getJWT.js script or use a cached token
    const jwt = '<VALID JWT>';

    // Define the batchId for the transfer batch you want to retrieve
    const batchId = '<VALID BATCH ID>'; // Example batchId

    // Call the function to retrieve the transfer batch by ID
    await getTransferBatchById(jwt, batchId);
  } catch (error) {
    console.error('Error during get transfer batch execution:', error);
  }
}

// Run the example
executeGetTransferBatch();

// Sample Response:
// Transfer Batch Retrieved Successfully: {
//   batchId: '17f223ee-b559-40f8-9f49-00c358cfdf60',
//     transfers: [
//       {
//         keys: '1',
//         boxes: '1',
//         points: '0',
//         toAddressId: '0x8750A76F91C48A439f8595Fbe40898211A70aD7C'
//       }
//     ],
//       status: 'FINALIZED',
//         secondsToFinalize: 300
// }