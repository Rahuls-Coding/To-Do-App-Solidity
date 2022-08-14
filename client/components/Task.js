import { BsFillTrashFill } from 'react-icons/bs'

const Task = ({taskText}) => {
  return (
    <div className='flex items-center text-white'>
      <div className='bg-white bg-opacity-50 text-black flex w-[70%] rounded-[15px] mb-[10px] flex-1 '>
        <div className='flex items-center justify-between w-full p-[20px] text-lg'>
        {taskText}
        </div>
      </div>
      <BsFillTrashFill
        className='text-2xl cursor-pointer ml-10'
      />
    </div>
  )
}

export default Task
