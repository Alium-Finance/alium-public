import { Card } from '@alium-official/uikit'
import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled(Card)`
  position: relative;
  width: 100%;
  z-index: 5;
  border-radius: 6px;
  padding: 32px;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    padding: 16px;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
