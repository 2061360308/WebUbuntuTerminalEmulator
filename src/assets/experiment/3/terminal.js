import { reactive } from "vue";
import settings from "@/assets/settings";

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
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop/sbin$ hadoop version
Hadoop 3.4.2
${settings.username}@${settings.hostname}:/lib/hadoop/hadoop/sbin$ cd ~
${settings.username}@${settings.hostname}:~$ sudo tar -zxf hbase-2.6.4-hadoop3-bin.tar.gz  -C /usr/local
${settings.username}@${settings.hostname}:~$ ls /usr/local
aegis  bin  cloudmonitor  eclipse  etc  games  hadoop  hbase-2.6.4-hadoop3  ilogtail  include  lib  man  sbin  share  src
${settings.username}@${settings.hostname}:~$ sudo mv /usr/local/hbase-2.6.4-hadoop3 /usr/local/hbase
${settings.username}@${settings.hostname}:~$ ls /usr/local
aegis  bin  cloudmonitor  eclipse  etc  games  hadoop  hbase  ilogtail  include  lib  man  sbin  share  src
${settings.username}@${settings.hostname}:~$ cd /usr/local/hbase
${settings.username}@${settings.hostname}:/usr/local/hbase/bin$ ./start-hbase.sh
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/usr/local/hbase/lib/client-facing-thirdparty/log4j-slf4j-impl-2.17.2.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/slf4j-reload4j-1.7.36.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [org.apache.logging.slf4j.Log4jLoggerFactory]
running master, logging to /usr/local/hbase/bin/../logs/hbase-${settings.username}-master-${settings.hostname}.out
${settings.username}@${settings.hostname}:/usr/local/hbase/bin$ jps
33505 HMaster
7233 SecondaryNameNode
6955 DataNode
6782 NameNode
33999 Jps
${settings.username}@${settings.hostname}:/usr/local/hbase/bin$ ./hbase shell
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/usr/local/hbase/lib/client-facing-thirdparty/log4j-slf4j-impl-2.17.2.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/usr/lib/hadoop/hadoop/share/hadoop/common/lib/slf4j-reload4j-1.7.36.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [org.apache.logging.slf4j.Log4jLoggerFactory]
HBase Shell
Use "help" to get list of supported commands.
Use "exit" to quit this interactive shell.
For Reference, please visit: http://hbase.apache.org/2.0/book.html#shell
Version 2.6.4-hadoop3, r67f414cfed130bf6325570463ed36ea7d45aebc5, Mon Nov  3 19:30:14 PST 2025
Took 0.0012 seconds    
hbase:001:0> create 'student','Sname','Ssex','Sage','Sdept','course'
Created table student
Took 1.2599 seconds                                                                                                                    
=> Hbase::Table - student
hbase:002:0> describe 'student'
Table student is ENABLED                                                                                                               
student, {TABLE_ATTRIBUTES => {METADATA => {'hbase.store.file-tracker.impl' => 'DEFAULT'}}}                                            
COLUMN FAMILIES DESCRIPTION                                                                                                            
{NAME => 'Sage', INDEX_BLOCK_ENCODING => 'NONE', VERSIONS => '1', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE', TTL => 
'FOREVER', MIN_VERSIONS => '0', REPLICATION_SCOPE => '0', BLOOMFILTER => 'ROW', IN_MEMORY => 'false', COMPRESSION => 'NONE', BLOCKCACHE
 => 'true', BLOCKSIZE => '65536 B (64KB)'}                                                                                             

{NAME => 'Sdept', INDEX_BLOCK_ENCODING => 'NONE', VERSIONS => '1', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE', TTL =>
 'FOREVER', MIN_VERSIONS => '0', REPLICATION_SCOPE => '0', BLOOMFILTER => 'ROW', IN_MEMORY => 'false', COMPRESSION => 'NONE', BLOCKCACH
E => 'true', BLOCKSIZE => '65536 B (64KB)'}                                                                                            

{NAME => 'Sname', INDEX_BLOCK_ENCODING => 'NONE', VERSIONS => '1', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE', TTL =>
 'FOREVER', MIN_VERSIONS => '0', REPLICATION_SCOPE => '0', BLOOMFILTER => 'ROW', IN_MEMORY => 'false', COMPRESSION => 'NONE', BLOCKCACH
E => 'true', BLOCKSIZE => '65536 B (64KB)'}                                                                                            

{NAME => 'Ssex', INDEX_BLOCK_ENCODING => 'NONE', VERSIONS => '1', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE', TTL => 
'FOREVER', MIN_VERSIONS => '0', REPLICATION_SCOPE => '0', BLOOMFILTER => 'ROW', IN_MEMORY => 'false', COMPRESSION => 'NONE', BLOCKCACHE
 => 'true', BLOCKSIZE => '65536 B (64KB)'}                                                                                             

{NAME => 'course', INDEX_BLOCK_ENCODING => 'NONE', VERSIONS => '1', KEEP_DELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE', TTL =
> 'FOREVER', MIN_VERSIONS => '0', REPLICATION_SCOPE => '0', BLOOMFILTER => 'ROW', IN_MEMORY => 'false', COMPRESSION => 'NONE', BLOCKCAC
HE => 'true', BLOCKSIZE => '65536 B (64KB)'}                                                                                           

