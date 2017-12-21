<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3" v-for="account in accounts" v-bind:data="account" v-bind:key="account.name">
        <!-- <b-card no-body :class="account.bg"> -->
          <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item disabled>Explore {{ account.name }} (future)</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">{{ Object.keys(account)[0] }}</h4>
            <h5 class="mb-0">{{ account[Object.keys(account)[0]].amount.toFixed(2) }}</h5>
            <h5 class="mb-0">${{ account[Object.keys(account)[0]].usd_value.toFixed(2) }}</h5>
            <p>{{ account.name }}</p>
          </b-card-body>
          <account-preview class="chart-wrapper px-3" style="height:70px;" height="70" accounts="accounts"/>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import AccountPreview from './exchanges/AccountPreview'
import PortfolioChart from './dashboard/PortfolioChart'
import DoughnutExample from './charts/DoughnutExample'
import { Callout } from '../components/'
import Gdax from 'gdax'

export default {
  name: 'dashboard',
  components: {
    Callout,
    AccountPreview,
    PortfolioChart,
    DoughnutExample
  },
  data: function () {
    return {
      accounts: []
    }
  },
  created () {
    var exchange = this.$route.path.split('/').slice(-1)[0]
    this.getExchangeAccount(exchange)
  },
  methods: {
    getExchangeAccount (exchange) {
      var ctx = this
      fetch('http://localhost:8000/api/portfolio/' + exchange)
        .then(
          function (response) {
            if (response.status !== 200) {
              console.error('Error: ' + response.status)
              if (response.status === 401) {
                console.error('No Exchange API keys on API server')
                ctx.apiKeyErrorModal = true
              }
              return
            }
            response.json().then(function (data) {
              console.log(Object.keys(data))
              var balances = data['balance'][exchange.toUpperCase()]
              for (var account in balances) {
                if (balances.hasOwnProperty(account)) {
                  console.log('account: ' + JSON.stringify(balances[account]))
                  ctx.accounts.push(balances[account])
                }
              }
            })
          }
        )
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    }
  }
}
</script>
