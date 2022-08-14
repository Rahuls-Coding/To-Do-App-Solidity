import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import {useEffect, useState} from 'react'
import { TaskContractAddress } from '../config.js'
import TaskAbi from '../../backend/build/contracts/TaskContract.json'
import { ethers } from "ethers"




export default function Home() {

  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserConnected, setIsUserConnected] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    connectWallet()
    getAllTasks()
  },[])

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log('No ethereum is detected')
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' })
      console.log('connected to', chainId)
      const renkebyChain = '0x4'

      if (chainId !== renkebyChain) {
        alert("Wrong network")
        setCorrectNetwork(false)
        return
      } else {
        setCorrectNetwork(true)
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
      console.log('accounts', accounts[0])
      setCurrentAccount(accounts[0])
      setIsUserConnected(true)

    } 
    catch (error) {
      console.log(error)
    }
  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        let allTasks = await TaskContract.getMyTasks()
        setTasks(allTasks)

      } else {
        console.log("Ethereum does not exist")
      }
    } catch (e) {
        console.log(e)
    }

  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {
    e.preventDefault()
    
    let task = {
      taskText: input,
      isDeleted: false
    }

    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )
        TaskContract.addTask(task.taskText, task.isDeleted)
        .then(res => {
          setTasks([...tasks, task])
          console.log('Added task')
        })
        .catch(err => 
          console.log('Error adding task', err))
      } else {
        console.log('No ethereum is detected')
      } 
    }
    catch (error) {
      console.log(error)
    }
    setInput('')
  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = key => async () => {
    
    try{
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )
          
      const deleteTaskTx =  await TaskContract.deleteTask(key, true)
      console.log("deleted Task", deleteTaskTx)
      let allTasks = await TaskContract.getMyTasks()
        setTasks(allTasks)

      } else  {
        console.log("No ethereum is detected")
      }
    }
    catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='h-screen w-screen flex justify-center py-6 bg-image'>
      {!isUserConnected ? <ConnectWalletButton connectWallet={connectWallet} /> :
        correctNetwork ? <TodoList tasks={tasks} input={input} setInput={setInput} addTask={addTask} deleteTask={deleteTask}/> : <WrongNetworkMessage />}
    </div>
  )
}

    