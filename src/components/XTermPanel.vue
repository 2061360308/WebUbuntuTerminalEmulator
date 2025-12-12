<template>
  <div id="terminal" ref="terminal"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watchEffect } from "vue";
import packageJson from "../../package.json";
import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import experiment from "@/assets/experiment.js";
import settings from "@/assets/settings";

const defaultWrites = `
\x1b[1;38;2;255;165;0m888     888 888                        888             \x1b[0m
\x1b[1;38;2;255;165;0m888     888 888                        888             \x1b[0m
\x1b[1;38;2;255;165;0m888     888 888                        888             \x1b[0m
\x1b[1;38;2;255;165;0m888     888 88888b.  888  888 88888b.  888888 888  888 \x1b[0m
\x1b[1;38;2;255;165;0m888     888 888 "88b 888  888 888 "88b 888    888  888 \x1b[0m
\x1b[1;38;2;255;165;0m888     888 888  888 888  888 888  888 888    888  888 \x1b[0m
\x1b[1;38;2;255;165;0mY88b. .d88P 888 d88P Y88b 888 888  888 Y88b.  Y88b 888 \x1b[0m
\x1b[1;38;2;255;165;0m "Y88888P"  88888P"   "Y88888 888  888  "Y888  "Y88888 \x1b[0m

\x1b[1;32m# 欢迎使用 \x1b[4;33mUbuntu 终端模拟器\x1b[0m！
\x1b[1;32m# 快速开始：\x1b[0m
\x1b[1;36m1. 按下空格键打开设置面板，配置用户名、主机名等。\x1b[0m
\x1b[1;36m2. 在实验选项卡中选择一个实验。\x1b[0m
\x1b[1;36m3. 关闭设置面板，按照实验说明操作。\x1b[0m

\x1b[1;33m# 提示：
\x1b[1;33m - 随时按空格键打开/关闭设置面板。\x1b[0m
\x1b[1;33m - 按下F11全屏可以获得更加真实的体验。\x1b[0m
\x1b[1;33m - 善用设置面板，手动调节参数可以获得更高得区分度。\x1b[0m
\x1b[1;33m - 建议参照老师分享的往届同学的报告示例配合使用\x1b[0m

\x1b[1;32m# 终端特色：\x1b[0m
\x1b[1;36m- 模拟器内容相关细节如：\x1b[1;33mssh指纹\x1b[0m，\x1b[1;33m系统信息\x1b[0m\x1b[1;36m等每次刷新均会随机生成，不必担心重复。\x1b[0m
\x1b[1;36m- 模拟器内容与真实环境完全一致，非常可靠。\x1b[0m
\x1b[1;36m- 模拟器中打印日志的输出时间等均由代码实时生成，细节高度还原。\x1b[0m
\x1b[1;36m- 耗费精力巨大，且行且珍惜。\x1b[0m

\x1b[1;32m# 祝你实验愉快！\x1b[0m

当前版本： v${packageJson.version}

\x1b[1;32m# 更新日志：\x1b[0m
\x1b[1;36m1. v0.0.4 添加实验二 HDFS 的编程实践\x1b[0m
\x1b[1;36m2. v0.0.5 添加实验三 HBase编程实践（没有核对细节）\x1b[0m
\x1b[1;36m3. v0.0.6 添加实验四 基于MapReduce 的编程实践(凭感觉编的输出)\x1b[0m
`;

const terminal = ref(null);
let term = null;
let fitAddon = null;

// 提取 watchEffect 的逻辑为一个独立函数
const updateTerminalContent = () => {
  // 清空终端内容
  if (term) {
    term.clear();
  } else {
    return;
  }

  // 如果 experiment.current 存在，重新写入实验内容
  if (experiment.current) {
    const currentExperiment = experiment.list.find(
      (exp) => exp.id === experiment.current
    ).experiment;

    console.log("experiment:", currentExperiment);
    for (const s of currentExperiment.getWrites().split("\n"))
      parseAndWrite(term, s.replace(/\r\n$/, ""));
  } else {
    // 否则写入默认内容
    for (const s of defaultWrites.split("\n"))
      parseAndWrite(term, s.replace(/\r\n$/, ""));
  }

  // 滚动到最顶部
  term.scrollToTop();
};

onMounted(() => {
  term = new Terminal({
    theme: {
      background: "#380c2a",
      foreground: "#fff",
      cursor: "#fff",
    },
    fontFamily: "Ubuntu Mono, monospace",
    fontSize: 20,
    rows: 24,
    cols: 80,
    scrollback: 500000, // 设置缓存行数为 5000
  });

  fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  fitAddon.fit();

  const resizeObserver = new ResizeObserver(() => {
    fitAddon.fit();
  });
  resizeObserver.observe(terminal.value);

  term.open(terminal.value);
  // updateTerminalContent();
});

onUnmounted(() => {
  if (term) {
    try {
      term.dispose();
    } catch (e) {
      /* ignore */
    }
    term = null;
  }
});

const parseAndWrite = (term, line) => {
  // 匹配用户名@主机名:路径$
  const regex = /^(\w+)@([\w.-]+):([\w~\/.\-]+)\$?/;
  if (regex.test(line)) {
    const match = line.match(regex);
    if (match) {
      // 用户名@主机名和路径加粗，$不加粗
      const userHost = `\x1b[1m\x1b[38;2;38;164;106m${match[1]}@${match[2]}\x1b[0m`; // #26a46a 粗体
      const path = `\x1b[1m\x1b[38;2;17;74;140m${match[3]}\x1b[0m`; // #114a8c 粗体
      const end = `\x1b[37m$\x1b[0m`; // 白色，不加粗
      const rest = line.slice(match[0].length);
      term.write(`${userHost}:${path}${end}${rest}\r\n`);
      return;
    }
  }
  term.write(line + "\r\n");
};

watchEffect(() => {
  const username = settings.username;
  const hostname = settings.hostname;
  console.log("Username or hostname changed:", username, hostname);
  updateTerminalContent();
});
</script>

<style scoped>
#terminal {
  padding: 12px;
  font-family: "Ubuntu Mono", "monospace";
  font-size: 16px;
  background: #380c2a;
  width: 100%;
  height: 100%; /* 填满内容区 */
  box-sizing: border-box;
}
</style>

<style>
.xterm-viewport {
  overflow-y: auto; /* 保证内容可滚动 */
  -ms-overflow-style: none; /* 隐藏滚动条 */
  scrollbar-width: none; /* 隐藏滚动条 */
}

.xterm-viewport::-webkit-scrollbar {
  display: none;
}

.xterm-viewport {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.xterm-viewport::-webkit-scrollbar {
  display: none;
}
</style>
