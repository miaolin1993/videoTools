// 获取单个节点
function $ (element) {
  return document.querySelector(element);
}

// 引入videoTools模块
let video = new VideoTools('video');

// 当视频初始化完成可以播放时
video.start(ev => {
  // 初始化视频总时长
  $('.total').innerText = video.total();
  // 加载缓冲条
  $('.v-load').style.width = video.load();
  // 设置点击播放按钮切换播放与暂停 
  $('#run').onclick = ev => toggle();
  // 全局的播放与暂停按钮
  $('#hidden-pause').onclick = () => toggle();
  // 设置点击屏幕切换播放与暂停 
  video.click(ev => toggle());
  // 按空格时切换播放状态
  document.addEventListener('keydown', function(ev) {
    if (ev.code === 'Space') toggle();
  })
}) 

// 进度条改变时时间跟着变
video.time_update(() => {
  // 加载缓冲条
  $('.v-load').style.width = video.load();
  $('.go').style.width = video.bar() + '%';
  $('.current').innerText = video.current() + ' /'
})

// 点进度条快进/退
$('.over').onclick = ev => {
  video.node.currentTime = (ev.offsetX / $('.over').clientWidth) * video.node.duration;
}

// 视频播放结束时
video.end(ev => {
  // 重置播放按钮 
  $('#run').className = 'icon-play';
  // 进度条清零
  $('.go').style.width = 0;
  // 播放时间清零
  $('.current').innerText = `00:00:00 /`;
})

// 点击显示倍速菜单
$("#speed").onclick = () => {
  if ($(".speed").style.display === 'flex') {
    return $(".speed").style['display'] = 'none';
  }
  $(".speed").style['display'] = 'flex';
}

// 控制倍速
$(".speed").onclick = function (ev) {
  switch (ev.target.className) {
    case 'speed-up':
      if (video.speed_now().toFixed(1) === '3.0') {
        $(".speed-up").setAttribute('disabled', 'true');
        return;
      }
      $(".speed-down").removeAttribute('disabled');
      video.speed_up(3)
      $('#speed').innerText = video.speed_now().toFixed(1);
      break;
    case 'speed-quick':
      $(".speed-down").removeAttribute('disabled');
      $(".speed-up").removeAttribute('disabled');
      video.speed_set(1.5);
      $('#speed').innerText = '1.5';
      break;
    case 'speed-init':
      $(".speed-down").removeAttribute('disabled');
      $(".speed-up").removeAttribute('disabled');
      video.speed_set(1);
      $('#speed').innerText = '1.0';
      break;
    case 'speed-down':
      $(".speed-up").removeAttribute('disabled');
      if (video.speed_now().toFixed(1) === '0.5') {
        $(".speed-down").setAttribute('disabled', 'true');
        return;
      }
      video.speed_down(0.5)
      $('#speed').innerText = video.speed_now().toFixed(1);
      break
  }
}

// 鼠标移入音量按钮显示音量条
$('#vol').onmouseenter = ev => {
  $('.vol').style.display = 'block';
}

// 鼠标进入进度条时改变鼠标状态
$('.over').onmouseenter = ev => $('.over').style.cursor = 'pointer';
$('.vol').onmouseenter = ev => $('.vol').style.cursor = 'pointer';

// 点击音量按钮的静音切换
$('#vol').onclick = ev => volume_toggle();

// 点击音量进度条动态加减音量
$('.vol').onclick = function(ev) {
  // 点击的位置 / 父盒子总高度
  video.set_vol(ev.offsetY / 60);
  $('.vol .go').style.height = ev.offsetY / 60 * 100 + '%';
  // 根据音量大小的变化改变图片状态
  if (video.node.volume === 0) {
    $('#vol').className = 'icon-volume-mute2';
  } else if (video.vol_now() <= 0.2) {
    $('#vol').className = 'icon-volume-mute';
  } else if (video.vol_now() <= 0.4) {
    $('#vol').className = 'icon-volume-low';
  } else if (video.vol_now() <= 0.6) {
    $('#vol').className = 'icon-volume-medium';
  } else if (video.vol_now() <= 0.8) {
    $('#vol').className = 'icon-volume-high';
  } 
}

// 移入时显示菜单控件
$('#box').onmouseover = ev => {
  $('.menu').style.animation = '';
  $('.menu').style.opcity = 1;
}

// 鼠标移出时加载自定义动画，逐渐隐藏菜单控件
$('#box').onmouseout = ev => $('.menu').style.animation = 'hidden 1.5s linear forwards';

// 点击切换全屏状态
$('.icon-expand').onclick = ev => video.togglefullscreen();

// 点击音量按钮的静音切换
function volume_toggle() {
  if (!video.vol_check() || video.vol_now() === 0) {
    $('.vol .go').style.height = 0;
    $('#vol').className = 'icon-volume-mute2';
    return video.vol_off();
  }
  video.vol_on();
  $('#vol').className = 'icon-volume-up';
  $('.vol .go').style.height = video.vol_now() * 100 + '%';
}

// 切换点击播放状态
function toggle() {
  $(".speed").style['display'] = 'none'; 
  $('.vol').style.display = 'none';
  if (video.is_pause()) {
    $('#run').className = 'icon-pause';
    $('#hidden-pause').className = 'icon-pause';
    setTimeout(()=>{
      $('#hidden-pause').style.animation = 'hidden 1s linear forwards';
    },1000)
    return video.play();
  }
  $('#run').className = 'icon-play';
  $('#hidden-pause').className = 'icon-play';
  $('#hidden-pause').style.animation = '';
  $('#hidden-pause').style.opcity = 1;
  video.pause();
}
