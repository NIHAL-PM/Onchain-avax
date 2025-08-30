import { ethers } from "ethers";

export const CONTRACT_ADDRESS = "0xd8540A08f770BAA3b66C4d43728CDBDd1d7A9c3b";

export const CONTRACT_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "pool",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "total",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "intervalAmount",
          "type": "uint256"
        }
      ],
      "name": "PlanCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "pool",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "time",
          "type": "uint256"
        }
      ],
      "name": "SIPExecuted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "pool",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "remainingAmount",
          "type": "uint256"
        }
      ],
      "name": "SIPFinalized",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "pool",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "totalAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountPerInterval",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "frequency",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maturity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "destAddress",
          "type": "address"
        }
      ],
      "name": "createPlan",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "pool",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amountPerInterval",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "frequency",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maturity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "destAddress",
          "type": "address"
        }
      ],
      "name": "createPlanWithNative",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "pool",
          "type": "string"
        }
      ],
      "name": "executeSIP",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "pool",
          "type": "string"
        }
      ],
      "name": "finalizeSIP",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "pool",
          "type": "string"
        }
      ],
      "name": "getPlan",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "token",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "totalAmount",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amountPerInterval",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "frequency",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "nextExecution",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maturity",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "destAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "executedAmount",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "active",
              "type": "bool"
            }
          ],
          "internalType": "struct OnchainSIP.SIPPlan",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "userPlans",
      "outputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "totalAmount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "amountPerInterval",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "frequency",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "nextExecution",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maturity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "destAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "executedAmount",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }];

export interface SIPPlan {
  token: string;
  totalAmount: bigint;
  amountPerInterval: bigint;
  frequency: bigint;
  nextExecution: bigint;
  maturity: bigint;
  destAddress: string;
  executedAmount: bigint;
  active: boolean;
}

export function getSIPContract(signerOrProvider: ethers.Signer | ethers.Provider) {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}
