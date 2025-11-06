<template>
  <div id="desktop-top-bar">
    <div class="left-area area">
      <div class="button">Activities</div>
    </div>
    <div class="center-area area">{{ dateTime }}</div>
    <div class="right-area area">
      <div class="button">en</div>
      <div class="button">
        <img src="/assets/icons/audio-speaker-left-side.svg" alt="Sound" />
      </div>
      <div class="button">
        <img src="/assets/icons/system-shutdown-symbolic.svg" alt="Power" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const dateTime = ref("");

const updateDateTime = () => {
  const now = new Date();
  // 格式如 Nov 5 20:17
  const options = { month: "short", day: "numeric" };
  const dateStr = now.toLocaleDateString("en-US", options);
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  dateTime.value = `${dateStr} ${timeStr}`;
};

let timer = null;

onMounted(() => {
  updateDateTime();
  timer = setInterval(updateDateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>
#desktop-top-bar {
  padding: 0 16px;
  width: 100%;
  height: 24px;
  background: #000000;
  z-index: 1000;
  display: flex;
  align-items: center;
  font-family: "Ubuntu", "Ubuntu Mono", monospace;
  color: #fff;
  flex-shrink: 0;
}
.area {
  display: flex;
  align-items: center;
  font-size: 15px;
  letter-spacing: 1px;
  gap: 16px;
}
.left-area {
  min-width: 120px;
}
.center-area {
  flex: 1;
  justify-content: center;
  display: flex;
}
.right-area {
  min-width: 120px;
  justify-content: flex-end;
  display: flex;
  gap: 16px;
}
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
}
.button img {
  height: 18px;
  filter: invert(1);
}
</style>
