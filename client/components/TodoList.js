import { IoMdAddCircle } from 'react-icons/io'
import Task from "./Task"

const TodoList = ({tasks, input, setInput, addTask, deleteTask}) => <div className='w-[70%] py-4 px-9 rounded-[30px] overflow-y-scroll'>
  <h2 className='text-4xl bolder text-white pt-10 pb-8'>
    What&apos;s up, Kevin!
  </h2>
  <div className='py-3 text-white'>TODAY&apos;S TASKS</div>
  <form className='flex items-center justify-center'>
    <input
      className='rounded-[10px] w-full p-[10px] border-none outline-none bg-white bg-opacity-50 placeholder-black mb-[10px]'
      placeholder='Add a task for today...'
      value={input}
      onChange={e => setInput(e.target.value)}
    />
    <IoMdAddCircle
      onClick={addTask}
      className='text-white text-[50px] cursor-pointer ml-[20px] mb-[10px]'
    />
  </form>
  <ul>
    {tasks.map((task) => (
      <Task 
        key= {task.id}
        taskText = {task.taskText}
        onClick={deleteTask(task.id)}
      />
    ))}
  </ul>
</div>

export default TodoList