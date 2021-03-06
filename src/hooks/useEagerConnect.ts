import { ConnectorNames, getChainId, getConnectorId } from '@alium-official/uikit'
import useAuth from 'hooks/useAuth'
import { useEffect } from 'react'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    })
  )

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = getConnectorId()
    const chainId = getChainId()

    if (connectorId === ConnectorNames.BSC && (chainId === 128 || chainId === 256)) {
      return
    }

    if (connectorId) {
      const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
      const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')

      // Currently BSC extension doesn't always inject in time.
      // We must check to see if it exists, and if not, wait for it before proceeding.
      if (isConnectorBinanceChain && !isBinanceChainDefined) {
        _binanceChainListener().then(() => login(connectorId))

        return
      }

      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect
