<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
          <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <!-- <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item disabled>Explore (future)</b-dropdown-item>
            </b-dropdown> -->
            <h4 class="mb-0">Portfolio Value: ${{ portfolio_value }} USD</h4>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="6" lg="3" v-for="exchange in exchanges" v-bind:data="exchange" v-bind:key="exchange.name">
        <!-- TODO change background for each exchange account <b-card no-body :class="exchange.bg"> -->
          <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item disabled>Explore {{ exchange.name }} (future)</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">${{ exchange.balance }}</h4>
            <p>{{ exchange.name }}</p>
          </b-card-body>
          <exchange-preview class="chart-wrapper px-3" style="height:70px;" height="70"/>
        </b-card>
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 class="card-title mb-0">Portfolio</h4>
          <div class="">{{ portfolio_value }}</div>
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
            <strong class="text-muted">{{ portfolio_return }} | {{ portfolio_return_pct }}%</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="warning" :value="100"></b-progress>
          </li>
          <li>
            <div>Bitcoin Return</div>
            <strong class="text-muted">25%</strong>
            <b-progress height={} class="progress-xs mt-2" :precision="1" variant="primary" :value="100"></b-progress>
          </li>
        </ul>
      </div>
    </b-card>
    <b-card-group columns class="card-columns cols-2">
      <b-card header="Coin Portfolio" class="bg-dark text-white">
        <div class="chart-wrapper">
            <pie-chart :data="pie_chart_data" :donut="true"></pie-chart>
        </div>
      </b-card>
    </b-card-group>  
  </div>
</template>

<script>
import ExchangePreview from './dashboard/ExchangePreview'
import PortfolioChart from './dashboard/PortfolioChart'
import { Callout } from '../components/'

export default {
  name: 'dashboard',
  components: {
    Callout,
    ExchangePreview,
    PortfolioChart
  },
  data: function () {
    return {
      exchanges: [],
      balances: null,
      portfolio_investment: 100.00, // TODO: get this from the user
      portfolio_value: 0.0,
      portfolio_return: 0.0,
      portfolio_return_pct: 0.0,
      pie_chart_data: [],
      apiKeyErrorModal: false
    }
  },
  created () {
    this.getBalances()
  },
  methods: {
    getBalances () {
      var ctx = this
      fetch('http://localhost:8000/api/portfolio/')
        .then(
          function (response) {
            if (response.status !== 200) {
              console.log('Error: ' + response.status)
              if (response.status === 401) {
                ctx.apiKeyErrorModal = true
              }
              return
            }
            response.json().then(function (data) {
              data.balances.forEach(function (exchange) {
                var exchangeBalance = 0
                exchange[Object.keys(exchange)[0]].forEach(function (coin) {
                  exchangeBalance = exchangeBalance + coin[Object.keys(coin)[0]].usd_value
                })
                ctx.exchanges.push({
                  name: Object.keys(exchange)[0],
                  balance: exchangeBalance.toFixed(2)
                })
              })
              ctx.balances = data.balances
              ctx.portfolio_investment = parseFloat(data.investment) + 7041.03 // Jordan's other coinbase acct that's closed
              ctx.calcPortfolioValue()
              ctx.calcPortfolioReturn()
              ctx.createPieChart()
            })
          }
        )
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    },
    calcPortfolioValue () {
      var totalValue = 0
      for (var item in this.balances) {
        for (var exchange in this.balances[item]) {
          if (this.balances[item].hasOwnProperty(exchange)) {
            for (var coin in this.balances[item][exchange]) {
              var coinName = Object.keys(this.balances[item][exchange][coin])[0]
              var coinValue = this.balances[item][exchange][coin][coinName]['usd_value']
              totalValue = totalValue + coinValue
            }
          }
        }
      }
      this.portfolio_value = totalValue.toFixed(2)
    },
    calcPortfolioReturn () {
      this.portfolio_return = (this.portfolio_value - this.portfolio_investment).toFixed(2)
      this.portfolio_return_pct = parseFloat(((this.portfolio_return / this.portfolio_investment) * 100.0).toFixed(2))
    },
    createPieChart () {
      var pieChartDataArray = []
      for (var item in this.balances) {
        for (var exchange in this.balances[item]) {
          if (this.balances[item].hasOwnProperty(exchange)) {
            for (var coin in this.balances[item][exchange]) {
              var coinName = Object.keys(this.balances[item][exchange][coin])[0]
              var coinValue = this.balances[item][exchange][coin][coinName]['usd_value']
              var existingCoin = false
              pieChartDataArray.forEach(function (entry) {
                if (entry[0] === coinName) {
                  entry[1] = entry[1] + coinValue
                  existingCoin = true
                }
              })
              if (!existingCoin) {
                var coinPieSlice = [coinName, coinValue]
                pieChartDataArray.push(coinPieSlice)
                existingCoin = false
              }
            }
          }
        }
      }
      this.pie_chart_data = pieChartDataArray
    }
  }
}
</script>
