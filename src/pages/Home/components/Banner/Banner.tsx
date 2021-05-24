import React from 'react'
import styled from 'styled-components'
import ic from '../../../../assets/svg/banner-gift.svg'
import outline from '../../../../assets/svg/outline-banner-title.svg'
import DrawList from './DrawList'
import WinSteps from './WinSteps'

const BannerWrap = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const BannerLeft = styled.div`
  background: linear-gradient(70.11deg, #6c5dd3 16.8%, #ffc581 106.54%);
  border-radius: 6px;
  width: 100%;
  color: white;
  padding-left: 24px;
  padding-top: 40px;
  padding-right: 24px;
  padding-bottom: 40px;
  position: relative;
  width: 555px;
  height: 286px;
  .desc {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-style: normal;
    line-height: 20px;
    letter-spacing: 0.30000001192092896px;
    text-align: left;
  }
  img {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 380px;
  }
  @media (max-width: 576px) {
    height: auto;
  }
`
const BannerRight = styled.div`
  margin-left: 30px;
`

const Title = styled.div`
  display: flex;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 0.3px;
  color: #ffffff;
  margin-bottom: 12px;
`

const OutlinedTitle = styled.div`
  position: relative;
  margin-left: 10px;
  img {
    max-width: none;
    width: 100px;
    max-width: 103px;
    position: absolute;
    right: -6px;
    top: -7px;
  }
`

const Banner = () => {
  return (
    <BannerWrap>
      <BannerLeft>
        <Title>
          <h2>Buy NFT and get</h2>
          <OutlinedTitle>
            Lucky!
            <img src={outline} alt="" />
          </OutlinedTitle>
        </Title>
        <h3 className="desc">For every NFT purchased you participate in one of 5 Lucky Draws:</h3>
        <DrawList />
        <img src={ic} alt="" className="img" />
      </BannerLeft>
      <BannerRight>
        <WinSteps />
      </BannerRight>
    </BannerWrap>
  )
}

export default Banner