5 row(s)
Quota is disabled
Took 0.1349 seconds                                                                                                                    
hbase:003:0> list
TABLE                                                                                                                                  
student                                                                                                                                
1 row(s)
Took 0.0174 seconds                                                                                                                    
=> ["student"]
hbase:004:0> put 'student','95001','Sname','LiYing'
Took 0.0741 seconds                                                                                                                    
hbase:005:0> put 'student','95001','Ssex','male'
Took 0.0047 seconds                                                                                                                    
hbase:006:0> put 'student','95001','Sage','22'
Took 0.0047 seconds                                                                                                                    
hbase:007:0> put 'student','95001','Sdept','CS'
Took 0.0045 seconds                                                                                                                    
hbase:008:0> put 'student','95001','course:math','80'
Took 0.0041 seconds                                                                                                                    
hbase:009:0> get 'student','95001'
COLUMN                             CELL                                                                                                
 Sage:                             timestamp=2025-12-01T23:34:32.461, value=22                                                         
 Sdept:                            timestamp=2025-12-01T23:34:38.840, value=CS                                                         
 Sname:                            timestamp=2025-12-01T23:34:14.736, value=LiYing                                                     
 Ssex:                             timestamp=2025-12-01T23:34:24.788, value=male                                                       
 course:math                       timestamp=2025-12-01T23:34:45.983, value=80                                                         
1 row(s)
Took 0.0268 seconds                                                                                                                    
hbase:010:0> scan 'student'
ROW                                COLUMN+CELL                                                                                         
 95001                             column=Sage:, timestamp=2025-12-01T23:34:32.461, value=22                                           
 95001                             column=Sdept:, timestamp=2025-12-01T23:34:38.840, value=CS                                          
 95001                             column=Sname:, timestamp=2025-12-01T23:34:14.736, value=LiYing                                      
 95001                             column=Ssex:, timestamp=2025-12-01T23:34:24.788, value=male                                         
 95001                             column=course:math, timestamp=2025-12-01T23:34:45.983, value=80                                     
1 row(s)
Took 0.0153 seconds                                                                                                                    
hbase:011:0> delete 'student','95001','Ssex'
Took 0.0060 seconds                                                                                                                    
hbase:012:0> deleteall 'student','95001'
Took 0.0041 seconds                                                                                                                    
hbase:013:0> disable 'student'
Took 4.1654 seconds                                                                                                                    
hbase:014:0> drop 'student'
Took 0.3510 seconds                                                                                                                    
hbase:015:0> list
TABLE                                                                                                                                  
0 row(s)
Took 0.0059 seconds                                                                                                                    
=> []
hbase:016:0> create 'teacher' ,{NAME=>'username', VERSIONS=>5}
Created table teacher
Took 1.1211 seconds                                                                                                                    
=> Hbase::Table - teacher
hbase:017:0> put 'teacher','91001','username','Mary'
Took 0.0075 seconds                                                                                                                    
hbase:018:0> put 'teacher','91001','username','Mary1'
Took 0.0034 seconds                                                                                                                    
hbase:019:0> put 'teacher','91001','username','Mary2'
Took 0.0048 seconds                                                                                                                    
hbase:020:0> put 'teacher','91001','username','Mary3'
Took 0.0035 seconds                                                                                                                    
hbase:021:0> put 'teacher','91001','username','Mary4'
Took 0.0036 seconds                                                                                                                    
hbase:022:0> put 'teacher','91001','username','Mary5'
Took 0.0030 seconds                                                                                                                    
hbase:023:0> get 'teacher','91001',{COLUMN=>'username',VERSIONS=>5}
COLUMN                             CELL                                                                                                
 username:                         timestamp=2025-12-01T23:38:12.729, value=Mary5                                                      
 username:                         timestamp=2025-12-01T23:38:12.712, value=Mary4                                                      
 username:                         timestamp=2025-12-01T23:38:12.694, value=Mary3                                                      
 username:                         timestamp=2025-12-01T23:38:12.673, value=Mary2                                                      
 username:                         timestamp=2025-12-01T23:38:12.644, value=Mary1                                                      
1 row(s)
Took 0.0083 seconds                                                                                                                    
hbase:024:0> get 'teacher','91001',{COLUMN=>'username',VERSIONS=>5}
COLUMN                             CELL                                                                                                
 username:                         timestamp=2025-12-01T23:38:12.729, value=Mary5                                                      
 username:                         timestamp=2025-12-01T23:38:12.712, value=Mary4                                                      
 username:                         timestamp=2025-12-01T23:38:12.694, value=Mary3                                                      
 username:                         timestamp=2025-12-01T23:38:12.673, value=Mary2                                                      
 username:                         timestamp=2025-12-01T23:38:12.644, value=Mary1                                                      
1 row(s)
Took 0.0118 seconds                                                                                                                    
hbase:025:0> exit
${settings.username}@${settings.hostname}:/usr/local/hbase/bin$`,
});

export default experiments;
