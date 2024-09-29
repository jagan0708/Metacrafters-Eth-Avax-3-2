// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ToDoList {
    
    // Define a task structure
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    // State variable to store the count of tasks
    uint256 public taskCount;

    // Mapping to store tasks
    mapping(uint256 => Task) public tasks;

    // Events
    event TaskAdded(uint256 id, string content);
    event TaskCompleted(uint256 id);
    event TaskDeleted(uint256 id);

    // Function to add a new task
    function addTask(string memory _content) public {
        taskCount++;  // Increment task count
        tasks[taskCount] = Task(taskCount, _content, false);  // Create a new task
        emit TaskAdded(taskCount, _content);  // Emit the TaskAdded event
    }

    // Function to complete a task
    function completeTask(uint256 _taskId) public {
        Task storage task = tasks[_taskId];  // Fetch the task from the mapping
        require(_taskId > 0 && _taskId <= taskCount, "Task does not exist");  // Check if the task exists
        task.completed = true;  // Mark the task as completed
        emit TaskCompleted(_taskId);  // Emit the TaskCompleted event
    }

    // Function to delete a task
    function deleteTask(uint256 _taskId) public {
        require(_taskId > 0 && _taskId <= taskCount, "Task does not exist");  // Check if the task exists
        delete tasks[_taskId];  // Delete the task from the mapping
        emit TaskDeleted(_taskId);  // Emit the TaskDeleted event
    }
}
