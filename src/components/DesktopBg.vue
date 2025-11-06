<template>
  <div id="desktop-bg" :style="{ backgroundImage: `url(${settings.bg})` }">
    <!-- 桌面图标 -->
    <div
      v-for="icon in icons"
      :key="icon.id"
      :data-icon-id="icon.id"
      class="desktop-icon"
      :style="{
        left: icon.x + 'px',
        top: icon.y + 'px',
      }"
      @mousedown="startDrag(icon, $event)"
    >
      <img :src="`/assets/apps/${icon.img}`" class="icon-img" />
      <div class="icon-label">{{ icon.name }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, watch } from "vue";
import allIcons from "@/assets/allIcons.js";
import settings from "@/assets/settings.js";

const gridSize = 88; // 网格大小
const iconSize = 64; // 图标区域大小
const padding = 12; // 网格内边距

const icons = ref([]);

let dragging = null;
let mouseOffset = { x: 0, y: 0 };
let dragGhost = null; // 虚影DOM元素
let dropPreview = null; // 预览DOM元素
const previewPos = ref(null);

// 获取网格位置
function getGridPosition(x, y) {
  const col = Math.max(0, Math.round((x - padding) / gridSize));
  const row = Math.max(0, Math.round((y - padding) / gridSize));
  return { col, row };
}

// 检查位置是否被占用
function isPositionOccupied(col, row, excludeIcon = null) {
  return icons.value.some(
    (icon) => icon !== excludeIcon && icon.col === col && icon.row === row
  );
}

// 查找最近的空闲位置
function findNearestFreePosition(targetCol, targetRow, excludeIcon = null) {
  if (!isPositionOccupied(targetCol, targetRow, excludeIcon)) {
    return { col: targetCol, row: targetRow };
  }

  for (let radius = 1; radius <= 10; radius++) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dy = -radius; dy <= radius; dy++) {
        if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
          const col = Math.max(0, targetCol + dx);
          const row = Math.max(0, targetRow + dy);
          if (!isPositionOccupied(col, row, excludeIcon)) {
            return { col, row };
          }
        }
      }
    }
  }

  return { col: targetCol, row: targetRow };
}

// 重排其他图标
function rearrangeIcons(newCol, newRow, draggedIcon) {
  const conflictIcon = icons.value.find(
    (icon) => icon !== draggedIcon && icon.col === newCol && icon.row === newRow
  );

  if (conflictIcon) {
    const newPos = findNearestFreePosition(newCol, newRow, draggedIcon);
    conflictIcon.col = newPos.col;
    conflictIcon.row = newPos.row;
    conflictIcon.x = conflictIcon.col * gridSize + padding;
    conflictIcon.y = conflictIcon.row * gridSize + padding;

    rearrangeIcons(newPos.col, newPos.row, conflictIcon);
  }
}

// 创建虚影元素
function createGhost(icon, mouseX, mouseY) {
  dragGhost = document.createElement("div");
  dragGhost.className = "desktop-icon drag-ghost";
  dragGhost.style.position = "absolute";
  dragGhost.style.left = mouseX - mouseOffset.x + "px";
  dragGhost.style.top = mouseY - mouseOffset.y + "px";
  dragGhost.style.zIndex = "1000";
  dragGhost.style.pointerEvents = "none";
  dragGhost.style.width = "48px";
  dragGhost.style.height = "48px";

  dragGhost.innerHTML = `
    <img src="/assets/apps/${icon.img}" class="icon-img" style="width: 48px; height: 48px;" />
    <div class="icon-label">${icon.name}</div>
  `;

  document.getElementById("desktop-bg").appendChild(dragGhost);
}

// 创建预览元素
function createPreview() {
  dropPreview = document.createElement("div");
  dropPreview.className = "drop-preview";
  dropPreview.style.position = "absolute";
  dropPreview.style.display = "none";
  dropPreview.style.pointerEvents = "none";
  document.getElementById("desktop-bg").appendChild(dropPreview);
}

// 更新预览位置
function updatePreview(x, y) {
  if (!dropPreview) return;

  const { col, row } = getGridPosition(x, y);
  const finalPos = findNearestFreePosition(col, row, dragging);

  dropPreview.style.left = finalPos.col * gridSize + padding + "px";
  dropPreview.style.top = finalPos.row * gridSize + padding + "px";
  dropPreview.style.display = "block";
}

function startDrag(icon, e) {
  e.preventDefault();
  dragging = icon;

  // 计算鼠标相对于图标的偏移
  mouseOffset.x = e.clientX - icon.x;
  mouseOffset.y = e.clientY - icon.y;

  // 创建虚影
  createGhost(icon, e.clientX, e.clientY);

  // 创建预览
  createPreview();

  // 给原图标添加拖拽源样式
  const iconElement = document.querySelector(`[data-icon-id="${icon.id}"]`);
  if (iconElement) {
    iconElement.classList.add("drag-source");
  }

  document.addEventListener("mousemove", onDrag);
  document.addEventListener("mouseup", stopDrag);
}

