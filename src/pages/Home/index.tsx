import { JSBI, TokenAmount } from '@alium-official/sdk'
import { Button, Flex, Heading, Text } from '@alium-official/uikit'
import { parseUnits } from '@ethersproject/units'
import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core'
import axios from 'axios'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import ConnectionPending from 'components/ConnectionPending/ConnectionPending'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Modal from 'components/Modal'
import { RowBetween } from 'components/Row'
import { Dots } from 'components/swap/styleds'
import { TransactionSubmittedContent, TransactionSucceedContent } from 'components/TransactionConfirmationModal'
import { NFT_PRIVATE_ADDRESS } from 'constants/abis/nftPrivate'
import { useActiveWeb3React } from 'hooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useCollectibleContract, useNFTPrivateContract } from 'hooks/useContract'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useRemovePopup } from 'state/application/hooks'
import { PopupList } from 'state/application/reducer'
import { AppState } from 'state/index'
import { WrappedTokenInfo } from 'state/lists/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import styled from 'styled-components'
import Loader from '../../components/Loader'
import AppBody from '../AppBody'
import Banner from './components/Banner/Banner'
import NftCard from './components/NftCard'
import { StyledFormControl, StyledTextField } from './components/Styled/Inputs'
import cardList from './constants/cards'
import currencies from './constants/currencies'
import emails from './constants/membersList'
import bgIMG from './images/background-img.svg'

const ContentHolder = styled.div`
  position: relative;

  & .content-background {
    position: absolute;
    right: 0;
    top: -20px;
  }

  @media screen and (max-width: 480px) {
    & .content-background {
      right: 0;
      top: 50px;
    }
  }
`

const CardWrapper = styled.div`
  width: 100%;
  font-family: Roboto, sans-serif;
  max-width: 1140px;
  margin: 20px auto 0;
  position: relative;
`

const BannerWrapper = styled.div`
  width: 100%;
  font-family: Roboto, sans-serif;
  max-width: 1140px;
  margin: 20px auto 0;
  position: relative;
`
const GridContainer = styled.div`
  display: grid;
  column-gap: 20px;

  grid-template-columns: 1fr;
  row-gap: 20px;

  @media screen and (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 1025px) {
    grid-template-columns: repeat(5, 1fr);
    row-gap: 0;
  }
`

const GridForm = styled.div`
  margin: 30px auto 0;
  display: grid;

  max-width: 100%;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 0;
  row-gap: 20px;

  @media screen and (min-width: 769px) {
    grid-template-columns: 200px 2fr 2fr 1fr;
    grid-template-rows: 1fr;
    column-gap: 20px;
  }
  @media screen and (min-width: 1025px) {
    max-width: 90%;
    row-gap: 0;
  }
`

const StyledHeading = styled(Heading)`
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 70px;
  }
`

const ButtonWrap = styled.div`
  width: 100%;
  max-width: initial;

  & button {
    width: 100%;
    margin-top: 4px;
  }

  & div {
    margin-top: 0;
  }
`

const AddressWrap = styled.div`
  margin-top: 10px;
  background: rgba(108, 93, 211, 0.1);
  border: 1px solid #6c5dd3;
  padding: 5px;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #6c5dd3;
`

const MessageWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.3px;
  color: rgb(137, 144, 165);
