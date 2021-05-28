import { externalLinks, getMainDomain, MenuEntry } from '@alium-official/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: `https://exchange.${getMainDomain()}/swap`,
      },
      {
        label: 'Liquidity',
        href: `https://exchange.${getMainDomain()}/pool`,
      },
      {
        label: 'Migrate',
        href: `https://exchange.${getMainDomain()}/migrate`,
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: `https://${getMainDomain()}/farms`,
  },
  // {
  //   label: 'Pools',
  //   icon: 'PoolIcon',
  //   href: 'https://pancakeswap.finance/syrup',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: 'https://pancakeswap.finance/lottery',
  // },
  // {
  //   label: 'NFT',
  //   icon: 'NftIcon',
  //   href: 'https://pancakeswap.finance/nft',
  // },
  // {
  //   label: 'Teams & Profile',
  //   icon: 'GroupsIcon',
  //   calloutClass: 'rainbow',
  //   items: [
  //     {
  //       label: 'Leaderboard',
  //       href: 'https://pancakeswap.finance/teams',
  //     },
  //     {
  //       label: 'Task Center',
  //       href: 'https://pancakeswap.finance/profile/tasks',
  //     },
  //     {
  //       label: 'Your Profile',
  //       href: 'https://pancakeswap.finance/profile',
  //     },
  //   ],
  // },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: `https://info.${getMainDomain()}`,
      },
      {
        label: 'Tokens',
        href: `https://info.${getMainDomain()}/tokens`,
      },
      {
        label: 'Pairs',
        href: `https://info.${getMainDomain()}/pairs`,
      },
      {
        label: 'Accounts',
        href: `https://info.${getMainDomain()}/accounts`,
      },
    ],
  },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: 'https://pancakeswap.finance/ifo',
  // },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      // {
      //   label: 'Voting',
      //   href: `https://voting.${getMainDomain()}`,
      // },
      {
        label: 'Github',
        href: externalLinks.github,
      },
      {
        label: 'Docs',
        href: `https://docs.${getMainDomain()}`,
      },
      {
        label: 'Blog',
        href: externalLinks.medium,
      },
    ],
  },
]

export default config
