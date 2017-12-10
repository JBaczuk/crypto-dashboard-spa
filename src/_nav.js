export default {
  items: [
    {
      title: true,
      name: 'Portfolio',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Overview',
      url: '/overview',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary'
      }
    },
    {
      name: 'Exchanges',
      url: '/exchanges',
      icon: 'icon-arrow-right-circle',
      children: [
        {
          name: 'Coinbase',
          // url: '/exchanges/coinbase',
          icon: 'icon-arrow-right-circle',
          badge: {
            variant: 'primary',
            text: 'FUTURE'
          }
        },
        {
          name: 'GDAX',
          // url: '/exchanges/gdax',
          icon: 'icon-arrow-right-circle',
          badge: {
            variant: 'primary',
            text: 'FUTURE'
          }
        },
        {
          name: 'Poloniex',
          // url: '/exchanges/poloniex',
          icon: 'icon-arrow-right-circle',
          badge: {
            variant: 'primary',
            text: 'FUTURE'
          }
        },
        {
          name: 'Bittrex',
          // url: '/exchanges/bittrex',
          icon: 'icon-arrow-right-circle',
          badge: {
            variant: 'primary',
            text: 'FUTURE'
          }
        }
      ]
    },
    {
      divider: true
    },
    {
      title: true,
      name: 'Tools',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Market',
      url: '/market',
      icon: 'icon-credit-card',
      children: [
        {
          name: 'Charts',
          // url: '/marketcharts',
          icon: 'icon-chart',
          badge: {
            variant: 'primary',
            text: 'FUTURE'
          }
        },
        {
          name: 'Market Cap',
          // url: '/marketcap',
          icon: 'icon-flag',
          badge: {
            variant: 'primary',
            text: 'FUTURE'
          }
        }
      ]
    },
    {
      name: 'Bots',
      url: '/bots',
      icon: 'icon-eye',
      children: [
        {
          name: 'Arbitrage',
          // url: '/bots-arbitrage',
          icon: 'icon-fire',
          badge: {
            variant: 'primary',
            text: 'FUTURE'
          }
        },
        {
          name: 'Market Mkr',
          // url: '/bots/market-maker',
          icon: 'icon-flag',
          badge: {
            variant: 'primary',
            text: 'FUTURE'
          }
        }
      ]
    },
    {
      name: 'Alerts',
      url: '/#', // url: '/alerts',
      icon: 'icon-hourglass',
      badge: {
        variant: 'primary',
        text: 'FUTURE'
      }
    },
    {
      name: 'Trading',
      url: '/#', // url: '/trading',
      icon: 'icon-directions',
      badge: {
        variant: 'primary',
        text: 'FUTURE'
      }
    },
    {
      name: 'Contribute',
      url: 'https://github.com/JBaczuk/crypto-dashboard',
      icon: 'icon-social-github',
      class: 'mt-auto',
      variant: 'primary'
    },
    {
      name: 'Try Crypto Dashboard PRO',
      url: 'https://github.com/JBaczuk/crypto-dashboard',
      icon: 'icon-eyeglass',
      variant: 'success',
      badge: {
        variant: 'primary',
        text: 'FUTURE'
      }
    }
  ]
}
