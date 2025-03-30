import { Session } from '@wharfkit/session'

export type SessionType = Session | null

export interface Participant {
  id: number
  user: string
  memo: string
  fee: string
}

export interface ContractState {
  balance: string
  currentFee: string
  attempts: number
  participants: Participant[]
}