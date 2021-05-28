import { Heading } from '@alium-official/uikit'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import AppBody from '../AppBody'
import NftCard from '../Home/components/NftCard'
import cardList from '../Home/constants/cards'
import bgIMG from '../Home/images/background-img.svg'

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

const StyledHeading = styled(Heading)`
  @media screen and (max-width: 768px) {
    text-align: center;
  }
  @media screen and (max-width: 480px) {
    margin-bottom: 70px;
  }
`

const HomeSoldOut = () => {
  const { t } = useTranslation()
  const newCardList = cardList.map((card) => ({ ...card, cards: '0' }))

  return (
    <ContentHolder>
      <img className="content-background" src={bgIMG} alt="background" />
      <CardWrapper>
        <StyledHeading as="h1" size="xl" color="heading" mb="40px" mt="20px">
          {t('privateRound')}
        </StyledHeading>

        <AppBody>
          <GridContainer>
            {newCardList.map((card) => (
              <NftCard
                key={card.id}
                card={card}
                handleClickCard={() => null}
                activeCard="-1"
                maxCardsAmounts={[]}
                soldOut
              />
            ))}
          </GridContainer>
        </AppBody>
      </CardWrapper>
    </ContentHolder>
  )
}

export default HomeSoldOut
