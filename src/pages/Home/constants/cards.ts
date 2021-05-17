const nft1 = '/images/legendary-illustris.gif '
const nft2 = '/images/epic-castus.gif'
const nft3 = '/images/rare-altum.gif'
const nft4 = '/images/uncommon-regno.gif'
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
    id: 9,
    img: nft1,
    headline: 'Legendary Illustris',
    cards: '175',
    cost: '5 000 BUSD',
    tokens: '300 000 ALM',
    price: 5000,
  },
  {
    id: 8,
    img: nft2,
    headline: 'Epic Castus',
    cards: '350',
    cost: '2 500 BUSD',
    tokens: '875 000 ALM',
    price: 2500,
  },
  {
    id: 7,
    img: nft3,
    headline: 'Rare Altum',
    cards: '500',
    cost: '1 000 BUSD',
    tokens: '500 000 ALM',
    price: 1000,
  },
  {
    id: 6,
    img: nft4,
    headline: 'Uncommon Regno',
    cards: '1 250',
    cost: '500 BUSD',
    tokens: '375 000 ALM',
    price: 500,
  },
  {
    id: 5,
    img: nft5,
    headline: 'Common Necesse',
    cards: '2 500',
    cost: '100 BUSD',
    tokens: '375 000 ALM',
    price: 100,
  },
].map((item) => ({ ...item })) as Array<CardType>

export default cardList
