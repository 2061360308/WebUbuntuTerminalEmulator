<template>
  <div class="settings-panel">
    <div class="content">
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          :class="{ active: activeTab === tab.name }"
          @click="activeTab = tab.name"
        >
          {{ tab.label }}
        </button>
      </div>
      <div class="tab-content">
        <div v-if="activeTab === 'settings'">
          <div class="form-group">
            <div class="title">
              <label for="username">用户名</label>
              <label class="note"
                >改成自己的名字，建议为：hadoop_名字拼音</label
              >
            </div>

            <input id="username" v-model="settings.username" type="text" />
          </div>
          <div class="form-group">
            <div class="title">
              <label for="hostname">主机名</label>
              <label class="note">保持随机和其他人有区分即可</label>
            </div>
            <div class="input">
              <input id="hostname" v-model="settings.hostname" type="text" />
              <button class="randomButton" @click="randomizeHostname">
                🎲 随机生成
              </button>
            </div>
          </div>
          <div class="form-group">
            <label for="background">桌面背景</label>
            <div class="input">
              <select id="background" v-model="settings.bg">
                <option v-for="bg in backgrounds" :key="bg" :value="bg">
                  {{ bg.split("/").pop() }}
                </option>
              </select>
              <button class="randomButton" @click="randomizeBackground">
                🎲 随机生成
              </button>
            </div>
          </div>
          <div class="form-group">
            <div class="title">
              <label for="dockAppCount">Dock 应用数目 (1-4)</label>
              <label class="note"
                >Dock栏额外多显示的应用图标数目，随机选择即可【摆拍演员】</label
              >
            </div>
            <div class="input">
              <select id="dockAppCount" v-model="settings.dockAppNum">
                <option v-for="n in 4" :key="n" :value="n">
                  {{ n }}
                </option>
              </select>
              <button class="randomButton" @click="randomizeDockAppCount">
                🎲 随机生成
              </button>
            </div>
          </div>
          <div class="form-group">
            <div class="title">
              <label for="desktopAppCount">桌面应用数目 (3-10)</label>
              <label class="note"
                >桌面上显示的图标数目，后续可调整到自己喜欢位置，随机选择即可【摆拍演员】</label
              >
            </div>
            <div class="input">
              <select id="desktopAppCount" v-model="settings.desktopAppNum">
                <option v-for="n in 8" :key="n" :value="n">
                  {{ n }}
                </option>
              </select>
              <button class="randomButton" @click="randomizeDesktopAppCount">
                🎲 随机生成
              </button>
            </div>
          </div>
          <div class="form-group">
            <div class="title">
              <label for="apps">备选APP图标</label>
              <label class="note">勾选要显示的应用图标</label>
            </div>
            <button class="randomButton" @click="randomizeIcons">
              🎲 随机生成
            </button>
            <div class="icons-grid">
              <div class="icon-item" v-for="icon in allIcons" :key="icon.id">
                <div class="icon-name">{{ icon.name }}</div>
                <div class="icon-content">
                  <img :src="`/assets/apps/${icon.img}`" class="icon-img" />
                  <div class="icon-checkbox">
                    <label>
                      <input type="checkbox" v-model="icon.desktop" />
                      桌面
                    </label>
                    <label>
                      <input type="checkbox" v-model="icon.dock" />
                      Dock
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'experiments'">
          <h2>实验</h2>
          <div class="form-group">
            <div class="title">
              <label for="experiment">演示实验</label>
              <label class="note">选择想要演示的实验</label>
            </div>
            <div class="input">
              <select id="experiment" v-model="experiment.current">
                <option value="">请选择想要演示的实验</option>
                <option
                  v-for="exp in experiment.list"
                  :key="exp.id"
                  :value="exp.id"
                >
                  {{ exp.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import settings from "../assets/settings.js";
import backgrounds from "../assets/bg.js";
import allIcons from "@/assets/allIcons.js";
import {
  randomizeHostname,
  randomizeBackground,
  randomizeDockAppCount,
  randomizeDesktopAppCount,
  randomizeIcons,
} from "@/assets/randomizeSettings.js";
import experiment from "@/assets/experiment.js";

// 当前激活的选项卡
const activeTab = ref("settings");

// 定义选项卡数据
const tabs = [
  { name: "settings", label: "设置" },
  { name: "experiments", label: "实验" },
];
</script>

<style scoped>
.settings-panel {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 900px;
  height: 80%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: auto;
}

.tabs {
  display: flex;
  border-bottom: 1px solid #ccc;
  margin-bottom: 16px;
}

.tabs button {
  background: none;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
}

.tabs button.active {
  border-bottom: 2px solid #007bff;
  font-weight: bold;
}

.tab-content {
  padding: 16px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

input,
select {
  width: auto;
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: inline-block;
}

.input {
  display: flex;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
}

.title .note {
  font-weight: normal;
  font-size: 12px;
  color: #666;
  margin-left: 8px;
  flex-grow: 1;
}

.randomButton {
  margin-left: 8px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(200px, 1fr)
  ); /* 自动调整列数 */
  gap: 16px;
  margin-top: 16px;
}

.icon-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: #f9f9f9;
}

.icon-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
}

.icon-name {
  font-weight: bold;
  margin-bottom: 8px;
}

.icon-checkbox label {
  display: block;
  margin-top: 8px;
  font-size: 14px;
}
</style>
