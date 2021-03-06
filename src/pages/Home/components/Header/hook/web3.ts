import { getChainId } from '@alium-official/uikit'
import getRpcUrl from 'utils/getRpcUrl'
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'

const chainId = getChainId()
const RPC_URL = getRpcUrl(chainId)
const httpProvider = new Web3.providers.HttpProvider(RPC_URL as string, { timeout: 10000 } as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3NoAccount }
export default web3NoAccount
