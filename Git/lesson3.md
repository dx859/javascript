## 删除

- git rm file.name
    工作区删除了一个文件，但是暂存区还有的话可以用此命令删除缓存区文件

- git rm -f file.name
    同时删除工作区和缓存区的文件

- git rm --cached file.name
    只删除工作区但是不缓存区的文件

## 恢复
- git checkout commit_id file.name
    从版本区恢复到工作区（对指定文件还原）

- git reset --hard commit_id 
    从版本区全部恢复到工作区（对版本的还原）
    - HEAD^ 
        HEAD其实就是一个指针，这表示往回回一个版本
    - HEAD~<num>
        往回回多个版本
    git reset --hard HEAD~2

- git reflog
    查看提交信息，包括已经回退的版本信息
    