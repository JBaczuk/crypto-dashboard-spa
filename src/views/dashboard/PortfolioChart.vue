<script>
import { Line } from 'vue-chartjs'

// const brandPrimary = '#20a8d8'
const brandBlue = '#20a8d8'
const brandYellow = '#ffbf46'

function convertHex (hex, opacity) {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')'
  return result
}

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default {
  extends: Line,
  props: ['height'],
  data: function () {
    return {
      historical_btc: [],
      portfolio_return: [],
      dates: []
    }
  },
  methods: {
    getHistoricalBitcoin () {
      var ctx = this
      fetch('http://localhost:8000/api/historical_btc_return/')
        .then(
          function (response) {
            if (response.status !== 200) {
              console.log('Error: ' + response.status)
              return
            }
            response.json().then(function (data) {
              console.log(data)
              ctx.historical_btc = ctx.createReturnArray(data)
              ctx.dates = ctx.createDateArray(data)
              ctx.initChart()
            })
          })
    },
    createDateArray (data) {
      var dateArray = []
      for (var returnObj in data) {
        if (data.hasOwnProperty(returnObj)) {
          var dateObj = new Date(parseInt(data[returnObj].datetime) * 1000)
          dateArray.push(dateObj.getDate())
        }
      }
      return dateArray
    },
    createReturnArray (data) {
      var returnArray = []
      for (var returnObj in data) {
        if (data.hasOwnProperty(returnObj)) {
          returnArray.push(data[returnObj].return * 100)
        }
      }
      return returnArray
    },
    initChart () {
      var ctx = this
      for (var i = 0; i <= ctx.historical_btc.length; i++) {
        ctx.portfolio_return.push(random(0, 1))
      }
      ctx.renderChart({
        labels: ctx.dates,
        datasets: [
          {
            label: 'Bitcoin Historical Return',
            backgroundColor: convertHex(brandBlue, 20),
            borderColor: brandBlue,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: ctx.historical_btc
          },
          {
            label: 'Portfolio Historical Return',
            backgroundColor: 'transparent',
            borderColor: brandYellow,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: ctx.portfolio_return
          }
        ]
      }, {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(Math.max(Math.max.apply(null, ctx.historical_btc), Math.max.apply(null, ctx.portfolio_return)) / 10),
              max: Math.max(Math.max.apply(null, ctx.historical_btc), Math.max.apply(null, ctx.portfolio_return)),
              min: Math.min(Math.min.apply(null, ctx.historical_btc), Math.min.apply(null, ctx.portfolio_return))
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      })
    }
  },
  mounted () {
    this.getHistoricalBitcoin()
  }
}
</script>
