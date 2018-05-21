<template>
  <f7-page>
    <f7-navbar title="Left Panel"></f7-navbar>
    <f7-block strong>
      <p>Left panel content goes here</p>
    </f7-block>
    <f7-block-title>Load page in panel</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="Tips dan Trik Hidroponik"></f7-list-item>
      <f7-list-item link="/about/" title="Bantuan"></f7-list-item>
      <f7-list-item link="/about/" title="Tentang Kami"></f7-list-item>
      <f7-list-item link="/form/" title="Log Out"></f7-list-item>
    </f7-list>
    <f7-block-title>Load page in main view</f7-block-title>
    <f7-list>
      <f7-list-item link="/about/" title="About" view="#main-view" panel-close></f7-list-item>
      <f7-list-item link="/form/" title="Form" view="#main-view" panel-close></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
export default {}
</script>