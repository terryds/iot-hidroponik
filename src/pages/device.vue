<template>
  <f7-page :page-content="false" >
    <f7-navbar :title="device.name" back-link="Back"></f7-navbar>
    <f7-toolbar tabbar labels  class="toolbar-bottom-md">
      <f7-link tab-link="#tab-1" tab-link-active text="Temperature" icon-fa="thermometer-half" icon-size="26"></f7-link>
      <f7-link tab-link="#tab-2" text="Conductivity" icon-fa="bolt" icon-size="26"></f7-link>
      <f7-link tab-link="#tab-3"  text="Acidity" icon-fa="vial" icon-size="26"></f7-link>
      <f7-link tab-link="#tab-4"  text="Settings" icon-fa="cogs" icon-size="26"></f7-link>
    </f7-toolbar>
    <f7-tabs swipeable>
      <f7-tab id="tab-1"  class="page-content" tab-active>
        <f7-block>
          <f7-card>
            <f7-card-header>Temperature Data</f7-card-header>
            <f7-card-content><line-chart :data="tempData"></line-chart></f7-card-content>
            <f7-card-footer>Latest data on 20-05-2018 10:50:42</f7-card-footer>
          </f7-card>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-2" class="page-content">
        <f7-block>
          <f7-card>
            <f7-card-header>Conductivity Data</f7-card-header>
            <f7-card-content><line-chart :data="condData"></line-chart></f7-card-content>
            <f7-card-footer>Latest data on 20-05-2018 10:50:42</f7-card-footer>
          </f7-card>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-3" class="page-content">
        <f7-block>
          <f7-card>
            <f7-card-header>Acidity Data</f7-card-header>
            <f7-card-content><line-chart :data="acidData"></line-chart></f7-card-content>
            <f7-card-footer>Latest data on 20-05-2018 10:50:42</f7-card-footer>
          </f7-card>
        </f7-block>
      </f7-tab>
      <f7-tab id="tab-4" class="page-content">
        <f7-block>
          <f7-block-title>Configure Device</f7-block-title>
          <f7-card>
            <f7-card-header>Configure Device</f7-card-header>
            <f7-card-content>
              <f7-list simple-list>
                <f7-list-item>
                  <span>Fertilizer A</span>
                  <f7-toggle checked color="green"></f7-toggle>
                </f7-list-item>
                <f7-list-item>
                  <span>Fertilizer B</span>
                  <f7-toggle color="yellow"></f7-toggle>
                </f7-list-item>
                <f7-list-item>
                  <span>Water</span>
                  <f7-toggle checked color="blue"></f7-toggle>
                </f7-list-item>
                <f7-list-item>
                  <span>Accu</span>
                  <f7-toggle checked color="orange"></f7-toggle>
                </f7-list-item>
              </f7-list>
            </f7-card-content>
          </f7-card>
          
          <br />
          <f7-block-title>Set Point Configuration</f7-block-title>
          <f7-card>
            <f7-card-header>Set Point Configuration</f7-card-header>
            <f7-card-content>
              <f7-card>
                <f7-card-header>Acidity</f7-card-header>
                <f7-card-content>
                  <f7-list inline-labels no-hairlines-md>
                    <f7-list-item>
                      <f7-label>Value</f7-label>
                      <f7-input type="text" placeholder="Acidity" value="8000" clear-button></f7-input>
                    </f7-list-item>

                    <f7-list-item>
                      <f7-label>P</f7-label>
                      <f7-input type="text" placeholder="P of Acidity" value="4000" clear-button></f7-input>
                    </f7-list-item>

                    <f7-list-item>
                      <f7-label>I</f7-label>
                      <f7-input type="text" placeholder="I of Acidity" value="2" clear-button></f7-input>
                    </f7-list-item>

                    <f7-list-item>
                      <f7-label>D</f7-label>
                      <f7-input type="text" placeholder="D of Acidity" value="3" clear-button></f7-input>
                    </f7-list-item>

                  </f7-list>
                </f7-card-content>
              </f7-card>
              <f7-card>
                <f7-card-header>Electrical</f7-card-header>
                <f7-card-content>
                  <f7-list inline-labels no-hairlines-md>
                    <f7-list-item>
                      <f7-label>Value</f7-label>
                      <f7-input type="text" placeholder="Electrical" value="6000" clear-button></f7-input>
                    </f7-list-item>

                    <f7-list-item>
                      <f7-label>P</f7-label>
                      <f7-input type="text" placeholder="P of Electrical" value="4" clear-button></f7-input>
                    </f7-list-item>

                    <f7-list-item>
                      <f7-label>I</f7-label>
                      <f7-input type="text" placeholder="I of Electrical" value="5" clear-button></f7-input>
                    </f7-list-item>

                    <f7-list-item>
                      <f7-label>D</f7-label>
                      <f7-input type="text" placeholder="D of Electrical" value="6" clear-button></f7-input>
                    </f7-list-item>

                  </f7-list>
                </f7-card-content>
              </f7-card>
            </f7-card-content>
            <f7-card-footer><f7-button raised fill>Save PID settings</f7-button></f7-card-footer>
          </f7-card>

        </f7-block>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
import Service from '../service';
import LineChart from '@/pages/LineChart';
let moment = require('moment');

export default {
  data() {
    return {
      device: Service.getDevice(this.$f7route.params.id),
      tempData: null,
      condData: null,
      acidData: null,
      temp: null,
      cond: null,
      acid: null,
      date: null
    }
  },
  components: {
    LineChart
  },
  created() {
    this.fillData();
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      let log = Service.getLog(this.$f7route.params.id);

      let tempResult = log.map(a => a.temperature);
      let condResult = log.map(a => a.conductivity);
      let acidResult = log.map(a => a.acidity);
      let dateResult = log.map(a => moment(a.date).toDate());

      this.temp = tempResult;
      this.cond = condResult;
      this.acid = acidResult;
      this.date = dateResult;

      console.log(this.date);
      console.log(this.temp);

      this.tempData = {
        labels: this.date,
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: '#e74c3c',
            data: this.temp
          }
        ]
      };
      console.log(this.tempData)

      this.condData = {
        labels: this.date,
        datasets: [
          {
            label: 'Conductivity',
            backgroundColor: '#fdcb6e',
            data: this.cond
          }
        ]
      };

      this.acidData = {
        labels: this.date,
        datasets: [
          {
            label: 'Acidity',
            backgroundColor: '#00b894',
            data: this.acid
          }
        ]
      };
    }
  }
}
</script>