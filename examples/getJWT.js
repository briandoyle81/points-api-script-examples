import 'dotenv/config'; // Load environment variables from .env
import { Wallet } from 'ethers';
import fetch from 'node-fetch'; // You may need to install node-fetch

const apiURL = process.env.API_URL;
const createChallengeURL = `${apiURL}/points/dapp/challenge`;
const solveChallengeURL = `${apiURL}/points/dapp/solve`;

// Load the private key and address from .env file
const address = process.env.PUBLIC_SIGNER_ADDRESS;
const privateKey = process.env.WALLET_PRIVATE_KEY;

// Initialize wallet using the private key
const wallet = new Wallet(privateKey);

// Function to sign a challenge string using ERC-191
async function signMessage(message) {
  const signature = await wallet.signMessage(message);
  return signature;
}

// Function to start the challenge process
export default async function getJWT() {
  try {
    // Step 1: POST the addressId to the challenge endpoint (note the key change to "addressId")
    console.log(`Requesting challenge for address: ${address}`);
    const challengeResponse = await fetch(createChallengeURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ addressId: address }) // Changed key to "addressId"
    });

    if (!challengeResponse.ok) {
      throw new Error(`Failed to get challengeData: ${challengeResponse.statusText}`);
    }

    const { challengeData } = await challengeResponse.json();
    console.log(`Received challengeData: ${challengeData}`);

    // Step 2: Sign the challengeData
    const signature = await signMessage(challengeData);
    console.log(`Signature: ${signature}`);

    // Step 3: POST the challengeData and signature to the solve endpoint
    const solveResponse = await fetch(solveChallengeURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        challengeData,
        signature
      })
    });

    if (!solveResponse.ok) {
      throw new Error(`Failed to solve challenge: ${solveResponse.statusText}`);
    }

    const solveResult = await solveResponse.json();
    console.log('Challenge solved successfully:', solveResult);

    return solveResult; // Return the result of the solve operation

  } catch (error) {
    console.error('Error:', error);
  }
}

// Start the challenge process.  Tokens expire after 24 hours
const authToken = getJWT();

// Sample Response
// Challenge solved successfully: {
//   token: 'eyJhbGciOiJ\KIUzI1ZiIsInR5cCI6IkpXVCJ9.eyJhZGRzZXNzIjoiMHhhAGZlOTE3NmA1NDgwOGE1NDM2MmIxNTY5ZDNmYTBkYmE3ZDRmNTljIiwicm9sZSI6IkRBUFAiLCJpYXQiOjE3MzAxNDEzNTMsImV4cCI6MTczMDIyNzc1M30.gBMLTMR-gr8b3nH6XPoQAKqNwsNbKfy8f_LwTVzVJhY'
// }
