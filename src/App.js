import { Alchemy, Network } from "alchemy-sdk"
import { useEffect, useState } from "react"

import "./App.css"

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

function App() {
  const [blockNumber, setBlockNumber] = useState(null)
  const [block, setBlock] = useState(null)
  const [transactions, setTransaction] = useState([])

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber())
    }

    getBlockNumber()
  }, [])

  useEffect(() => {
    if (blockNumber === null) return
    async function fetchBlockDetails() {
      const blockData = await alchemy.core.getBlock(blockNumber)
      const txData = await alchemy.core.getBlockWithTransactions(blockNumber)
      setBlock(blockData)
      console.log(txData.transactions, "la")
      setTransaction(txData.transactions)
    }

    fetchBlockDetails()
  }, [blockNumber])

  return (
    <div className="App">
      <h1>Current Block: {blockNumber}</h1>
      {block && (
        <div>
          <p>Block Hash: {block.hash}</p>
          <p>Block Miner: {block.miner}</p>
        </div>
      )}
      <h2>Transactions</h2>
      {transactions.map((tx, index) => (
        <div key={index}>
          <p>From: {tx.from}</p>
          <p>To: {tx.to}</p>
          <p>Value: {tx.value._hex}</p>
        </div>
      ))}
    </div>
  )
}

export default App
