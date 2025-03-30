import { FC } from 'react'
import type { ContractState } from '../types'

interface GameInfoProps {
  contractState: ContractState
}

export const GameInfo: FC<GameInfoProps> = ({ contractState }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Game Info</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Contract Balance:</span>
          <span className="font-medium">{contractState.balance} EOS</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Current Fee:</span>
          <span className="font-medium">{contractState.currentFee} EOS</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Attempts:</span>
          <span className="font-medium">{contractState.attempts}</span>
        </div>
      </div>
    </div>
  )
}