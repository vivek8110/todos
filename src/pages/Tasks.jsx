import React, { useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";

function TasksList() {
  const { tasks, changeTaskStatus, removeTask } = useTasks();
  console.log(tasks)
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [showall, setShowall] = useState(false);
  const [showunCompleted, setShowunCompleted] = useState(false);
  const [finalTasks, setFinalTasks] = useState([])


  useEffect(() => {
    let filteredTasks = tasks.filter(t => t.taskName.toLowerCase().includes(searchTerm.toLowerCase()));

    if (showCompleted === true) {
      filteredTasks = filteredTasks.filter(t => t.taskStatus === true);
      setShowall(false)
      setShowunCompleted(false)
    }

    if (showall === true) {
      filteredTasks = tasks
      // setShowall(true)
      setShowCompleted(false)
      setShowunCompleted(false)

    }
    if (showunCompleted === true) {
      filteredTasks = filteredTasks.filter(t => t.taskStatus !== true)
      // setShowunCompleted(true)
      setShowCompleted(false)
      setShowall(false)
    }
    setFinalTasks(filteredTasks);
  }, [showCompleted, showunCompleted, showall, searchTerm, tasks]);


  return (
    <div className="space-y-4">
      <div className="">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full mb-5 p-1 border-3e5c76 rounded shadow hover:border-1d2d44 transition-colors duration-200"
        />
        <label className="ml-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showall}
            onChange={e => setShowall(e.target.checked)}
            className="mr-2"
          />
          Show All
        </label>
        <label className="ml-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={e => setShowCompleted(e.target.checked)}
            className="mr-2"
          />
          Show completed
        </label>
        <label className="ml-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showunCompleted}
            onChange={e => setShowunCompleted(e.target.checked)}
            className="mr-2"
          />
          Show Uncompleted
        </label>
      </div>
      {
        finalTasks.length <= 0 ?
          <p className="text-lg font-semibold text-center text-gray-500">No tasks are added</p>
          :
          finalTasks.map(task => {
            return (
              <div key={task.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-f0ebd8 rounded shadow">
                <div className="flex-grow mr-4 text-left">
                  <span className={`cursor-pointer text-lg ${task.taskStatus ? 'line-through text-0d1321' : 'hover:text-0d1321'} transition-colors duration-200 text-left`} onClick={() => changeTaskStatus(task.id)}>
                    {task.taskName}
                  </span>
                </div>
                <span className="rounded-full text-0d1321 cursor-pointer hover:bg-red transition-colors duration-200 p-1" onClick={() => removeTask(task.id)}>
                  X
                </span>
              </div>
            );
          })
      }

    </div>
  )
}

function AddTaskForm(props) {
  const [taskName, setTaskName] = React.useState("")
  const [taskStatus, setTaskStatus] = React.useState(false);

  const { addTask } = useTasks()

  function addTaskEvent(event) {
    event.preventDefault();
    addTask(taskName, taskStatus)
    props.hideForm()
  }


  return (
    <form onSubmit={event => addTaskEvent(event)} className="space-y-4">
      <input value={taskName} onChange={event => setTaskName(event.target.value)} type="text" name="taskName" id="taskName" placeholder="task name" className="w-full p-2 border-3e5c76 rounded shadow hover:border-1d2d44 transition-colors duration-200" />
      <div className="flex items-center">
        <span>Is Completed</span>
        <input type="checkbox" value={taskStatus} onChange={event => setTaskStatus(event.target.checked)} name="isCompleted" id="isCompleted" className="ml-2 hover:border-1d2d44 transition-colors duration-200" />
      </div>
      <button type="submit" className="w-full p-2 text-white bg-0d1321 rounded shadow hover:bg-1d2d44 transition-colors duration-200">submit</button>
    </form>
  )
}

export default function Tasks() {
  const [showTaskAddForm, setShowTaskAddForm] = React.useState(false)

  const handleAddTask = () => {
    setShowTaskAddForm(true)
  }

  const hideAddTaskForm = () => setShowTaskAddForm(false)

  return (
    <>
      <button className="w-40 p-2 text-white bg-3e5c76 rounded shadow hover:bg-1d2d44 transition-colors duration-200" onClick={handleAddTask}>Add Task</button>
      <div className="p-4 space-y-4 w-full">
        {showTaskAddForm ? <AddTaskForm hideForm={hideAddTaskForm} /> : <TasksList />}
      </div>
    </>
  );
}