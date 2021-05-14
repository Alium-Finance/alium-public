import { useWeb3React } from '@web3-react/core'
import { injected, walletconnect } from 'connectors'
import { useCallback } from 'react'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(
    (connectorId: any) => {
      if (connectorId === 'walletconnect') {
        return activate(walletconnect)
      }
      return activate(injected)
    },
    [activate]
  )

  return { login, logout: deactivate }
}

export default useAuth
