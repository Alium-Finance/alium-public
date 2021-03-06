import separationOfDigits from 'utils/separationOfDigits'

const nft1 = '/video/nft/legendary-illustris.mp4'
const nft2 = '/video/nft/epic-castus.mp4'
const nft3 = '/video/nft/rare-altum.mp4'
const nft4 = '/video/nft/uncommon-regno.mp4'
const nft5 = '/video/nft/common-necesse.mp4'

export type CardType = {
  id: number
  img: string
  headline: string
  cards: string
  cost: string
  tokens: string
  price: number
}

const cardList = [
  {
    id: 9,
    img: nft1,
    headline: 'Legendary Illustris',
    cards: '175',
    cost: `${separationOfDigits(5000)} BUSD`,
    tokens: `${separationOfDigits(15529)} ALM`,
    price: 5000,
  },
  {
    id: 8,
    img: nft2,
    headline: 'Epic Castus',
    cards: '350',
    cost: `${separationOfDigits(2500)} BUSD`,
    tokens: `${separationOfDigits(7764)} ALM`,
    price: 2500,
  },
  {
    id: 7,
    img: nft3,
    headline: 'Rare Altum',
    cards: '500',
    cost: `${separationOfDigits(1000)} BUSD`,
    tokens: `${separationOfDigits(3106)} ALM`,
    price: 1000,
  },
  {
    id: 6,
    img: nft4,
    headline: 'Uncommon Regno',
    cards: '1 250',
    cost: `${separationOfDigits(500)} BUSD`,
    tokens: `${separationOfDigits(1553)} ALM`,
    price: 500,
  },
  {
    id: 5,
    img: nft5,
    headline: 'Common Necesse',
    cards: '2 500',
    cost: `${separationOfDigits(100)} BUSD`,
    tokens: `${separationOfDigits(310)} ALM`,
    price: 100,
  },
].map((item) => ({ ...item })) as Array<CardType>

export default cardList
