import 'dotenv/config'; // Load environment variables from .env
import fetch from 'node-fetch'; // Ensure node-fetch is installed

const apiURL = 'https://crescendo-rewards-cxc3jxjjdq-uc.a.run.app';
const getUserPointsEthereumURL = `${apiURL}/points/ethereum`;
const getUserPointsFlowURL = `${apiURL}/points/flow`;

// Load the recipient Ethereum address from environment variables
const recipientAddress = process.env.PUBLIC_SIGNER_ADDRESS;

// Function to validate the address and determine its type
function validateAddress(address) {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    const flowAddressRegex = /^0x[a-fA-F0-9]{16}$/;

    if (ethAddressRegex.test(address)) {
        return 'ethereum';
    } else if (flowAddressRegex.test(address)) {
        throw new Error(`This appears to be a Flow address: ${address}. Please use the Flow endpoint.`);
    } else {
        throw new Error(`Invalid Ethereum address: ${address}.`);
    }
}

// Function to get user points by Ethereum address
async function getUserPointsByEthereumAddress(address) {
    try {
        // Validate the address format
        const addressType = validateAddress(address);

        if (addressType !== 'ethereum') {
            throw new Error('Invalid address type. This function only handles Ethereum addresses.');
        }

        // Make a GET request to the Ethereum points endpoint
        const response = await fetch(`${getUserPointsEthereumURL}/${address}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        // Handle various response codes
        if (response.ok) {
            const data = await response.json();
            console.log(`User Points for ${address}:`, data);
        } else if (response.status === 400) {
            const errorData = await response.json();
            console.error('Error 400 - Bad Request:', errorData.message);
        } else if (response.status === 404) {
            const errorData = await response.json();
            console.error('Error 404 - Not Found:', errorData.message);
        } else if (response.status === 500) {
            const errorData = await response.json();
            console.error('Error 500 - Internal Server Error:', errorData.message);
        } else {
            console.error('Unexpected error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Example usage
getUserPointsByEthereumAddress(recipientAddress);
