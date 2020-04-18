<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  computed: {
    getData() {
      return this.$store.state.totalSales
    }
  },
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [this.getData, (this.getData-10), this.getData]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>