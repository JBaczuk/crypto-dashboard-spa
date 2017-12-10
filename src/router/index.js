import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
// import Exchanges from '@/views/Exchanges'
import MarketCharts from '@/views/MarketCharts'
import MarketCap from '@/views/MarketCap'
import Bots from '@/views/Bots'
import Alerts from '@/views/Alerts'
import Trading from '@/views/Trading'
import Settings from '@/views/Settings'

Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/overview',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'overview',
          name: 'Dashboard',
          component: Dashboard
        }
      ]
    },
    // {
    //   path: '/exchanges',
    //   name: 'Exchanges',
    //   component: Exchanges
    // },
    {
      path: '/marketcharts',
      name: 'MarketCharts',
      component: MarketCharts
    },
    {
      path: '/marketcap',
      name: 'MarketCap',
      component: MarketCap
    },
    {
      path: '/bots',
      name: 'Bots',
      component: Bots
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: Alerts
    },
    {
      path: '/trading',
      name: 'Trading',
      component: Trading
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})
