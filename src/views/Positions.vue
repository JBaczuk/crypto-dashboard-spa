<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3" v-for="position in positions" v-bind:data="position" v-bind:key="position.name">
        <!-- TODO change background for each position account <b-card no-body :class="position.bg"> -->
          <b-card no-body :style="{ backgroundColor: position.color }">
            <b-card-body class="pb-0">
              <h4 class="mb-0">{{position.trade_pair}}: {{ position.amount }}</h4>
              <strong class="mb-0" v-if="position.return > 0" v-bind:style="{ color: 'green' }">+${{ position.return }}</strong>
              <strong class="mb-0" v-else v-bind:style="{ color: 'red' }">-${{ -position.return }}</strong>
              <br />
              <strong class="mb-0" v-if="position.return_pct > 0" v-bind:style="{ color: 'green' }">+{{ position.return_pct }}%</strong>
              <strong class="mb-0" v-else v-bind:style="{ color: 'red' }">{{ position.return_pct }}%</strong>
            </b-card-body>
          <position-preview class="chart-wrapper px-3" style="height:70px;" height="70" :datasets="position.datasets"/>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PositionPreview from './positions/PositionPreview'

export default {
  name: 'positions',
  components: {
    PositionPreview
  },
  data: function () {
    return {
      positions: [
        {
          'position': 'GDAX',
          'trade_pair': 'BTC-USD',
          'amount': 0.5,
          'type': 'buy',
          'trade_price': 14000.25,
          'current_price': 13000.10,
          'datasets': [
            {
              label: 'historic_pricing',
              backgroundColor: '#20a8d8',
              borderColor: 'rgba(255,255,255,.55)',
              data: [1000.25, 1050.25, 1300.25, 1250.25, 1400.25, 1350.25, 1500.25]
            }
          ]
        }
      ],
      position_colors: ['#20a8d8', '#a4b7c1', '#4dbd74', '#63c2de', '#ffc107', '#f86c6b']
    }
  },
  created () {
    // this.getBalances()
    this.setPositionColors()
    this.calculateReturns()
  },
  methods: {
    setPositionColors () {
      var positionColorIdx = 0
      this.positions.forEach(function (position) {
        position.color = this.position_colors[positionColorIdx]
        if (positionColorIdx >= this.position_colors.length - 1) {
          positionColorIdx = 0
        } else {
          positionColorIdx = positionColorIdx + 1
        }
      }.bind(this))
    },
    calculateReturns () {
      this.positions.forEach((position) => {
        position.return = (position.current_price - position.trade_price).toFixed(2)
        position.return_pct = (position.return / position.trade_price).toFixed(2)
      })
    }
  }
}
</script>
