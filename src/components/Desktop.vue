<template>
  <div id="desktop">
    <TopBar />
    <div id="desktop-main">
      <Dock />
      <DesktopBg />
      <TerminalWindow />
    </div>
  </div>
</template>

<script setup>
import TopBar from "./TopBar.vue";
import Dock from "./Dock.vue";
import DesktopBg from "./DesktopBg.vue";
import TerminalWindow from "./TerminalWindow.vue";
</script>

<style scoped>
#desktop {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
#desktop-main {
  flex: 1;
  display: flex;
  width: 100%;
  position: relative;
}
</style>
