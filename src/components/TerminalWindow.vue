<template>
  <div class="ubuntu-terminal-window" ref="terminalWindow" :style="windowStyle">
    <div class="ubuntu-title-bar" ref="dragBar">
      <div class="left">
        <div class="button">
          <img src="/assets/icons/tab-new-symbolic.svg" alt="tab-new" />
        </div>
      </div>
      <div class="center">{{ terminalTitle }}</div>
      <div class="right">
        <div class="button">
          <img src="/assets/icons/system-search-symbolic.svg" alt="search" />
        </div>
        <div class="button">
          <img src="/assets/icons/open-menu-symbolic.svg" alt="open-menu" />
        </div>
        <div class="button">
          <img
            src="/assets/icons/window-minimize-symbolic.svg"
            alt="Minimize"
          />
        </div>
        <div class="button">
          <img
            src="/assets/icons/window-maximize-symbolic.svg"
            alt="Maximize"
          />
        </div>
        <div class="button">
          <img src="/assets/icons/window-close-symbolic.svg" alt="Close" />
        </div>
      </div>
    </div>
    <div class="terminal-content">
      <XTermPanel />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import XTermPanel from "./XTermPanel.vue";
import settings from "@/assets/settings.js";

const left = ref(200);
const top = ref(100);
const width = ref(900);
const height = ref(600);
const isDragging = ref(false);
const dragOffsetX = ref(0);
const dragOffsetY = ref(0);

const terminalWindow = ref(null);
const dragBar = ref(null);

const terminalTitle = computed(() => {
  return `${settings.username}@${settings.hostname}: ~`;
});

const windowStyle = computed(() => ({
  position: "absolute",
  left: left.value + "px",
  top: top.value + "px",
  width: width.value + "px",
  height: height.value + "px",
}));

onMounted(() => {
  if (!dragBar.value || !terminalWindow.value) return;
  dragBar.value.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDragging.value = true;
    dragOffsetX.value = e.clientX - terminalWindow.value.offsetLeft;
    dragOffsetY.value = e.clientY - terminalWindow.value.offsetTop;
    document.body.style.userSelect = "none";
  });
  document.addEventListener("mousemove", (e) => {
    if (isDragging.value) {
      left.value = e.clientX - dragOffsetX.value;
      top.value = e.clientY - dragOffsetY.value;
    }
  });
  document.addEventListener("mouseup", () => {
    isDragging.value = false;
    document.body.style.userSelect = "";
  });
  if (terminalWindow.value) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();
        width.value = rect.width;
        height.value = rect.height;
      }
    });
    resizeObserver.observe(terminalWindow.value);
  }
});
</script>

<style scoped>
.ubuntu-terminal-window {
  /* 布局已在windowStyle里设置 */
  min-width: 400px;
  min-height: 200px;
  resize: both;
  overflow: hidden;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0 2px 16px #0004;
}

.terminal-content {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ubuntu-title-bar {
  position: relative;
  background: #2c2c2c;
  height: 32px;
  display: flex;
  align-items: center;
  color: #fff;
  font-family: "Ubuntu", "Ubuntu Mono", "monospace";
  font-size: 16px;
  border-bottom: 1px solid #4e085f;
  user-select: none;
  border-radius: 6px 6px 0 0;
}

/* 合并 left、center、right 的公共样式 */
.ubuntu-title-bar .left,
.ubuntu-title-bar .center,
.ubuntu-title-bar .right {
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
}

/* 左侧区域 */
.ubuntu-title-bar .left {
  left: 0;
  top: 0;
  bottom: 0;
  padding-left: 6px;
}

/* 标题居中 */
.ubuntu-title-bar .center {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  justify-content: center;
  letter-spacing: 1px;
  pointer-events: none; /* 防止遮挡按钮点击 */
}

/* 右侧区域 */
.ubuntu-title-bar .right {
  right: 0;
  top: 0;
  bottom: 0;
  min-width: 60px;
  justify-content: flex-end;
  padding-right: 6px;
  gap: 3px;
}

/* 按钮样式 */
.ubuntu-title-bar .button {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  background: transparent;
  transition: background 0.2s;
  cursor: pointer;
  border: none;
  padding: 0;
}

/* 按钮图标样式 */
.ubuntu-title-bar .button img {
  width: 16px;
  height: 16px;
  pointer-events: none;
  filter: invert(1) brightness(1.2);
}

/* 按钮悬停效果 */
.ubuntu-title-bar .button:hover {
  background: #444;
}
</style>
