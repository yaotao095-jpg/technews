/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：frontend/js/Cheney_index.js
 * 说明：首页 Canvas 背景动画（粒子网络）。全部原生实现，无任何第三方库。
 *      浅色粒子连线随鼠标轻微扰动，页面不可见时自动暂停以节省性能。
 */
(function () {
  'use strict';

  var Cheney_canvas = document.getElementById('Cheney_canvas');
  if (!Cheney_canvas || !Cheney_canvas.getContext) {
    return;
  }

  var Cheney_ctx = Cheney_canvas.getContext('2d');
  var Cheney_reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var Cheney_colors = ['#7dd3fc', '#a5b4fc', '#6ee7b7', '#e0f2fe'];
  var Cheney_dots = [];
  var Cheney_width = 0;
  var Cheney_height = 0;
  var Cheney_rafId = null;
  var Cheney_mouse = { x: -9999, y: -9999 };

  // 设备像素比适配，避免高分屏发虚
  function Cheney_setupCanvas() {
    var Cheney_dpr = Math.min(window.devicePixelRatio || 1, 2);
    Cheney_width = window.innerWidth;
    Cheney_height = window.innerHeight;

    Cheney_canvas.width = Math.floor(Cheney_width * Cheney_dpr);
    Cheney_canvas.height = Math.floor(Cheney_height * Cheney_dpr);
    Cheney_canvas.style.width = Cheney_width + 'px';
    Cheney_canvas.style.height = Cheney_height + 'px';
    Cheney_ctx.setTransform(Cheney_dpr, 0, 0, Cheney_dpr, 0, 0);
  }

  function Cheney_createDots() {
    var Cheney_area = Cheney_width * Cheney_height;
    var Cheney_count = Math.max(28, Math.min(110, Math.round(Cheney_area / 17000)));
    Cheney_dots = [];

    for (var Cheney_i = 0; Cheney_i < Cheney_count; Cheney_i++) {
      Cheney_dots.push({
        x: Math.random() * Cheney_width,
        y: Math.random() * Cheney_height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: 1 + Math.random() * 1.9,
        color: Cheney_colors[Cheney_i % Cheney_colors.length]
      });
    }
  }

  function Cheney_draw() {
    Cheney_ctx.clearRect(0, 0, Cheney_width, Cheney_height);

    var Cheney_linkDistance = 132;

    // 先画点之间的连线
    for (var Cheney_i = 0; Cheney_i < Cheney_dots.length; Cheney_i++) {
      var Cheney_a = Cheney_dots[Cheney_i];

      for (var Cheney_j = Cheney_i + 1; Cheney_j < Cheney_dots.length; Cheney_j++) {
        var Cheney_b = Cheney_dots[Cheney_j];
        var Cheney_dx = Cheney_a.x - Cheney_b.x;
        var Cheney_dy = Cheney_a.y - Cheney_b.y;
        var Cheney_dist = Math.sqrt(Cheney_dx * Cheney_dx + Cheney_dy * Cheney_dy);

        if (Cheney_dist < Cheney_linkDistance) {
          var Cheney_alpha = (1 - Cheney_dist / Cheney_linkDistance) * 0.34;
          Cheney_ctx.strokeStyle = 'rgba(125, 211, 252, ' + Cheney_alpha.toFixed(3) + ')';
          Cheney_ctx.lineWidth = 1;
          Cheney_ctx.beginPath();
          Cheney_ctx.moveTo(Cheney_a.x, Cheney_a.y);
          Cheney_ctx.lineTo(Cheney_b.x, Cheney_b.y);
          Cheney_ctx.stroke();
        }
      }
    }

    // 再画粒子本身，并对靠近鼠标的粒子做轻微高亮
    for (var Cheney_k = 0; Cheney_k < Cheney_dots.length; Cheney_k++) {
      var Cheney_dot = Cheney_dots[Cheney_k];
      var Cheney_mdx = Cheney_dot.x - Cheney_mouse.x;
      var Cheney_mdy = Cheney_dot.y - Cheney_mouse.y;
      var Cheney_mouseDist = Math.sqrt(Cheney_mdx * Cheney_mdx + Cheney_mdy * Cheney_mdy);
      var Cheney_near = Cheney_mouseDist < 150;

      if (Cheney_near) {
        Cheney_ctx.strokeStyle = 'rgba(167, 209, 255, ' + ((1 - Cheney_mouseDist / 150) * 0.5).toFixed(3) + ')';
        Cheney_ctx.beginPath();
        Cheney_ctx.moveTo(Cheney_dot.x, Cheney_dot.y);
        Cheney_ctx.lineTo(Cheney_mouse.x, Cheney_mouse.y);
        Cheney_ctx.stroke();
      }

      Cheney_ctx.beginPath();
      Cheney_ctx.fillStyle = Cheney_dot.color;
      Cheney_ctx.globalAlpha = Cheney_near ? 1 : 0.62;
      Cheney_ctx.arc(Cheney_dot.x, Cheney_dot.y, Cheney_dot.r, 0, Math.PI * 2);
      Cheney_ctx.fill();
      Cheney_ctx.globalAlpha = 1;
    }
  }

  function Cheney_step() {
    for (var Cheney_i = 0; Cheney_i < Cheney_dots.length; Cheney_i++) {
      var Cheney_dot = Cheney_dots[Cheney_i];

      Cheney_dot.x += Cheney_dot.vx;
      Cheney_dot.y += Cheney_dot.vy;

      // 边界反弹
      if (Cheney_dot.x < 0 || Cheney_dot.x > Cheney_width) {
        Cheney_dot.vx *= -1;
        Cheney_dot.x = Math.max(0, Math.min(Cheney_width, Cheney_dot.x));
      }
      if (Cheney_dot.y < 0 || Cheney_dot.y > Cheney_height) {
        Cheney_dot.vy *= -1;
        Cheney_dot.y = Math.max(0, Math.min(Cheney_height, Cheney_dot.y));
      }

      // 鼠标轻微排斥，让背景有互动感
      var Cheney_mdx = Cheney_dot.x - Cheney_mouse.x;
      var Cheney_mdy = Cheney_dot.y - Cheney_mouse.y;
      var Cheney_dist = Math.sqrt(Cheney_mdx * Cheney_mdx + Cheney_mdy * Cheney_mdy);
      if (Cheney_dist < 90 && Cheney_dist > 0.01) {
        Cheney_dot.x += (Cheney_mdx / Cheney_dist) * 0.7;
        Cheney_dot.y += (Cheney_mdy / Cheney_dist) * 0.7;
      }
    }

    Cheney_draw();
    Cheney_rafId = window.requestAnimationFrame(Cheney_step);
  }

  function Cheney_start() {
    Cheney_cancel();
    Cheney_rafId = window.requestAnimationFrame(Cheney_step);
  }

  function Cheney_cancel() {
    if (Cheney_rafId !== null) {
      window.cancelAnimationFrame(Cheney_rafId);
      Cheney_rafId = null;
    }
  }

  // 窗口尺寸变化时重建画布与粒子
  var Cheney_resizeTimer = null;
  window.addEventListener('resize', function () {
    window.clearTimeout(Cheney_resizeTimer);
    Cheney_resizeTimer = window.setTimeout(function () {
      Cheney_setupCanvas();
      Cheney_createDots();
      if (Cheney_reduceMotion || document.hidden) {
        Cheney_draw();
      }
    }, 180);
  });

  window.addEventListener('pointermove', function (Cheney_event) {
    Cheney_mouse.x = Cheney_event.clientX;
    Cheney_mouse.y = Cheney_event.clientY;
  });

  window.addEventListener('pointerleave', function () {
    Cheney_mouse.x = -9999;
    Cheney_mouse.y = -9999;
  });

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      Cheney_cancel();
    } else if (!Cheney_reduceMotion) {
      Cheney_start();
    }
  });

  Cheney_setupCanvas();
  Cheney_createDots();

  if (Cheney_reduceMotion) {
    Cheney_draw();
    console.log('[Cheney_index] 检测到「减少动态效果」，Canvas 背景只渲染静态一帧。');
  } else {
    Cheney_start();
    console.log('[Cheney_index] Canvas 粒子背景动画已启动。');
  }
})();
