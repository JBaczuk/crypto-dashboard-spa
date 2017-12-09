<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3" v-for="exchange in exchanges" v-bind:data="exchange" v-bind:key="exchange.name">
        <!-- <b-card no-body :class="exchange.bg"> -->
          <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item disabled>Explore {{ exchange.name }} (future)</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">9.823</h4>
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
    </b-card>
    <b-card-group columns class="card-columns cols-2">
      <b-card header="Coin Portfolio" class="bg-dark text-white">
        <div class="chart-wrapper">
          <doughnut-example/>
        </div>
      </b-card>
    </b-card-group>  
  </div>
</template>

<script>
import ExchangePreview from './dashboard/ExchangePreview'
import PortfolioChart from './dashboard/PortfolioChart'
import DoughnutExample from './charts/DoughnutExample'
import { Callout } from '../components/'

export default {
  name: 'dashboard',
  components: {
    Callout,
    ExchangePreview,
    PortfolioChart,
    DoughnutExample
  },
  data: function () {
    return {
      exchanges: [
        {
          name: 'Poloniex',
          bg: 'bg-primary'
        },
        {
          name: 'GDAX',
          bg: 'bg-info'
        },
        {
          name: 'Coinbase',
          bg: 'bg-warning'
        },
        {
          name: 'Bittrex',
          bg: 'bg-danger'
        }
      ]
    }
  },
  methods: {
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    }
  }
}
</script>
