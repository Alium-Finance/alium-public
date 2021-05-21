import { useWeb3React } from '@web3-react/core'
import { useEffect, useRef, useState } from 'react'
import Web3 from 'web3'
import { getWeb3NoAccount } from './web3'

/**
 * Provides a web3 instance using the provider provided by useWallet
 * with a fallback of an httpProver
 * Recreate web3 instance only if the provider change
 */
const useWeb3 = () => {
  const { library } = useWeb3React()

  const refEth = useRef(library?.provider)
  const [web3, setweb3] = useState(library?.provider ? new Web3(library?.provider) : getWeb3NoAccount())

  useEffect(() => {
    if (library?.provider !== refEth.current) {
      setweb3(library?.provider ? new Web3(library?.provider) : getWeb3NoAccount())
      refEth.current = library?.provider
    }
  }, [library?.provider])

  return web3
}

export default useWeb3
