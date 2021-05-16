const nft1 = '/images/Spaceship_LowFPS.gif '
const nft2 = '/images/Character_LowFPS.gif'
const nft3 = '/images/rare-altum.gif'
const nft4 = '/images/ncommon-regno.gif'
const nft5 = '/images/common-necesse.gif'

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
    img: nft1,
    headline: 'Legendary Illustris',
    cards: '175',
    cost: '5 000 BUSD',
    tokens: '300 000 ALM',
    price: 5000,
  },
  {
    img: nft2,
    headline: 'Epic Castus',
    cards: '350',
    cost: '2 500 BUSD',
    tokens: '875 000 ALM',
    price: 2500,
  },
  {
    img: nft3,
    headline: 'Rare Altum',
    cards: '500',
    cost: '1 000 BUSD',
    tokens: '500 000 ALM',
    price: 1000,
  },
  {
    img: nft4,
    headline: 'Uncommon Regno',
    cards: '1 250',
    cost: '300 BUSD',
    tokens: '375 000 ALM',
    price: 300,
  },
  {
    img: nft5,
    headline: 'Common Necesse',
    cards: '2 500',
    cost: '150 BUSD',
    tokens: '375 000 ALM',
    price: 150,
  },
].map((item, i) => ({ ...item, id: i })) as Array<CardType>

export default cardList
