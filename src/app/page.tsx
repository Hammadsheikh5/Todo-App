"use client"; // This indicates that the code should run on the client-side in a Next.js application.
import React from "react"; // Importing React to work with JSX and React features.
import { useState } from "react"; // Importing useState hook to manage component state.

interface titleinterface { // Defining the interface for the task object with title and description fields.
  title: string, 
  desc: string
}

export default function TodoApp() { // Default exported functional component.

  const [title, settitle] = useState<string>(""); // State for the task title, initialized as an empty string.
  const [desc, setdesc] = useState<string>(""); // State for the task description, initialized as an empty string.
  const [mainTask, setmainTask] = useState<titleinterface[]>([]); // State for the list of tasks, initially an empty array of task objects.

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => { // Submit handler for the form.
    e.preventDefault(); // Prevents the default form submission to avoid page reload.

    // Adding the new task (title and description) to the mainTask state array.
    setmainTask([...mainTask, { title, desc }]);

    settitle(""); // Reset the title state to empty after adding the task.
    setdesc(""); // Reset the description state to empty after adding the task.
  }

  const deleteHandler = (i: number) => { // Delete handler to remove a task at the given index.
    const copytask = [...mainTask]; // Create a copy of the mainTask array to avoid direct mutation.
    copytask.splice(i, 1); // Remove the task at index `i` from the array.
    setmainTask(copytask); // Update the mainTask state with the modified array.
  }

  // Conditional rendering of tasks.
  const renderTask = mainTask.length === 0 ? (
    <p className="text-black">No Task Available</p> // If there are no tasks, display this message.
  ) : (
    // If tasks exist, iterate through each task and render it.
    mainTask.map((task, i) => (
      <div key={i} className="flex flex-col sm:flex-row gap-3 justify-between items-start p-4 text-black bg-slate-200 "> {/* Flexbox for layout of task */}
        <div className="flex justify-between sm:justify-evenly items-start gap-3  sm:w-[90%] w-[95%]"> {/* Flex layout for title and description */}
          <p className=" sm:w-[30%] break-words text-xs sm:text-sm md:text-base lg:text-lg  font-medium">{task.title}</p> {/* Display task title with wrapping */}
          <p className="sm:w-[60%] break-words text-xs sm:text-sm md:text-base lg:text-lg font-medium" >{task.desc}</p> {/* Display task description with wrapping */}
        </div>
        {/* Button to delete task, onClick triggers deleteHandler */}
        <button className="bg-red-500 text-white py-1 px-2 text-xs sm:text-sm md:text-base " onClick={() => deleteHandler(i)}>
          Delete
        </button>
      </div>
    ))
  );

  return (
    <>
      {/* Heading of the Todo app */}
      <h1 className="bg-black text-white p-4 text-2xl sm:text-3xl  lg:text-4xl text-center font-bold  max-w-[1500px] mx-auto"> My Todo App</h1>

      <div className="max-w-[1500px] mx-auto bg-slate-200">
        {/* Form to add a new task */}
        <form onSubmit={submitHandler} className="flex flex-col lg:flex-row lg:justify-around lg:items-center">
          {/* Title input field */}
          <label htmlFor="text" className="text-black m-2 lg:m-4 text-base sm:text-lg md:text-xl lg:text-2xl  font-semibold">Title:</label>
          <input
            required // Makes the input field required, the form won't submit if it's empty.
            type="text"
            placeholder="Enter Title Here"
            value={title} // Binds input value to the title state.
            className="w-[95%] lg:full  bg-gray-300 px-2 py-2 border border-gray-600 rounded-lg text-xs sm:text-sm md:text-base m-2 lg:m-0 text-black"
            onChange={(e) => { // Updates the title state as user types.
              settitle(e.target.value);
            }}
          />
          
          {/* Description input field */}
          <label htmlFor="text" className="text-black m-2 lg:m-4 text-base sm:text-lg md:text-xl lg:text-2xl  font-semibold">Description:</label>
          <input
            type="text"
            placeholder="Enter Description Here"
            value={desc} // Binds input value to the description state.
            onChange={(e) => { // Updates the description state as user types.
              setdesc(e.target.value);
            }}
            className="w-[95%] lg:full  bg-gray-300 px-2 py-2 border border-gray-600 rounded-lg text-xs sm:text-sm md:text-base m-2 lg:m-0 text-black"
          />
          
          {/* Button to submit the form */}
          <button className="bg-blue-800 w-[25%] sm:w-[15%] text-white p-2 rounded-lg m-2 lg:m-4 font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">Add Task</button>
        </form>

        <hr /> {/* Horizontal line separator between form and task list */}

        {/* Task rendering section */}
        <div className="bg-slate-300 p-4 max-w-[1500px] mx-auto">
          
          {renderTask} {/* Rendering the tasks based on the condition set above */}
        </div>
      </div>
    </>
  );
}
