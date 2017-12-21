<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3" v-for="account in accounts" v-bind:data="account" v-bind:key="account.name">
        <!-- <b-card no-body :class="account.bg"> -->
          <b-card no-body :style="{ backgroundColor: account.color }">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item disabled>Explore {{ account.name }} (future)</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">{{ account.name }}</h4>
            <h5 class="mb-0">{{ account.amount.toFixed(2) }}</h5>
            <h5 class="mb-0">${{ account.usd_value.toFixed(2) }}</h5>
            <p>{{ account.name }}</p>
          </b-card-body>
          <account-preview class="chart-wrapper px-3" style="height:70px;" height="70" :datasets="account.datasets"/>
        </b-card>
      </b-col>
    </b-row>

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
import AccountPreview from './exchanges/AccountPreview'

export default {
  name: 'dashboard',
  components: {
    AccountPreview
  },
  data: function () {
    return {
      accounts: [
        {
          'name': 'BTC',
          'amount': 0.75,
          'usd_value': 1500.00,
          'datasets': [
            {
              label: 'balance',
              backgroundColor: '#20a8d8',
              borderColor: 'rgba(255,255,255,.55)',
              data: [1000.25, 1050.25, 1300.25, 1250.25, 1400.25, 1350.25, 1500.00]
            }
          ]
        },

        {
          'name': 'LTC',
          'amount': 1.15,
          'usd_value': 500.00,
          'datasets': [
            {
              label: 'balance',
              backgroundColor: '#a4b7c1',
              borderColor: 'rgba(255,255,255,.55)',
              data: [1000.25, 1050.25, 1300.25, 1250.25, 1400.25, 1350.25, 1500.00]
            }
          ]
        }
      ],
      pie_chart_data: [],
      account_colors: ['#20a8d8', '#a4b7c1', '#4dbd74', '#63c2de', '#ffc107', '#f86c6b']
    }
  },
  created () {
    this.createPieChart()
    this.setAccountColors()
  },
  methods: {
    createPieChart () {
      var ctx = this
      this.accounts.forEach(function (account) {
        var coinPieSlice = [account.name, account.usd_value]
        ctx.pie_chart_data.push(coinPieSlice)
      })
    },
    setAccountColors () {
      var accountColorIdx = 0
      this.accounts.forEach(function (account) {
        account.color = this.account_colors[accountColorIdx]
        if (accountColorIdx >= this.account_colors.length - 1) {
          accountColorIdx = 0
        } else {
          accountColorIdx = accountColorIdx + 1
        }
      }.bind(this))
    }
  }
}
</script>
