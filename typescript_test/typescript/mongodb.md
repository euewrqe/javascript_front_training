
json->bson
//启动服务
mongod --dbpath /mongo_data/
连接
mongo --host 127.0.0.1 --port 27017
mongo 127.0.0.1:27017/admin


mongodb术语：
表: 集合list
表的一行数据: 文档document
表字段: 键key
字段值: 值value
主外键：无
灵活度扩展性：极高


查询find，基于BSON


创建数据库:
use [数据库名]
如果不save，自动删除
插入一条数据
```
db.persons.insert({name: "zhangsan", age:20})
```

db表示当前数据库

显示所有数据库
```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
my_db   0.000GB
```
显示当前数据库的所有集合
```
> show collections
collection1
persons
```
查询
```
db.persons.find();
db.persons.find({"name" : "zhangshan"});
```
更新
```
db.persons.update({name: "xxx"}, {$set:{name:"xxx"}});  // $set, $inc, $unset

$push追加，变成数组
db.persons.update({name: "xxx"}, {$push:{name:"yyy"}});  {name:["xxx", "yyy"]}
$pushAll, $pop
$each
```
删除记录
```
db.persons.remove({})
```

删除当前数据库
```
db.dropdatabase()
```
数据库和集合命名规范:
1,不能是空字符串
2,不得含有特殊符号
3,应该全部小写
4,最多64个字节

db.getCollection("person1")->table

可以存储javascript函数，数组，内嵌文档

批量操作使用for循环

db.runCommand({
    "findAndModify": "persons",
    "query": {"name": "333"},
    "update":{$set:{"age":100}},
    "new": true
})


查找 

创建唯一值
ensureIndex({name:-1}, {unique:true}): 把Name作为唯一索引插入到最后一列
ensureIndex({gis:"2d"}, {min:-1, max:200})
db.runCommand({
    dropIndexes: "foobar", index: "name_-1"
})

2d索引
[{
    "gis": {
        x:xxx,
        y:xxx
    }
}]


find({gis:{$near:[70,180]}}).limit(3)
find().count()
find().sort({$natural:-1})
find({gis:$within:{$box[[50,50], [180,180]]}, {})
参数二：排除

db.runCommand({distinct:"person", key: "country"})  查询在person集合中有多少country
分组:
db.runCommand({group: {
    ng: "persons",  //表名
    key: {"country": true},
    $reduce: function(doc, prev ){

    }
    condition: {m:$gt:9}
}})

固定集合:
createCommand({"", {size:100, capped:true, max:10}})