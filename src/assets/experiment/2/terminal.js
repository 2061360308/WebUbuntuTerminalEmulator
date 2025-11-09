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

const startDownloadTime = new Date(Date.now()); // 开始时间
const speed = (Math.random() * (2 - 1) + 1).toFixed(2); // 随机速度，范围 1.00 - 2.00 MB/s
const totalSize = 454; // 总大小 454M
const duration = (totalSize / speed).toFixed(0); // 用时（秒），总大小除以速度
const endDownloadTime = new Date(startDownloadTime.getTime() + duration * 1000); // 结束时间


const experiments = reactive({
  getWrites: () => `admin@${settings.hostname}:~$ su ${settings.username}
Password: 
${settings.username}@${settings.hostname}:/home/admin$ cd ~
${settings.username}@${settings.hostname}:~$ start-dfs.sh
Starting namenodes on [localhost]
Starting datanodes
Starting secondary namenodes [${settings.hostname}]
${settings.username}@${settings.hostname}:~$ hdfs dfs
Usage: hadoop fs [generic options]
	[-appendToFile [-n] <localsrc> ... <dst>]
	[-cat [-ignoreCrc] <src> ...]
	[-checksum [-v] <src> ...]
	[-chgrp [-R] GROUP PATH...]
	[-chmod [-R] <MODE[,MODE]... | OCTALMODE> PATH...]
	[-chown [-R] [OWNER][:[GROUP]] PATH...]
	[-concat <target path> <src path> <src path> ...]
	[-copyFromLocal [-f] [-p] [-l] [-d] [-t <thread count>] [-q <thread pool queue size>] <localsrc> ... <dst>]
	[-copyToLocal [-f] [-p] [-crc] [-ignoreCrc] [-t <thread count>] [-q <thread pool queue size>] <src> ... <localdst>]
	[-count [-q] [-h] [-v] [-t [<storage type>]] [-u] [-x] [-e] [-s] <path> ...]
	[-cp [-f] [-p | -p[topax]] [-d] [-t <thread count>] [-q <thread pool queue size>] <src> ... <dst>]
	[-createSnapshot <snapshotDir> [<snapshotName>]]
	[-deleteSnapshot <snapshotDir> <snapshotName>]
	[-df [-h] [<path> ...]]
	[-du [-s] [-h] [-v] [-x] <path> ...]
	[-expunge [-immediate] [-fs <path>]]
	[-find <path> ... <expression> ...]
	[-get [-f] [-p] [-crc] [-ignoreCrc] [-t <thread count>] [-q <thread pool queue size>] <src> ... <localdst>]
	[-getfacl [-R] <path>]
	[-getfattr [-R] {-n name | -d} [-e en] <path>]
	[-getmerge [-nl] [-skip-empty-file] <src> <localdst>]
	[-head <file>]
	[-help [cmd ...]]
	[-ls [-C] [-d] [-h] [-q] [-R] [-t] [-S] [-r] [-u] [-e] [<path> ...]]
	[-mkdir [-p] <path> ...]
	[-moveFromLocal [-f] [-p] [-l] [-d] <localsrc> ... <dst>]
	[-moveToLocal <src> <localdst>]
	[-mv <src> ... <dst>]
	[-put [-f] [-p] [-l] [-d] [-t <thread count>] [-q <thread pool queue size>] <localsrc> ... <dst>]
	[-renameSnapshot <snapshotDir> <oldName> <newName>]
	[-rm [-f] [-r|-R] [-skipTrash] [-safely] <src> ...]
	[-rmdir [--ignore-fail-on-non-empty] <dir> ...]
	[-setfacl [-R] [{-b|-k} {-m|-x <acl_spec>} <path>]|[--set <acl_spec> <path>]]
	[-setfattr {-n name [-v value] | -x name} <path>]
	[-setrep [-R] [-w] <rep> <path> ...]
	[-stat [format] <path> ...]
	[-tail [-f] [-s <sleep interval>] <file>]
	[-test -[defswrz] <path>]
	[-text [-ignoreCrc] <src> ...]
	[-touch [-a] [-m] [-t TIMESTAMP (yyyyMMdd:HHmmss) ] [-c] <path> ...]
	[-touchz <path> ...]
	[-truncate [-w] <length> <path> ...]
	[-usage [cmd ...]]

Generic options supported are:
-conf <configuration file>        specify an application configuration file
-D <property=value>               define a value for a given property
-fs <file:///|hdfs://namenode:port> specify default filesystem URL to use, overrides 'fs.defaultFS' property from configurations.
-jt <local|resourcemanager:port>  specify a ResourceManager
-files <file1,...>                specify a comma-separated list of files to be copied to the map reduce cluster
-libjars <jar1,...>               specify a comma-separated list of jar files to be included in the classpath
-archives <archive1,...>          specify a comma-separated list of archives to be unarchived on the compute machines

The general command line syntax is:
command [genericOptions] [commandOptions]

${settings.username}@${settings.hostname}:~$ hadoop fs -help put
-put [-f] [-p] [-l] [-d] [-t <thread count>] [-q <thread pool queue size>] <localsrc> ... <dst> :
  Copy files from the local file system into fs. Copying fails if the file already
  exists, unless the -f flag is given.
  Flags:
                                                                                 
  -p                           Preserves timestamps, ownership and the mode.     
  -f                           Overwrites the destination if it already exists.  
  -t <thread count>            Number of threads to be used, default is 1.       
  -q <thread pool queue size>  Thread pool queue size to be used, default is     
                               1024.                                             
  -l                           Allow DataNode to lazily persist the file to disk.
                               Forces replication factor of 1. This flag will    
                               result in reduced durability. Use with care.      
  -d                           Skip creation of temporary file(<dst>._COPYING_). 
${settings.username}@${settings.hostname}:~$ hdfs dfs -mkdir -p /user/${
    settings.username
  }
${settings.username}@${settings.hostname}:~$ hdfs dfs -ls /user/
Found 1 items
drwxr-xr-x   - ${
    settings.username
  } supergroup          0 2025-11-06 15:25 /user/${settings.username}
${settings.username}@${settings.hostname}:~$ hdfs dfs -mkdir input
${settings.username}@${settings.hostname}:~$ hdfs dfs -mkdir /input
mkdir: \`/input': File exists
${settings.username}@${settings.hostname}:~$ hdfs dfs -rm -r /input
Deleted /input
${settings.username}@${settings.hostname}:~$ cat <<EOF > myLocalFile.txt
Hadoop
Spark
XMU DBLAB
EOF
${settings.username}@${settings.hostname}:~$ cat myLocalFile.txt
Hadoop
Spark
XMU DBLAB
${settings.username}@${
    settings.hostname
  }:~$ hdfs dfs -put ./myLocalFile.txt input
${settings.username}@${settings.hostname}:~$ hdfs dfs -ls input
Found 1 items
-rw-r--r--   1 ${settings.username} supergroup         23 ${formatTime(
    new Date()
  )} input/myLocalFile.txt
${settings.username}@${settings.hostname}:~$ mkdir 下载
${settings.username}@${
    settings.hostname
  }:~$ hdfs dfs -get input/myLocalFile.txt /home/${settings.username}/下载
${settings.username}@${settings.hostname}:~$ hdfs dfs -mkdir -p /input
${settings.username}@${
    settings.hostname
  }:~$ hdfs dfs -cp input/myLocalFile.txt /input/myLocalFile.txt
${settings.username}@${
    settings.hostname
  }:~$ hdfs dfs -cat /input/myLocalFile.txt
Hadoop
Spark
XMU DBLAB
${settings.username}@${
    settings.hostname
  }:~$ wget -P ~/Downloads/ -O ~/Downloads/eclipse-committers-2025-12-M2-linux-gtk-x86_64.tar.gz https://mirrors.aliyun.com/eclipse/technology/epp/downloads/release/2025-12/M2/eclipse-committers-2025-12-M2-linux-gtk-x86_64.tar.gz
--${formatTime(
    startDownloadTime
  )}--  https://mirrors.aliyun.com/eclipse/technology/epp/downloads/release/2025-12/M2/eclipse-committers-2025-12-M2-linux-gtk-x86_64.tar.gz
正在解析主机 mirrors.aliyun.com (mirrors.aliyun.com)... 47.123.18.242, 47.123.18.241, 47.123.18.238, ...
正在连接 mirrors.aliyun.com (mirrors.aliyun.com)|47.123.18.242|:443... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度： 475918537 (454M) [application/octet-stream]
正在保存至: ‘/home/${
    settings.username
  }/Downloads/eclipse-committers-2025-12-M2-linux-gtk-x86_64.tar.gz’

eclipse-committers-2025-12-M2-linux-g 100%[=========================================================================>] 453.87M  ${speed}MB/s    用时 ${duration} s 

${formatTime(endDownloadTime)} (${speed} MB/s) - 已保存 ‘/home/${
    settings.username
  }/Downloads/eclipse-committers-2025-12-M2-linux-gtk-x86_64.tar.gz’ [475918537/475918537])

${settings.username}@${settings.hostname}:~$ ls ~/Downloads/
\x1b[38;2;184;24;38meclipse-committers-2025-12-M2-linux-gtk-x86_64.tar.gz\x1b[0m
${settings.username}@${
    settings.hostname
  }:~$ sudo tar -zxf ~/Downloads/eclipse-committers-2025-12-M2-linux-gtk-x86_64.tar.gz -C /usr/local
${settings.username}@${settings.hostname}:~$ cd /lib/hadoop/hadoop
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop$ ls ./myapp
myLocalFile.txt  \x1b[38;2;184;24;38mUntitled.jar\x1b[0m
${settings.username}@${
    settings.hostname
  }:/lib/hadoop/hadoop$ hadoop jar ./myapp/Untitled.jar
Create: test
${settings.username}@${settings.hostname}:~$ hdfs dfs -ls
Found 2 items
drwxr-xr-x   - ${settings.username} supergroup          0 ${formatTime(
    new Date()
  )} input
-rw-r--r--   1 ${settings.username} supergroup         11 ${formatTime(
    new Date(Date.now() + 10 * 60 * 1000)
  )} test
${settings.username}@${settings.hostname}:~$ hdfs dfs -cat test
Hello world
${settings.username}@${settings.hostname}:~$
`,
});

export default experiments;
