import { ButtonMenu, ButtonMenuItem, Flex, Heading } from '@alium-official/uikit'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import TranslatedText from '../TranslatedText'

const StyledNav = styled.div`
  margin-bottom: 40px;
`

const Nav = ({ activeIndex = 0 }: { activeIndex?: number }) => (
  <Flex alignItems="flex-start">
    <StyledNav>
      <Heading as="h1" size="xl" color="heading" mb="40px" mt="20px">
        Trade
      </Heading>
      <ButtonMenu size="md" variant="primary" activeIndex={activeIndex}>
        <ButtonMenuItem id="swap-nav-link" to="/swap" as={Link}>
          <TranslatedText translationId={8}>Exchange</TranslatedText>
        </ButtonMenuItem>
        <ButtonMenuItem id="pool-nav-link" to="/pool" as={Link}>
          <TranslatedText translationId={74}>Liquidity</TranslatedText>
        </ButtonMenuItem>
        <ButtonMenuItem id="migrate-nav-link" to="/migrate" as={Link}>
          Migrate
        </ButtonMenuItem>
      </ButtonMenu>
    </StyledNav>
  </Flex>
)

export default Nav
