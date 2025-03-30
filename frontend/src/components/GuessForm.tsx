import { FC, FormEvent } from 'react'
import type { SessionType } from '../types'

interface GuessFormProps {
  session: SessionType
  currentFee: string
  onSubmit: (memo: string) => Promise<void>
}

export const GuessForm: FC<GuessFormProps> = ({ session, currentFee, onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const memoInput = form.memo as HTMLInputElement
    if (memoInput.value.trim()) {
      onSubmit(memoInput.value.trim())
      memoInput.value = ''
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Submit Your Guess</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="memo" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your guess
          </label>
          <input
            type="text"
            id="memo"
            placeholder="Enter your guess here"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!session}
          />
        </div>
        <button
          type="submit"
          disabled={!session}
          className={`w-full px-4 py-2 text-white rounded transition ${
            session ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Submit ({currentFee} EOS)
        </button>
      </form>
    </div>
  )
}