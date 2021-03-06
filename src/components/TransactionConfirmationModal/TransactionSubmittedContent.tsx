import { ChainId } from '@alium-official/sdk'
import { Button, LinkExternal } from '@alium-official/uikit'
import React, { useContext } from 'react'
import { ArrowUpCircle } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { ThemeContext } from 'styled-components'
import { getEtherscanLink } from '../../utils'
import { AutoColumn } from '../Column'
import { ConfirmedIcon, ContentHeader, Section, Wrapper } from './helpers'

type TransactionSubmittedContentProps = {
  onDismiss: () => void
  hash: string | undefined
  chainId: ChainId | undefined
}

const TransactionSubmittedContent = ({ onDismiss, chainId, hash }: TransactionSubmittedContentProps) => {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Section>
        <ContentHeader onDismiss={onDismiss}>{t('transactionSubmitted')}</ContentHeader>
        <ConfirmedIcon>
          <ArrowUpCircle strokeWidth={0.5} size={97} color={theme.colors.primary} />
        </ConfirmedIcon>
        <AutoColumn gap="8px" justify="center">
          {chainId && hash && (
            <LinkExternal href={getEtherscanLink(chainId, hash, 'transaction')}>{t('viewOnBscScan')}</LinkExternal>
          )}
          <Button onClick={onDismiss} mt="20px">
            {t('close')}
          </Button>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default TransactionSubmittedContent
