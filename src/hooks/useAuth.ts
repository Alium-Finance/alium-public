import { ConnectorNames, removeConnectorId } from '@alium-official/uikit'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { useCallback, useState } from 'react'
import { setupNetwork } from '../utils/wallet'
// import useToast from 'state/hooks'
import { getConnectorsByName } from '../utils/web3React'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const [errorConnection, seterrorConnection] =
    useState<
      | (Error & {
          code?: string | undefined
        })
      | null
    >(null)
  // const { toastError } = useToast()

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const { chainId, connector } = getConnectorsByName(connectorID)
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork(chainId)
            if (hasSetup) {
              try {
                activate(connector, (err) => console.error('err :>> ', err))
              } catch (err) {
                console.error('err :>> ', err)
              }
            }
          } else {
            removeConnectorId()
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
              // toastError('Provider Error', 'No provider was found')
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
              error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector
                walletConnector.walletConnectProvider = null
              }
              // toastError('Authorization Error', 'Please authorize to access your account')
            } else {
              seterrorConnection(error)
              // toastError(error.name, error.message)
            }
          }
        })
      } else {
        // toastError("Can't find connector", 'The connector config is wrong')
      }
    },
    [activate]
  )

  return { login, logout: deactivate, errorConnection }
}

export default useAuth
