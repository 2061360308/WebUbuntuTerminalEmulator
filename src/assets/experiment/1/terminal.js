import { reactive } from "vue";
import settings from "@/assets/settings";

const ssh_fingerprint = `SHA256:${Math.random()
  .toString(36)
  .slice(2, 10)}${Math.random().toString(36).slice(2, 10)}${Math.random()
  .toString(36)
  .slice(2, 10)}${Math.random().toString(36).slice(2, 10)}`;

const key_fingerprint = `SHA256:${Array.from({ length: 43 }, () =>
  Math.random().toString(36).charAt(2)
).join("")}`;

const now = new Date();
now.setMinutes(now.getMinutes() - 5); // 当前时间减去 5 分钟
const formattedDate = `${now.getFullYear()}年 ${String(
  now.getMonth() + 1
).padStart(2, "0")}月 ${String(now.getDate()).padStart(2, "0")}日 星期${
  ["日", "一", "二", "三", "四", "五", "六"][now.getDay()]
} ${String(now.getHours()).padStart(2, "0")}:${String(
  now.getMinutes()
).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")} CST`;

const systemInfo = `
System information as of ${formattedDate}

  System load:    ${(Math.random() * 2).toFixed(
    2
  )}              Processes:             ${Math.floor(
  Math.random() * 300 + 200
)}
  Usage of /home: ${(Math.random() * 10).toFixed(
    1
  )}% of 39.07GB   Users logged in:       1
  Memory usage:   ${(Math.random() * 50).toFixed(
    0
  )}%               IPv4 address for eth1: 10.0.${Math.floor(
  Math.random() * 100
)}.${Math.floor(Math.random() * 256)}
  Swap usage:     ${(Math.random() * 10).toFixed(0)}%
`;

