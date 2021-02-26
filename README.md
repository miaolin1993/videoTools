## 一. 前言



**1. 软件功能:**  自定义视频播放菜单 (自己写css播放菜单样式, 通过该插件添加相应功能)

**2.实现过程**: 利用原生js实现, 对内置video的dom, 进行二次封装优化, 更加方便使用

**3.核心文件:** js目录下的tools.js文件



## 二. 文件夹目录说明

| 文件夹 |     内容     |       说明       |
| :----: | :----------: | :--------------: |
|   js   | flexible.js  | 做适配的js(无用) |
|        |   main.js    |   展示使用的js   |
|        | **tools.js** |  ***核心文件***  |

可以通过修改video的src切换播放视频源, 提供的样式仅作演示

**核心功能文件是js目录下的tools.js文件**



## 三. 版本及更新说明

| 版本号 |             内容              |    时间    |
| :----: | :---------------------------: | :--------: |
|  v1.0  | video核心功能, 细节看下面文档 | 2020/11/16 |



## 四. 使用说明



**1. html结构:**  

需要为video视频标签添加一个父盒子,  这样全屏的时候, 全屏的是父盒子, 视频及视频控件的内容, 都在这个父盒子里,  从而保证视频全屏后, 自定义播放控件不会被默认控件覆盖)

```
<div class="box">
	<video src="">
	视频控件相关代码,如播放菜单,播放按钮,进度条等等都在这个父盒子下面
</div>
```

**2. 引入tools.js文件**

```
<script src='./js/tools.js'></script>
```

**3. 实例化video** 

实例化默认采用的是document.querySelector(*selector*)方法, 所以传入的参数必须且只能是一个video视频节点,  实例化的时候会自动为视频添加预加载功能preload="auto" 

```
let video = new VideoTools('.box video');
```

实例后便可以使用video下面的属性和方法了, 具体如下表, 参数前有*的,为必写参数



|         方法          |   参数    |                             描述                             |
| :-------------------: | :-------: | :----------------------------------------------------------: |
|    start(callback)    | *callback | 检测视频可播放状态,当视频加载完成可以播放时, 执行callback函数内容 |
|     end(callback)     | *callback |       检测视频是否播放结束, 播放结束时执行callback函数       |
| time_update(callback) | *callback | 检测视频播放时间是否发生变化, 当播放时间发生变化时执行callback函数 |
|    click(callback)    | *callback |        检测是否点击了视频画面, 点击时执行callback函数        |
|      is_pause()       |     -     |          检测当前视频是否处于暂停状态, 返回布尔结果          |
|        play()         |     -     |                           开始播放                           |
|        pause()        |     -     |                           点击暂停                           |
|      speed_now()      |     -     |                     获取视频当前播放速度                     |
|    speed_set(num)     |   *num    |           设置视频播放速度, 参数num的值为0 - 1之间           |
|     speed_up(max)     |   *max    |          加快视频播放速度. 参数为允许的最大播放倍数          |
|  speed_down (*min*)   |   *min    |          减慢视频播放速度,参数为允许的最小播放倍数           |
|     fullscreen()      |     -     |                             全屏                             |
|   exitfullscreen()    |     -     |                           退出全屏                           |
|  togglefullscreen()   |     -     |                      切换全屏与退出全屏                      |
|       vol_now()       |     -     |                         获取当前音量                         |
|     set_vol(num)      |     -     |                     设置视频音量(0 - 1)                      |
|       vol_up()        |     -     |                            音量加                            |
|      vol_down()       |     -     |                            音量减                            |
|      vol_check()      |     -     |                  检测是否静音,返回布尔结果                   |
|       vol_off()       |     -     |                       设置当前视频静音                       |
|       vol_on()        |     -     |                       取消当前视频静音                       |
|        load()         |     -     | 获取当前视频已缓冲的长度,返回结果是百分比的,可以直接赋值给缓冲条的宽度 |
|         bar()         |     -     |                        已经播放的时长                        |
|        hour()         |     -     | 获取当前视频的总小时数(固定两位数,如果是单数自动在前面加0,一小时就是01) |
|       minutes()       |     -     | 获取当前视频总分钟数,  不足两位自动前面加0, 得到取整后两位数 |
|       seconds()       |     -     |  获取当前视频总秒数, 不足两位自动前面加0, 得到取整后两位数   |
|       current()       |     -     |          获取格式化后的当前播放时长,格式为00:00:00           |
|        total()        |     -     |           获取格式化后的视频总时长,格式为00:00:00            |



## 五. 缺失待完善功能

记录下video视频控件本应该有,但在本次没能实现的功能

1. 视频没加载完成时的预加载旋转特效
2. 视频显示类型的切换(标清, 高清, 2K)
3. 预加载的缓冲条, 仅在不点进度条快进时显示正常, 一但点了进度条进行跳转,缓冲条就显示不正常了





