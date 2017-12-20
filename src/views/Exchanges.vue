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
            <p>{{ account.name }}</p>
          </b-card-body>
          <account-preview class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
    </b-row>

    <!-- <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Portfolio</h4>
          <div class="small text-muted">$100.00</div>
        </b-col>
        <b-col sm="7" class="d-none d-md-block">
          <b-button type="button" variant="primary" class="float-right"><i class="icon-cloud-download"></i></b-button>
          <b-button-toolbar class="float-right" aria-label="Toolbar with button groups">
            <b-button-group class="mr-3" aria-label="First group">
              <b-button variant="outline-secondary">5m</b-button>
              <b-button variant="outline-secondary">1H</b-button>
              <b-button variant="outline-secondary" :pressed="true">1D</b-button>
            </b-button-group>
          </b-button-toolbar>
        </b-col>
      </b-row>
      <portfolio-chart class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></portfolio-chart>
      <div slot="footer">
        <ul>
          <li>
            <div>Portfolio Return</div>
            <strong class="text-muted">$100.00</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="warning" :value="100"></b-progress>
          </li>
          <li>
            <div>Bitcoin Return</div>
            <strong class="text-muted">25%</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="primary" :value="100"></b-progress>
          </li>
        </ul>
      </div>
    </b-card> -->
    <!-- <b-card-group columns class="card-columns cols-2">
      <b-card header="Coin Portfolio" class="bg-dark text-white">
        <div class="chart-wrapper">
          <doughnut-example/>
        </div>
      </b-card>
    </b-card-group>   -->
  </div>
</template>

<script>
import AccountPreview from './exchanges/AccountPreview'
import PortfolioChart from './dashboard/PortfolioChart'
import DoughnutExample from './charts/DoughnutExample'
import { Callout } from '../components/'

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
              console.log(data)
              console.log(Object.keys(data)[0])
              console.log(data[Object.keys(data)[0]])
              var exchangeAccounts = data[Object.keys(data)[0]]
              for (var account in exchangeAccounts) {
                if (exchangeAccounts.hasOwnProperty(account)) {
                  ctx.accounts.push(exchangeAccounts[account])
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
