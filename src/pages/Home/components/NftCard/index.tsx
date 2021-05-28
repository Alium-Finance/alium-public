import { Flex, Text } from '@alium-official/uikit'
import React, { FC } from 'react'
// import { BigNumber } from '@ethersproject/bignumber'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { CardType } from '../../constants/cards'
import nftChecked from '../../images/nft-checked.svg'

const NFTWrapper = styled.button`
  border: 3px solid transparent;
  &:before {
    content: ' ';
    position: absolute;
    z-index: -1;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    border: 1px solid #eef0f9;
  }
  box-sizing: border-box;
  border-radius: 6px;
  padding: 16px;
  cursor: pointer;
  outline: none;
  background: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & video {
    width: 100%;
    height: auto;
    max-height: 100%;
  }

  & .nth-checked-icon {
    content: '""';
    display: none;
    position: absolute;
    top: -10px;
    left: 16px;
  }

  & .video {
    background-color: hsl(0, 0%, 100%);
    padding: 6px 0;
    border-radius: 6px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 120px;
  }

  & .video video {
    width: 100%;
    height: auto;
    max-height: 180px;
  }
  @media screen and (min-width: 1025px) {
    & .video {
      max-width: initial;
    }
    & .video video {
      max-height: 100%;
      max-width: 140px;
    }
  }

  & .nft-preview {
    background-color: hsl(0, 0%, 100%);
    padding: 6px 0;
    border-radius: 6px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:nth-child(3) .nft-preview,
  &:nth-child(4) .nft-preview,
  &:nth-child(5) .nft-preview {
    background-color: hsl(230, 37%, 97%);
  }

  & .nft-preview img {
    border-radius: 6px;
  }

  &.active {
    border: 3px solid #6c5dd3;
    position: relative;

    & .nth-checked-icon {
      display: block;
    }
  }

  & .desktop {
    display: block;
  }

  & .mobile {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    padding: 10px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;

    & .nft-preview {
      max-width: 125px;
    }

    & .desktop {
      display: none;
    }

    & .mobile {
      display: block;
    }
  }
`

const ContentHolder = styled.div`
  padding: 0 0 10px 6px;
  width: 155px;
  @media screen and (min-width: 1025px) {
    width: 100%;
    padding: 0;
  }
`

type TextPropsType = React.ComponentProps<typeof Text>

const StyledHeading = (props: TextPropsType) => (
  <Text
    mt="15px"
    mb="15px"
    style={{
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '16px',
      lineHeight: '19px',
      letterSpacing: '0.1px',
      color: '#0B1359',
    }}
    {...props}
  />
)

const StyledListLabel = (props: TextPropsType) => (
  <Text style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '0.3px', color: '#8990A5' }} {...props} />
)

const StyledListValue = (props: TextPropsType) => (
  <Text style={{ fontSize: '12px', lineHeight: '16px', color: '#6C5DD3', fontWeight: 'bold' }} {...props} />
)

type props = {
  card: CardType
  activeCard: string
  handleClickCard: (activeCard: string) => void
  maxCardsAmounts: number[]
  soldOut?: boolean
}

const NftCard: FC<props> = ({ card, activeCard, maxCardsAmounts, handleClickCard, soldOut }) => {
  const { t } = useTranslation()
  const isActive = `${card.id}` === activeCard
  const ID = `${card.id}`
  const isMp4 = card.img.split('.')[1] === 'mp4'

  return (
    <NFTWrapper
      key={ID}
      type="button"
      onClick={() => handleClickCard(ID)}
      className={isActive ? 'active' : ''}
      style={{ cursor: soldOut ? 'initial' : 'pointer' }}
    >
      {isActive && <img className="nth-checked-icon" src={nftChecked} alt="nft-checked" />}

      {isMp4 ? (
        <div className="video">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video autoPlay loop muted>
            <source src={card.img} type="video/mp4" />
          </video>

          {soldOut ? <img src="/images/sold-out.png" alt="" style={{ position: 'absolute' }} /> : null}
        </div>
      ) : (
        <div className="nft-preview">
          <img src={card.img} alt="nft-preview" />

          {soldOut ? <img src="/images/sold-out.png" alt="" style={{ position: 'absolute' }} /> : null}
        </div>
      )}
      <StyledHeading className="desktop">{card.headline}</StyledHeading>

      <ContentHolder>
        <StyledHeading className="mobile">{card.headline}</StyledHeading>

        <Flex justifyContent="space-between">
          <StyledListLabel>{t('cards.remainingCards')}</StyledListLabel>
          <StyledListValue>{maxCardsAmounts[card.id - 5] || card.cards}</StyledListValue>
        </Flex>
        <Flex justifyContent="space-between" mt="10px">
          <StyledListLabel>{t('cards.cardCost')}</StyledListLabel>
          <StyledListValue>{card.cost}</StyledListValue>
        </Flex>
        <Flex justifyContent="space-between" mt="10px">
          <StyledListLabel>{t('cards.tokens')}</StyledListLabel>
          <StyledListValue>{card.tokens}</StyledListValue>
        </Flex>
      </ContentHolder>
    </NFTWrapper>
  )
}

export default NftCard
