import { FC } from 'react'
import type { Session } from '@wharfkit/session'

interface WalletConnectionProps {
  session: Session | null
  onConnect: () => Promise<void>
  onDisconnect: () => Promise<void>
}

export const WalletConnection: FC<WalletConnectionProps> = ({ session, onConnect, onDisconnect }) => {
  return (
    <div className="flex justify-end mb-8">
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <span className="text-sm text-gray-600">
              Connected: {session.actor.toString()}
            </span>
            <button
              onClick={onDisconnect}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            onClick={onConnect}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  )
}