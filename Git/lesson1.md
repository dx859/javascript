## 建立一个库

拷贝github上的项目到本地：git clone [url]

设置贡献者
- git config --global user.name
- git config --global user.email
- git config --list >> 查看所有配置项目

**注意：**后面跟上用户名等就是设置，没有就是查看

## git的三个区

git分为工作区，暂存区，版本区来管理
[master] => 主分区的默认名字

- 工作区

- 暂存区
    - 作物过度层
    - 避免误操作
    - 保护工作区和版本区
    - 分支处理

- 版本区（库）

```
-------------           ------------          -----------
|           |           |          |          |         |
|  工作区   |  ----->   |  暂存区  | ----->   | 版本库  |
|           |           |          |          |         |
|           |           |          |          |         |
-------------           ------------          -----------

```

## git简单命令使用
git status : 查看当前版本状态

表示有4个文件没有添加到版本库
```
D:\notes\JavaScriptNote [master +4 ~0 -0 !]> git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        .gitignore
        Git/
        README.md
        SUMMARY.md
```

1. [master +4 ~0 -0 !]: 红色表示表示工作区有4个新的文件，0个修改，减少了0个文件  

2. 运行 git add .

3. [master +4 ~0 -0]: 此时颜色变成绿色，表示暂存区，添加4个文件，0个修改，减少0个文件，此时看不到红色，表示工作区已经干净了

4. 修改一个文件：[master +4 ~0 -0 | +0 ~1 -0] ，前面绿色表示暂存区，红色表示工作区。

5. 提交到版本区：git commit
    
    此时会弹出一个编辑器来说明提交到版本库的简介

    git命令行变成[master]> ： 表示版本区干净了

注意：
- git add . ：表示提交所有添加、修改、删除的文件
- git commit -m "xxx" ：快速提交并且说明
- git commit -a -m "add and commit in one step" ： add 和 commit一步完成（其实还是两部，只不过是简写方式）


6. git log : 查看