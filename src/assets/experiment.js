import { reactive } from "vue";
import writes1 from "./experiment/1/terminal";

const experiment = reactive({
  current: "",
  list: [
    {
      id: 1,
      experiment: writes1,
      name: "实验一 Hadoop的安装与使用",
    },
  ],
});

export default experiment;
