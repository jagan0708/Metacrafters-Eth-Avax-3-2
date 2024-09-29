let web3;
let toDoListContract;
let accounts;

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
            return;
        }
    } else {
        console.error("No Ethereum provider detected");
        return;
    }

    const contractAddress = "0x61Fbc67fdbb7f1837Fa5Dc1fab30013647a0Db88";
    const toDoListABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_content",
                    "type": "string"
                }
            ],
            "name": "addTask",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_taskId",
                    "type": "uint256"
                }
            ],
            "name": "completeTask",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_taskId",
                    "type": "uint256"
                }
            ],
            "name": "deleteTask",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "content",
                    "type": "string"
                }
            ],
            "name": "TaskAdded",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "TaskCompleted",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "TaskDeleted",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "taskCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "tasks",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "content",
                    "type": "string"
                },
                {
                    "internalType": "bool",
                    "name": "completed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    toDoListContract = new web3.eth.Contract(toDoListABI, contractAddress);
    accounts = await web3.eth.getAccounts();

    updateTaskList();
    setInterval(updateTaskList, 4000);
}

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskContent = taskInput.value;

    if (!taskContent) {
        alert("Task content cannot be empty");
        return;
    }

    try {
        await toDoListContract.methods.addTask(taskContent).send({ from: accounts[0], gas: 300000 });
        console.log("Task added successfully");
    } catch (error) {
        console.error("Error adding task:", error.message);
        alert("Error adding task. Check the console for details.");
    }

    taskInput.value = '';
}

async function updateTaskList() {
    const taskCount = await toDoListContract.methods.taskCount().call();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';  // Clear the list

    for (let i = 1; i <= taskCount; i++) {
        const task = await toDoListContract.methods.tasks(i).call();
        const taskItem = document.createElement('li');
        taskItem.innerText = `${task.id}: ${task.content} [${task.completed ? 'Completed' : 'Pending'}]`;
        
        // Add complete task button
        if (!task.completed) {
            const completeButton = document.createElement('button');
            completeButton.innerText = 'Complete';
            completeButton.onclick = () => completeTask(task.id);
            taskItem.appendChild(completeButton);
        }

        // Add delete task button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    }
}

async function completeTask(taskId) {
    try {
        await toDoListContract.methods.completeTask(taskId).send({ from: accounts[0], gas: 300000 });
        console.log("Task completed successfully");
    } catch (error) {
        console.error("Error completing task:", error.message);
        alert("Error completing task. Check the console for details.");
    }
}

async function deleteTask(taskId) {
    try {
        await toDoListContract.methods.deleteTask(taskId).send({ from: accounts[0], gas: 300000 });
        console.log("Task deleted successfully");
    } catch (error) {
        console.error("Error deleting task:", error.message);
        alert("Error deleting task. Check the console for details.");
    }
}

init();
