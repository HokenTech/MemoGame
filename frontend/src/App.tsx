import { useState, useEffect, FC } from 'react'
import { WebRenderer } from '@wharfkit/web-renderer'
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor'
import { SessionKit, SessionKitArgs} from '@wharfkit/session'
import { CHAIN_ID, ENDPOINT, CONTRACT_ACCOUNT } from './constants'
import { localStorageWrapper } from './utils/storage'
import { fetchContractState } from './utils/api'
import { GameInfo } from './components/GameInfo'
import { GuessForm } from './components/GuessForm'
import { ParticipantsList } from './components/ParticipantsList'
import { WalletConnection } from './components/WalletConnection'
import type { SessionType, ContractState } from './types'


const App: FC = () => {
  const [session, setSession] = useState<SessionType>(null)
  const [contractState, setContractState] = useState<ContractState>({
    balance: '0.0000',
    currentFee: '1.0000',
    attempts: 0,
    participants: []
  })

  const sessionKit = new SessionKit({
    appName: 'EOS Memo Game',
    chains: [{ id: CHAIN_ID, url: ENDPOINT }],
    ui: new WebRenderer(),
    walletPlugins: [new WalletPluginAnchor()],
    storage: {
      read: async (key: string) => localStorageWrapper.read(key),
      write: async (key: string, data: unknown) => localStorageWrapper.write(key, data),
      remove: async (key: string) => localStorageWrapper.remove(key)
    }
  }as SessionKitArgs)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const restored = await sessionKit.restore()
        if (restored) {
          setSession(restored)
        }
      } catch (error) {
        console.error('Failed to restore session:', error)
      }
    }
    restoreSession()
  }, [])

  useEffect(() => {
    const updateState = async () => {
      try {
        const state = await fetchContractState()
        setContractState(state)
      } catch (error) {
        console.error('Failed to update contract state:', error)
      }
    }
    
    updateState()
    const interval = setInterval(updateState, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleConnect = async () => {
    try {
      const result = await sessionKit.login()
      if (result && result.session) {
        setSession(result.session)
        console.log('Connected account:', result.session.actor.toString())
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      alert('Please install a wallet and refresh the page to continue.')
    }
  }

  const handleDisconnect = async () => {
    if (session) {
      await sessionKit.logout()
      setSession(null)
    }
  }

  const handleMemoSubmit = async (memo: string) => {
    if (!session) {
      alert('Please connect your wallet first')
      return
    }

    try {
      const action = {
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: session.actor.toString(),
          permission: session.permission.toString(),
        }],
        data: {
          from: session.actor.toString(),
          to: CONTRACT_ACCOUNT,
          quantity: `${contractState.currentFee} EOS`,
          memo
        }
      }

      await session.transact({ action })
      const state = await fetchContractState()
      setContractState(state)
    } catch (error) {
      console.error('Transaction failed:', error)
      alert('Transaction failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">EOS Memo Game</h1>
          <p className="text-lg text-gray-600">
            Guess the secret word to win half of the contract balance!
          </p>
        </div>

        <WalletConnection 
          session={session}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
        />

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <GameInfo contractState={contractState} />
          <GuessForm 
            session={session}
            currentFee={contractState.currentFee}
            onSubmit={handleMemoSubmit}
          />
        </div>

        <ParticipantsList participants={contractState.participants} />
      </div>
    </div>
  )
}

export default App