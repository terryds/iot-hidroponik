<script>
/* eslint-disable */
import { Line } from 'vue-chartjs'

export default {
	extends: Line,
	props: ['data'],
	data() {
		return {
	      options: {
	      	tooltips: {
	      		mode: 'x'
	      	},
	      	legend: {
	      	  display: true,
	      	  position: 'top',
	      	},
	      	scales: {
	      	  xAxes: [{
	      	    type: "time",
	      	    time: {
	      	      tooltipFormat: "MMM D, HH:mm:ss",
	      	      displayFormats: {
	      	        hour: 'MMM D, h:mm A'
	      	      }
	      	    },
	      	    distribution: 'linear',
	      	    gridLines: {
	      	      display: false
	      	    }
	      	  }],
	      	  yAxes: [{
	      	    gridLines: {
	      	      display: true
	      	    },
	      	    ticks: {
	      	      beginAtZero: true
	      	    },
	      	    scaleLabel: {
	      	      display: true,
	      	      labelString: "Temperature (℃ )",
	      	      fontFamily: "Arial",
	      	      fontSize: 16    	    
	      	  	}
	      	  }]
	      	},
	      	responsive: true,
	      	maintainAspectRatio: false
	    	}
		}
	},
	mounted() {
		this.renderChart(this.data, this.options);
	}
}
</script>