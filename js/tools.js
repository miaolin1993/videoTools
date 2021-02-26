class VideoTools {
  constructor (selector) {
    this.node = document.querySelector(selector);
    // 初始化视频预加载
    this.node.setAttribute('preload', 'auto');
  }
  // 检测视频播放状态
  is_pause () {
    return this.node.paused
  }
  // 点击播放
  play () {
    this.node.play();
  }
  // 点击暂停
  pause() {
    this.node.pause();
  }
  // 获取当前视频播放速度
  speed_now () {
    return this.node.playbackRate;
  }
  // 设置视频播放速度
  speed_set (num) {
    this.node.playbackRate = num;
  }
  // 加快视频播放速度,参数为上限值
  speed_up (max) {
    if (this.speed_now() < max) {
      return this.node.playbackRate += 0.1;
    }
    this.speed_set(max)
  }
  // 减慢视频播放速度,参数为下限值
  speed_down (min) {
    if (this.speed_now() > min ) {
      return this.node.playbackRate -= 0.1;
    }
    this.speed_set(min)
  }
  // 点击全屏
  fullscreen () {
    this.node.parentNode.webkitRequestFullScreen();
  }
  // 退出全屏
  exitfullscreen () {
    document.webkitCancelFullScreen();
  }
  // 点击切换退出全屏
  togglefullscreen () {
    let node = this.node.parentNode;
    if (document.fullscreenElement === node) {
      document.webkitCancelFullScreen();
    } else {
      node.webkitRequestFullScreen();
    }
  }
  // 当前音量
  vol_now () {
    return this.node.volume;
  }
  // 设置音量
  set_vol (num) {
    this.node.volume = num;
  }
  // 音量加
  vol_up () {
    let up = (this.node.volume).toFixed(1);
    up = +up + 0.1;
    up < 1 ? this.node.volume = up : this.node.volume = 1;
  }
  // 音量减
  vol_down () {
    let down = (this.node.volume).toFixed(1);
    down = +down - 0.1;
    down > 0 ? this.node.volume = down : this.node.volume = 0;
  }
  // 检测是否静音
  vol_check () {
    return this.node.muted;
  }
  // 静音
  vol_off () {
    return this.node.muted = true;
  }
  // 取消静音
  vol_on () {
    return this.node.muted = false;
  }
  // 获得当前视频缓冲条长度
  load () {
    if (this.node.buffered.length > 0) {
      let time = Math.floor(this.node.buffered.end(0));
      return time / Math.floor(this.node.duration) * 100 + '%'; 
    }
  }
  // 已播放时长
  bar () {
    return this.node.currentTime / this.node.duration * 100;
  }
  // 获得视频小时数
  hour () {
    let time = Math.floor(this.node.currentTime / 3600);
    return time < 10 ? '0' + time : time;
  }
  // 获得视频分钟
  minutes () {
    let time = Math.floor(this.node.currentTime / 60);
    return time < 10 ? '0' + time : time;
  }
  // 获得视频秒钟
  seconds () {
    let time = Math.floor(this.node.currentTime % 60);
    return time < 10 ? '0' + time : time;
  }
  // 获得视频当前播放时长
  current () {
    return this.hour() +':'+this.minutes() + ':' + this.seconds()
  }
  // 获得视频总时长
  total () {
    let h = Math.floor(this.node.duration / 3600);
    let m = Math.floor(this.node.duration / 60);
    let s = Math.floor(this.node.duration % 60);
    return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
  }
  // 视频初始化完成可以播放时
  start (callback) {
    this.node.oncanplay = function(ev) {
      callback(ev);
    };
  }
  // 视频播放结束时
  end (callback) {
    this.node.onended = function(ev) {
      callback(ev);
    };
  }
  // 视频播放时间(播放进度条)发生改变时
  time_update (callback) {
    let node = this.node;
    this.node.addEventListener('timeupdate', function (ev) {
      if (node.currentTime > 0) callback(ev)
    })
  }
  // 点击视频画面时
  click (callback) {
    let node = this.node;
    node.onclick = function (ev) {
      callback(ev);
    }
  }
}