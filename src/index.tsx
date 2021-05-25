import { ResetCSS } from '@alium-official/uikit'
import 'inter-ui'
import React,{ StrictMode } from 'react'
import ReactDOM from 'react-dom'
import TagManager from 'react-gtm-module'
import './i18n'
import App from './pages/App'
import Providers from './Providers'
import ApplicationUpdater from './state/application/updater'
import ListsUpdater from './state/lists/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
import GlobalStyle from './style/Global'

if ('ethereum' in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

window.addEventListener('error', () => {
  localStorage?.removeItem('redux_localstorage_simple_lists')
})

const tagManagerArgs = {
  gtmId: 'GTM-MWZ3WL5',
}

TagManager.initialize(tagManagerArgs)

ReactDOM.render(
  <StrictMode>
    <Providers>
      <>
        <ListsUpdater />
        <ApplicationUpdater />
        <TransactionUpdater />
        <MulticallUpdater />
      </>
      <ResetCSS />
      <GlobalStyle />
      <App />
    </Providers>
  </StrictMode>,
  document.getElementById('root')
)