`

const NotifyMembers = (hash, count, card, currency) => {
  const explorer = 'https://bscscan.com/tx'
  if (process.env.NODE_ENV !== 'development') {
    emails.forEach((email) => {
      const obj = {
        to: email,
        subject: 'New card purchase',
        message: `Client bought ${count} cards of type ${card} for ${currency} \n  ${explorer}/${hash}`,
      }
      axios.post('https://private.alium.finance/api/send-email/', obj).catch((err) => {
        console.error(err)
      })
    })
  }
}

const Home = () => {
  const [isOpenModal, setOpenModal] = useState(false)
  const [isHideModalOpen, setHideModalOpen] = useState(false)
  const [purchasedCards, setPurchasedCards] = useState<string[]>([])
  const [activeCard, setActiveCard] = useState<any>('9')
  const isActiveCardPurchased = purchasedCards.includes(String(Number(activeCard) + 1))
  const { account, chainId } = useActiveWeb3React()
  const nftContract = useNFTPrivateContract()
  const collectibleContract = useCollectibleContract()
  const { t } = useTranslation()

  const updatePurchasedCards = useCallback(() => {
    ;(async () => {
      try {
        const accountTokens = (await collectibleContract?.balanceOf(account)).toString()

        let accountTokensIds: string[] = []
        for (let i = 0; i < Number(accountTokens); i++) {
          const tokenId: string = (await collectibleContract?.tokenOfOwnerByIndex(account, i)).toString()
          accountTokensIds = [...accountTokensIds, tokenId]
        }

        let accountTokenTypes: string[] = []
        // eslint-disable-next-line no-restricted-syntax
        for (const tokenId of accountTokensIds) {
          const tokenType: string = (await collectibleContract?.getTokenType(tokenId)).toString()
          accountTokenTypes = [...accountTokenTypes, tokenType]
        }
        setPurchasedCards(accountTokenTypes)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [account, collectibleContract])

  useEffect(() => {
    updatePurchasedCards()
  }, [updatePurchasedCards])

  useEffect(() => {
    setHideModalOpen(!account)

    if (account) {
      nftContract
        ?.isMember(account)
        .then((isMemberBool) => {
          if (isMemberBool) {
            if (isOpenModal) {
              setOpenModal(false)
            }
          } else if (!isOpenModal) {
            setOpenModal(true)
          }
        })
        .catch((err) => console.error('isMember error', err))
    }
  }, [account, isOpenModal, nftContract])

  type values = { currency: string; count: number }
  const [values, setValues] = useState<values>({ currency: currencies.stablecoins[0], count: 1 })

  const inputLabel = React.useRef(null)
  const [labelWidth, setLabelWidth] = useState<any>(0)
  const [maxAmountOfCards, setMaxAmountOfCards] = useState<any>()
  const [maxCardsAmounts, setMaxCardsAmount] = useState<number[]>([])

  const activeCardFromList = cardList.find((i) => i.id.toString() === activeCard) || cardList[0]

  const updateMaxCardsAmount = useCallback(() => {
    ;(async () => {
      const maxAmounts = await Promise.all(
        [6, 7, 8, 9, 10].map(async (item) => {
          const result = await collectibleContract
            ?.getTypeInfo(item)
            .then((resp) => {
              const amount = +resp.maxSupply - +resp.totalSupply

              if ((item - 1).toString() === activeCard) {
                setMaxAmountOfCards(amount)
              }
              return amount
            })
            .catch((err) => console.error(err))
          return result
        })
      )
      setMaxCardsAmount(maxAmounts)
    })()
  }, [activeCard, collectibleContract])

  useEffect(() => {
    updateMaxCardsAmount()
  }, [updateMaxCardsAmount])

  useEffect(() => {
    const currentInput: any = inputLabel?.current
    const width: any = currentInput?.offsetWidth
    setLabelWidth(width)
  }, [])

  useEffect(() => {
    setValues(({ currency }) => ({ currency, count: 1 }))
  }, [activeCard])

  // Quantity Currency

  const handleChangeQuantity = ({ target }) => {
    let { value } = target
    if ((value.indexOf('-') !== -1 || !parseInt(value) || !/^[0-9]+$/.test(value)) && value !== '') return
    if (value > maxAmountOfCards) value = maxAmountOfCards

    // setValues(({ currency }) => ({ currency, count: value })) // TODO: PUBLIC ROUND / max 1
    setValues(({ currency }) => ({ currency, count: 1 }))
  }

  const handleChangeCurrency = ({ target }) => {
    const { value } = target
    setValues(({ count }) => ({ currency: value, count }))
  }

  const handleClickCard = (id: string) => {
    setActiveCard(id)
    setMaxAmountOfCards(maxCardsAmounts[id])
  }

  // TODO: disable 'MAX' button for public round
  // const handleClickMax = () => {
  //   setValues((oldValues) => ({
  //     ...oldValues,
  //     count: maxAmountOfCards
  //   }))
  // }

  const [txHash, setTxHash] = useState('xczxczxczxc')
  const [tempTxHash, setTempTxHash] = useState('')
  const [isTxOpen, setTxOpen] = useState(false)

  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions)
  const transactions: any = chainId ? state[chainId] ?? {} : {}

  if (txHash !== '' && transactions[txHash]?.receipt) {
    setTempTxHash(txHash)
    setTxHash('')
    setTxOpen(false)
    updateMaxCardsAmount()
  }

  const addTransaction = useTransactionAdder()

  const handleBuy = () => {
    const totalAmount = `${values.count * +activeCardFromList?.price}`
    const args = [
      currencies.match[values.currency]?.address,
      +activeCard + 1,
      parseUnits(totalAmount, currencies.match[values.currency]?.decimals),
      values.count,
    ]

    nftContract?.estimateGas
      .buyBatch(...args, { from: account })
      .then((estimatedGasLimit) => {
        nftContract
          ?.buyBatch(...args, { gasLimit: estimatedGasLimit })
          .then((resp) => {
            NotifyMembers(resp.hash, values.count, +activeCard + 1, values.currency)
            const selectedCard = cardList.filter((card) => card.id.toString() === activeCard)[0]
            addTransaction(resp, {
              summary: t('boughtCards', { count: values.count }),
              additionalData: {
                count: values.count,
                card: selectedCard,
              },
            })

            setTxHash(resp.hash)
            setTxOpen(true)
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [approval, approveCallback] = useApproveCallback(
    new TokenAmount(
      new WrappedTokenInfo(currencies.match[values.currency], []),
      JSBI.BigInt(
        parseUnits(
          values.count ? values?.count.toString() : '1',
          currencies.match[values.currency]?.decimals
        ).toString()
      )
    ),
    NFT_PRIVATE_ADDRESS
  )
  const [approvalSubmitted, setApprovalSubmitted] = React.useState<boolean>(false)

  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const balance = useCurrencyBalance(account?.toString(), new WrappedTokenInfo(currencies.match[values.currency], []))

  const sufficientBalance =
    balance &&
    parseInt(balance?.raw.toString()) >=
      parseInt(
        parseUnits(
          (+activeCardFromList.price * values.count).toString(),
          currencies.match[values.currency]?.decimals
        ).toString()
      )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isValidInputs = values.count && values.currency && sufficientBalance

  const accountEllipsis = account ? `${account.substring(0, 8)}...${account.substring(account.length - 8)}` : null

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleClose = () => {}

  const handleTxClose = () => {
    setTxOpen(false)
  }

  const removePopup = useRemovePopup()
  const popupList = useSelector<AppState, PopupList>((s) => s.application.popupList)
  const succeedHash = txHash || tempTxHash

  let isSucceedPopupVisible = false
  const filteredPopups = popupList.filter((popup) => popup.key === succeedHash)
  if (filteredPopups.length && filteredPopups[0].show) {
    isSucceedPopupVisible = true
  }

  const handleSucceedModalClose = () => {
    removePopup(succeedHash)
    setTempTxHash('')
  }

  return (
    <ContentHolder>
      <img className="content-background" src={bgIMG} alt="background" />
      <ConnectionPending/>
      <CardWrapper>
        <Modal isOpen={isOpenModal} onDismiss={handleClose}>
          <Flex flexDirection="column">
            <Text
              style={{
                textAlign: 'center',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.3px',
                color: '#0B1359',
              }}
            >
              {t('sorryNotFound')}:
            </Text>
            <AddressWrap>{accountEllipsis}</AddressWrap>
            <Text
              mt="35px"
              style={{
                textAlign: 'center',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.3px',
                color: '#0B1359',
              }}
            >
              {t('haveBeenRegistered')}.
            </Text>
            <Text
              mt="15px"
              style={{
                textAlign: 'center',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.3px',
                color: '#0B1359',
              }}
            >
              {t('didNotHelp1')}{' '}
              <a style={{ color: '#6C5DD3' }} href="https://t.me/stacie_alium">
                @stacie_alium
              </a>{' '}
              {t('didNotHelp2')}
            </Text>
          </Flex>
        </Modal>
        <Modal isOpen={isHideModalOpen} onDismiss={handleClose}>
          <Flex flexDirection="column" style={{ margin: '0 auto' }}>
            <Text
              mb="30px"
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.3px',
                color: '#0B1359',
              }}
            >
              {t('pleaseUnlockWallet')}
            </Text>
            <ConnectWalletButton fullwidth />
          </Flex>
        </Modal>
        <Modal isOpen={isTxOpen} onDismiss={handleTxClose} maxHeight={90} padding="24px">
          <TransactionSubmittedContent chainId={chainId} hash={txHash} onDismiss={handleTxClose} />
        </Modal>

        <Modal isOpen={isSucceedPopupVisible} onDismiss={handleSucceedModalClose} maxHeight={90} padding="24px">
          <TransactionSucceedContent hash={succeedHash} onDismiss={handleSucceedModalClose} />
        </Modal>

        {/* <Clock> */}
        <StyledHeading as="h1" size="xl" color="heading" mb="40px" mt="20px">
          {t('privateRound')}
        </StyledHeading>
        {/* </Clock> */}

        <AppBody>
          <GridContainer>
            {cardList.map((card) => (
              <NftCard
                key={card.id}
                card={card}
                handleClickCard={handleClickCard}
                activeCard={activeCard}
                maxCardsAmounts={maxCardsAmounts}
              />
            ))}
          </GridContainer>
          <GridForm>
            <FormControl>
              <StyledTextField
                disabled={!undefined}
                label={t('nftQuantity')}
                type="text"
                name="count"
                value={values.count}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    pattern: '^[0-9]*[.,]?[0-9]*$',
                    inputMode: 'decimal',
                    placeholder: '1',
                    spellCheck: false,
                    minLength: 1,
                    maxLength: 2,
                    autoComplete: 'off',
                  },
                  // TODO: disable 'MAX' button for public round
                  // endAdornment: (
                  //   <InputAdornment position="end" style={{ marginRight: '10px' }}>
                  //     <IconButton onClick={handleClickMax} edge="end" disabled={!maxAmountOfCards}>
                  //       <img src={max} alt="icon" />
                  //     </IconButton>
                  //   </InputAdornment>
                  // ),
                }}
                onChange={handleChangeQuantity}
                variant="outlined"
              />
              {/* TODO: disable for public round */}
              {/* {!!maxAmountOfCards && <FormHelperText>{t('maxAmount', { count: maxAmountOfCards })}</FormHelperText>} */}
            </FormControl>
            <StyledFormControl variant="outlined">
              <InputLabel shrink ref={inputLabel}>
                {t('priceAndCurrency')}
              </InputLabel>
              <Select
                value={values.currency}
                onChange={handleChangeCurrency}
                name="currency"
                disabled={!maxAmountOfCards}
                input={<OutlinedInput style={{ background: 'none' }} notched labelWidth={labelWidth} />}
              >
                {currencies.stablecoins.map((item) => (
                  <MenuItem style={{ backgroundColor: 'transparent' }} value={item}>
                    {(+activeCardFromList?.price * values.count).toLocaleString()} {item}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{t('chooseStablecoin')}</FormHelperText>
            </StyledFormControl>
            {/* <ButtonWrap>
              {!account ? (
                <ConnectWalletButton fullwidth />
              ) : (
                <AutoColumn gap="md">
                  <RowBetween>
                    <Button onClick={handleBuy}>Buy {values.count} cards</Button>
                  </RowBetween>
                </AutoColumn>
              )}
            </ButtonWrap> */}

            <ButtonWrap>
              {!account ? (
                <ConnectWalletButton fullwidth />
              ) : (
                <AutoColumn gap="md">
                  {isValidInputs && activeCard && values.count <= maxAmountOfCards ? (
                    approval === ApprovalState.APPROVED ? (
                      isActiveCardPurchased ? (
                        <GreyCard style={{ textAlign: 'center' }}>{t('alreadyPurchased')}</GreyCard>
                      ) : (
                        <RowBetween>
                          <Button onClick={handleBuy}>{t('buyAmountCards', { count: values.count })}</Button>
                        </RowBetween>
                      )
                    ) : (
                      <RowBetween>
                        <Button onClick={approveCallback} disabled={approval === ApprovalState.PENDING}>
                          {approval === ApprovalState.PENDING ? (
                            <Dots>{t('approving', { count: values.currency })}</Dots>
                          ) : (
                            t('approve', { count: values.currency })
                          )}
                        </Button>
                      </RowBetween>
                    )
                  ) : (
                    <GreyCard style={{ textAlign: 'center' }}>
                      {balance && !sufficientBalance ? (
                        <span>{t('insufficientBalance')}</span>
                      ) : !values.count ? (
                        <span>{t('enterInputData')}</span>
                      ) : (
                        <div style={{ position: 'relative' }}>
                          &nbsp;
                          <div style={{ position: 'absolute', margin: '-20px auto 0 auto', width: '100%' }}>
                            <Loader size="24px" />
                          </div>
                        </div>
                      )}
                    </GreyCard>
                  )}
                </AutoColumn>
              )}
            </ButtonWrap>
          </GridForm>
        </AppBody>
      </CardWrapper>

      <MessageWrapper>
        Information on Claiming ALM Tokens using your NFT will be posted soon. You will be able to Claim your first ALM
        Tokens before the 21st of May ??? 2 p.m. UTC
      </MessageWrapper>
      <BannerWrapper>
        <Banner />
      </BannerWrapper>
    </ContentHolder>
  )
}

export default Home
