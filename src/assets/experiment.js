import { reactive } from "vue";
import writes1 from "./experiment/1/terminal";
import writes2 from "./experiment/2/terminal";

const experiment = reactive({
  current: "",
  list: [
    {
      id: 1,
      experiment: writes1,
      name: "实验一 Hadoop的安装与使用",
    },
    {
      id: 2,
      experiment: writes2,
      name: "实验二 HDFS 的编程实践",
    },
  ],
});

export default experiment;
