# Decentralized-To-do-List
This is a decentralized to-do list application that allows users to add, complete, and delete tasks using a smart contract on the Ethereum blockchain. The frontend interacts with the smart contract using Web3.js and MetaMask.

## Features

- **Add Task**: Add new tasks to the to-do list.
- **Complete Task**: Mark tasks as completed.
- **Delete Task**: Remove tasks from the list.
- **Real-time Sync**: Automatically updates the task list by interacting with the blockchain.

## Technologies Used

- **Solidity**: Smart contract language.
- **Web3.js**: JavaScript library to interact with the Ethereum blockchain.
- **MetaMask**: Ethereum wallet to handle blockchain transactions.
- **HTML/CSS/JavaScript**: Frontend development.
- **Gitpod**: For coding and deploying the application.
- **Ethereum Testnet (Fuji, Rinkeby, etc.)**: Blockchain network used for testing.

## Project Setup

### Prerequisites

To run this project locally, you need the following:

- **MetaMask** extension installed in your browser.
- An account on a supported Ethereum test network (e.g., Fuji or Rinkeby).
- Basic understanding of blockchain, smart contracts, and Web3.js.
  
### Steps to Run Locally

1. **Clone the repository:**

   bash
   git clone <repository_url>
   cd decentralized-todo-list
   

2. **Install dependencies:**

   This project uses no additional package dependencies for the frontend, so no need to install anything special.

3. **MetaMask setup:**

   - Install MetaMask as a browser extension if you haven't already.
   - Switch MetaMask to the test network (e.g., Fuji or Rinkeby).
   - Import your account or create a new one.

4. **Deploy the Smart Contract:**

   If the contract is not yet deployed, deploy it using Remix or Hardhat. Make sure you copy the contract address and update the frontend configuration in `app.js`.

5. **Run the Frontend:**

   we already created server.js file with express library

   **Node.js:**
   bash
   node server.js
   
   Open the URL displayed in the console (e.g., `http://localhost:8080`) in your browser.

6. **Interact with the Smart Contract:**

   - Make sure MetaMask is connected to the same test network as the contract.
   - You can now add, complete, and delete tasks directly from the UI. Each action will trigger a blockchain transaction.

## Project Structure


/front_end
  ├── index.html        # Main HTML page
  ├── style.css         # Styling for the application
  ├── app.js            # JavaScript for interacting with smart contract via Web3.js
  ├── config.js         # Contains the ABI and contract address


### Smart Contract

The Solidity smart contract defines the core functionality for task management. It includes the following features:

- **addTask**: Adds a new task.
- **completeTask**: Marks a task as completed.
- **deleteTask**: Deletes a task.
### Contract ABI

Make sure the ABI in `app.js` matches the compiled contract. It should look like this:

js
const toDoListABI = [
    // ABI details here
];


## Smart Contract Deployment

You can deploy the contract using [Remix](https://remix.ethereum.org/) or using Hardhat:

1. **Using Remix**:
   - Open the `SmartContract.sol` file in Remix.
   - Compile the contract.
   - Deploy the contract to a test network (Fuji, Rinkeby, etc.).
   - Copy the deployed contract address and ABI to `app.js`.

2. **Using Hardhat**:
   - Initialize Hardhat in your project.
   - Write the deployment script.
   - Run the deployment and update the contract address in the frontend.

## Usage

1. Open the website in your browser.
2. Make sure MetaMask is connected to your account and a supported network.
3. Add a task by typing in the task content and clicking "Add Task".
4. You can complete a task by clicking the "Complete" button or delete it by clicking "Delete".
5. The tasks are synced with the blockchain and will automatically update on the frontend.

## License

This project is licensed under the MIT License.

## SAI JAGAN KOTNI (saijagankotni@gmail.com)
