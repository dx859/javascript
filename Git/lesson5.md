## git分支管理

- git branch : 查看分支
- git branch name : 添加分支
- git checkout name : 切换分支
- git checkout -b name : 添加并且切换分支

- git merge new1 : 快速合并分支


```
                        master（分支） （git merge new1）
                            |              |
版本1 -> 版本2 -> 版本3 -> 版本4           |
                            |              |
                        new1（分支）-> 版本5
                            |
                        new2（分支）-> 版本6


```

- git branch --merged : 当前分支下面所合并的分支
- git branch --no-merged : 当前分支下面没有合并的分支
- git branch -d name : 删除分支


## 解决分支冲突
[master +0 ~0 -0 !1 | +0 ~0 -0 !1]>
! 符号表示冲突的文件数量

## github的分支
git tag v1.0 : 打标签

push origin v1.0 : 同步标签

## 在github上创建博客

[教程地址](https://pages.github.com)

1.新建仓库，名字为 name.github.io 
    
    注意：名字必须与账户名一致
