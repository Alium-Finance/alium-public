// import { Heading, Button, Flex, ConnectorId, useWalletModal } from '@alium-official/uikit'
import { Button, Flex, useWalletModal } from '@alium-official/uikit'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import logoMobile from '../../images/logo-mobile.svg'
import logo from '../../images/logo.svg'
import icon from '../../images/plus-icon.svg'
import useCurrencyBalance from './hook/useCurrencyBalance'
import useWeb3 from './hook/useWeb3'
import SocialNetworks from './SocialNetworks/SocialNetworks'

const Wrapper = styled.div`
  padding: 30px;
  border-bottom: 1px solid #d2d6e6;
  width: 100%;
  display: flex;
  justify-content: space-between;

  & .logo--desktop {
    display: block;
  }
  & .logo--mobile {
    display: none;
  }
  @media screen and (max-width: 640px) {
    padding: 15px 10px;

    & .logo--desktop {
      display: none;
    }

    & .logo--mobile {
      display: block;
    }

    & .login-btn {
      padding: 0 12px;
    }
  }
`

const ImageWrap = styled.div`
  margin-right: 20px;
`

// const StyledHeading = styled(Heading)`
//   &.heading--desktop {
//     margin: 0;
//     margin-left: 100px;
//     display: block;
//   }
//   @media screen and (max-width: 1240px) {
//     &.heading--desktop {
//       font-size: 30px;
//       margin-left: 30px;
//     }
//   }
//   @media screen and (max-width: 1024px) {
//     &.heading--desktop {
//       display: none;
//     }
//   }
// `

const Header = () => {
  const { account } = useWeb3React()

  const web3 = useWeb3()

  const { t } = useTranslation()

  const { balance } = useCurrencyBalance(account, web3)

  const useBalance = async () => {
    // const result = await useCurrencyBalance(account, web3)
    return balance
  }

  const { login, logout } = useAuth()

  /* eslint-disable */
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    login,
    logout,
    account as string,
    t('yourWallet'),
    t('logoutTitle'),
    t('copyAddress'),
    t('viewOnBscScan'),
    `https://bscscan.com/address/${account}`,
    //@ts-ignore
    () => {},
    useBalance
  )
  /* eslint-enable  */

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  return (
    <Wrapper>
      <Flex style={{ width: '100%' }} justifyContent="space-between">
        <Flex style={{ width: '100%' }} alignItems="center">
          <img src={logo} alt="logo" className="logo--desktop" />
          <img src={logoMobile} alt="logo" className="logo--mobile" />
          {/* <StyledHeading as="h1" size="xl" color="heading" mb="40px" mt="20px" className="heading--desktop"> */}
          {/*  {t('privateRound')} */}
          {/* </StyledHeading> */}
        </Flex>
        <Flex justifyContent="space-between">
          <SocialNetworks />
          {account ? (
            <Button onClick={onPresentAccountModal} className="login-btn">
              {accountEllipsis}
            </Button>
          ) : (
            <Button onClick={onPresentConnectModal} className="login-btn">
              <ImageWrap>
                <img src={icon} alt="plus" />
              </ImageWrap>
              {t('connect')}
            </Button>
          )}
        </Flex>
      </Flex>
    </Wrapper>
  )
}

export default Header
