/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：frontend/js/Cheney_news.js
 * 说明：科技新闻列表页。用 fetch 调用 GET /api/news，渲染卡片，
 *      并把接口返回的完整数据输出到浏览器控制台。
 */
(function () {
  'use strict';

  var Cheney_API = '/api/news';
  var Cheney_gridEl = document.getElementById('Cheney_newsGrid');
  var Cheney_stateEl = document.getElementById('Cheney_newsState');
  var Cheney_totalEl = document.getElementById('Cheney_newsTotal');
  var Cheney_rawEl = document.getElementById('Cheney_newsRaw');
  var Cheney_rawBtn = document.getElementById('Cheney_newsRawBtn');
  var Cheney_apiUrlEl = document.getElementById('Cheney_apiUrl');

  // 简单转义，避免数据库中的特殊字符破坏页面结构
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
      var Cheney_summary = Cheney_escapeHtml(Cheney_item.Cheney_summary);
      var Cheney_source = Cheney_escapeHtml(Cheney_item.Cheney_source);
      var Cheney_time = Cheney_escapeHtml(Cheney_item.Cheney_publish_time);
      var Cheney_cover = Cheney_escapeHtml(Cheney_item.Cheney_cover_url || 'images/Cheney_cover_1.svg');
      var Cheney_delay = ((Cheney_index % 6) * 0.06).toFixed(2);

      return '' +
        '<article class="Cheney_newscard Cheney_rise" style="animation-delay:' + Cheney_delay + 's">' +
          '<div class="Cheney_newscard_cover">' +
            '<img src="' + Cheney_cover + '" alt="' + Cheney_title + '" loading="lazy" width="800" height="450">' +
            '<span class="Cheney_newscard_tag">科技资讯</span>' +
          '</div>' +
          '<div class="Cheney_newscard_body">' +
            '<h2 class="Cheney_newscard_title">' + Cheney_title + '</h2>' +
            '<p class="Cheney_newscard_summary">' + Cheney_summary + '</p>' +
            '<div class="Cheney_newscard_meta">' +
              '<span class="Cheney_source">' + Cheney_source + '</span>' +
              '<time datetime="' + Cheney_time + '">' + Cheney_time + '</time>' +
            '</div>' +
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

  async function Cheney_loadNews() {
    try {
      var Cheney_res = await fetch(Cheney_API, { headers: { Accept: 'application/json' } });
      var Cheney_json = await Cheney_res.json();

      // 按前端约定：接口数据输出到控制台
      console.log('[Cheney_news] GET ' + Cheney_API + ' 返回：', Cheney_json);

      if (!Cheney_res.ok || Cheney_json.code !== 0) {
        throw new Error(Cheney_json.msg || ('HTTP ' + Cheney_res.status));
      }

      var Cheney_data = Cheney_json.data || {};
      var Cheney_list = Cheney_data.list || [];

      if (Cheney_list.length === 0) {
        Cheney_showState('接口返回成功，但 Cheney_news 表中暂无数据', true);
      } else {
        Cheney_stateEl.hidden = true;
        Cheney_renderCards(Cheney_list);
      }

      Cheney_totalEl.textContent = String(Cheney_data.total !== undefined ? Cheney_data.total : Cheney_list.length);
      if (Cheney_rawEl) {
        Cheney_rawEl.textContent = JSON.stringify(Cheney_json, null, 2);
      }
    } catch (Cheney_err) {
      console.error('[Cheney_news] 请求失败：', Cheney_err);
      Cheney_showState('新闻加载失败：' + Cheney_err.message + '（请检查后端是否已在 210 端口启动）', true);
      Cheney_totalEl.textContent = '0';
    }
  }

  if (Cheney_apiUrlEl) {
    Cheney_apiUrlEl.textContent = 'GET ' + window.location.origin + Cheney_API;
    Cheney_apiUrlEl.setAttribute('href', Cheney_API);
  }

  Cheney_bindRawToggle();
  Cheney_loadNews();
})();
