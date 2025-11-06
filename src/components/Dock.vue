<template>
  <div id="desktop-dock">
    <img
      src="/assets/apps/filemanager-app.png"
      class="app-icon"
      alt="File Manager"
    />
    <img
      src="/assets/apps/rhythmbox.png"
      class="app-icon"
      alt="Rhythmbox"
    />
    <img
      src="/assets/apps/libreoffice-writer.png"
      class="app-icon"
      alt="LibreOffice Writer"
    />
    <img src="/assets/apps/help-app.png" class="app-icon" alt="Help App" />
    <img
      v-for="icon in dockIcons"
      :key="icon.id"
      class="app-icon"
      :src="`/assets/apps/${icon.img}`"
      :alt="icon.name"
    />

    <!-- 分割线 -->
    <div class="dock-divider"></div>

    <div class="dock-app-running">
      <div class="app-running-indicator"></div>
      <img
        class="app-icon"
        src="/assets/apps/terminal-app.png"
        alt="Terminal"
      />
    </div>
    <img
      class="app-icon"
      src="/assets/apps/drive-harddisk.png"
      alt="Drive Harddisk"
    />
    <img class="app-icon" src="/assets/apps/user-trash.png" alt="User Trash" />
    <div class="dock-bottom">
      <img
        class="app-icon"
        src="/assets/icons/view-app-grid-symbolic.svg"
        alt="Show Applications"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import allIcons from "@/assets/allIcons.js";
import settings from "@/assets/settings.js";

const dockIcons = ref([]);

watchEffect(() => {
  // 响应式更新 dockIcons，当 allIcons 变化时重新计算
  let selectItems = [];
  selectItems = allIcons.filter((icon) => icon.dock);
  if (selectItems.length >= settings.dockAppNum) {
    dockIcons.value = selectItems.slice(0, settings.dockAppNum);
    return;
  } else {
    // 随机几项补齐
    const shuffledIcons = allIcons
      .filter((icon) => !icon.dock)
      .sort(() => 0.5 - Math.random());

    dockIcons.value = selectItems.concat(
      shuffledIcons.slice(0, settings.dockAppNum - selectItems.length)
    );
  }
});
</script>

<style scoped>
#desktop-dock {
  background: #303030;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
  gap: 8px;
  justify-content: flex-start;
  position: relative;
}
.dock-bottom {
  margin-top: auto;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  width: 100%;
}
.app-icon {
  border-radius: 8px;
  cursor: pointer;
  height: 48px;
  padding: 4px;
}
.app-icon:hover {
  background: #444;
}

.dock-app-running {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
}

.app-running-indicator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #fff;
  /* margin-right: 3px; */
  margin-left: 2px;
  align-self: center;
  display: inline-block;
}

.dock-app-running .app-icon {
  padding: 2px;
}

.dock-divider {
  width: 60%;
  height: 1px;
  background: #555;
}
</style>
