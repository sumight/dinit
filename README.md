# dinit 目录初始化工具
dinit 是一个用来初始化目录的工具，目的是提高前端的工作效率，但是不限于前端使用。

dinit 可以定义自己的目录模板，然后在一个空的目录中用模板来初始化目录

## 安装

```shell
~ npm i -g dinit 
```

## 查看和设置模板仓库的位置

```shell
~ dinit where --path /Users/apple/tpls
```

设置模板仓库位置为`/Users/apple/tpls`

```shell
~ dinit where
```

查看当前模板仓库位置

## 罗列出现有模板

```shell
~ dinit ls
```

罗列当前模板仓库中的所有模板

## 初始化当前目录

```shell
~ dinit init tplname
```

初始化当前目录，其中 tplname 是你用来初始化这个目录的模板名称

## 清除当前目录

```shell
~ dinit clean
```

这会删除当前目录下面所有的问题件，请谨慎使用

## 定义模板

完整的步骤如下：

1. 第一次使用指定模板仓库的位置
2. cd 到模板仓库目录
3. 创建并进入一个以模板名命名的目录
3. 用模板模板，初始化当前目录
4. 定义自己的模板
5. 校验模板

### 用模板模板初始化模板目录

这个听起来有点拗口，工具有一个预定义的特殊模板叫做 tpl,这个模板用来将当前目录初始化为一个模板。

步骤如下

```shell
~ cd <模板仓库>
~ mkdir <模板名>
~ cd <模板名>
~ dinit init tpl
```

### 定制模板

**注意**：在初始化模板目录(dinit init tpl) 之后, 请查看 config.js 文件来获取如何定义模板的信息

模板中有两个必须的文件

- config.js
- template

**config.js** 中对模板做一些用户自定义配置

**template** 目录中存放模板目录本体

#### 定义 cofnig.js

**config.userInputs** 对用户信息的输入进行定义，在在目录初始化的时候会要求用户输入对应信息，用户输入之后这些信息会以key-value存储在 `userdata`

**config.beforeRender.<path\>** 在 <path\> 文件渲染之前对其进行处理的函数，在函数中可以对文件内容，`userdata`，进行修改。具体用法见初始化模板目录(dinit init tpl)之后的config.js文件。

**config.beforeRender.<path\>** 用法类似

#### 定义 template

template 目录下存放模板的实际文件，在这些文件中可以用`{{value}}`的形式插入变量，变量可以插入到文件内，也可以插入到文件名中。渲染之后这些变量会被`userdata`替代。具体用法见初始化模板目录(dinit init tpl)之后的config.js文件。

### 校验自定义的模板

在模板定义完成之后，切换到模板文件目录下，执行校验命令

```shell
~ dinit check
```

校验命令会对 config.js 文件内容进行校验。