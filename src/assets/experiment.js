import { reactive } from "vue";
import writes1 from "./experiment/1/terminal";
import writes2 from "./experiment/2/terminal";
import writes3 from "./experiment/3/terminal";
import writes4 from "./experiment/4/terminal";

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
    {
      id: 3,
      experiment: writes3,
      name: "实验三 HBase编程实践",
    },
    {
      id: 4,
      experiment: writes4,
      name: "实验四 基于MapReduce 的编程实践",
    },
  ],
});

export default experiment;
