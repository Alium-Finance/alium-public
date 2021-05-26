// import { Button, ButtonProps, ConnectorId, useWalletModal } from '@alium-official/uikit'
import { Button,ButtonProps,useWalletModal } from '@alium-official/uikit'
import useAuth from 'hooks/useAuth'
import React from 'react'
import { useTranslation } from 'react-i18next'

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <>
      <Button onClick={onPresentConnectModal} {...props}>
        {t('unlockWallet')}
      </Button>
    </>
  )
}

export default UnlockButton
