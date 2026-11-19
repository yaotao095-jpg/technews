/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：frontend/js/Cheney_gallery.js
 * 说明：图文列表页。用 fetch 调用 GET /api/gallery，渲染图文卡片，
 *      接口返回的数据与错误信息同时输出到浏览器控制台；
 *      接口不可用（如部署到 GitHub Pages 纯静态环境）时，
 *      自动回退到 data/Cheney_galleryData.js 的静态快照。
 */
(function () {
  'use strict';

  var Cheney_API = '/api/gallery';
  var Cheney_gridEl = document.getElementById('Cheney_galleryGrid');
  var Cheney_stateEl = document.getElementById('Cheney_galleryState');
  var Cheney_totalEl = document.getElementById('Cheney_galleryTotal');
  var Cheney_rawEl = document.getElementById('Cheney_galleryRaw');
  var Cheney_rawBtn = document.getElementById('Cheney_galleryRawBtn');
  var Cheney_apiUrlEl = document.getElementById('Cheney_apiUrl');

  function Cheney_escapeHtml(Cheney_text) {
    return String(Cheney_text === null || Cheney_text === undefined ? '' : Cheney_text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function Cheney_showState(Cheney_message, Cheney_isError) {
    Cheney_stateEl.hidden = false;
    Cheney_stateEl.className = 'Cheney_state' + (Cheney_isError ? ' Cheney_state_error' : '');
    Cheney_stateEl.innerHTML = Cheney_isError
      ? '<span>' + Cheney_escapeHtml(Cheney_message) + '</span>'
      : '<span class="Cheney_spinner"></span><span>' + Cheney_escapeHtml(Cheney_message) + '</span>';
  }

  function Cheney_renderCards(Cheney_list) {
    Cheney_gridEl.innerHTML = Cheney_list.map(function (Cheney_item, Cheney_index) {
      var Cheney_title = Cheney_escapeHtml(Cheney_item.Cheney_title);
      var Cheney_intro = Cheney_escapeHtml(Cheney_item.Cheney_intro);
      var Cheney_image = Cheney_escapeHtml(Cheney_item.Cheney_image_url || 'images/Cheney_gallery_1.svg');
      var Cheney_delay = ((Cheney_index % 4) * 0.07).toFixed(2);

      return '' +
        '<article class="Cheney_gallerycard Cheney_rise" style="animation-delay:' + Cheney_delay + 's">' +
          '<figure class="Cheney_gallerycard_figure">' +
            '<img src="' + Cheney_image + '" alt="' + Cheney_title + '" loading="lazy" width="800" height="600">' +
          '</figure>' +
          '<div class="Cheney_gallerycard_body">' +
            '<h2 class="Cheney_gallerycard_title">' + Cheney_title + '</h2>' +
            '<p class="Cheney_gallerycard_intro">' + Cheney_intro + '</p>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  function Cheney_bindRawToggle() {
    if (!Cheney_rawBtn || !Cheney_rawEl) {
      return;
    }
    Cheney_rawBtn.addEventListener('click', function () {
      var Cheney_open = Cheney_rawEl.hidden;
      Cheney_rawEl.hidden = !Cheney_open;
      Cheney_rawBtn.setAttribute('aria-expanded', String(Cheney_open));
      Cheney_rawBtn.textContent = Cheney_open ? '收起接口原始返回' : '查看接口原始返回';
      if (Cheney_open) {
        Cheney_rawEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  async function Cheney_loadGallery() {
    try {
      var Cheney_res = await fetch(Cheney_API, { headers: { Accept: 'application/json' } });
      var Cheney_json = await Cheney_res.json();

      console.log('[Cheney_gallery] GET ' + Cheney_API + ' 返回：', Cheney_json);

      if (!Cheney_res.ok || Cheney_json.code !== 0) {
        throw new Error(Cheney_json.msg || ('HTTP ' + Cheney_res.status));
      }

      var Cheney_data = Cheney_json.data || {};
      var Cheney_list = Cheney_data.list || [];

      if (Cheney_list.length === 0) {
        Cheney_showState('接口返回成功，但 Cheney_gallery 表中暂无数据', true);
      } else {
        Cheney_stateEl.hidden = true;
        Cheney_renderCards(Cheney_list);
      }

      Cheney_totalEl.textContent = String(Cheney_data.total !== undefined ? Cheney_data.total : Cheney_list.length);
      if (Cheney_rawEl) {
        Cheney_rawEl.textContent = JSON.stringify(Cheney_json, null, 2);
      }
    } catch (Cheney_err) {
      console.error('[Cheney_gallery] 接口请求失败：', Cheney_err);
      Cheney_useStaticData(Cheney_err);
    }
  }

  if (Cheney_apiUrlEl) {
    // 本机访问时显示完整地址，纯静态部署（如 GitHub Pages）只显示相对路径
    var Cheney_isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
    Cheney_apiUrlEl.textContent = 'GET ' + (Cheney_isLocal ? window.location.origin : '') + Cheney_API;
    Cheney_apiUrlEl.setAttribute('href', Cheney_API);
  }

  // 纯静态环境（如 GitHub Pages）没有后端，用 data/ 下的静态快照兜底展示
  function Cheney_useStaticData(Cheney_err) {
    var Cheney_static = window.Cheney_galleryStaticData;
    if (!Cheney_static || !Cheney_static.data || !Cheney_static.data.list) {
      Cheney_showState('图文加载失败：' + Cheney_err.message + '（请检查后端是否已在 8210 端口启动）', true);
      Cheney_totalEl.textContent = '0';
      return;
    }
    var Cheney_list = Cheney_static.data.list;
    Cheney_stateEl.hidden = true;
    Cheney_renderCards(Cheney_list);
    Cheney_totalEl.textContent = String(Cheney_static.data.total !== undefined ? Cheney_static.data.total : Cheney_list.length);
    if (Cheney_rawEl) {
      Cheney_rawEl.textContent = JSON.stringify(Cheney_static, null, 2);
    }
    var Cheney_hintEl = document.querySelector('.Cheney_hint');
    if (Cheney_hintEl) {
      Cheney_hintEl.textContent = '（当前为静态演示数据，来自 data/Cheney_galleryData.js）';
    }
    console.info('[Cheney_gallery] 接口不可用，已切换到静态快照：', Cheney_static);
  }

  Cheney_bindRawToggle();
  Cheney_loadGallery();
})();
