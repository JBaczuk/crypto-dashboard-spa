<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['height', 'datasets'],
  methods: {
    createChart () {
      this.renderChart({
        labels: ['Dec 15', 'Dec 16', 'Dec 17', 'Dec 18', 'Dec 19', 'Dec 20', 'Dec 21'],
        datasets: this.datasets
      }, {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'transparent',
              zeroLineColor: 'transparent'
            },
            ticks: {
              fontSize: 2,
              fontColor: 'transparent'
            }
          }],
          yAxes: [{
            display: false,
            ticks: {
              display: false,
              min: Math.min.apply(Math, this.datasets[0].data) - 5,
              max: Math.max.apply(Math, this.datasets[0].data) + 5
            }
          }]
        },
        elements: {
          line: {
            borderWidth: 1
          },
          point: {
            radius: 4,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      })
    }
  },
  mounted () {
    this.createChart()
  }
}
</script>
