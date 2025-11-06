<template>
  <div @keydown.space.prevent="toggleSettingsPanel" tabindex="0">
    <Desktop />
    <div class="settingsPanel" v-if="showSettingsPanel">
      <SettingsPanel/>
    </div>
    
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Desktop from "./components/Desktop.vue";
import SettingsPanel from "./components/SettingsPanel.vue";
import {
  randomizeHostname,
  randomizeBackground,
  randomizeDockAppCount,
  randomizeDesktopAppCount,
  randomizeIcons,
} from "@/assets/randomizeSettings.js";

// 定义状态
const showSettingsPanel = ref(false);

// 切换设置面板显示状态
const toggleSettingsPanel = () => {
  showSettingsPanel.value = !showSettingsPanel.value;
};

// 在组件挂载时聚焦根元素
onMounted(() => {
  document.querySelector('[tabindex="0"]').focus();
  // 初始化随机设置
  randomizeHostname();
  randomizeBackground();
  randomizeDockAppCount();
  randomizeDesktopAppCount();
  randomizeIcons();
});
</script>

<style scoped>
.settingsPanel {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000000000;
}
</style>

<style>
/* 确保根元素可以聚焦以捕获键盘事件 */
div[tabindex="0"] {
  outline: none;
}
</style>