function onDrag(e) {
  if (!dragging || !dragGhost) return;
  e.preventDefault();
  // 移动虚影
  dragGhost.style.left = e.clientX - mouseOffset.x + "px";
  dragGhost.style.top = e.clientY - mouseOffset.y + "px";
  // 更新预览位置
  const ghostCenterX = e.clientX - mouseOffset.x + iconSize / 2;
  const ghostCenterY = e.clientY - mouseOffset.y + iconSize / 2;
  updatePreview(ghostCenterX, ghostCenterY);
}

function stopDrag(e) {
  if (!dragging) return;
  e.preventDefault();

  // 计算最终位置
  const ghostCenterX = e.clientX - mouseOffset.x + iconSize / 2;
  const ghostCenterY = e.clientY - mouseOffset.y + iconSize / 2;

  const { col, row } = getGridPosition(ghostCenterX, ghostCenterY);

  // 重排图标处理冲突
  rearrangeIcons(col, row, dragging);

  // 更新拖拽图标位置
  dragging.col = col;
  dragging.row = row;
  dragging.x = col * gridSize + padding;
  dragging.y = row * gridSize + padding;

  // 移除拖拽源样式
  const iconElement = document.querySelector(`[data-icon-id="${dragging.id}"]`);
  if (iconElement) {
    iconElement.classList.remove("drag-source");
  }

  // 删除虚影和预览
  if (dragGhost) {
    dragGhost.remove();
    dragGhost = null;
  }

  if (dropPreview) {
    dropPreview.remove();
    dropPreview = null;
  }

  // 重置拖拽状态
  dragging = null;
  mouseOffset = { x: 0, y: 0 };

  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
}

// 初始化图标位置
function initIconPositions(desktopIcons) {
  icons.value = [];

  let col = 0;
  let row = 0;

  // 动态计算每行的列数
  const columnsPerRow = Math.floor(window.innerWidth / gridSize);

  desktopIcons.forEach((icon, index) => {
    // 自动生成初始位置
    const x = col * gridSize + padding;
    const y = row * gridSize + padding;

    // 添加到 icons 列表
    icons.value.push({
      id: icon.id,
      name: icon.name,
      img: icon.img,
      col,
      row,
      x,
      y,
      show: true, // 默认显示
    });

    // 更新列和行
    col++;
    if (col >= columnsPerRow) {
      col = 0;
      row++;
    }
  });
}

watch(
  () => [allIcons, settings.desktopAppNum],
  ([newAllIcons, newDesktopAppNum]) => {
    let selectItems = newAllIcons.filter((icon) => icon.desktop);
    selectItems.unshift({
      id: 103,
      name: "Home",
      img: "user-home.png",
      desktop: true,
      dock: false,
    });
    let desktopIcons = [];
    if (selectItems.length - 1 >= newDesktopAppNum) {
      desktopIcons = selectItems.slice(0, newDesktopAppNum + 1);
    } else {
      const shuffledIcons = newAllIcons
        .filter((icon) => !icon.desktop)
        .sort(() => 0.5 - Math.random());
      desktopIcons = selectItems.concat(
        shuffledIcons.slice(0, newDesktopAppNum - selectItems.length + 1)
      );
    }
    initIconPositions(desktopIcons);
  },
  { deep: true }
);
</script>

<style scoped>
#desktop-bg {
  flex: 1;
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
  z-index: 0;
  position: relative;
  overflow: hidden;
}

.desktop-icon {
  position: absolute;
  width: 64px;
  height: 76px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: grab;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.2, 0, 0.2, 1);
  border: 2px solid transparent;
  border-radius: 8px;
  padding: 4px;
  box-sizing: border-box;
}

.desktop-icon:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.desktop-icon.drag-source {
  opacity: 0.3;
  transform: scale(0.95);
}

.drag-ghost {
  cursor: grabbing;
  opacity: 0.85;
  /* transform: scale(1.1) rotate(3deg); */
  background-color: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transition: none;
  pointer-events: none;
}
.drop-preview {
  position: absolute;
  width: 48px;
  height: 48px;
  border: 2px dashed rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.15);
  transition: all 0.2s ease;
  pointer-events: none;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.icon-img {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  margin-bottom: 4px;
  pointer-events: none;
}

.icon-label {
  color: #fff;
  font-size: 12px;
  font-family: "Ubuntu", "Ubuntu Mono", monospace;
  text-align: center;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
  pointer-events: none;
  line-height: 1.2;
  max-width: 56px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