function generateRandomArtLine() {
  const chars = ["=", "*", "+", "o", ".", " "];
  return Array.from(
    { length: Math.floor(Math.random() * 11) + 1 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function padLine(line, totalWidth) {
  const padding = totalWidth - line.length;
  return line + " ".repeat(padding); // 在右侧填充空格
}

const totalWidth = 17; // 每行固定宽度
const randomArt = `
+---[RSA 3072]----+
|${padLine(generateRandomArtLine(), totalWidth)}|
|${padLine(generateRandomArtLine(), totalWidth)}|
|${padLine(generateRandomArtLine(), totalWidth)}|
|${padLine(generateRandomArtLine(), totalWidth)}|
| S ${padLine(generateRandomArtLine(), totalWidth - 3)}|
| . ${padLine(generateRandomArtLine(), totalWidth - 3)}|
|${padLine(generateRandomArtLine(), totalWidth)}|
|${padLine(generateRandomArtLine(), totalWidth)}|
|${padLine(generateRandomArtLine(), totalWidth)}|
+----[SHA256]-----+`;

const startDownloadTime = new Date(Date.now()); // 开始时间
const speed = (Math.random() * (2 - 1) + 1).toFixed(2); // 随机速度，范围 1.00 - 2.00 MB/s
const totalSize = 1016; // 总大小 1016M
const duration = (totalSize / speed).toFixed(0); // 用时（秒），总大小除以速度
const endDownloadTime = new Date(startDownloadTime.getTime() + duration * 1000); // 结束时间

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
  getWrites: () => `admin@${settings.hostname}:~$ sudo useradd -m ${settings.username} -s /bin/bash
admin@${settings.hostname}:~$ sudo passwd ${settings.username}
New password: 
Retype new password: 
passwd: password updated successfully
admin@${settings.hostname}:~$ sudo adduser ${settings.username} sudo
Adding user \`${settings.username}\' to group \`sudo\' ...
Adding user ${settings.username} to group sudo
Done.
admin@${settings.hostname}:~$ su ${settings.username}
Password: 
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

${settings.username}@${settings.hostname}:/home/admin$ cd ~
${settings.username}@${
    settings.hostname
  }:~$ sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list.d/ubuntu.sources
${settings.username}@${settings.hostname}:~$ sudo apt update
Get:1 https://mirrors.ustc.edu.cn/ubuntu jammy InRelease [270 kB]
Get:2 https://mirrors.ustc.edu.cn/ubuntu jammy-updates InRelease [128 kB]
Get:3 https://mirrors.ustc.edu.cn/ubuntu jammy-backports InRelease [127 kB]
Get:4 https://mirrors.ustc.edu.cn/ubuntu jammy-security InRelease [129 kB]
Get:5 https://mirrors.ustc.edu.cn/ubuntu jammy/multiverse Sources [304 kB]
Get:6 https://mirrors.ustc.edu.cn/ubuntu jammy/main Sources [1,340 kB]
Get:7 https://mirrors.ustc.edu.cn/ubuntu jammy/universe Sources [17.8 MB]
Get:8 https://mirrors.ustc.edu.cn/ubuntu jammy/restricted Sources [23.7 kB]
Get:9 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 Packages [1,395 kB]
Get:10 https://mirrors.ustc.edu.cn/ubuntu jammy/main Translation-zh_CN [114 kB]
Get:11 https://mirrors.ustc.edu.cn/ubuntu jammy/main Translation-en [510 kB]
Get:12 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 DEP-11 Metadata [423 kB]
Get:13 https://mirrors.ustc.edu.cn/ubuntu jammy/main DEP-11 48x48 Icons [100.0 kB]
Get:14 https://mirrors.ustc.edu.cn/ubuntu jammy/main DEP-11 64x64 Icons [148 kB]
Get:15 https://mirrors.ustc.edu.cn/ubuntu jammy/main DEP-11 64x64@2 Icons [15.8 kB]
Get:16 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 c-n-f Metadata [30.3 kB]
Get:17 https://mirrors.ustc.edu.cn/ubuntu jammy/restricted amd64 Packages [129 kB]
Get:18 https://mirrors.ustc.edu.cn/ubuntu jammy/restricted Translation-en [18.6 kB]
Get:19 https://mirrors.ustc.edu.cn/ubuntu jammy/restricted Translation-zh_CN [748 B]
Get:20 https://mirrors.ustc.edu.cn/ubuntu jammy/restricted amd64 c-n-f Metadata [488 B]
Get:21 https://mirrors.ustc.edu.cn/ubuntu jammy/universe amd64 Packages [14.1 MB]
Get:22 https://mirrors.ustc.edu.cn/ubuntu jammy/universe Translation-en [5,652 kB]
Get:23 https://mirrors.ustc.edu.cn/ubuntu jammy/universe Translation-zh_CN [454 kB]
Get:24 https://mirrors.ustc.edu.cn/ubuntu jammy/universe amd64 DEP-11 Metadata [3,559 kB]
Get:25 https://mirrors.ustc.edu.cn/ubuntu jammy/universe DEP-11 48x48 Icons [3,447 kB]
Get:26 https://mirrors.ustc.edu.cn/ubuntu jammy/universe DEP-11 64x64 Icons [7,609 kB]
Get:27 https://mirrors.ustc.edu.cn/ubuntu jammy/universe DEP-11 64x64@2 Icons [69.3 kB]
Get:28 https://mirrors.ustc.edu.cn/ubuntu jammy/universe amd64 c-n-f Metadata [286 kB]
Get:29 https://mirrors.ustc.edu.cn/ubuntu jammy/multiverse amd64 Packages [217 kB]
Get:30 https://mirrors.ustc.edu.cn/ubuntu jammy/multiverse Translation-zh_CN [4,440 B]
Get:31 https://mirrors.ustc.edu.cn/ubuntu jammy/multiverse Translation-en [112 kB]
Get:32 https://mirrors.ustc.edu.cn/ubuntu jammy/multiverse amd64 DEP-11 Metadata [42.1 kB]
Get:33 https://mirrors.ustc.edu.cn/ubuntu jammy/multiverse DEP-11 48x48 Icons [42.7 kB]
Get:34 https://mirrors.ustc.edu.cn/ubuntu jammy/multiverse DEP-11 64x64 Icons [193 kB]
Get:35 https://mirrors.ustc.edu.cn/ubuntu jammy/multiverse DEP-11 64x64@2 Icons [214 B]
Get:36 https://mirrors.ustc.edu.cn/ubuntu jammy/multiverse amd64 c-n-f Metadata [8,372 B]
Get:37 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe Sources [471 kB]
Get:38 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main Sources [571 kB]
Get:39 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/restricted Sources [87.3 kB]
Get:40 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/multiverse Sources [33.8 kB]
Get:41 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main amd64 Packages [3,073 kB]
Get:42 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main Translation-en [474 kB]
Get:43 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main amd64 DEP-11 Metadata [112 kB]
Get:44 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main DEP-11 48x48 Icons [37.0 kB]
Get:45 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main DEP-11 64x64 Icons [56.3 kB]
Get:46 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main DEP-11 64x64@2 Icons [29 B]
Get:47 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main amd64 c-n-f Metadata [19.0 kB]
Get:48 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/restricted amd64 Packages [4,844 kB]
Get:49 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/restricted Translation-en [900 kB]
Get:50 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/restricted amd64 DEP-11 Metadata [212 B]
Get:51 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/restricted DEP-11 48x48 Icons [29 B]
Get:52 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/restricted DEP-11 64x64 Icons [29 B]
Get:53 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/restricted DEP-11 64x64@2 Icons [29 B]
Get:54 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/restricted amd64 c-n-f Metadata [640 B]
Get:55 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe amd64 Packages [1,242 kB]
Get:56 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe Translation-en [308 kB]
Get:57 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe amd64 DEP-11 Metadata [359 kB]
Get:58 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe DEP-11 48x48 Icons [250 kB]
Get:59 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe DEP-11 64x64 Icons [402 kB]
Get:60 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe DEP-11 64x64@2 Icons [29 B]
Get:61 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe amd64 c-n-f Metadata [29.8 kB]
Get:62 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/multiverse amd64 Packages [57.6 kB]
Get:63 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/multiverse Translation-en [13.2 kB]
Get:64 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/multiverse amd64 DEP-11 Metadata [940 B]
Get:65 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/multiverse DEP-11 48x48 Icons [1,867 B]
Get:66 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/multiverse DEP-11 64x64 Icons [2,497 B]
Get:67 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/multiverse DEP-11 64x64@2 Icons [29 B]
Get:68 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/multiverse amd64 c-n-f Metadata [600 B]
Get:69 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/universe Sources [10.6 kB]
Get:70 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/main Sources [8,988 B]
Get:71 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/main amd64 Packages [69.4 kB]
Get:72 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/main Translation-en [11.5 kB]
Get:73 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/main amd64 DEP-11 Metadata [7,172 B]
Get:74 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/main DEP-11 48x48 Icons [9,530 B]
Get:75 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/main DEP-11 64x64 Icons [11.2 kB]
Get:76 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/main DEP-11 64x64@2 Icons [29 B]
Get:77 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/main amd64 c-n-f Metadata [412 B]
Get:78 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/restricted amd64 DEP-11 Metadata [212 B]
Get:79 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/restricted DEP-11 48x48 Icons [29 B]
Get:80 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/restricted DEP-11 64x64 Icons [29 B]
Get:81 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/restricted DEP-11 64x64@2 Icons [29 B]
Get:82 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/restricted amd64 c-n-f Metadata [116 B]
Get:83 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/universe amd64 Packages [30.1 kB]
Get:84 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/universe Translation-en [16.6 kB]
Get:85 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/universe amd64 DEP-11 Metadata [9,700 B]
Get:86 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/universe DEP-11 48x48 Icons [19.7 kB]
Get:87 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/universe DEP-11 64x64 Icons [28.2 kB]
Get:88 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/universe DEP-11 64x64@2 Icons [29 B]
Get:89 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/universe amd64 c-n-f Metadata [672 B]
Get:90 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/multiverse amd64 DEP-11 Metadata [212 B]
Get:91 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/multiverse DEP-11 48x48 Icons [29 B]
Get:92 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/multiverse DEP-11 64x64 Icons [29 B]
Get:93 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/multiverse DEP-11 64x64@2 Icons [29 B]
Get:94 https://mirrors.ustc.edu.cn/ubuntu jammy-backports/multiverse amd64 c-n-f Metadata [116 B]
Get:95 https://mirrors.ustc.edu.cn/ubuntu jammy-security/universe Sources [307 kB]
Get:96 https://mirrors.ustc.edu.cn/ubuntu jammy-security/multiverse Sources [22.5 kB]
Get:97 https://mirrors.ustc.edu.cn/ubuntu jammy-security/main Sources [325 kB]
Get:98 https://mirrors.ustc.edu.cn/ubuntu jammy-security/restricted Sources [81.9 kB]
Get:99 https://mirrors.ustc.edu.cn/ubuntu jammy-security/main amd64 Packages [2,808 kB]
Get:100 https://mirrors.ustc.edu.cn/ubuntu jammy-security/main Translation-en [407 kB]
Get:101 https://mirrors.ustc.edu.cn/ubuntu jammy-security/main amd64 DEP-11 Metadata [54.6 kB]
Get:102 https://mirrors.ustc.edu.cn/ubuntu jammy-security/main DEP-11 48x48 Icons [20.3 kB]
Get:103 https://mirrors.ustc.edu.cn/ubuntu jammy-security/main DEP-11 64x64 Icons [31.6 kB]
Get:104 https://mirrors.ustc.edu.cn/ubuntu jammy-security/main DEP-11 64x64@2 Icons [29 B]
Get:105 https://mirrors.ustc.edu.cn/ubuntu jammy-security/main amd64 c-n-f Metadata [13.9 kB]
Get:106 https://mirrors.ustc.edu.cn/ubuntu jammy-security/restricted amd64 Packages [4,690 kB]
Get:107 https://mirrors.ustc.edu.cn/ubuntu jammy-security/restricted Translation-en [874 kB]
Get:108 https://mirrors.ustc.edu.cn/ubuntu jammy-security/restricted amd64 DEP-11 Metadata [208 B]
Get:109 https://mirrors.ustc.edu.cn/ubuntu jammy-security/restricted DEP-11 48x48 Icons [29 B]
Get:110 https://mirrors.ustc.edu.cn/ubuntu jammy-security/restricted DEP-11 64x64 Icons [29 B]
Get:111 https://mirrors.ustc.edu.cn/ubuntu jammy-security/restricted DEP-11 64x64@2 Icons [29 B]
Get:112 https://mirrors.ustc.edu.cn/ubuntu jammy-security/restricted amd64 c-n-f Metadata [652 B]
Get:113 https://mirrors.ustc.edu.cn/ubuntu jammy-security/universe amd64 Packages [1,008 kB]
Get:114 https://mirrors.ustc.edu.cn/ubuntu jammy-security/universe Translation-en [220 kB]
Get:115 https://mirrors.ustc.edu.cn/ubuntu jammy-security/universe amd64 DEP-11 Metadata [125 kB]
Get:116 https://mirrors.ustc.edu.cn/ubuntu jammy-security/universe DEP-11 48x48 Icons [82.0 kB]
Get:117 https://mirrors.ustc.edu.cn/ubuntu jammy-security/universe DEP-11 64x64 Icons [122 kB]
Get:118 https://mirrors.ustc.edu.cn/ubuntu jammy-security/universe DEP-11 64x64@2 Icons [29 B]
Get:119 https://mirrors.ustc.edu.cn/ubuntu jammy-security/universe amd64 c-n-f Metadata [22.4 kB]
Get:120 https://mirrors.ustc.edu.cn/ubuntu jammy-security/multiverse amd64 Packages [50.5 kB]
Get:121 https://mirrors.ustc.edu.cn/ubuntu jammy-security/multiverse Translation-en [10.2 kB]
Get:122 https://mirrors.ustc.edu.cn/ubuntu jammy-security/multiverse amd64 DEP-11 Metadata [208 B]
Get:123 https://mirrors.ustc.edu.cn/ubuntu jammy-security/multiverse DEP-11 48x48 Icons [29 B]
Get:124 https://mirrors.ustc.edu.cn/ubuntu jammy-security/multiverse DEP-11 64x64 Icons [29 B]
Get:125 https://mirrors.ustc.edu.cn/ubuntu jammy-security/multiverse DEP-11 64x64@2 Icons [29 B]
Get:126 https://mirrors.ustc.edu.cn/ubuntu jammy-security/multiverse amd64 c-n-f Metadata [376 B]
Fetched 81.7 MB in 58s (1,400 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
266 packages can be upgraded. Run 'apt list --upgradable' to see them.
${settings.username}@${settings.hostname}:~$ sudo apt-get install vim
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
vim is already the newest version (2:8.2.3995-1ubuntu2.24).
0 upgraded, 0 newly installed, 0 to remove and 266 not upgraded.
${settings.username}@${settings.hostname}:~$ sudo apt-get install openssh-server
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following package was automatically installed and is no longer required:
  openjdk-17-jdk-headless
Use 'sudo apt autoremove' to remove it.
The following additional packages will be installed:
  openssh-client openssh-sftp-server
Suggested packages:
  keychain libpam-ssh monkeysphere ssh-askpass molly-guard
The following packages will be upgraded:
  openssh-client openssh-server openssh-sftp-server
3 upgraded, 0 newly installed, 0 to remove and 263 not upgraded.
Need to get 1,376 kB of archives.
After this operation, 4,096 B of additional disk space will be used.
Do you want to continue? [Y/n] y
Get:1 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main amd64 openssh-sftp-server amd64 1:8.9p1-3ubuntu0.13 [38.7 kB]
Get:2 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main amd64 openssh-server amd64 1:8.9p1-3ubuntu0.13 [435 kB]
Get:3 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main amd64 openssh-client amd64 1:8.9p1-3ubuntu0.13 [903 kB]
Fetched 1,376 kB in 2s (703 kB/s)       
Preconfiguring packages ...
(Reading database ... 179452 files and directories currently installed.)
Preparing to unpack .../openssh-sftp-server_1%3a8.9p1-3ubuntu0.13_amd64.deb ...
Unpacking openssh-sftp-server (1:8.9p1-3ubuntu0.13) over (1:8.9p1-3ubuntu0.10) ...
Preparing to unpack .../openssh-server_1%3a8.9p1-3ubuntu0.13_amd64.deb ...
Unpacking openssh-server (1:8.9p1-3ubuntu0.13) over (1:8.9p1-3ubuntu0.10) ...
Preparing to unpack .../openssh-client_1%3a8.9p1-3ubuntu0.13_amd64.deb ...
Unpacking openssh-client (1:8.9p1-3ubuntu0.13) over (1:8.9p1-3ubuntu0.10) ...
Setting up openssh-client (1:8.9p1-3ubuntu0.13) ...
Setting up openssh-sftp-server (1:8.9p1-3ubuntu0.13) ...
Setting up openssh-server (1:8.9p1-3ubuntu0.13) ...
rescue-ssh.target is a disabled or a static unit not running, not starting it.
ssh.socket is a disabled or a static unit not running, not starting it.
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for ufw (0.36.1-4ubuntu0.1) ...
Scanning processes...
Scanning candidates...
Scanning linux images...

Running kernel seems to be up-to-date.

Restarting services...
 /etc/needrestart/restart.d/systemd-manager
 systemctl restart accounts-daemon.service avahi-daemon.service colord.service cups.service kerneloops.service multipathd.service ntp.service packagekit.service polkit.service power-profiles-daemon.service rsyslog.service rtkit-daemon.service smbd.service systemd-journald.service systemd-networkd.service systemd-oomd.service systemd-resolved.service systemd-udevd.service udisks2.service uuidd.service
Service restarts being deferred:
 systemctl restart ModemManager.service
 /etc/needrestart/restart.d/dbus.service
 systemctl restart networkd-dispatcher.service
 systemctl restart systemd-logind.service
 systemctl restart user@1000.service
 systemctl restart wpa_supplicant.service

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
${settings.username}@${settings.hostname}:~$ ssh localhost
The authenticity of host 'localhost (127.0.0.1)' can't be established.
ED25519 key fingerprint is ${ssh_fingerprint}.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'localhost' (ED25519) to the list of known hosts.
hadoop_luao@localhost's password: 
Welcome to Ubuntu 22.04.5 LTS (GNU/Linux 5.15.0-125-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

${systemInfo}

 * Strictly confined Kubernetes makes edge and IoT secure. Learn how MicroK8s
   just raised the bar for easy, resilient and secure K8s cluster deployment.

   https://ubuntu.com/engage/secure-kubernetes-at-the-edge

Expanded Security Maintenance for Applications is not enabled.

254 updates can be applied immediately.
162 of these updates are standard security updates.
To see these additional updates run: apt list --upgradable

34 additional security updates can be applied with ESM Apps.
Learn more about enabling ESM Apps service at https://ubuntu.com/esm


173 updates could not be installed automatically. For more details,
see /var/log/unattended-upgrades/unattended-upgrades.log


The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.


Welcome to Alibaba Cloud Elastic Compute Service !

To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

${settings.username}@${settings.hostname}:~$ cd ~/.ssh/
${settings.username}@${settings.hostname}:~/.ssh$ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/hadoop_luao/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/hadoop_luao/.ssh/id_rsa
Your public key has been saved in /home/hadoop_luao/.ssh/id_rsa.pub
The key fingerprint is:
${key_fingerprint}
The key's randomart image is:
${randomArt}
${settings.username}@${
    settings.hostname
  }:~/.ssh$ cat ./id_rsa.pub >> ./authorized_keys
${settings.username}@${settings.hostname}:~/.ssh$ sudo apt install openjdk-8-jdk
正在读取软件包列表... 完成
正在分析软件包的依赖关系树... 完成
正在读取状态信息... 完成                 
将会同时安装下列软件：
  ca-certificates-java fonts-dejavu-extra java-common libatk-wrapper-java
  libatk-wrapper-java-jni libice-dev libsm-dev libxt-dev
  openjdk-8-jdk-headless openjdk-8-jre openjdk-8-jre-headless
建议安装：
  default-jre libice-doc libsm-doc libxt-doc openjdk-8-demo openjdk-8-source
  visualvm fonts-nanum fonts-ipafont-gothic fonts-ipafont-mincho
  fonts-wqy-microhei fonts-wqy-zenhei
下列【新】软件包将被安装：
  ca-certificates-java fonts-dejavu-extra java-common libatk-wrapper-java
  libatk-wrapper-java-jni libice-dev libsm-dev libxt-dev openjdk-8-jdk
  openjdk-8-jdk-headless openjdk-8-jre openjdk-8-jre-headless
升级了 0 个软件包，新安装了 12 个软件包，要卸载 0 个软件包，有 263 个软件包未被升级。
需要下载 46.4 MB 的归档。
解压缩后会消耗 158 MB 的额外空间。
您希望继续执行吗？ [Y/n] y
获取:1 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 java-common all 0.72build2 [6,782 B]
获取:2 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe amd64 openjdk-8-jre-headless amd64 8u462-ga~us1-0ubuntu2~22.04.2 [30.8 MB]
获取:3 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/main amd64 ca-certificates-java all 20190909ubuntu1.2 [12.1 kB]
获取:4 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 fonts-dejavu-extra all 2.37-2build1 [2,041 kB]
获取:5 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 libatk-wrapper-java all 0.38.0-5build1 [53.1 kB]
获取:6 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 libatk-wrapper-java-jni amd64 0.38.0-5build1 [49.0 kB]
获取:7 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 libice-dev amd64 2:1.0.10-1build2 [51.4 kB]
获取:8 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 libsm-dev amd64 2:1.2.3-1build2 [18.1 kB]
获取:9 https://mirrors.ustc.edu.cn/ubuntu jammy/main amd64 libxt-dev amd64 1:1.2.1-1 [396 kB]
获取:10 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe amd64 openjdk-8-jre amd64 8u462-ga~us1-0ubuntu2~22.04.2 [75.5 kB]
获取:11 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe amd64 openjdk-8-jdk-headless amd64 8u462-ga~us1-0ubuntu2~22.04.2 [8,849 kB]
获取:12 https://mirrors.ustc.edu.cn/ubuntu jammy-updates/universe amd64 openjdk-8-jdk amd64 8u462-ga~us1-0ubuntu2~22.04.2 [4,105 kB]
已下载 46.4 MB，耗时 32秒 (1,474 kB/s)                                         
正在选中未选择的软件包 java-common。
(正在读取数据库 ... 系统当前共安装有 178169 个文件和目录。)
准备解压 .../00-java-common_0.72build2_all.deb  ...
正在解压 java-common (0.72build2) ...
正在选中未选择的软件包 openjdk-8-jre-headless:amd64。
准备解压 .../01-openjdk-8-jre-headless_8u462-ga~us1-0ubuntu2~22.04.2_amd64.deb  
...
正在解压 openjdk-8-jre-headless:amd64 (8u462-ga~us1-0ubuntu2~22.04.2) ...
正在选中未选择的软件包 ca-certificates-java。
准备解压 .../02-ca-certificates-java_20190909ubuntu1.2_all.deb  ...
正在解压 ca-certificates-java (20190909ubuntu1.2) ...
正在选中未选择的软件包 fonts-dejavu-extra。
准备解压 .../03-fonts-dejavu-extra_2.37-2build1_all.deb  ...
正在解压 fonts-dejavu-extra (2.37-2build1) ...
正在选中未选择的软件包 libatk-wrapper-java。
准备解压 .../04-libatk-wrapper-java_0.38.0-5build1_all.deb  ...
正在解压 libatk-wrapper-java (0.38.0-5build1) ...
正在选中未选择的软件包 libatk-wrapper-java-jni:amd64。
准备解压 .../05-libatk-wrapper-java-jni_0.38.0-5build1_amd64.deb  ...
正在解压 libatk-wrapper-java-jni:amd64 (0.38.0-5build1) ...
正在选中未选择的软件包 libice-dev:amd64。
准备解压 .../06-libice-dev_2%3a1.0.10-1build2_amd64.deb  ...
正在解压 libice-dev:amd64 (2:1.0.10-1build2) ...
正在选中未选择的软件包 libsm-dev:amd64。
准备解压 .../07-libsm-dev_2%3a1.2.3-1build2_amd64.deb  ...
正在解压 libsm-dev:amd64 (2:1.2.3-1build2) ...
正在选中未选择的软件包 libxt-dev:amd64。
准备解压 .../08-libxt-dev_1%3a1.2.1-1_amd64.deb  ...
正在解压 libxt-dev:amd64 (1:1.2.1-1) ...
正在选中未选择的软件包 openjdk-8-jre:amd64。
准备解压 .../09-openjdk-8-jre_8u462-ga~us1-0ubuntu2~22.04.2_amd64.deb  ...
正在解压 openjdk-8-jre:amd64 (8u462-ga~us1-0ubuntu2~22.04.2) ...
正在选中未选择的软件包 openjdk-8-jdk-headless:amd64。
准备解压 .../10-openjdk-8-jdk-headless_8u462-ga~us1-0ubuntu2~22.04.2_amd64.deb  
...
正在解压 openjdk-8-jdk-headless:amd64 (8u462-ga~us1-0ubuntu2~22.04.2) ...
正在选中未选择的软件包 openjdk-8-jdk:amd64。
准备解压 .../11-openjdk-8-jdk_8u462-ga~us1-0ubuntu2~22.04.2_amd64.deb  ...
正在解压 openjdk-8-jdk:amd64 (8u462-ga~us1-0ubuntu2~22.04.2) ...
正在设置 java-common (0.72build2) ...
正在设置 libice-dev:amd64 (2:1.0.10-1build2) ...
正在设置 libsm-dev:amd64 (2:1.2.3-1build2) ...
正在设置 libxt-dev:amd64 (1:1.2.1-1) ...
正在设置 fonts-dejavu-extra (2.37-2build1) ...
正在设置 libatk-wrapper-java (0.38.0-5build1) ...
正在设置 libatk-wrapper-java-jni:amd64 (0.38.0-5build1) ...
正在设置 ca-certificates-java (20190909ubuntu1.2) ...
正在处理用于 mailcap (3.70+nmu1ubuntu1) 的触发器 ...
正在处理用于 fontconfig (2.13.1-4.2ubuntu5) 的触发器 ...
正在处理用于 desktop-file-utils (0.26-1ubuntu3) 的触发器 ...
正在处理用于 hicolor-icon-theme (0.17-2) 的触发器 ...
正在处理用于 gnome-menus (3.36.0-1ubuntu3) 的触发器 ...
正在处理用于 libc-bin (2.35-0ubuntu3.8) 的触发器 ...
正在处理用于 man-db (2.10.2-1) 的触发器 ...
正在处理用于 ca-certificates (20240203~22.04.1) 的触发器 ...
Updating certificates in /etc/ssl/certs...
0 added, 0 removed; done.
Running hooks in /etc/ca-certificates/update.d...

done.
done.
正在设置 openjdk-8-jre-headless:amd64 (8u462-ga~us1-0ubuntu2~22.04.2) ...
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java 来在自
动模式中提供 /usr/bin/java (java)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/jjs 来在自动
模式中提供 /usr/bin/jjs (jjs)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/keytool 来在
自动模式中提供 /usr/bin/keytool (keytool)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/pack200 来在
自动模式中提供 /usr/bin/pack200 (pack200)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/rmid 来在自
动模式中提供 /usr/bin/rmid (rmid)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/rmiregistry 
来在自动模式中提供 /usr/bin/rmiregistry (rmiregistry)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/unpack200 来
在自动模式中提供 /usr/bin/unpack200 (unpack200)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/orbd 来在自
动模式中提供 /usr/bin/orbd (orbd)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/servertool 
来在自动模式中提供 /usr/bin/servertool (servertool)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/tnameserv 来
在自动模式中提供 /usr/bin/tnameserv (tnameserv)
正在设置 openjdk-8-jre:amd64 (8u462-ga~us1-0ubuntu2~22.04.2) ...
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/policytool 
来在自动模式中提供 /usr/bin/policytool (policytool)
正在设置 openjdk-8-jdk-headless:amd64 (8u462-ga~us1-0ubuntu2~22.04.2) ...
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/clhsdb 来在自动
模式中提供 /usr/bin/clhsdb (clhsdb)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/extcheck 来在自
动模式中提供 /usr/bin/extcheck (extcheck)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/hsdb 来在自动模
式中提供 /usr/bin/hsdb (hsdb)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/idlj 来在自动模
式中提供 /usr/bin/idlj (idlj)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jar 来在自动模式
中提供 /usr/bin/jar (jar)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jarsigner 来在自
动模式中提供 /usr/bin/jarsigner (jarsigner)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/javac 来在自动模
式中提供 /usr/bin/javac (javac)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/javadoc 来在自动
模式中提供 /usr/bin/javadoc (javadoc)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/javah 来在自动模
式中提供 /usr/bin/javah (javah)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/javap 来在自动模
式中提供 /usr/bin/javap (javap)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jcmd 来在自动模
式中提供 /usr/bin/jcmd (jcmd)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jdb 来在自动模式
中提供 /usr/bin/jdb (jdb)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jdeps 来在自动模
式中提供 /usr/bin/jdeps (jdeps)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jfr 来在自动模式
中提供 /usr/bin/jfr (jfr)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jhat 来在自动模
式中提供 /usr/bin/jhat (jhat)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jinfo 来在自动模
式中提供 /usr/bin/jinfo (jinfo)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jmap 来在自动模
式中提供 /usr/bin/jmap (jmap)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jps 来在自动模式
中提供 /usr/bin/jps (jps)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jrunscript 来在
自动模式中提供 /usr/bin/jrunscript (jrunscript)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jsadebugd 来在自
动模式中提供 /usr/bin/jsadebugd (jsadebugd)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jstack 来在自动
模式中提供 /usr/bin/jstack (jstack)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jstat 来在自动模
式中提供 /usr/bin/jstat (jstat)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jstatd 来在自动
模式中提供 /usr/bin/jstatd (jstatd)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/native2ascii 来
在自动模式中提供 /usr/bin/native2ascii (native2ascii)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/rmic 来在自动模
式中提供 /usr/bin/rmic (rmic)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/schemagen 来在自
动模式中提供 /usr/bin/schemagen (schemagen)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/serialver 来在自
动模式中提供 /usr/bin/serialver (serialver)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/wsgen 来在自动模
式中提供 /usr/bin/wsgen (wsgen)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/wsimport 来在自
动模式中提供 /usr/bin/wsimport (wsimport)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/xjc 来在自动模式
中提供 /usr/bin/xjc (xjc)
正在设置 openjdk-8-jdk:amd64 (8u462-ga~us1-0ubuntu2~22.04.2) ...
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/appletviewer 来
在自动模式中提供 /usr/bin/appletviewer (appletviewer)
update-alternatives: 使用 /usr/lib/jvm/java-8-openjdk-amd64/bin/jconsole 来在自
动模式中提供 /usr/bin/jconsole (jconsole)
正在处理用于 libc-bin (2.35-0ubuntu3.8) 的触发器 ...
Scanning processes...                                                           
Scanning candidates...                                                          
Scanning linux images...                                                        

Running kernel seems to be up-to-date.

Restarting services...
Service restarts being deferred:
 /etc/needrestart/restart.d/dbus.service
 systemctl restart networkd-dispatcher.service
 systemctl restart systemd-logind.service
 systemctl restart user@1000.service
 systemctl restart wpa_supplicant.service

No containers need to be restarted.

No user sessions are running outdated binaries.

No VM guests are running outdated hypervisor (qemu) binaries on this host.
${settings.username}@${settings.hostname}:~/.ssh$ cd ~
${settings.username}@${
    settings.hostname
  }:~$ echo 'export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$PATH:$JAVA_HOME/bin' >> ~/.bashrc
source ~/.bashrc
${settings.username}@${
    settings.hostname
  }:~$ wget https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.4.2/hadoop-3.4.2.tar.gz
--${formatTime(
    startDownloadTime
  )}--  https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.4.2/hadoop-3.4.2.tar.gz
正在解析主机 mirrors.tuna.tsinghua.edu.cn (mirrors.tuna.tsinghua.edu.cn)... 101.6.15.130, 2402:f000:1:400::2
正在连接 mirrors.tuna.tsinghua.edu.cn (mirrors.tuna.tsinghua.edu.cn)|101.6.15.130|:443... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度： 1065831750 (1016M) [application/octet-stream]
正在保存至: ‘hadoop-3.4.2.tar.gz’

hadoop-3.4.2.tar.gz 100%[===================>]   1016M  ${speed}MB/s    ${Math.floor(
    duration / 60
  )}m ${duration % 60}s

${formatTime(
  endDownloadTime
)} (${speed} MB/s) - 已保存 ‘hadoop-3.4.2.tar.gz’ [1065831750/1065831750])

${settings.username}@${
    settings.hostname
  }:~$ tar -zxvf hadoop-3.4.2.tar.gz > hadoop_unzip.log 2>&1
${settings.username}@${settings.hostname}:~$ sudo mkdir /usr/lib/hadoop
[sudo] hadoop_luao 的密码： 
${settings.username}@${settings.hostname}:~$ cd /usr/lib/hadoop
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop$ sudo mv ~/hadoop-3.4.2/ ./hadoop
${settings.username}@${settings.hostname}:/usr/lib/hadoop/hadoop$ ls
\x1b[38;2;17;74;140mbin\x1b[0m  \x1b[38;2;17;74;140minclude\x1b[0m  \x1b[38;2;17;74;140mlibexec\x1b[0m         \x1b[38;2;17;74;140mlicenses-binary\x1b[0m  NOTICE-binary  README.txt  \x1b[38;2;17;74;140mshare\x1b[0m
\x1b[38;2;17;74;140metc\x1b[0m  \x1b[38;2;17;74;140mlib\x1b[0m      LICENSE-binary  LICENSE.txt      NOTICE.txt     \x1b[38;2;17;74;140msbin\x1b[0m
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ ./bin/hadoop version
Hadoop 3.4.2
Source code repository https://github.com/apache/hadoop.git -r 84e8b89ee2ebe6923691205b9e171badde7a495c
Compiled by ahmarsu on 2025-08-20T10:30Z
Compiled on platform linux-x86_64
Compiled with protoc 3.23.4
From source with checksum fa94c67d4b4be021b9e9515c9b0f7b6
This command was run using /usr/lib/hadoop/hadoop/share/hadoop/common/hadoop-common-3.4.2.jar
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ sudo -E ./bin/hadoop namenode -format
${formatTime(new Date())},138 INFO namenode.NameNode: STARTUP_MSG: 
/************************************************************
STARTUP_MSG: Starting NameNode
STARTUP_MSG:   host = ${settings.hostname}.LOCAL/127.0.0.1
STARTUP_MSG:   args = [-format]
STARTUP_MSG:   version = 3.4.2
STARTUP_MSG:   classpath = /usr/lib/hadoop/hadoop/etc/hadoop:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jackson-annotations-2.12.7.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-redis-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jsp-api-2.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-haproxy-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/nimbus-jose-jwt-9.37.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jettison-1.5.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-stomp-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-native-kqueue-4.1.118.Final-osx-aarch_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jersey-servlet-1.19.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/kerb-core-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/httpcore-4.4.13.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jetty-servlet-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/hadoop-auth-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jsr311-api-1.1.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-net-3.9.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jsr305-3.0.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-memcache-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-classes-epoll-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-handler-proxy-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-compress-1.26.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-classes-kqueue-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jetty-http-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-mqtt-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/zookeeper-jute-3.8.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/checker-qual-2.5.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jaxb-impl-2.2.3-1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-logging-1.3.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/reload4j-1.2.22.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/avro-1.11.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-resolver-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-handler-ssl-ocsp-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/hadoop-annotations-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/stax2-api-4.2.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-smtp-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-cli-1.9.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-native-epoll-4.1.118.Final-linux-riscv64.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/curator-recipes-5.2.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/kerby-util-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jetty-server-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jcip-annotations-1.0-1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-resolver-dns-native-macos-4.1.118.Final-osx-x86_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/snappy-java-1.1.10.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/gson-2.9.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/animal-sniffer-annotations-1.17.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jul-to-slf4j-1.7.36.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-buffer-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jersey-json-1.22.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-http-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-native-epoll-4.1.118.Final-linux-aarch_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/hadoop-shaded-protobuf_3_25-1.4.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/curator-client-5.2.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/kerb-util-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/metrics-core-3.2.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/kerby-config-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-resolver-dns-native-macos-4.1.118.Final-osx-aarch_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jetty-xml-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jackson-core-2.12.7.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-daemon-1.0.13.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jetty-util-ajax-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/audience-annotations-0.12.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/bcprov-jdk18on-1.78.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-common-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-lang3-3.17.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-resolver-dns-classes-macos-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-dns-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/httpclient-4.5.13.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-native-epoll-4.1.118.Final-linux-x86_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/hadoop-shaded-guava-1.4.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-udt-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-resolver-dns-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-native-kqueue-4.1.118.Final-osx-x86_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/zookeeper-3.8.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jetty-webapp-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-http2-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jetty-security-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/dnsjava-3.6.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jersey-server-1.19.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-codec-1.15.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/guava-27.0-jre.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-sctp-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-native-unix-common-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-handler-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jackson-databind-2.12.7.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-rxtx-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-io-2.16.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-math3-3.6.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/kerb-crypto-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/re2j-1.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jakarta.activation-api-1.2.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-transport-native-epoll-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jaxb-api-2.2.11.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/javax.servlet-api-3.1.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jetty-io-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/slf4j-api-1.7.36.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/kerby-asn1-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-socks-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/slf4j-reload4j-1.7.36.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-all-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/kerby-pkix-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jetty-util-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jsch-0.1.55.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/curator-framework-5.2.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-text-1.10.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/jersey-core-1.19.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/failureaccess-1.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/j2objc-annotations-1.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/woodstox-core-5.4.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/netty-codec-xml-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-configuration2-2.10.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/commons-collections4-4.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/hadoop-common-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/hadoop-nfs-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/hadoop-kms-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/hadoop-registry-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/common/hadoop-common-3.4.2-tests.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jackson-annotations-2.12.7.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-redis-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-haproxy-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/nimbus-jose-jwt-9.37.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jettison-1.5.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/listenablefuture-9999.0-empty-to-avoid-conflict-with-guava.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-stomp-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-native-kqueue-4.1.118.Final-osx-aarch_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jersey-servlet-1.19.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/kerb-core-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/httpcore-4.4.13.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jetty-servlet-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/hadoop-auth-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jsr311-api-1.1.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-net-3.9.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jsr305-3.0.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-memcache-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-classes-epoll-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-handler-proxy-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-compress-1.26.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-classes-kqueue-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jetty-http-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-mqtt-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/zookeeper-jute-3.8.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/checker-qual-2.5.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jaxb-impl-2.2.3-1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-logging-1.3.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/reload4j-1.2.22.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/avro-1.11.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-resolver-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-handler-ssl-ocsp-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/hadoop-annotations-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/stax2-api-4.2.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-smtp-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-cli-1.9.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-native-epoll-4.1.118.Final-linux-riscv64.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/curator-recipes-5.2.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/leveldbjni-all-1.8.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/kerby-util-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jetty-server-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jcip-annotations-1.0-1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-resolver-dns-native-macos-4.1.118.Final-osx-x86_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/snappy-java-1.1.10.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/gson-2.9.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/animal-sniffer-annotations-1.17.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-buffer-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jersey-json-1.22.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-http-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-native-epoll-4.1.118.Final-linux-aarch_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/hadoop-shaded-protobuf_3_25-1.4.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/curator-client-5.2.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/kerb-util-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/metrics-core-3.2.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/kerby-config-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-resolver-dns-native-macos-4.1.118.Final-osx-aarch_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jetty-xml-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jackson-core-2.12.7.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-daemon-1.0.13.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jetty-util-ajax-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/audience-annotations-0.12.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-common-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-lang3-3.17.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-resolver-dns-classes-macos-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-dns-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/httpclient-4.5.13.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-native-epoll-4.1.118.Final-linux-x86_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/hadoop-shaded-guava-1.4.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-udt-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-resolver-dns-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-native-kqueue-4.1.118.Final-osx-x86_64.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/zookeeper-3.8.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jetty-webapp-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-http2-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jetty-security-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/dnsjava-3.6.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/json-simple-1.1.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jersey-server-1.19.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-codec-1.15.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/guava-27.0-jre.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-sctp-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-native-unix-common-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-handler-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jackson-databind-2.12.7.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-rxtx-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-io-2.16.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-math3-3.6.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/kerb-crypto-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/re2j-1.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jakarta.activation-api-1.2.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-transport-native-epoll-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jaxb-api-2.2.11.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/javax.servlet-api-3.1.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jetty-io-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/HikariCP-4.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/kerby-asn1-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-socks-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-all-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/kerby-pkix-2.0.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jetty-util-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jsch-0.1.55.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/curator-framework-5.2.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-text-1.10.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/jersey-core-1.19.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/failureaccess-1.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/j2objc-annotations-1.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/woodstox-core-5.4.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/netty-codec-xml-4.1.118.Final.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-configuration2-2.10.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/lib/commons-collections4-4.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-3.4.2-tests.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-rbf-3.4.2-tests.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-native-client-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-client-3.4.2-tests.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-client-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-httpfs-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-rbf-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-nfs-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/hdfs/hadoop-hdfs-native-client-3.4.2-tests.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-core-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-hs-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-hs-plugins-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-shuffle-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-common-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-uploader-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-app-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-jobclient-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-jobclient-3.4.2-tests.jar:/usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-client-nativetask-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/javax-websocket-server-impl-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/javax-websocket-client-impl-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/asm-commons-9.7.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jackson-jaxrs-json-provider-2.12.7.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/stax-ex-1.8.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/javax.websocket-api-1.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/javax.activation-api-1.2.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jersey-client-1.19.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jna-5.2.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/asm-tree-9.7.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jackson-jaxrs-base-2.12.7.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/mssql-jdbc-6.2.1.jre7.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jackson-module-jaxb-annotations-2.12.7.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jaxb-runtime-2.3.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jakarta.xml.bind-api-2.3.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/swagger-annotations-1.5.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jetty-annotations-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/fst-2.50.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/codemodel-2.6.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jersey-guice-1.19.4.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/objenesis-2.6.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jsonschema2pojo-core-1.0.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jetty-plus-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/javax.websocket-client-api-1.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jetty-jndi-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/javax.inject-1.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/FastInfoset-1.2.15.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/istack-commons-runtime-3.0.7.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/websocket-common-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/bcpkix-jdk18on-1.78.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jetty-client-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/ehcache-3.8.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/commons-lang-2.6.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/snakeyaml-2.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/jline-3.9.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/guice-servlet-4.2.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/cache-api-1.1.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/guice-4.2.3.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/websocket-server-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/aopalliance-1.0.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/websocket-api-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/txw2-2.3.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/websocket-servlet-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/bcutil-jdk18on-1.78.1.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/lib/websocket-client-9.4.57.v20241219.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-nodemanager-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-tests-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-applications-mawo-core-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-sharedcachemanager-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-registry-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-web-proxy-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-common-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-services-api-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-client-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-applicationhistoryservice-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-applications-distributedshell-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-api-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-services-core-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-applications-unmanaged-am-launcher-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-resourcemanager-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-timeline-pluginstorage-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-common-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-router-3.4.2.jar:/usr/lib/hadoop/hadoop/share/hadoop/yarn/hadoop-yarn-server-globalpolicygenerator-3.4.2.jar
STARTUP_MSG:   build = https://github.com/apache/hadoop.git -r 84e8b89ee2ebe6923691205b9e171badde7a495c; compiled by 'ahmarsu' on 2025-08-20T10:30Z
STARTUP_MSG:   java = 1.8.0_462
************************************************************/
${formatTime(
  new Date()
)},153 INFO namenode.NameNode: registered UNIX signal handlers for [TERM, HUP, INT]
${formatTime(new Date())},245 INFO namenode.NameNode: createNameNode [-format]
${formatTime(
  new Date()
)},614 INFO namenode.NameNode: Formatting using clusterid: CID-d942178a-2623-4ee0-b01f-d11cc798c9ce
${formatTime(
  new Date()
)},656 INFO namenode.FSEditLog: Edit logging is async:true
${formatTime(new Date())},688 INFO namenode.FSNamesystem: KeyProvider: null
${formatTime(new Date())},690 INFO namenode.FSNamesystem: fsLock is fair: true
${formatTime(
  new Date()
)},691 INFO namenode.FSNamesystem: Detailed lock hold time metrics enabled: false
${formatTime(
  new Date()
)},696 INFO namenode.FSNamesystem: fsOwner                = hadoop_luao (auth:SIMPLE)
${formatTime(
  new Date()
)},697 INFO namenode.FSNamesystem: supergroup             = supergroup
${formatTime(
  new Date()
)},697 INFO namenode.FSNamesystem: isPermissionEnabled    = true
${formatTime(
  new Date()
)},697 INFO namenode.FSNamesystem: isStoragePolicyEnabled = true
${formatTime(new Date())},697 INFO namenode.FSNamesystem: HA Enabled: false
${formatTime(
  new Date()
)},761 INFO common.Util: dfs.datanode.fileio.profiling.sampling.percentage set to 0. Disabling file IO profiling
${formatTime(
  new Date()
)},885 INFO blockmanagement.DatanodeManager: Slow peers collection thread shutdown
${formatTime(
  new Date()
)},897 INFO blockmanagement.DatanodeManager: dfs.block.invalidate.limit : configured=1000, counted=60, effected=1000
${formatTime(
  new Date()
)},897 INFO blockmanagement.DatanodeManager: dfs.namenode.datanode.registration.ip-hostname-check=true
${formatTime(
  new Date()
)},901 INFO blockmanagement.BlockManager: dfs.namenode.startup.delay.block.deletion.sec is set to 000:00:00:00.000
${formatTime(
  new Date()
)},901 INFO blockmanagement.BlockManager: The block deletion will start around 2025 Nov 06 15:07:17
${formatTime(
  new Date()
)},903 INFO util.GSet: Computing capacity for map BlocksMap
${formatTime(new Date())},903 INFO util.GSet: VM type       = 64-bit
${formatTime(new Date())},904 INFO util.GSet: 2.0% max memory 1.6 GB = 32.3 MB
${formatTime(
  new Date()
)},904 INFO util.GSet: capacity      = 2^22 = 4194304 entries
${formatTime(
  new Date()
)},914 INFO blockmanagement.BlockManager: Storage policy satisfier is disabled
${formatTime(
  new Date()
)},914 INFO blockmanagement.BlockManager: dfs.block.access.token.enable = false
${formatTime(
  new Date()
)},922 INFO blockmanagement.BlockManagerSafeMode: Using 1000 as SafeModeMonitor Interval
${formatTime(
  new Date()
)},922 INFO blockmanagement.BlockManagerSafeMode: dfs.namenode.safemode.threshold-pct = 0.999
${formatTime(
  new Date()
)},922 INFO blockmanagement.BlockManagerSafeMode: dfs.namenode.safemode.min.datanodes = 0
${formatTime(
  new Date()
)},922 INFO blockmanagement.BlockManagerSafeMode: dfs.namenode.safemode.extension = 30000
${formatTime(
  new Date()
)},923 INFO blockmanagement.BlockManager: defaultReplication         = 1
${formatTime(
  new Date()
)},923 INFO blockmanagement.BlockManager: maxReplication             = 512
${formatTime(
  new Date()
)},923 INFO blockmanagement.BlockManager: minReplication             = 1
${formatTime(
  new Date()
)},923 INFO blockmanagement.BlockManager: maxReplicationStreams      = 2
${formatTime(
  new Date()
)},923 INFO blockmanagement.BlockManager: redundancyRecheckInterval  = 3000ms
${formatTime(
  new Date()
)},923 INFO blockmanagement.BlockManager: encryptDataTransfer        = false
${formatTime(
  new Date()
)},923 INFO blockmanagement.BlockManager: maxNumBlocksToLog          = 1000
${formatTime(
  new Date()
)},001 INFO namenode.FSDirectory: GLOBAL serial map: bits=29 maxEntries=536870911
${formatTime(
  new Date()
)},001 INFO namenode.FSDirectory: USER serial map: bits=24 maxEntries=16777215
${formatTime(
  new Date()
)},001 INFO namenode.FSDirectory: GROUP serial map: bits=24 maxEntries=16777215
${formatTime(
  new Date()
)},001 INFO namenode.FSDirectory: XATTR serial map: bits=24 maxEntries=16777215
${formatTime(
  new Date()
)},014 INFO util.GSet: Computing capacity for map INodeMap
${formatTime(new Date())},014 INFO util.GSet: VM type       = 64-bit
${formatTime(new Date())},014 INFO util.GSet: 1.0% max memory 1.6 GB = 16.2 MB
${formatTime(
  new Date()
)},014 INFO util.GSet: capacity      = 2^21 = 2097152 entries
${formatTime(new Date())},015 INFO namenode.FSDirectory: ACLs enabled? true
${formatTime(
  new Date()
)},015 INFO namenode.FSDirectory: POSIX ACL inheritance enabled? true
${formatTime(new Date())},015 INFO namenode.FSDirectory: XAttrs enabled? true
${formatTime(
  new Date()
)},016 INFO namenode.NameNode: Caching file names occurring more than 10 times
${formatTime(
  new Date()
)},021 INFO snapshot.SnapshotManager: Loaded config captureOpenFiles: false, skipCaptureAccessTimeOnlyChange: false, snapshotDiffAllowSnapRootDescendant: true, maxSnapshotFSLimit: 65536, maxSnapshotLimit: 65536
${formatTime(
  new Date()
)},021 INFO snapshot.SnapshotManager: dfs.namenode.snapshot.deletion.ordered = false
${formatTime(
  new Date()
)},023 INFO snapshot.SnapshotManager: SkipList is disabled
${formatTime(
  new Date()
)},027 INFO util.GSet: Computing capacity for map cachedBlocks
${formatTime(new Date())},027 INFO util.GSet: VM type       = 64-bit
${formatTime(new Date())},027 INFO util.GSet: 0.25% max memory 1.6 GB = 4.0 MB
${formatTime(
  new Date()
)},027 INFO util.GSet: capacity      = 2^19 = 524288 entries
${formatTime(
  new Date()
)},036 INFO metrics.TopMetrics: NNTop conf: dfs.namenode.top.window.num.buckets = 10
${formatTime(
  new Date()
)},036 INFO metrics.TopMetrics: NNTop conf: dfs.namenode.top.num.users = 10
${formatTime(
  new Date()
)},036 INFO metrics.TopMetrics: NNTop conf: dfs.namenode.top.windows.minutes = 1,5,25
${formatTime(
  new Date()
)},041 INFO namenode.FSNamesystem: Retry cache on namenode is enabled
${formatTime(
  new Date()
)},041 INFO namenode.FSNamesystem: Retry cache will use 0.03 of total heap and retry cache entry expiry time is 600000 millis
${formatTime(
  new Date()
)},042 INFO util.GSet: Computing capacity for map NameNodeRetryCache
${formatTime(new Date())},042 INFO util.GSet: VM type       = 64-bit
${formatTime(
  new Date()
)},043 INFO util.GSet: 0.029999999329447746% max memory 1.6 GB = 496.4 KB
${formatTime(
  new Date()
)},043 INFO util.GSet: capacity      = 2^16 = 65536 entries
${formatTime(
  new Date()
)},065 INFO namenode.FSImage: Allocated new BlockPoolId: BP-1934333466-127.0.0.1-1762412838058
${formatTime(
  new Date()
)},091 INFO common.Storage: Storage directory /usr/lib/hadoop/hadoop/tmp/dfs/name has been successfully formatted.
${formatTime(
  new Date()
)},195 INFO namenode.FSImageFormatProtobuf: Saving image file /usr/lib/hadoop/hadoop/tmp/dfs/name/current/fsimage.ckpt_0000000000000000000 using no compression
${formatTime(
  new Date()
)},297 INFO namenode.FSImageFormatProtobuf: Image file /usr/lib/hadoop/hadoop/tmp/dfs/name/current/fsimage.ckpt_0000000000000000000 of size 406 bytes saved in 0 seconds .
${formatTime(
  new Date()
)},309 INFO namenode.NNStorageRetentionManager: Going to retain 1 images with txid >= 0
${formatTime(
  new Date()
)},314 INFO blockmanagement.DatanodeManager: Slow peers collection thread shutdown
${formatTime(
  new Date()
)},335 INFO namenode.FSNamesystem: Stopping services started for active state
${formatTime(
  new Date()
)},335 INFO namenode.FSNamesystem: Stopping services started for standby state
${formatTime(
  new Date()
)},339 INFO namenode.FSImage: FSImageSaver clean checkpoint: txid=0 when meet shutdown.
${formatTime(new Date())},339 INFO namenode.NameNode: SHUTDOWN_MSG: 
/************************************************************
SHUTDOWN_MSG: Shutting down NameNode at ${settings.hostname}.LOCAL/127.0.0.1
************************************************************/
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ ./sbin/start-dfs.sh
Starting namenodes on [localhost]
Starting datanodes
Starting secondary namenodes [${settings.hostname}]
${settings.username}@${settings.hostname}:/usr/lib/hadoop/hadoop$ jps
${Math.floor(10000 + Math.random() * 90000)} Jps
${Math.floor(1000 + Math.random() * 9000)} NameNode
${Math.floor(1000 + Math.random() * 9000)} DataNode
${Math.floor(10000 + Math.random() * 90000)} SecondaryNameNode
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ ./bin/hdfs dfs -mkdir /input
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ ./bin/hdfs dfs -put ./etc/hadoop/*.xml /input
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ ./bin/hdfs dfs -ls /input
Found 10 items
-rw-r--r--   1 ${settings.username} supergroup       9213 ${formatTime(
    new Date()
  )} /input/capacity-scheduler.xml
-rw-r--r--   1 ${settings.username} supergroup       1089 ${formatTime(
    new Date()
  )} /input/core-site.xml
-rw-r--r--   1 ${settings.username} supergroup      14007 ${formatTime(
    new Date()
  )} /input/hadoop-policy.xml
-rw-r--r--   1 ${settings.username} supergroup        683 ${formatTime(
    new Date()
  )} /input/hdfs-rbf-site.xml
-rw-r--r--   1 ${settings.username} supergroup       1153 ${formatTime(
    new Date()
  )} /input/hdfs-site.xml
-rw-r--r--   1 ${settings.username} supergroup        620 ${formatTime(
    new Date()
  )} /input/httpfs-site.xml
-rw-r--r--   1 ${settings.username} supergroup       3518 ${formatTime(
    new Date()
  )} /input/kms-acls.xml
-rw-r--r--   1 ${settings.username} supergroup        682 ${formatTime(
    new Date()
  )} /input/kms-site.xml
-rw-r--r--   1 ${settings.username} supergroup        758 ${formatTime(
    new Date()
  )} /input/mapred-site.xml
-rw-r--r--   1 ${settings.username} supergroup        690 ${formatTime(
    new Date()
  )} /input/yarn-site.xml
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ ./bin/hadoop jar ./share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.2.jar grep /input /output 'dfs[a-z.]+'
${formatTime(
  new Date()
)},144 INFO input.FileInputFormat: Total input files to process : 10
${formatTime(new Date())},168 INFO mapreduce.JobSubmitter: number of splits:10
${formatTime(
  new Date()
)},302 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_local863064059_0001
${formatTime(
  new Date()
)},304 INFO mapreduce.JobSubmitter: Executing with tokens: []
${formatTime(
  new Date()
)},465 INFO mapreduce.Job: The url to track the job: http://localhost:8080/
${formatTime(
  new Date()
)},466 INFO mapreduce.Job: Running job: job_local863064059_0001
${formatTime(
  new Date()
)},466 INFO mapred.LocalJobRunner: OutputCommitter set in config null
${formatTime(
  new Date()
)},476 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},477 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},477 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},478 INFO mapred.LocalJobRunner: OutputCommitter is org.apache.hadoop.mapreduce.lib.output.FileOutputCommitter
${formatTime(new Date())},552 INFO mapred.LocalJobRunner: Waiting for map tasks
${formatTime(
  new Date()
)},552 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000000_0
${formatTime(
  new Date()
)},578 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},578 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},578 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},598 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},602 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/hadoop-policy.xml:0+14007
${formatTime(
  new Date()
)},635 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},635 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},635 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},635 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},635 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},640 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},825 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},827 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},827 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},827 INFO mapred.MapTask: bufstart = 0; bufend = 17; bufvoid = 104857600
${formatTime(
  new Date()
)},827 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26214396(104857584); length = 1/6553600
${formatTime(new Date())},840 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},850 INFO mapred.Task: Task:attempt_local863064059_0001_m_000000_0 is done. And is in the process of committing
${formatTime(new Date())},854 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},854 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000000_0' done.
${formatTime(
  new Date()
)},867 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000000_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=283310
		FILE: Number of bytes written=1008960
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=14007
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=5
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=325
		Map output records=1
		Map output bytes=17
		Map output materialized bytes=25
		Input split bytes=110
		Combine input records=1
		Combine output records=1
		Spilled Records=1
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=260046848
	File Input Format Counters 
		Bytes Read=14007
${formatTime(
  new Date()
)},868 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000000_0
${formatTime(
  new Date()
)},868 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000001_0
${formatTime(
  new Date()
)},873 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},873 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},873 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},874 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},875 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/capacity-scheduler.xml:0+9213
${formatTime(
  new Date()
)},965 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},965 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},965 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},965 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},965 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},966 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},981 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},981 INFO mapred.MapTask: Starting flush of map output
${formatTime(
  new Date()
)},988 INFO mapred.Task: Task:attempt_local863064059_0001_m_000001_0 is done. And is in the process of committing
${formatTime(new Date())},994 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},995 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000001_0' done.
${formatTime(
  new Date()
)},997 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000001_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=284416
		FILE: Number of bytes written=1008998
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=23220
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=7
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=244
		Map output records=0
		Map output bytes=0
		Map output materialized bytes=6
		Input split bytes=115
		Combine input records=0
		Combine output records=0
		Spilled Records=0
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=365428736
	File Input Format Counters 
		Bytes Read=9213
${formatTime(
  new Date()
)},997 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000001_0
${formatTime(
  new Date()
)},997 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000002_0
${formatTime(
  new Date()
)},007 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},007 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},007 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},007 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},009 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/kms-acls.xml:0+3518
${formatTime(
  new Date()
)},080 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},080 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},080 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},080 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},080 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},085 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},101 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},102 INFO mapred.MapTask: Starting flush of map output
${formatTime(
  new Date()
)},105 INFO mapred.Task: Task:attempt_local863064059_0001_m_000002_0 is done. And is in the process of committing
${formatTime(new Date())},108 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},109 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000002_0' done.
${formatTime(
  new Date()
)},112 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000002_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=285522
		FILE: Number of bytes written=1009036
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=26738
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=9
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=135
		Map output records=0
		Map output bytes=0
		Map output materialized bytes=6
		Input split bytes=105
		Combine input records=0
		Combine output records=0
		Spilled Records=0
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=470810624
	File Input Format Counters 
		Bytes Read=3518
${formatTime(
  new Date()
)},112 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000002_0
${formatTime(
  new Date()
)},112 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000003_0
${formatTime(
  new Date()
)},113 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},113 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},113 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},113 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},115 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/hdfs-site.xml:0+1153
${formatTime(
  new Date()
)},201 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},201 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},201 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},201 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},201 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},205 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},227 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},227 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},227 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},227 INFO mapred.MapTask: bufstart = 0; bufend = 84; bufvoid = 104857600
${formatTime(
  new Date()
)},227 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26214388(104857552); length = 9/6553600
${formatTime(new Date())},230 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},232 INFO mapred.Task: Task:attempt_local863064059_0001_m_000003_0 is done. And is in the process of committing
${formatTime(new Date())},235 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},235 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000003_0' done.
${formatTime(
  new Date()
)},236 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000003_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=286628
		FILE: Number of bytes written=1009164
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=27891
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=11
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=32
		Map output records=3
		Map output bytes=84
		Map output materialized bytes=96
		Input split bytes=106
		Combine input records=3
		Combine output records=3
		Spilled Records=3
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=576192512
	File Input Format Counters 
		Bytes Read=1153
${formatTime(
  new Date()
)},236 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000003_0
${formatTime(
  new Date()
)},236 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000004_0
${formatTime(
  new Date()
)},237 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},237 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},237 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},237 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},243 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/core-site.xml:0+1089
${formatTime(
  new Date()
)},316 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},316 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},316 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},316 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},316 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},317 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},340 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},340 INFO mapred.MapTask: Starting flush of map output
${formatTime(
  new Date()
)},344 INFO mapred.Task: Task:attempt_local863064059_0001_m_000004_0 is done. And is in the process of committing
${formatTime(new Date())},347 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},347 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000004_0' done.
${formatTime(
  new Date()
)},348 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000004_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=287734
		FILE: Number of bytes written=1009202
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=28980
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=13
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=30
		Map output records=0
		Map output bytes=0
		Map output materialized bytes=6
		Input split bytes=106
		Combine input records=0
		Combine output records=0
		Spilled Records=0
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=681574400
	File Input Format Counters 
		Bytes Read=1089
${formatTime(
  new Date()
)},348 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000004_0
${formatTime(
  new Date()
)},348 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000005_0
${formatTime(
  new Date()
)},363 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},363 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},363 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},363 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},367 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/mapred-site.xml:0+758
${formatTime(
  new Date()
)},437 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},437 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},437 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},437 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},437 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},438 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},446 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},446 INFO mapred.MapTask: Starting flush of map output
${formatTime(
  new Date()
)},449 INFO mapred.Task: Task:attempt_local863064059_0001_m_000005_0 is done. And is in the process of committing
${formatTime(new Date())},451 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},451 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000005_0' done.
${formatTime(
  new Date()
)},452 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000005_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=288328
		FILE: Number of bytes written=1009240
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=29738
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=15
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=21
		Map output records=0
		Map output bytes=0
		Map output materialized bytes=6
		Input split bytes=108
		Combine input records=0
		Combine output records=0
		Spilled Records=0
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=786956288
	File Input Format Counters 
		Bytes Read=758
${formatTime(
  new Date()
)},452 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000005_0
${formatTime(
  new Date()
)},452 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000006_0
${formatTime(
  new Date()
)},453 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},453 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},453 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},454 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},455 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/yarn-site.xml:0+690
${formatTime(
  new Date()
)},472 INFO mapreduce.Job: Job job_local863064059_0001 running in uber mode : false
${formatTime(new Date())},473 INFO mapreduce.Job:  map 100% reduce 0%
${formatTime(
  new Date()
)},532 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},532 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},532 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},532 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},532 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},532 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},546 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},546 INFO mapred.MapTask: Starting flush of map output
${formatTime(
  new Date()
)},550 INFO mapred.Task: Task:attempt_local863064059_0001_m_000006_0 is done. And is in the process of committing
${formatTime(new Date())},554 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},554 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000006_0' done.
${formatTime(
  new Date()
)},554 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000006_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=288922
		FILE: Number of bytes written=1009278
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=30428
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=17
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=19
		Map output records=0
		Map output bytes=0
		Map output materialized bytes=6
		Input split bytes=106
		Combine input records=0
		Combine output records=0
		Spilled Records=0
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=892338176
	File Input Format Counters 
		Bytes Read=690
${formatTime(
  new Date()
)},554 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000006_0
${formatTime(
  new Date()
)},554 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000007_0
${formatTime(
  new Date()
)},555 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},555 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},555 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},555 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},557 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/hdfs-rbf-site.xml:0+683
${formatTime(
  new Date()
)},647 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},647 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},647 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},647 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},647 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},647 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},656 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},656 INFO mapred.MapTask: Starting flush of map output
${formatTime(
  new Date()
)},660 INFO mapred.Task: Task:attempt_local863064059_0001_m_000007_0 is done. And is in the process of committing
${formatTime(new Date())},666 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},666 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000007_0' done.
${formatTime(
  new Date()
)},666 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000007_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=289516
		FILE: Number of bytes written=1009316
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=31111
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=19
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=20
		Map output records=0
		Map output bytes=0
		Map output materialized bytes=6
		Input split bytes=110
		Combine input records=0
		Combine output records=0
		Spilled Records=0
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=997720064
	File Input Format Counters 
		Bytes Read=683
${formatTime(
  new Date()
)},666 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000007_0
${formatTime(
  new Date()
)},667 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000008_0
${formatTime(
  new Date()
)},669 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},669 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},669 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},669 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},671 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/kms-site.xml:0+682
${formatTime(
  new Date()
)},758 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},758 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},758 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},758 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},758 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},759 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},766 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},766 INFO mapred.MapTask: Starting flush of map output
${formatTime(
  new Date()
)},770 INFO mapred.Task: Task:attempt_local863064059_0001_m_000008_0 is done. And is in the process of committing
${formatTime(new Date())},775 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},775 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000008_0' done.
${formatTime(
  new Date()
)},777 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000008_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=290110
		FILE: Number of bytes written=1009354
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=31793
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=21
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=20
		Map output records=0
		Map output bytes=0
		Map output materialized bytes=6
		Input split bytes=105
		Combine input records=0
		Combine output records=0
		Spilled Records=0
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=1103101952
	File Input Format Counters 
		Bytes Read=682
${formatTime(
  new Date()
)},777 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000008_0
${formatTime(
  new Date()
)},777 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_m_000009_0
${formatTime(
  new Date()
)},778 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},778 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},778 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},778 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},780 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/httpfs-site.xml:0+620
${formatTime(
  new Date()
)},865 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},865 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},865 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},865 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},865 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},867 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},882 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},882 INFO mapred.MapTask: Starting flush of map output
${formatTime(
  new Date()
)},886 INFO mapred.Task: Task:attempt_local863064059_0001_m_000009_0 is done. And is in the process of committing
${formatTime(new Date())},889 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},889 INFO mapred.Task: Task 'attempt_local863064059_0001_m_000009_0' done.
${formatTime(
  new Date()
)},890 INFO mapred.Task: Final Counters for attempt_local863064059_0001_m_000009_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=290704
		FILE: Number of bytes written=1009392
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=32413
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=23
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=17
		Map output records=0
		Map output bytes=0
		Map output materialized bytes=6
		Input split bytes=108
		Combine input records=0
		Combine output records=0
		Spilled Records=0
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=1208483840
	File Input Format Counters 
		Bytes Read=620
${formatTime(
  new Date()
)},890 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_m_000009_0
${formatTime(
  new Date()
)},890 INFO mapred.LocalJobRunner: map task executor complete.
${formatTime(
  new Date()
)},914 INFO mapred.LocalJobRunner: Waiting for reduce tasks
${formatTime(
  new Date()
)},917 INFO mapred.LocalJobRunner: Starting task: attempt_local863064059_0001_r_000000_0
${formatTime(
  new Date()
)},940 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},940 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},940 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},943 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},952 INFO mapred.ReduceTask: Using ShuffleConsumerPlugin: org.apache.hadoop.mapreduce.task.reduce.Shuffle@138daec8
${formatTime(
  new Date()
)},954 WARN impl.MetricsSystemImpl: JobTracker metrics system already initialized!
${formatTime(
  new Date()
)},009 INFO reduce.MergeManagerImpl: MergerManager: memoryLimit=1186149120, maxSingleShuffleLimit=296537280, mergeThreshold=782858432, ioSortFactor=10, memToMemMergeOutputsThreshold=10
${formatTime(
  new Date()
)},011 INFO reduce.EventFetcher: attempt_local863064059_0001_r_000000_0 Thread started: EventFetcher for fetching Map Completion Events
${formatTime(
  new Date()
)},040 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000003_0 decomp: 92 len: 96 to MEMORY
${formatTime(
  new Date()
)},048 INFO reduce.InMemoryMapOutput: Read 92 bytes from map-output for attempt_local863064059_0001_m_000003_0
${formatTime(
  new Date()
)},054 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 92, inMemoryMapOutputs.size() -> 1, commitMemory -> 0, usedMemory ->92
${formatTime(
  new Date()
)},056 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000006_0 decomp: 2 len: 6 to MEMORY
${formatTime(
  new Date()
)},056 INFO reduce.InMemoryMapOutput: Read 2 bytes from map-output for attempt_local863064059_0001_m_000006_0
${formatTime(
  new Date()
)},057 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 2, inMemoryMapOutputs.size() -> 2, commitMemory -> 92, usedMemory ->94
${formatTime(new Date())},058 WARN io.ReadaheadPool: Failed readahead on ifile
EBADF: Bad file descriptor
	at org.apache.hadoop.io.nativeio.NativeIO$POSIX.posix_fadvise(Native Method)
	at org.apache.hadoop.io.nativeio.NativeIO$POSIX.posixFadviseIfPossible(NativeIO.java:426)
	at org.apache.hadoop.io.nativeio.NativeIO$POSIX$CacheManipulator.posixFadviseIfPossible(NativeIO.java:296)
	at org.apache.hadoop.io.ReadaheadPool$ReadaheadRequestImpl.run(ReadaheadPool.java:220)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:750)
${formatTime(
  new Date()
)},061 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000000_0 decomp: 21 len: 25 to MEMORY
${formatTime(
  new Date()
)},062 INFO reduce.InMemoryMapOutput: Read 21 bytes from map-output for attempt_local863064059_0001_m_000000_0
${formatTime(
  new Date()
)},062 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 21, inMemoryMapOutputs.size() -> 3, commitMemory -> 94, usedMemory ->115
${formatTime(
  new Date()
)},063 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000002_0 decomp: 2 len: 6 to MEMORY
${formatTime(
  new Date()
)},063 INFO reduce.InMemoryMapOutput: Read 2 bytes from map-output for attempt_local863064059_0001_m_000002_0
${formatTime(
  new Date()
)},064 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 2, inMemoryMapOutputs.size() -> 4, commitMemory -> 115, usedMemory ->117
${formatTime(
  new Date()
)},064 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000009_0 decomp: 2 len: 6 to MEMORY
${formatTime(
  new Date()
)},065 INFO reduce.InMemoryMapOutput: Read 2 bytes from map-output for attempt_local863064059_0001_m_000009_0
${formatTime(
  new Date()
)},065 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 2, inMemoryMapOutputs.size() -> 5, commitMemory -> 117, usedMemory ->119
${formatTime(
  new Date()
)},066 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000005_0 decomp: 2 len: 6 to MEMORY
${formatTime(
  new Date()
)},067 INFO reduce.InMemoryMapOutput: Read 2 bytes from map-output for attempt_local863064059_0001_m_000005_0
${formatTime(
  new Date()
)},067 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 2, inMemoryMapOutputs.size() -> 6, commitMemory -> 119, usedMemory ->121
${formatTime(
  new Date()
)},068 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000008_0 decomp: 2 len: 6 to MEMORY
${formatTime(
  new Date()
)},068 INFO reduce.InMemoryMapOutput: Read 2 bytes from map-output for attempt_local863064059_0001_m_000008_0
${formatTime(
  new Date()
)},069 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 2, inMemoryMapOutputs.size() -> 7, commitMemory -> 121, usedMemory ->123
${formatTime(
  new Date()
)},069 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000007_0 decomp: 2 len: 6 to MEMORY
${formatTime(
  new Date()
)},070 INFO reduce.InMemoryMapOutput: Read 2 bytes from map-output for attempt_local863064059_0001_m_000007_0
${formatTime(
  new Date()
)},070 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 2, inMemoryMapOutputs.size() -> 8, commitMemory -> 123, usedMemory ->125
${formatTime(
  new Date()
)},071 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000001_0 decomp: 2 len: 6 to MEMORY
${formatTime(
  new Date()
)},071 INFO reduce.InMemoryMapOutput: Read 2 bytes from map-output for attempt_local863064059_0001_m_000001_0
${formatTime(
  new Date()
)},071 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 2, inMemoryMapOutputs.size() -> 9, commitMemory -> 125, usedMemory ->127
${formatTime(
  new Date()
)},072 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local863064059_0001_m_000004_0 decomp: 2 len: 6 to MEMORY
${formatTime(
  new Date()
)},073 INFO reduce.InMemoryMapOutput: Read 2 bytes from map-output for attempt_local863064059_0001_m_000004_0
${formatTime(
  new Date()
)},073 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 2, inMemoryMapOutputs.size() -> 10, commitMemory -> 127, usedMemory ->129
${formatTime(
  new Date()
)},073 INFO reduce.EventFetcher: EventFetcher is interrupted.. Returning
${formatTime(new Date())},074 INFO mapred.LocalJobRunner: 10 / 10 copied.
${formatTime(
  new Date()
)},074 INFO reduce.MergeManagerImpl: finalMerge called with 10 in-memory map-outputs and 0 on-disk map-outputs
${formatTime(new Date())},080 INFO mapred.Merger: Merging 10 sorted segments
${formatTime(
  new Date()
)},080 INFO mapred.Merger: Down to the last merge-pass, with 2 segments left of total size: 78 bytes
${formatTime(
  new Date()
)},081 INFO reduce.MergeManagerImpl: Merged 10 segments, 129 bytes to disk to satisfy reduce memory limit
${formatTime(
  new Date()
)},081 INFO reduce.MergeManagerImpl: Merging 1 files, 115 bytes from disk
${formatTime(
  new Date()
)},082 INFO reduce.MergeManagerImpl: Merging 0 segments, 0 bytes from memory into reduce
${formatTime(new Date())},082 INFO mapred.Merger: Merging 1 sorted segments
${formatTime(
  new Date()
)},082 INFO mapred.Merger: Down to the last merge-pass, with 1 segments left of total size: 87 bytes
${formatTime(new Date())},083 INFO mapred.LocalJobRunner: 10 / 10 copied.
${formatTime(
  new Date()
)},141 INFO Configuration.deprecation: mapred.skip.on is deprecated. Instead, use mapreduce.job.skiprecords
${formatTime(
  new Date()
)},251 INFO mapred.Task: Task:attempt_local863064059_0001_r_000000_0 is done. And is in the process of committing
${formatTime(new Date())},259 INFO mapred.LocalJobRunner: 10 / 10 copied.
${formatTime(
  new Date()
)},259 INFO mapred.Task: Task attempt_local863064059_0001_r_000000_0 is allowed to commit now
${formatTime(
  new Date()
)},283 INFO output.FileOutputCommitter: Saved output of task 'attempt_local863064059_0001_r_000000_0' to hdfs://localhost:9000/user/hadoop_luao/grep-temp-1962965688
${formatTime(new Date())},284 INFO mapred.LocalJobRunner: reduce > reduce
${formatTime(
  new Date()
)},285 INFO mapred.Task: Task 'attempt_local863064059_0001_r_000000_0' done.
${formatTime(
  new Date()
)},286 INFO mapred.Task: Final Counters for attempt_local863064059_0001_r_000000_0: Counters: 30
	File System Counters
		FILE: Number of bytes read=291308
		FILE: Number of bytes written=1009507
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=32413
		HDFS: Number of bytes written=219
		HDFS: Number of read operations=28
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=3
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Combine input records=0
		Combine output records=0
		Reduce input groups=4
		Reduce shuffle bytes=169
		Reduce input records=4
		Reduce output records=4
		Spilled Records=4
		Shuffled Maps =10
		Failed Shuffles=0
		Merged Map outputs=10
		GC time elapsed (ms)=10
		Total committed heap usage (bytes)=1251999744
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Output Format Counters 
		Bytes Written=219
${formatTime(
  new Date()
)},288 INFO mapred.LocalJobRunner: Finishing task: attempt_local863064059_0001_r_000000_0
${formatTime(
  new Date()
)},289 INFO mapred.LocalJobRunner: reduce task executor complete.
${formatTime(new Date())},482 INFO mapreduce.Job:  map 100% reduce 100%
${formatTime(
  new Date()
)},482 INFO mapreduce.Job: Job job_local863064059_0001 completed successfully
${formatTime(new Date())},495 INFO mapreduce.Job: Counters: 36
	File System Counters
		FILE: Number of bytes read=3166498
		FILE: Number of bytes written=11101447
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=308732
		HDFS: Number of bytes written=219
		HDFS: Number of read operations=168
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=13
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=863
		Map output records=4
		Map output bytes=101
		Map output materialized bytes=169
		Input split bytes=1079
		Combine input records=4
		Combine output records=4
		Reduce input groups=4
		Reduce shuffle bytes=169
		Reduce input records=4
		Reduce output records=4
		Spilled Records=8
		Shuffled Maps =10
		Failed Shuffles=0
		Merged Map outputs=10
		GC time elapsed (ms)=10
		Total committed heap usage (bytes)=8594653184
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Input Format Counters 
		Bytes Read=32413
	File Output Format Counters 
		Bytes Written=219
${formatTime(
  new Date()
)},515 WARN impl.MetricsSystemImpl: JobTracker metrics system already initialized!
${formatTime(
  new Date()
)},539 INFO input.FileInputFormat: Total input files to process : 1
${formatTime(new Date())},557 INFO mapreduce.JobSubmitter: number of splits:1
${formatTime(
  new Date()
)},597 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_local1710420046_0002
${formatTime(
  new Date()
)},597 INFO mapreduce.JobSubmitter: Executing with tokens: []
${formatTime(
  new Date()
)},677 INFO mapreduce.Job: The url to track the job: http://localhost:8080/
${formatTime(
  new Date()
)},677 INFO mapreduce.Job: Running job: job_local1710420046_0002
${formatTime(
  new Date()
)},678 INFO mapred.LocalJobRunner: OutputCommitter set in config null
${formatTime(
  new Date()
)},678 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},678 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},678 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},679 INFO mapred.LocalJobRunner: OutputCommitter is org.apache.hadoop.mapreduce.lib.output.FileOutputCommitter
${formatTime(new Date())},686 INFO mapred.LocalJobRunner: Waiting for map tasks
${formatTime(
  new Date()
)},686 INFO mapred.LocalJobRunner: Starting task: attempt_local1710420046_0002_m_000000_0
${formatTime(
  new Date()
)},689 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},689 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},689 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},689 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},697 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/user/hadoop_luao/grep-temp-1962965688/part-r-00000:0+219
${formatTime(
  new Date()
)},732 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},732 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},732 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},732 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},732 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},734 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},758 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},758 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},758 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},758 INFO mapred.MapTask: bufstart = 0; bufend = 101; bufvoid = 104857600
${formatTime(
  new Date()
)},758 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26214384(104857536); length = 13/6553600
${formatTime(new Date())},760 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},761 INFO mapred.Task: Task:attempt_local1710420046_0002_m_000000_0 is done. And is in the process of committing
${formatTime(new Date())},763 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},764 INFO mapred.Task: Task 'attempt_local1710420046_0002_m_000000_0' done.
${formatTime(
  new Date()
)},764 INFO mapred.Task: Final Counters for attempt_local1710420046_0002_m_000000_0: Counters: 23
	File System Counters
		FILE: Number of bytes read=573171
		FILE: Number of bytes written=2018678
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=32632
		HDFS: Number of bytes written=219
		HDFS: Number of read operations=34
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=6
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=4
		Map output records=4
		Map output bytes=101
		Map output materialized bytes=115
		Input split bytes=137
		Combine input records=0
		Spilled Records=4
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=1251999744
	File Input Format Counters 
		Bytes Read=219
${formatTime(
  new Date()
)},764 INFO mapred.LocalJobRunner: Finishing task: attempt_local1710420046_0002_m_000000_0
${formatTime(
  new Date()
)},764 INFO mapred.LocalJobRunner: map task executor complete.
${formatTime(
  new Date()
)},765 INFO mapred.LocalJobRunner: Waiting for reduce tasks
${formatTime(
  new Date()
)},766 INFO mapred.LocalJobRunner: Starting task: attempt_local1710420046_0002_r_000000_0
${formatTime(
  new Date()
)},769 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},769 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},769 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},769 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},770 INFO mapred.ReduceTask: Using ShuffleConsumerPlugin: org.apache.hadoop.mapreduce.task.reduce.Shuffle@5c59c4a2
${formatTime(
  new Date()
)},770 WARN impl.MetricsSystemImpl: JobTracker metrics system already initialized!
${formatTime(
  new Date()
)},774 INFO reduce.MergeManagerImpl: MergerManager: memoryLimit=1186149120, maxSingleShuffleLimit=296537280, mergeThreshold=782858432, ioSortFactor=10, memToMemMergeOutputsThreshold=10
${formatTime(
  new Date()
)},777 INFO reduce.EventFetcher: attempt_local1710420046_0002_r_000000_0 Thread started: EventFetcher for fetching Map Completion Events
${formatTime(
  new Date()
)},779 INFO reduce.LocalFetcher: localfetcher#2 about to shuffle output of map attempt_local1710420046_0002_m_000000_0 decomp: 111 len: 115 to MEMORY
${formatTime(
  new Date()
)},779 INFO reduce.InMemoryMapOutput: Read 111 bytes from map-output for attempt_local1710420046_0002_m_000000_0
${formatTime(
  new Date()
)},779 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 111, inMemoryMapOutputs.size() -> 1, commitMemory -> 0, usedMemory ->111
${formatTime(
  new Date()
)},780 INFO reduce.EventFetcher: EventFetcher is interrupted.. Returning
${formatTime(new Date())},781 INFO mapred.LocalJobRunner: 1 / 1 copied.
${formatTime(
  new Date()
)},781 INFO reduce.MergeManagerImpl: finalMerge called with 1 in-memory map-outputs and 0 on-disk map-outputs
${formatTime(new Date())},783 INFO mapred.Merger: Merging 1 sorted segments
${formatTime(
  new Date()
)},783 INFO mapred.Merger: Down to the last merge-pass, with 1 segments left of total size: 101 bytes
${formatTime(
  new Date()
)},786 INFO reduce.MergeManagerImpl: Merged 1 segments, 111 bytes to disk to satisfy reduce memory limit
${formatTime(
  new Date()
)},787 INFO reduce.MergeManagerImpl: Merging 1 files, 115 bytes from disk
${formatTime(
  new Date()
)},787 INFO reduce.MergeManagerImpl: Merging 0 segments, 0 bytes from memory into reduce
${formatTime(new Date())},787 INFO mapred.Merger: Merging 1 sorted segments
${formatTime(
  new Date()
)},787 INFO mapred.Merger: Down to the last merge-pass, with 1 segments left of total size: 101 bytes
${formatTime(new Date())},787 INFO mapred.LocalJobRunner: 1 / 1 copied.
${formatTime(
  new Date()
)},804 INFO mapred.Task: Task:attempt_local1710420046_0002_r_000000_0 is done. And is in the process of committing
${formatTime(new Date())},807 INFO mapred.LocalJobRunner: 1 / 1 copied.
${formatTime(
  new Date()
)},807 INFO mapred.Task: Task attempt_local1710420046_0002_r_000000_0 is allowed to commit now
${formatTime(
  new Date()
)},829 INFO output.FileOutputCommitter: Saved output of task 'attempt_local1710420046_0002_r_000000_0' to hdfs://localhost:9000/output
${formatTime(new Date())},830 INFO mapred.LocalJobRunner: reduce > reduce
${formatTime(
  new Date()
)},830 INFO mapred.Task: Task 'attempt_local1710420046_0002_r_000000_0' done.
${formatTime(
  new Date()
)},830 INFO mapred.Task: Final Counters for attempt_local1710420046_0002_r_000000_0: Counters: 30
	File System Counters
		FILE: Number of bytes read=573433
		FILE: Number of bytes written=2018793
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=32632
		HDFS: Number of bytes written=296
		HDFS: Number of read operations=39
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=8
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Combine input records=0
		Combine output records=0
		Reduce input groups=1
		Reduce shuffle bytes=115
		Reduce input records=4
		Reduce output records=4
		Spilled Records=4
		Shuffled Maps =1
		Failed Shuffles=0
		Merged Map outputs=1
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=1251999744
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Output Format Counters 
		Bytes Written=77
${formatTime(
  new Date()
)},830 INFO mapred.LocalJobRunner: Finishing task: attempt_local1710420046_0002_r_000000_0
${formatTime(
  new Date()
)},830 INFO mapred.LocalJobRunner: reduce task executor complete.
${formatTime(
  new Date()
)},678 INFO mapreduce.Job: Job job_local1710420046_0002 running in uber mode : false
${formatTime(new Date())},678 INFO mapreduce.Job:  map 100% reduce 100%
${formatTime(
  new Date()
)},678 INFO mapreduce.Job: Job job_local1710420046_0002 completed successfully
${formatTime(new Date())},681 INFO mapreduce.Job: Counters: 36
	File System Counters
		FILE: Number of bytes read=1146604
		FILE: Number of bytes written=4037471
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=65264
		HDFS: Number of bytes written=515
		HDFS: Number of read operations=73
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=14
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=4
		Map output records=4
		Map output bytes=101
		Map output materialized bytes=115
		Input split bytes=137
		Combine input records=0
		Combine output records=0
		Reduce input groups=1
		Reduce shuffle bytes=115
		Reduce input records=4
		Reduce output records=4
		Spilled Records=8
		Shuffled Maps =1
		Failed Shuffles=0
		Merged Map outputs=1
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=2503999488
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Input Format Counters 
		Bytes Read=219
	File Output Format Counters 
		Bytes Written=77
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ ./bin/hdfs dfs -ls /output
Found 2 items
-rw-r--r--   1 ${settings.username} supergroup          0 ${formatTime(
    new Date()
  )} /output/_SUCCESS
-rw-r--r--   1 ${settings.username} supergroup         77 ${formatTime(
    new Date()
  )} /output/part-r-00000
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ ./bin/hdfs dfs -cat /output/part-r-00000
1	dfsadmin
1	dfs.replication
1	dfs.namenode.name.dir
1	dfs.datanode.data.dir
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ echo 'export PATH=$PATH:/usr/lib/hadoop/hadoop/sbin' >> ~/.bashrc
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ echo 'export PATH=$PATH:/usr/lib/hadoop/hadoop/bin:/usr/lib/hadoop/hadoop/sbin' >> ~/.bashrc
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ source ~/.bashrc
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ hadoop jar /usr/lib/hadoop/hadoop/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.2.jar wordcount /input /wordcount_output
${formatTime(
  new Date()
)},168 INFO input.FileInputFormat: Total input files to process : 10
${formatTime(new Date())},193 INFO mapreduce.JobSubmitter: number of splits:10
${formatTime(
  new Date()
)},394 INFO mapreduce.JobSubmitter: Submitting tokens for job: job_local729097160_0001
${formatTime(
  new Date()
)},396 INFO mapreduce.JobSubmitter: Executing with tokens: []
${formatTime(
  new Date()
)},568 INFO mapreduce.Job: The url to track the job: http://localhost:8080/
${formatTime(
  new Date()
)},568 INFO mapreduce.Job: Running job: job_local729097160_0001
${formatTime(
  new Date()
)},575 INFO mapred.LocalJobRunner: OutputCommitter set in config null
${formatTime(
  new Date()
)},582 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},583 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},583 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},584 INFO mapred.LocalJobRunner: OutputCommitter is org.apache.hadoop.mapreduce.lib.output.FileOutputCommitter
${formatTime(new Date())},654 INFO mapred.LocalJobRunner: Waiting for map tasks
${formatTime(
  new Date()
)},655 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000000_0
${formatTime(
  new Date()
)},680 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},680 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},680 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},700 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},704 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/hadoop-policy.xml:0+14007
${formatTime(
  new Date()
)},733 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},733 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},734 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},734 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},734 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},739 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},877 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},881 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},882 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},882 INFO mapred.MapTask: bufstart = 0; bufend = 19444; bufvoid = 104857600
${formatTime(
  new Date()
)},882 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26207916(104831664); length = 6481/6553600
${formatTime(new Date())},925 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},941 INFO mapred.Task: Task:attempt_local729097160_0001_m_000000_0 is done. And is in the process of committing
${formatTime(new Date())},944 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},945 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000000_0' done.
${formatTime(
  new Date()
)},953 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000000_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=283310
		FILE: Number of bytes written=1014062
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=14007
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=5
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=325
		Map output records=1621
		Map output bytes=19444
		Map output materialized bytes=6069
		Input split bytes=110
		Combine input records=1621
		Combine output records=294
		Spilled Records=294
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=251658240
	File Input Format Counters 
		Bytes Read=14007
${formatTime(
  new Date()
)},953 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000000_0
${formatTime(
  new Date()
)},954 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000001_0
${formatTime(
  new Date()
)},955 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},956 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},956 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},957 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},959 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/capacity-scheduler.xml:0+9213
${formatTime(
  new Date()
)},031 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},031 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},031 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},031 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},031 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},032 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},042 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},042 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},042 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},042 INFO mapred.MapTask: bufstart = 0; bufend = 11921; bufvoid = 104857600
${formatTime(
  new Date()
)},042 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26210692(104842768); length = 3705/6553600
${formatTime(new Date())},048 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},051 INFO mapred.Task: Task:attempt_local729097160_0001_m_000001_0 is done. And is in the process of committing
${formatTime(new Date())},054 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},054 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000001_0' done.
${formatTime(
  new Date()
)},054 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000001_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=284416
		FILE: Number of bytes written=1020823
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=23220
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=7
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=244
		Map output records=927
		Map output bytes=11921
		Map output materialized bytes=6729
		Input split bytes=115
		Combine input records=927
		Combine output records=372
		Spilled Records=372
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=357040128
	File Input Format Counters 
		Bytes Read=9213
${formatTime(
  new Date()
)},055 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000001_0
${formatTime(
  new Date()
)},055 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000002_0
${formatTime(
  new Date()
)},055 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},055 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},056 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},056 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},058 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/kms-acls.xml:0+3518
${formatTime(
  new Date()
)},124 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},124 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},124 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},124 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},124 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},125 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},134 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},134 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},134 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},134 INFO mapred.MapTask: bufstart = 0; bufend = 4413; bufvoid = 104857600
${formatTime(
  new Date()
)},134 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26213072(104852288); length = 1325/6553600
${formatTime(new Date())},136 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},140 INFO mapred.Task: Task:attempt_local729097160_0001_m_000002_0 is done. And is in the process of committing
${formatTime(new Date())},145 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},145 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000002_0' done.
${formatTime(
  new Date()
)},146 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000002_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=285522
		FILE: Number of bytes written=1023235
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=26738
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=9
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=135
		Map output records=332
		Map output bytes=4413
		Map output materialized bytes=2380
		Input split bytes=105
		Combine input records=332
		Combine output records=139
		Spilled Records=139
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=462422016
	File Input Format Counters 
		Bytes Read=3518
${formatTime(
  new Date()
)},146 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000002_0
${formatTime(
  new Date()
)},146 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000003_0
${formatTime(
  new Date()
)},150 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},150 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},150 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},150 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},151 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/hdfs-site.xml:0+1153
${formatTime(
  new Date()
)},218 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},218 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},218 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},218 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},218 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},219 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},226 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},226 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},226 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},226 INFO mapred.MapTask: bufstart = 0; bufend = 1499; bufvoid = 104857600
${formatTime(
  new Date()
)},226 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26213948(104855792); length = 449/6553600
${formatTime(new Date())},229 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},232 INFO mapred.Task: Task:attempt_local729097160_0001_m_000003_0 is done. And is in the process of committing
${formatTime(new Date())},234 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},234 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000003_0' done.
${formatTime(
  new Date()
)},235 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000003_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=286628
		FILE: Number of bytes written=1024692
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=27891
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=11
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=32
		Map output records=113
		Map output bytes=1499
		Map output materialized bytes=1425
		Input split bytes=106
		Combine input records=113
		Combine output records=88
		Spilled Records=88
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=567803904
	File Input Format Counters 
		Bytes Read=1153
${formatTime(
  new Date()
)},235 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000003_0
${formatTime(
  new Date()
)},235 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000004_0
${formatTime(
  new Date()
)},235 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},235 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},235 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},236 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},237 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/core-site.xml:0+1089
${formatTime(
  new Date()
)},315 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},315 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},315 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},315 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},315 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},316 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},325 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},325 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},325 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},325 INFO mapred.MapTask: bufstart = 0; bufend = 1456; bufvoid = 104857600
${formatTime(
  new Date()
)},325 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26213944(104855776); length = 453/6553600
${formatTime(new Date())},327 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},333 INFO mapred.Task: Task:attempt_local729097160_0001_m_000004_0 is done. And is in the process of committing
${formatTime(new Date())},336 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},336 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000004_0' done.
${formatTime(
  new Date()
)},337 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000004_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=287734
		FILE: Number of bytes written=1026133
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=28980
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=13
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=30
		Map output records=114
		Map output bytes=1456
		Map output materialized bytes=1409
		Input split bytes=106
		Combine input records=114
		Combine output records=90
		Spilled Records=90
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=673185792
	File Input Format Counters 
		Bytes Read=1089
${formatTime(
  new Date()
)},337 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000004_0
${formatTime(
  new Date()
)},337 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000005_0
${formatTime(
  new Date()
)},343 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},343 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},343 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},344 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},345 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/mapred-site.xml:0+758
${formatTime(
  new Date()
)},433 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},433 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},433 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},433 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},433 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},434 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},441 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},442 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},442 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},442 INFO mapred.MapTask: bufstart = 0; bufend = 1133; bufvoid = 104857600
${formatTime(
  new Date()
)},442 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26214000(104856000); length = 397/6553600
${formatTime(new Date())},445 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},450 INFO mapred.Task: Task:attempt_local729097160_0001_m_000005_0 is done. And is in the process of committing
${formatTime(new Date())},457 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},457 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000005_0' done.
${formatTime(
  new Date()
)},458 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000005_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=288328
		FILE: Number of bytes written=1027268
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=29738
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=15
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=21
		Map output records=100
		Map output bytes=1133
		Map output materialized bytes=1103
		Input split bytes=108
		Combine input records=100
		Combine output records=79
		Spilled Records=79
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=778567680
	File Input Format Counters 
		Bytes Read=758
${formatTime(
  new Date()
)},458 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000005_0
${formatTime(
  new Date()
)},459 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000006_0
${formatTime(
  new Date()
)},461 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},461 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},461 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},462 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},463 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/yarn-site.xml:0+690
${formatTime(
  new Date()
)},551 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},551 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},551 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},551 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},551 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},552 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},560 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},560 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},560 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},561 INFO mapred.MapTask: bufstart = 0; bufend = 1046; bufvoid = 104857600
${formatTime(
  new Date()
)},561 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26214020(104856080); length = 377/6553600
${formatTime(new Date())},563 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},565 INFO mapred.Task: Task:attempt_local729097160_0001_m_000006_0 is done. And is in the process of committing
${formatTime(new Date())},571 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},572 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000006_0' done.
${formatTime(
  new Date()
)},572 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000006_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=288922
		FILE: Number of bytes written=1028323
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=30428
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=17
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=19
		Map output records=95
		Map output bytes=1046
		Map output materialized bytes=1023
		Input split bytes=106
		Combine input records=95
		Combine output records=76
		Spilled Records=76
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=883949568
	File Input Format Counters 
		Bytes Read=690
${formatTime(
  new Date()
)},572 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000006_0
${formatTime(
  new Date()
)},572 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000007_0
${formatTime(
  new Date()
)},573 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},573 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},573 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},573 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},574 INFO mapreduce.Job: Job job_local729097160_0001 running in uber mode : false
${formatTime(new Date())},574 INFO mapreduce.Job:  map 100% reduce 0%
${formatTime(
  new Date()
)},575 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/hdfs-rbf-site.xml:0+683
${formatTime(
  new Date()
)},649 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},649 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},649 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},649 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},649 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},650 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},656 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},656 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},656 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},656 INFO mapred.MapTask: bufstart = 0; bufend = 1036; bufvoid = 104857600
${formatTime(
  new Date()
)},657 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26214024(104856096); length = 373/6553600
${formatTime(new Date())},658 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},660 INFO mapred.Task: Task:attempt_local729097160_0001_m_000007_0 is done. And is in the process of committing
${formatTime(new Date())},665 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},665 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000007_0' done.
${formatTime(
  new Date()
)},666 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000007_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=289516
		FILE: Number of bytes written=1029371
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=31111
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=19
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=20
		Map output records=94
		Map output bytes=1036
		Map output materialized bytes=1016
		Input split bytes=110
		Combine input records=94
		Combine output records=75
		Spilled Records=75
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=989331456
	File Input Format Counters 
		Bytes Read=683
${formatTime(
  new Date()
)},666 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000007_0
${formatTime(
  new Date()
)},666 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000008_0
${formatTime(
  new Date()
)},670 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},670 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},670 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},670 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},672 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/kms-site.xml:0+682
${formatTime(
  new Date()
)},756 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},756 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},756 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},756 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},756 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},757 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},763 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},764 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},764 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},764 INFO mapred.MapTask: bufstart = 0; bufend = 1035; bufvoid = 104857600
${formatTime(
  new Date()
)},764 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26214024(104856096); length = 373/6553600
${formatTime(new Date())},766 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},770 INFO mapred.Task: Task:attempt_local729097160_0001_m_000008_0 is done. And is in the process of committing
${formatTime(new Date())},773 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},773 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000008_0' done.
${formatTime(
  new Date()
)},773 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000008_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=290110
		FILE: Number of bytes written=1030418
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=31793
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=21
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=20
		Map output records=94
		Map output bytes=1035
		Map output materialized bytes=1015
		Input split bytes=105
		Combine input records=94
		Combine output records=75
		Spilled Records=75
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=1094713344
	File Input Format Counters 
		Bytes Read=682
${formatTime(
  new Date()
)},773 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000008_0
${formatTime(
  new Date()
)},773 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_m_000009_0
${formatTime(
  new Date()
)},775 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},775 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},775 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},776 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},810 INFO mapred.MapTask: Processing split: hdfs://localhost:9000/input/httpfs-site.xml:0+620
${formatTime(
  new Date()
)},848 INFO mapred.MapTask: (EQUATOR) 0 kvi 26214396(104857584)
${formatTime(
  new Date()
)},848 INFO mapred.MapTask: mapreduce.task.io.sort.mb: 100
${formatTime(new Date())},848 INFO mapred.MapTask: soft limit at 83886080
${formatTime(
  new Date()
)},848 INFO mapred.MapTask: bufstart = 0; bufvoid = 104857600
${formatTime(
  new Date()
)},848 INFO mapred.MapTask: kvstart = 26214396; length = 6553600
${formatTime(
  new Date()
)},849 INFO mapred.MapTask: Map output collector class = org.apache.hadoop.mapred.MapTask$MapOutputBuffer
${formatTime(new Date())},863 INFO mapred.LocalJobRunner: 
${formatTime(new Date())},863 INFO mapred.MapTask: Starting flush of map output
${formatTime(new Date())},863 INFO mapred.MapTask: Spilling map output
${formatTime(
  new Date()
)},863 INFO mapred.MapTask: bufstart = 0; bufend = 939; bufvoid = 104857600
${formatTime(
  new Date()
)},863 INFO mapred.MapTask: kvstart = 26214396(104857584); kvend = 26214060(104856240); length = 337/6553600
${formatTime(new Date())},865 INFO mapred.MapTask: Finished spill 0
${formatTime(
  new Date()
)},867 INFO mapred.Task: Task:attempt_local729097160_0001_m_000009_0 is done. And is in the process of committing
${formatTime(new Date())},869 INFO mapred.LocalJobRunner: map
${formatTime(
  new Date()
)},869 INFO mapred.Task: Task 'attempt_local729097160_0001_m_000009_0' done.
${formatTime(
  new Date()
)},869 INFO mapred.Task: Final Counters for attempt_local729097160_0001_m_000009_0: Counters: 24
	File System Counters
		FILE: Number of bytes read=290704
		FILE: Number of bytes written=1031392
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=32413
		HDFS: Number of bytes written=0
		HDFS: Number of read operations=23
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=1
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=17
		Map output records=85
		Map output bytes=939
		Map output materialized bytes=942
		Input split bytes=108
		Combine input records=85
		Combine output records=70
		Spilled Records=70
		Failed Shuffles=0
		Merged Map outputs=0
		GC time elapsed (ms)=24
		Total committed heap usage (bytes)=1148715008
	File Input Format Counters 
		Bytes Read=620
${formatTime(
  new Date()
)},870 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_m_000009_0
${formatTime(
  new Date()
)},870 INFO mapred.LocalJobRunner: map task executor complete.
${formatTime(
  new Date()
)},874 INFO mapred.LocalJobRunner: Waiting for reduce tasks
${formatTime(
  new Date()
)},875 INFO mapred.LocalJobRunner: Starting task: attempt_local729097160_0001_r_000000_0
${formatTime(
  new Date()
)},885 INFO output.PathOutputCommitterFactory: No output committer factory defined, defaulting to FileOutputCommitterFactory
${formatTime(
  new Date()
)},885 INFO output.FileOutputCommitter: File Output Committer Algorithm version is 2
${formatTime(
  new Date()
)},885 INFO output.FileOutputCommitter: FileOutputCommitter skip cleanup _temporary folders under output directory:false, ignore cleanup failures: false
${formatTime(
  new Date()
)},886 INFO mapred.Task:  Using ResourceCalculatorProcessTree : [ ]
${formatTime(
  new Date()
)},890 INFO mapred.ReduceTask: Using ShuffleConsumerPlugin: org.apache.hadoop.mapreduce.task.reduce.Shuffle@d923bdd
${formatTime(
  new Date()
)},891 WARN impl.MetricsSystemImpl: JobTracker metrics system already initialized!
${formatTime(
  new Date()
)},911 INFO reduce.MergeManagerImpl: MergerManager: memoryLimit=1186149120, maxSingleShuffleLimit=296537280, mergeThreshold=782858432, ioSortFactor=10, memToMemMergeOutputsThreshold=10
${formatTime(
  new Date()
)},913 INFO reduce.EventFetcher: attempt_local729097160_0001_r_000000_0 Thread started: EventFetcher for fetching Map Completion Events
${formatTime(
  new Date()
)},953 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000005_0 decomp: 1099 len: 1103 to MEMORY
${formatTime(
  new Date()
)},958 INFO reduce.InMemoryMapOutput: Read 1099 bytes from map-output for attempt_local729097160_0001_m_000005_0
${formatTime(
  new Date()
)},960 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 1099, inMemoryMapOutputs.size() -> 1, commitMemory -> 0, usedMemory ->1099
${formatTime(new Date())},962 WARN io.ReadaheadPool: Failed readahead on ifile
EBADF: Bad file descriptor
	at org.apache.hadoop.io.nativeio.NativeIO$POSIX.posix_fadvise(Native Method)
	at org.apache.hadoop.io.nativeio.NativeIO$POSIX.posixFadviseIfPossible(NativeIO.java:426)
	at org.apache.hadoop.io.nativeio.NativeIO$POSIX$CacheManipulator.posixFadviseIfPossible(NativeIO.java:296)
	at org.apache.hadoop.io.ReadaheadPool$ReadaheadRequestImpl.run(ReadaheadPool.java:220)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:750)
${formatTime(
  new Date()
)},963 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000008_0 decomp: 1011 len: 1015 to MEMORY
${formatTime(
  new Date()
)},966 INFO reduce.InMemoryMapOutput: Read 1011 bytes from map-output for attempt_local729097160_0001_m_000008_0
${formatTime(
  new Date()
)},966 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 1011, inMemoryMapOutputs.size() -> 2, commitMemory -> 1099, usedMemory ->2110
${formatTime(
  new Date()
)},967 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000007_0 decomp: 1012 len: 1016 to MEMORY
${formatTime(
  new Date()
)},968 INFO reduce.InMemoryMapOutput: Read 1012 bytes from map-output for attempt_local729097160_0001_m_000007_0
${formatTime(
  new Date()
)},968 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 1012, inMemoryMapOutputs.size() -> 3, commitMemory -> 2110, usedMemory ->3122
${formatTime(
  new Date()
)},969 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000001_0 decomp: 6725 len: 6729 to MEMORY
${formatTime(
  new Date()
)},970 INFO reduce.InMemoryMapOutput: Read 6725 bytes from map-output for attempt_local729097160_0001_m_000001_0
${formatTime(
  new Date()
)},970 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 6725, inMemoryMapOutputs.size() -> 4, commitMemory -> 3122, usedMemory ->9847
${formatTime(
  new Date()
)},971 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000004_0 decomp: 1405 len: 1409 to MEMORY
${formatTime(
  new Date()
)},971 INFO reduce.InMemoryMapOutput: Read 1405 bytes from map-output for attempt_local729097160_0001_m_000004_0
${formatTime(
  new Date()
)},972 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 1405, inMemoryMapOutputs.size() -> 5, commitMemory -> 9847, usedMemory ->11252
${formatTime(
  new Date()
)},973 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000003_0 decomp: 1421 len: 1425 to MEMORY
${formatTime(
  new Date()
)},973 INFO reduce.InMemoryMapOutput: Read 1421 bytes from map-output for attempt_local729097160_0001_m_000003_0
${formatTime(
  new Date()
)},973 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 1421, inMemoryMapOutputs.size() -> 6, commitMemory -> 11252, usedMemory ->12673
${formatTime(
  new Date()
)},974 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000006_0 decomp: 1019 len: 1023 to MEMORY
${formatTime(
  new Date()
)},975 INFO reduce.InMemoryMapOutput: Read 1019 bytes from map-output for attempt_local729097160_0001_m_000006_0
${formatTime(
  new Date()
)},975 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 1019, inMemoryMapOutputs.size() -> 7, commitMemory -> 12673, usedMemory ->13692
${formatTime(
  new Date()
)},976 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000000_0 decomp: 6065 len: 6069 to MEMORY
${formatTime(
  new Date()
)},976 INFO reduce.InMemoryMapOutput: Read 6065 bytes from map-output for attempt_local729097160_0001_m_000000_0
${formatTime(
  new Date()
)},977 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 6065, inMemoryMapOutputs.size() -> 8, commitMemory -> 13692, usedMemory ->19757
${formatTime(
  new Date()
)},978 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000002_0 decomp: 2376 len: 2380 to MEMORY
${formatTime(
  new Date()
)},978 INFO reduce.InMemoryMapOutput: Read 2376 bytes from map-output for attempt_local729097160_0001_m_000002_0
${formatTime(
  new Date()
)},978 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 2376, inMemoryMapOutputs.size() -> 9, commitMemory -> 19757, usedMemory ->22133
${formatTime(
  new Date()
)},979 INFO reduce.LocalFetcher: localfetcher#1 about to shuffle output of map attempt_local729097160_0001_m_000009_0 decomp: 938 len: 942 to MEMORY
${formatTime(
  new Date()
)},980 INFO reduce.InMemoryMapOutput: Read 938 bytes from map-output for attempt_local729097160_0001_m_000009_0
${formatTime(
  new Date()
)},980 INFO reduce.MergeManagerImpl: closeInMemoryFile -> map-output of size: 938, inMemoryMapOutputs.size() -> 10, commitMemory -> 22133, usedMemory ->23071
${formatTime(
  new Date()
)},985 INFO reduce.EventFetcher: EventFetcher is interrupted.. Returning
${formatTime(new Date())},985 INFO mapred.LocalJobRunner: 10 / 10 copied.
${formatTime(
  new Date()
)},985 INFO reduce.MergeManagerImpl: finalMerge called with 10 in-memory map-outputs and 0 on-disk map-outputs
${formatTime(new Date())},993 INFO mapred.Merger: Merging 10 sorted segments
${formatTime(
  new Date()
)},993 INFO mapred.Merger: Down to the last merge-pass, with 10 segments left of total size: 23011 bytes
${formatTime(
  new Date()
)},006 INFO reduce.MergeManagerImpl: Merged 10 segments, 23071 bytes to disk to satisfy reduce memory limit
${formatTime(
  new Date()
)},006 INFO reduce.MergeManagerImpl: Merging 1 files, 23057 bytes from disk
${formatTime(
  new Date()
)},016 INFO reduce.MergeManagerImpl: Merging 0 segments, 0 bytes from memory into reduce
${formatTime(new Date())},016 INFO mapred.Merger: Merging 1 sorted segments
${formatTime(
  new Date()
)},017 INFO mapred.Merger: Down to the last merge-pass, with 1 segments left of total size: 23047 bytes
${formatTime(new Date())},018 INFO mapred.LocalJobRunner: 10 / 10 copied.
${formatTime(
  new Date()
)},059 INFO Configuration.deprecation: mapred.skip.on is deprecated. Instead, use mapreduce.job.skiprecords
${formatTime(
  new Date()
)},146 INFO mapred.Task: Task:attempt_local729097160_0001_r_000000_0 is done. And is in the process of committing
${formatTime(new Date())},147 INFO mapred.LocalJobRunner: 10 / 10 copied.
${formatTime(
  new Date()
)},148 INFO mapred.Task: Task attempt_local729097160_0001_r_000000_0 is allowed to commit now
${formatTime(
  new Date()
)},161 INFO output.FileOutputCommitter: Saved output of task 'attempt_local729097160_0001_r_000000_0' to hdfs://localhost:9000/wordcount_output
${formatTime(new Date())},162 INFO mapred.LocalJobRunner: reduce > reduce
${formatTime(
  new Date()
)},162 INFO mapred.Task: Task 'attempt_local729097160_0001_r_000000_0' done.
${formatTime(
  new Date()
)},162 INFO mapred.Task: Final Counters for attempt_local729097160_0001_r_000000_0: Counters: 30
	File System Counters
		FILE: Number of bytes read=337192
		FILE: Number of bytes written=1054449
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=32413
		HDFS: Number of bytes written=10913
		HDFS: Number of read operations=28
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=3
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Combine input records=0
		Combine output records=0
		Reduce input groups=641
		Reduce shuffle bytes=23111
		Reduce input records=1358
		Reduce output records=641
		Spilled Records=1358
		Shuffled Maps =10
		Failed Shuffles=0
		Merged Map outputs=10
		GC time elapsed (ms)=0
		Total committed heap usage (bytes)=1148715008
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Output Format Counters 
		Bytes Written=10913
${formatTime(
  new Date()
)},163 INFO mapred.LocalJobRunner: Finishing task: attempt_local729097160_0001_r_000000_0
${formatTime(
  new Date()
)},163 INFO mapred.LocalJobRunner: reduce task executor complete.
${formatTime(new Date())},579 INFO mapreduce.Job:  map 100% reduce 100%
${formatTime(
  new Date()
)},579 INFO mapreduce.Job: Job job_local729097160_0001 completed successfully
${formatTime(new Date())},590 INFO mapreduce.Job: Counters: 36
	File System Counters
		FILE: Number of bytes read=3212382
		FILE: Number of bytes written=11310166
		FILE: Number of read operations=0
		FILE: Number of large read operations=0
		FILE: Number of write operations=0
		HDFS: Number of bytes read=308732
		HDFS: Number of bytes written=10913
		HDFS: Number of read operations=168
		HDFS: Number of large read operations=0
		HDFS: Number of write operations=13
		HDFS: Number of bytes read erasure-coded=0
	Map-Reduce Framework
		Map input records=863
		Map output records=3575
		Map output bytes=43922
		Map output materialized bytes=23111
		Input split bytes=1079
		Combine input records=3575
		Combine output records=1358
		Reduce input groups=641
		Reduce shuffle bytes=23111
		Reduce input records=1358
		Reduce output records=641
		Spilled Records=2716
		Shuffled Maps =10
		Failed Shuffles=0
		Merged Map outputs=10
		GC time elapsed (ms)=24
		Total committed heap usage (bytes)=8356102144
	Shuffle Errors
		BAD_ID=0
		CONNECTION=0
		IO_ERROR=0
		WRONG_LENGTH=0
		WRONG_MAP=0
		WRONG_REDUCE=0
	File Input Format Counters 
		Bytes Read=32413
	File Output Format Counters 
		Bytes Written=10913
${settings.username}@${
    settings.hostname
  }:/usr/lib/hadoop/hadoop$ hdfs dfs -cat /wordcount_output/part-r-00000
"*"	27
"AS	10
"License");	10
"alice,bob	27
"clumping"	1
"full_queue_name"	1
"priority".	1
"workflowId"	1
(ASF)	1
(as	1
(or	1
(root	1
(the	10
-->	20
-1	1
-1,	1
0.0	1
1-MAX_INT.	1
1.	1
1.0.	1
2.0	10
40	2
40+20=60	1
:	2
<!--	20
</configuration>	10
</description>	36
</name>	2
</property>	70
<?xml	9
<?xml-stylesheet	4
<configuration>	10
<description>	33
<description>ACL	31
<description>Abase	1
<description>Default	1
<name>default.key.acl.DECRYPT_EEK</name>	1
<name>default.key.acl.GENERATE_EEK</name>	1
<name>default.key.acl.MANAGEMENT</name>	1
<name>default.key.acl.READ</name>	1
<name>dfs.datanode.data.dir</name>	1
<name>dfs.namenode.name.dir</name>	1
<name>dfs.replication</name>	1
<name>fs.defaultFS</name>	1
<name>hadoop.kms.acl.CREATE</name>	1
<name>hadoop.kms.acl.DECRYPT_EEK</name>	1
<name>hadoop.kms.acl.DELETE</name>	1
<name>hadoop.kms.acl.GENERATE_EEK</name>	1
<name>hadoop.kms.acl.GET</name>	1
<name>hadoop.kms.acl.GET_KEYS</name>	1
<name>hadoop.kms.acl.GET_METADATA</name>	1
<name>hadoop.kms.acl.ROLLOVER</name>	1
<name>hadoop.kms.acl.SET_KEY_MATERIAL</name>	1
<name>hadoop.tmp.dir</name>	1
<name>security.admin.operations.protocol.acl</name>	1
<name>security.applicationclient.protocol.acl</name>	1
<name>security.applicationhistory.protocol.acl</name>	1
<name>security.applicationmaster-nodemanager.applicationmaster.protocol.acl</name>	1
<name>security.applicationmaster.protocol.acl</name>	1
<name>security.client.datanode.protocol.acl</name>	1
<name>security.client.protocol.acl</name>	1
<name>security.collector-nodemanager.protocol.acl</name>	1
<name>security.containermanagement.protocol.acl</name>	1
<name>security.datanode.lifeline.protocol.acl</name>	1
<name>security.datanode.protocol.acl</name>	1
<name>security.distributedscheduling.protocol.acl</name>	1
<name>security.get.user.mappings.protocol.acl</name>	1
<name>security.ha.service.protocol.acl</name>	1
<name>security.inter.datanode.protocol.acl</name>	1
<name>security.interqjournal.service.protocol.acl</name>	1
<name>security.job.client.protocol.acl</name>	1
<name>security.job.task.protocol.acl</name>	1
<name>security.mrhs.client.protocol.acl</name>	1
<name>security.namenode.protocol.acl</name>	1
<name>security.qjournal.service.protocol.acl</name>	1
<name>security.reconfiguration.protocol.acl</name>	1
<name>security.refresh.callqueue.protocol.acl</name>	1
<name>security.refresh.generic.protocol.acl</name>	1
<name>security.refresh.policy.protocol.acl</name>	1
<name>security.refresh.user.mappings.protocol.acl</name>	1
<name>security.resourcelocalizer.protocol.acl</name>	1
<name>security.resourcemanager-administration.protocol.acl</name>	1
<name>security.resourcetracker.protocol.acl</name>	1
<name>security.router.admin.protocol.acl</name>	1
<name>security.zkfc.protocol.acl</name>	1
<name>yarn.scheduler.capacity.application.fail-fast</name>	1
<name>yarn.scheduler.capacity.maximum-am-resource-percent</name>	1
<name>yarn.scheduler.capacity.maximum-applications</name>	1
<name>yarn.scheduler.capacity.node-locality-delay</name>	1
<name>yarn.scheduler.capacity.per-node-heartbeat.maximum-offswitch-assignments</name>	1
<name>yarn.scheduler.capacity.queue-mappings-override.enable</name>	1
<name>yarn.scheduler.capacity.queue-mappings</name>	1
<name>yarn.scheduler.capacity.rack-locality-additional-delay</name>	1
<name>yarn.scheduler.capacity.resource-calculator</name>	1
<name>yarn.scheduler.capacity.root.default.acl_administer_queue</name>	1
<name>yarn.scheduler.capacity.root.default.acl_application_max_priority</name>	1
<name>yarn.scheduler.capacity.root.default.acl_submit_applications</name>	1
<name>yarn.scheduler.capacity.root.default.capacity</name>	1
<name>yarn.scheduler.capacity.root.default.default-application-lifetime	1
<name>yarn.scheduler.capacity.root.default.maximum-application-lifetime	1
<name>yarn.scheduler.capacity.root.default.maximum-capacity</name>	1
<name>yarn.scheduler.capacity.root.default.state</name>	1
<name>yarn.scheduler.capacity.root.default.user-limit-factor</name>	1
<name>yarn.scheduler.capacity.root.queues</name>	1
<name>yarn.scheduler.capacity.workflow-priority-mappings-override.enable</name>	1
<name>yarn.scheduler.capacity.workflow-priority-mappings</name>	1
<property>	70
<value>*</value>	47
<value>-1</value>	3
<value>0.1</value>	1
<value>10000</value>	1
<value>100</value>	2
<value>1</value>	3
<value>40</value>	1
<value></value>	2
<value>RUNNING</value>	1
<value>default</value>	1
<value>false</value>	3
<value>file:/usr/lib/hadoop/hadoop/tmp/dfs/data</value>	1
<value>file:/usr/lib/hadoop/hadoop/tmp/dfs/name</value>	1
<value>file:/usr/lib/hadoop/hadoop/tmp</value>	1
<value>hdfs://localhost:9000</value>	1
<value>org.apache.hadoop.yarn.util.resource.DefaultResourceCalculator</value>	1
A	29
ACL	43
ACL,	2
ACLs	1
ANY	10
ASF	1
AdminOperationsProtocol.	1
Any	2
Apache	11
ApplicationClientProtocol,	1
ApplicationHistoryProtocol,	1
ApplicationMaster	1
ApplicationMasterProtocol,	2
ApplicationMasters	3
BASIS,	10
But	1
CONDITIONS	10
CPU	1
CREATE	1
CapacityScheduler	2
ClientDatanodeProtocol,	1
ClientProtocol,	1
CollectorNodemanagerProtocol,	1
Complementary	1
Configuring	1
ContainerManagementProtocol	1
Controller	1
Controls	1
CryptoExtension	2
DECRYPT_EEK	1
DataNode	1
DatanodeLifelineProtocol,	1
DatanodeProtocol,	1
Default	3
DefaultResourceCalculator	1
DistributedFileSystem.	1
DistributedSchedulingAMProtocol,	1
DominantResourceCalculator	1
Example:	1
Failover	1
For	28
Foundation	1
GENERATE_EEK	1
GET	2
GenericRefreshProtocol,	1
GetUserMappingsProtocol,	1
HAAdmin	1
HAService	1
HDFS	1
HSClientProtocol,	1
History	1
IS"	10
If	6
In	1
Increasing	1
InterDatanodeProtocol,	1
InterQJournalProtocol,	1
It	2
JN	2
JNs	1
Job	1
KIND,	10
KMS	1
LICENSE	5
Legal	1
License	30
License,	10
License.	20
Licensed	10
Lower	1
MANAGEMENT	1
MR	2
MRClientProtocol,	1
Maximum	3
Memory	1
Memory,	1
NN	1
NOTICE	1
NameNode	1
NameNode.	1
NameNode/DataNode	1
NamenodeProtocol,	1
NodeManager	3
Nodemanager	2
Note	2
Note,	1
Number	2
OF	10
OFF_SWITCH	2
OR	10
Protocol.	1
Protocols	1
Put	6
QJournalProtocol,	1
QuorumJournalManager	1
READ	1
RM	1
ROLLOVER	1
RUNNING	1
ReconfigurationProtocol,	1
RefreshAuthorizationPolicyProtocol,	1
RefreshCallQueueProtocol,	1
RefreshUserMappingsProtocol.	1
ResourceCalculator	1
ResourceLocalizer	2
ResourceManager	3
ResourceManagerAdministrationProtocol,	1
ResourceTrackerProtocol,	1
Resourcemanager	1
Resources	1
RouterAdmin	1
STOPPED.	1
See	16
Server	1
Site	1
Software	1
State	1
TaskUmbilicalProtocol,	1
The	68
This	7
Tracker	1
Typically	1
Unless	10
Used	2
User	1
Version	10
WARRANTIES	10
WITHOUT	10
We	2
When	2
Whether	1
YARN	2
You	10
ZK	1
[user={name}	1
[u|g]:[name]:[queue_name][,next	1
[workflowId]:[full_queue_name]:[priority][,next	1
a	74
access	1
accompanying	5
account.	2
acls	4
active	1
additional	2
admin	3
administer	1
administrators	2
after	5
agreed	10
agreements.	1
all	33
allow	1
allowed	1
allowed.	1
allowed.</description>	26
also	1
an	13
and	85
any	1
applicable	12
application	11
applications	6
applications'	1
applications.	1
approximately	1
arbitrary	1
are	33
as	10
assign	1
assigning	1
assignments	3
at	12
attempt	1
attempts	2
based	1
basis	1
be	19
blank.	27
block	1
by	65
calculated	1
call	1
can	10
can't	1
capacity	1
capacity.</description>	1
case,	1
changes	1
client	2
client-to-datanode	1
clients	3
cluster	3
cluster.	1
code	1
collector	1
comma-separated	27
commands	1
commands.	2
communciate	2
communicate	12
communicate.	2
compare	2
compliance	10
concurrent	1
config	1
configuration	2
configuration.	2
configured	3
considered	2
constraint	1
container	1
containers	2
containers,	1
containers.	2
context)	1
context.	1
contributor	1
controls	1
copy	10
copyright	1
create-key	1
creating	1
currently.	1
datanodes	1
decryptEncryptedKey	1
default	14
default_priority={priority}]	1
defined.	4
delay	1
delete-key	1
dfsadmin	1
different	2
directories.</description>	1
disabled.	2
disables	2
distributed	21
dominant-resource	1
during	2
e.g,	1
e.g.	27
each	7
edit	1
either	10
enabled,	1
encoding="UTF-8"?>	6
equal	2
etc.	3
example,	1
exceed	1
exceeds	2
except	10
explicitly	4
express	10
fail	1
false.	2
feature	2
feature.	1
file	13
file.	11
for	75
from	1
generateEncryptedKey	1
generation	1
generic	1
get-current-key	1
get-key-metadata	1
get-key-version	1
get-keys	1
get-keys-metadata	1
give	1
given	1
governing	10
group	54
group={name}	1
groups.	1
hard	1
has	1
heartbeat.	1
history	1
hot-reloaded	1
href="configuration.xsl"?>	4
http://www.apache.org/licenses/LICENSE-2.0	9
https://www.apache.org/licenses/LICENSE-2.0	1
i.e.	2
if	4
ignored,	1
implementation	1
implemented	1
implied.	10
improve	1
in	41
in-effect.	1
information	1
instead	1
inter-datanode	1
into	2
is	96
it	4
job	4
jobs	4
key	7
key.	1
killed	1
killing	1
language	10
law	10
leaf	2
less	2
level	1
license	1
licenses	1
lifeline	1
lifetime	6
lifetime.	3
limit	2
limitations	10
list	59
locality	1
locations	1
logs.</description>	1
longer	1
low	1
manage	1
map	2
mapped	1
mapping	2
mapping]*	2
mappings	2
mappings.	1
maps	2
masters	1
material	3
max_priority={priority}	1
maximum	3
may	20
means	27
messages	1
missed	5
more	1
mradmin	1
multi-dimensional	1
name	1
namenode	1
namenode.	2
namenode.</description>	1
names.	27
no	1
node's	1
node-locality-delay	1
node-locality-delay=40	1
nodemanager	2
nodes	1
nodes.	1
not	19
number	6
obtain	10
of	91
off-switch	3
on	13
one	5
ones,	1
ones.	1
only	3
operations	5
operations.	8
opportunities	3
opportunities,	1
opportunities.	1
or	25
other	2
other.	7
over	1
overridden	1
override	3
overrides	6
ownership.	1
parameter,	2
parent	1
part	2
particular	1
pending	1
per	1
percent	1
percentage	1
permissions	10
place	1
point-in-time	2
policy	1
positive	1
present,	2
previous	1
priority	3
priority.	2
properties	1
property	6
protocol	4
protocol,	2
provide	1
query	1
queue	10
queue).	1
queue.	7
queues	4
queues,	1
rack-local	3
rack-locality-delay=20,	1
rack.	1
rate	1
recovery	1
recovery.	1
reduce	2
refresh	4
refreshable.	1
regarding	1
reload	1
request	1
request,	1
required	10
resource	1
resources	2
response.	2
restarting	1
result	1
returned	2
rolling	1
rollover-key	1
root	1
run	1
running	1
running.	1
runtime.	1
same	1
schedule	2
scheduler	1
scheduler.	1
scheduling	3
scheduling.	1
secondary	1
seconds.	2
security	1
send	1
separated	27
server	1
service	2
setting	2
should	3
site-specific	6
size	3
software	10
sooner.	1
special	27
specific	11
specified	6
specify	1
stand-by	1
state	1
states	1
status	2
submission	3
submit	2
submitted	5
such	1
syntax	2
taken	2
taken.	1
target	1
tasks	1
tasktracker.	1
temporary	1
than	4
that	9
the	153
them.	1
then	2
things	1
this	31
time	1
timeline	3
timestamp.	1
to	62
to)	1
too	1
type="text/xsl"	4
u:%user:%user	1
under	31
unique	1
updating	1
use	13
used	30
user	60
user.	3
user?	2
users	31
users,wheel".	27
uses	2
using	1
v2	1
valid.	1
value	37
value,	2
values	2
version="1.0"	6
version="1.0"?>	3
via	1
well	1
when	3
where	1
which	14
while	1
who	3
will	15
with	29
without	1
work	1
workflowId	1
writing,	10
you	11
zero	2
${settings.username}@${settings.hostname}:/usr/lib/hadoop/hadoop$ 
`,
});

// const writes = reactive(
//   () => `

// );

export default experiments;
