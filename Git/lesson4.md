## push到远程仓库

1. git remote 查看远程仓库名称 git remote -v 查看远程仓库地址

2. git push origin master （master是分支）



## github 添加新的协作人员
右上角+号下面有个 New collaborator

- git fetch ： 不合并，查看冲突手动合并
    - git diff master origin/master
    - git merge origin/master

- git pull ： 直接合并

