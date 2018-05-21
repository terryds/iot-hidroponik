<template>
  <f7-page color-theme="green">
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-if-ios="f7:menu" icon-if-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <f7-nav-title>IoT HydroSystem</f7-nav-title>

    </f7-navbar>

    <f7-block-title>Connected Devices</f7-block-title>
    <f7-card>
      <f7-card-content :padding="false">
      <f7-list media-list inset>
            <f7-list-item v-for="device in devices" :key="device.id" :title="device.name" :subtitle="device.plant" :link="device | toUrl">
              <img slot="media" :src="device.img.src" width="44" height="44" />
              <p class="no-margin-bottom item-subtitle">Health: </p>
              <f7-progressbar :color="device.health > 80 ? 'green': 'orange'" :progress="device.health"></f7-progressbar>
            </f7-list-item>
      </f7-list>
      </f7-card-content>
    </f7-card>
    
    <f7-card>
      <f7-card-header>Temperature Data (All Devices)</f7-card-header>
      <f7-card-content><line-chart :data="chartData"></line-chart></f7-card-content>
      <f7-card-footer>Latest data on 20-05-2018 10:50:42</f7-card-footer>
    </f7-card>

    <f7-card>
      <f7-card-header>Conductivity Data (All Devices)</f7-card-header>
      <f7-card-content><line-chart :data="chartData"></line-chart></f7-card-content>
      <f7-card-footer>Latest data on 20-05-2018 10:50:42</f7-card-footer>
    </f7-card>

    <f7-card>
      <f7-card-header>Acidity Data (All Devices)</f7-card-header>
      <f7-card-content><line-chart :data="chartData"></line-chart></f7-card-content>
      <f7-card-footer>Latest data on 20-05-2018 10:50:42</f7-card-footer>
    </f7-card>
    


    <f7-block-title>Latest Log</f7-block-title>

    <f7-list>
      <f7-list-group v-for="log in latestLogs" :key="log.id">
        <f7-list-item :title="displayTimeFormat(log.date)" group-title></f7-list-item>
        <f7-list-item  :title="log.temperature" :after="log.device" :link="`/device/${log.deviceId}/`">
          <span slot="after-title">&nbsp;&#8451;</span>
          <f7-icon fa="thermometer-half" size="64px" class="temperature" slot="media"></f7-icon>
        </f7-list-item>
        <f7-list-item :title="log.conductivity" :after="log.device" :link="`/device/${log.deviceId}/`">
          <span slot="after-title">&nbsp;&#181;S</span>
          <f7-icon fa="bolt" size="64px" class="conductivity" slot="media"></f7-icon>
        </f7-list-item>
        <f7-list-item :title="log.acidity" :after="log.device" :link="`/device/${log.deviceId}/`">
          <f7-icon fa="vial" size="64px" class="acidity" slot="media"></f7-icon>
        </f7-list-item>
      </f7-list-group>
    </f7-list>

<!-- 
    <f7-list>
      <f7-list-item link="/about/" title="Device 1">
      </f7-list-item>
      <f7-list-item link="/form/" title="Device 2"></f7-list-item>
    </f7-list>

    <f7-block-title>Connected Devices</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About"></f7-list-item>
      <f7-list-item link="/form/" title="Form"></f7-list-item>
    </f7-list>
    <f7-block-title>Modals</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button round raised popup-open="#popup">Popup</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised login-screen-open="#login-screen">Login Screen</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>Panels</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col width="50">
          <f7-button fill raised panel-open="left">Left Panel</f7-button>
        </f7-col>
        <f7-col width="50">
          <f7-button fill raised panel-open="right">Right Panel</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-list>
      <f7-list-item link="/dynamic-route/blog/45/post/125/?foo=bar#about" title="Dynamic Route"></f7-list-item>
      <f7-list-item link="/load-something-that-doesnt-exist/" title="Default Route (404)"></f7-list-item>
    </f7-list> -->
  </f7-page>
</template>
<script>
import Service from '../service';
import LineChart from '@/pages/LineChart'

let moment = require('moment');

export default {
  components: {LineChart},
  methods: {
    hHoursEarlier(halfHours) {
      return moment().subtract(halfHours * 30, 'minutes').toDate();
    },
    displayTimeFormat: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
  data() {
    return {
      devices: Service.getDevices(),
      latestLogs: Service.getLatestLogs(5),
      chartData: {
          labels: [this.hHoursEarlier(7), this.hHoursEarlier(6), this.hHoursEarlier(5), this.hHoursEarlier(4), this.hHoursEarlier(3), this.hHoursEarlier(2), this.hHoursEarlier(1)],
          datasets: [{
            label: "Device 1",
            data: [24.5, 25.3, 24.7, 24.9, 25.0, 25.1, 23.2],
            lineTension: 0.25,
            borderColor: '#55efc4',
            fill: false,
            backgroundColor: '#FFFFFF',
            pointBorderColor: '#00b894',
            pointBackgroundColor: 'rgba(85, 239, 196,0.3)',
            pointRadius: 4,
            pointHoverRadius: 6,
          },
          {
            label: "Device 2",
            data: [24.0, 26.3, 24.7, 25.3, 25.1, 22.3, 21.3],
            lineTension: 0.25,
            borderColor: '#74b9ff',
            backgroundColor: '#FFFFFF',
            fill: false,
            pointBorderColor: '#0984e3',
            pointBackgroundColor: 'rgba(116, 185, 255,0.3)',
            pointRadius: 4,
            pointHoverRadius: 6,
          }
        ]
      }
    };
  },
  filters: {
    toUrl(device) {
      return `/device/${device.id}/`;
    },
  }
}
</script>
<style>
.temperature {
  color: #e17055 !important;
}

.conductivity {
  color: #fdcb6e !important;
}

.acidity {
  color: #00b894 !important;
}
</style>