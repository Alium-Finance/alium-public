import React from 'react'
import styled from 'styled-components'

const draws = [
  {
    price: '$1000',
    winner: '1 Winner',
    name: 'Legendary',
  },
  {
    price: '$500',
    winner: '2 Winners',
    name: 'Epic',
  },
  {
    price: '$200',
    winner: '3 Winners',
    name: 'Rare',
  },
  {
    price: '$50',
    winner: '4 Winners',
    name: 'Uncommon',
  },
  {
    price: '$20',
    winner: '5 Winners',
    name: 'Common',
  },
]

type DrawListType = typeof draws

const Draw = styled.div`
  margin-right: 16px;
  margin-bottom: 12px;
  width: 124px;
  @media (max-width: 576px) {
    width: 124px;
  }
  .title {
    display: flex;
    align-items: center;
    h3 {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 100;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;

      color: #ffffff;
    }
    h3.active {
      margin-right: 5px;
    }
  }
  .desc {
    display: flex;
    align-items: baseline;
    .price {
      margin-right: 6px;
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-size: 24px;
      line-height: 30px;
      letter-spacing: 0.3px;
    }
    .price.active {
      background: linear-gradient(261.98deg, #ffec89 9.57%, #ff6644 88.98%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }
    .winner {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-size: 11px;
      line-height: 14px;
      font-weight: 700;

      letter-spacing: 0.3px;

      color: #ffffff;

      opacity: 0.6;
    }
  }
`
const DrawListWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  flex-flow: row wrap;
  max-width: 421px;
  position: relative;
  z-index: 9;
`

const DrawItem = ({ draw, index }: { draw: DrawListType[0]; index: number }) => {
  const isFirst = index === 0

  return (
    <Draw>
      <div className="title">
        <h3 className={isFirst ? 'active' : ''}>{draw.name}</h3>
        {isFirst && '🔥'}
      </div>

      <div className="desc">
        <p className={`price ${isFirst ? 'active' : ''}`}>{draw.price}</p>
        <p className="winner">{draw.winner}</p>
      </div>
    </Draw>
  )
}
const DrawList = () => {
  return (
    <DrawListWrapper>
      {draws.map((draw, index) => (
        <DrawItem draw={draw} key={index.toString()} index={index} />
      ))}
    </DrawListWrapper>
  )
}

export default DrawList
