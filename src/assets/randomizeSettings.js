import settings from "../assets/settings.js";
import backgrounds from "../assets/bg.js";
import allIcons from "@/assets/allIcons.js";

// 随机化函数
const randomizeHostname = () => {
  const randomPart = Math.random().toString(36).substring(2, 18); // 生成15位随机字母数字
  settings.hostname = `${randomPart}`;
};

const randomizeBackground = () => {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  settings.bg = backgrounds[randomIndex];
};

const randomizeDockAppCount = () => {
  settings.dockAppCount = Math.floor(Math.random() * 4) + 1; // 1-4
};

const randomizeDesktopAppCount = () => {
  settings.desktopAppCount = Math.floor(Math.random() * 8) + 3; // 3-10
};

const randomizeIcons = () => {
  // 先全部清除选择
  allIcons.forEach((icon) => {
    icon.desktop = false;
    icon.dock = false;
  });
  // 随机选择图标
  const desktopCount = settings.desktopAppNum;
  const dockCount = settings.dockAppNum;
  const shuffledIcons = allIcons
    .map((icon) => ({ icon, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ icon }) => icon);
  shuffledIcons.slice(0, desktopCount).forEach((icon) => {
    icon.desktop = true;
  });
  shuffledIcons
    .slice(desktopCount, desktopCount + dockCount)
    .forEach((icon) => {
      icon.dock = true;
    });
};

export {
  randomizeHostname,
  randomizeBackground,
  randomizeDockAppCount,
  randomizeDesktopAppCount,
  randomizeIcons,
};
