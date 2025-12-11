import { reactive } from "vue";
import settings from "@/assets/settings";

const formatTime = (time) =>
  `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(time.getDate()).padStart(2, "0")} ${String(
    time.getHours()
  ).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}:${String(
    time.getSeconds()
  ).padStart(2, "0")}`;

const experiments = reactive({
  getWrites: () => `admin@${settings.hostname}:/lib/hadoop/hadoop/sbin$ su ${settings.username}
Password: 
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop/sbin$ ./start-dfs.sh
Starting namenodes on [localhost]
Starting datanodes
Starting secondary namenodes [o47oo776d0ycw3j]
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop/sbin$ jps
7233 SecondaryNameNode
8587 Jps
6955 DataNode
6782 NameNode
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop/sbin$ cd ..
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ ./bin/hdfs dfs -rm -r input
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ ./bin/hdfs dfs -rm -r output
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ ./bin/hdfs dfs -mkdir input
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ vim wordfile1.txt
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ vim wordfile2.txt
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ ./bin/hdfs dfs -put ./wordfile1.txt input
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ ./bin/hdfs dfs -put ./wordfile2.txt input
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ hdfs dfs -ls input
Found 2 items
-rw-r--r--   1 ${settings.username} supergroup         23 ${formatTime(
    new Date()
  )} input/wordfile1.txt
-rw-r--r--   1 ${settings.username} supergroup         23 ${formatTime(
    new Date()
  )} input/wordfile2.txt
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ ./bin/hadoop jar ./myapp/WordCount.jar input output
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ cat output/count.txt
Goodbye 1
.
Hadoop 2
Hello 3
MapReduce 2
...
Welcome 1
.
World 1
`,
});

export default experiments;
