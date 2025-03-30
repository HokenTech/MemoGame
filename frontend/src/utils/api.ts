import { ENDPOINT, CONTRACT_ACCOUNT, DEFAULT_FEE } from '../constants'
import type { ContractState } from '../types'

interface ParticipantRow {
  id: number;
  user: string;
  memo: string;
  fee: string;
}

export const fetchContractState = async (): Promise<ContractState> => {
  const balanceResponse = await fetch(`${ENDPOINT}/v1/chain/get_currency_balance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      code: 'eosio.token',
      account: CONTRACT_ACCOUNT,
      symbol: 'EOS'
    })
  })
  const balances = await balanceResponse.json()

  const stateResponse = await fetch(`${ENDPOINT}/v1/chain/get_table_rows`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      json: true,
      code: CONTRACT_ACCOUNT,
      scope: CONTRACT_ACCOUNT,
      table: 'state',
      limit: 1,
      reverse: true,
      index_position: 1,
      key_type: 'i64'
    })
  })
  const stateData = await stateResponse.json()
  const currentFee = stateData.rows.length > 0 ? stateData.rows[0].fee.split(' ')[0] : DEFAULT_FEE

  const participantsResponse = await fetch(`${ENDPOINT}/v1/chain/get_table_rows`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      json: true,
      code: CONTRACT_ACCOUNT,
      scope: CONTRACT_ACCOUNT,
      table: 'participants',
      limit: 100,
      reverse: true
    })
  })
  const participantsData = await participantsResponse.json()
  const participants = participantsData.rows?.map((row: ParticipantRow) => ({
    id: row.id,
    user: row.user,
    memo: row.memo,
    fee: row.fee
  })) || []

  const lastId = participants.length > 0 ? participants[0].id : 0
  const nextAttemptNumber = lastId + 1

  return {
    balance: balances.length > 0 ? balances[0].split(' ')[0] : '0.0000',
    currentFee,
    attempts: nextAttemptNumber,
    participants
  }
}