import { FC } from 'react'
import type { Participant } from '../types'

interface ParticipantsListProps {
  participants: Participant[]
}

export const ParticipantsList: FC<ParticipantsListProps> = ({ participants }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Recent Attempts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {participants.length > 0 ? (
              participants.map((participant) => (
                <tr key={participant.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.memo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.fee}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">No attempts yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}