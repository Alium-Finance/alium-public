import { Button } from '@alium-official/uikit'
import tg from 'assets/svg/telegram.svg'
import React from 'react'
import styled from 'styled-components'

const ListSteps = styled.ul`
  .step {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    &:last-child {
      margin-bottom: 16px;
    }
  }
  .list {
    margin-right: 8px;
    border: 1px solid #6c5dd3;
    box-sizing: border-box;
    border-radius: 50px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
     font-family: Roboto, sans-serif;
    font-style: normal;
    font-size: 11px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 0.3px;
    color: #6c5dd3;
  }
`

const ListWrapper = styled.div`
  h2 {
     font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 36px;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin-bottom: 16px;
    margin-top: 40px;
  }
  p {
     font-family: Roboto, sans-serif;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    color: #8990a5;
    display: inherit;
    @media (max-width: 1024px) {
      display: block;
    }
  }
  .link {
     font-family: Roboto, sans-serif;
    font-style: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    text-decoration-line: underline;
    color: #6c5dd3;
    margin-left: 5px;
    img {
      margin-right: 8px;
    }
  }
  .mark {
    color: #6c5dd3;
    margin-left: 4px;
    margin-right: 4px;
  }
`

const WinSteps = () => {
  return (
    <ListWrapper>
      <h2>To win:</h2>
      <ListSteps>
        <div className="step">
          <p className="list">1</p>
          <p>Buy NFT</p>
        </div>
        <div className="step">
          <p className="list">2</p>
          <p>
            Fill out the{' '}
            <a className="link" href="https://forms.gle/RNnAUZGvQ2qnhuA3A" target="_blank" rel="noreferrer">
              form
            </a>
          </p>
        </div>
        <div className="step">
          <p className="list">3</p>
          <p>
            Post the <div className="mark">#Lucky_Aliumers</div> hashtag in the Alium
            <a className="link" href="https://t.me/aliumswap_official" target="_blank" rel="noreferrer">
              <img src={tg} alt="" />
              telegram
            </a>
          </p>
        </div>
        <div className="step">
          <p className="list">4</p>
          <p>We will Randomly select winners!</p>
        </div>
      </ListSteps>
      <a href="https://aliumswap.medium.com/alium-lucky-contest-c0e74fce5d50" target="_blank" rel="noreferrer">
        <Button variant="secondary" size="sm">
          Full info
        </Button>
      </a>
    </ListWrapper>
  )
}

export default WinSteps
