import React from 'react'
import styled from 'styled-components'
import ic from '../../../../assets/svg/banner-gift.svg'
import outline from '../../../../assets/svg/outline-banner-title.svg'
import style from './Banner.module.css'
import DrawList from './DrawList'
import WinSteps from './WinSteps'

const Title = styled.div`
  display: flex;
  font-family: Roboto;
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
    <div className={style.banner}>
      <div className={style.banner__left}>
        <Title>
          <h2>Buy NFT and get</h2>
          <OutlinedTitle>
            Lucky!
            <img src={outline} alt="" />
          </OutlinedTitle>
        </Title>
        <h3 className={style.desc}>For every NFT purchased you participate in one of 5 Lucky Draws:</h3>
        <DrawList />
        <img src={ic} alt="" className={style.img} />
      </div>
      <div className={style.banner__right}>
        <WinSteps />
      </div>
    </div>
  )
}

export default Banner
