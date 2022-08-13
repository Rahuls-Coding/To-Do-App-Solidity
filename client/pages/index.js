import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import {useState} from 'react'
import { TaskContract } from '../config.js'
import TaskAbi from '../../backend/build/contracts/TaskContract.json'
import { ethers } from "ethers"

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {

  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserConnected, setIsUserConnected] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')



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

  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {
    e.preventDefault()

  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = key => async () => {

  }

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {!isUserConnected ? <ConnectWalletButton connectWallet={connectWallet} /> :
        !correctNetwork ? <TodoList /> : <WrongNetworkMessage />}
    </div>
  )
}

    