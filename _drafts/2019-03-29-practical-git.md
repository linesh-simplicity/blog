---
title: 程序员元技能（一）：Git
---

## 目录

基本场景

* 如何经常与主干保持同步？ `git rebase master`
* 如何切换到一条新的分支上工作？ `git checkout -b <branch>`
* rebase 过主分支以后，如何同步到远端分支？ `git push -f origin <branch>`
* 提交比较琐碎，如何在 push 前合并类似提交？ `git rebase -i .p.f`
* 如何修改两个提交前的提交信息？ `git rebase -i .r`
* 在做一件主事的时候，突然要做另外一件不相干，但是随时想做的事？ `git commit --fixup <hash>` `git rebase -i --autosquash` / `git rebase - i` 也可以啦
* merge 要卡号限制，无法正常提交？ `git merge --squash <branch>` / `git rebase -i` 也可以解决。看来 `git rebase -i` 真是 push 之前最最强大的工具

复杂场景

* 叶豪那个场景？
* 很久没合并主分支，并且已经合并出错、修复了大量冲突，此时 master 又有更新，如果再 merge 一次，将会极为混乱，如何处理？
* 以 merge 方式合并 release 分支，需要多次合并的话怎么办呢

配套实践

* check-in dance
  * run local build
  * commit
  * check ci
  * git pull --rebase
  * run local build(automated by git hooks)
  * git push
  * check ci(necessary cause ci run something else)
* not good behaviour
  * commit
  * git pull --rebase
  * gp
* github flow / trunk based development
* tasking

小步有啥好处呢？

* revert 起来非常方便 - 通常 revert 场景也只会出现在主干分支、小步提交的团队，大步的提交没法 revert，不主干分支 revert 往往也极麻烦，能 PR 成功说明已经经过繁重的流程
* 消灭调试。上一个提交，你一定要保证可以运行；有了这个保证以后，再也不会本地一坨文件，不好好测试一番根本无法保证功能正确，并且不知道应该提交哪些；做错了，随时切换掉，以更小的步子重做即可，根本不需要考虑为啥会出错（JS 同一文件里 import 继承了自己的类的例子）

##
