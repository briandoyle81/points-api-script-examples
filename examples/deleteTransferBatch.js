// This script is not working.  Please stay tuned for an update.

// import 'dotenv/config'; // Load environment variables from .env
// import fetch from 'node-fetch'; // Ensure node-fetch is installed

// // API URL for the points transfer batch
// const apiURL = 'https://crescendo-rewards-cxc3jxjjdq-uc.a.run.app';
// const deleteTransferBatchURL = `${apiURL}/points/dapp/transfer/batch`;

// // Function to delete transfer batch by ID
// async function deleteTransferBatchById(jwt, batchId) {
//   try {
//     // Make the DELETE request to cancel the transfer batch by ID
//     const response = await fetch(`${deleteTransferBatchURL}/${batchId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authentication': `Bearer ${jwt}` // Include JWT in the authorization header
//       }
//     });

//     // Handle the response
//     if (response.ok) {
//       const data = await response.json();
//       console.log('Transfer Batch Cancelled Successfully:', data.message);
//     } else if (response.status === 404) {
//       const errorData = await response.json();
//       console.error('Error 404 - Not Found:', errorData.error);
//     } else if (response.status === 400) {
//       console.log(response);
//       const errorData = await response.json();
//       console.error('Error 400 - Bad Request:', errorData.error);
//     } else {
//       console.error('Unexpected error:', response.status, response.statusText);
//     }
//   } catch (error) {
//     console.error('Error cancelling transfer batch:', error);
//   }
// }

// // Example usage
// async function executeDeleteTransferBatch() {
//   try {
//     // Get the JWT from the get-JWT.js script or use the cached token
//     const jwt = '<VALID JWT>'; // Replace with your valid JWT token

//     // Define the batchId for the transfer batch you want to cancel
//     const batchId = '<BATCH ID>'; // Example batchId

//     // Call the function to delete the transfer batch by ID
//     await deleteTransferBatchById(jwt, batchId);
//   } catch (error) {
//     console.error('Error during delete transfer batch execution:', error);
//   }
// }

// // Run the example
// executeDeleteTransferBatch();

// // 