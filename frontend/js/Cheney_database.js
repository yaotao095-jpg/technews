/**
 * 姓名：蒋瑞龙 | 学号：24001010210 | 时间：2026-11-19 | 大模型：deepseek-flash
 * 文件：frontend/js/Cheney_database.js
 * 说明：数据库连接测试页。收集表单里的用户名与密码，POST 到 /api/db/test，
 *      由后端实际连接 MySQL 并把结果展示在页面上，同时输出到控制台。
 */
(function () {
  'use strict';

  var Cheney_API = '/api/db/test';
  var Cheney_formEl = document.getElementById('Cheney_dbForm');
  var Cheney_userEl = document.getElementById('Cheney_dbUser');
  var Cheney_passwordEl = document.getElementById('Cheney_dbPassword');
  var Cheney_resultEl = document.getElementById('Cheney_dbResult');
  var Cheney_submitEl = document.getElementById('Cheney_dbSubmit');
  var Cheney_resetEl = document.getElementById('Cheney_dbReset');

  // 连接参数：主机、端口、库名固定为本机默认值，只有账号密码交给用户输入
  var Cheney_CONN = {
    host: '127.0.0.1',
    port: 3306,
    database: 'cheney_tech_site'
  };

  function Cheney_escapeHtml(Cheney_text) {
    return String(Cheney_text === null || Cheney_text === undefined ? '' : Cheney_text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function Cheney_renderRows(Cheney_pairs) {
    return Cheney_pairs.map(function (Cheney_pair) {
      return '' +
        '<div class="Cheney_kv">' +
          '<span>' + Cheney_escapeHtml(Cheney_pair[0]) + '</span>' +
          '<b>' + Cheney_escapeHtml(Cheney_pair[1]) + '</b>' +
        '</div>';
    }).join('');
  }

  function Cheney_renderSuccess(Cheney_data) {
    var Cheney_rows = [
      ['登录账号', Cheney_data.user || Cheney_userEl.value],
      ['服务器', (Cheney_data.host || Cheney_CONN.host) + ':' + (Cheney_data.port || Cheney_CONN.port)],
      ['MySQL 版本', Cheney_data.version || '未知'],
      ['当前数据库', Cheney_data.database || Cheney_CONN.database]
    ];

    var Cheney_tables = Array.isArray(Cheney_data.tables) ? Cheney_data.tables : [];
    var Cheney_tableHtml = Cheney_tables.length
      ? '<div class="Cheney_tables">' + Cheney_tables.map(function (Cheney_name) {
          return '<span class="Cheney_field_label">' + Cheney_escapeHtml(Cheney_name) + '</span>';
        }).join('') + '</div>'
      : '<p class="Cheney_hint">当前数据库暂无数据表，可继续执行 Cheney_database.md 中的建表语句。</p>';

    Cheney_resultEl.className = 'Cheney_result Cheney_result_show Cheney_result_ok';
    Cheney_resultEl.innerHTML = '' +
      '<h3 class="Cheney_result_title">✔ 连接成功</h3>' +
      '<p class="Cheney_panel_desc">' + Cheney_escapeHtml(Cheney_data.message || 'MySQL 连接正常') + '</p>' +
      Cheney_renderRows(Cheney_rows) +
      '<p class="Cheney_field_label" style="margin:18px 0 8px">数据库中的表（' + Cheney_tables.length + '）</p>' +
      Cheney_tableHtml;
  }

  function Cheney_renderError(Cheney_message, Cheney_code) {
    Cheney_resultEl.className = 'Cheney_result Cheney_result_show Cheney_result_bad';
    Cheney_resultEl.innerHTML = '' +
      '<h3 class="Cheney_result_title">✖ 连接失败</h3>' +
      '<p class="Cheney_panel_desc">' + Cheney_escapeHtml(Cheney_message) + '</p>' +
      Cheney_renderRows([
        ['错误码', Cheney_code || 'UNKNOWN'],
        ['尝试的主机', Cheney_CONN.host + ':' + Cheney_CONN.port],
        ['目标数据库', Cheney_CONN.database]
      ]) +
      '<p class="Cheney_hint">常见原因：MySQL 服务未启动、账号或密码不正确、数据库尚未创建。</p>';
  }

  function Cheney_setLoading(Cheney_loading) {
    Cheney_submitEl.disabled = Cheney_loading;
    Cheney_submitEl.textContent = Cheney_loading ? '正在连接…' : '连接数据库';
  }

  async function Cheney_submitTest(Cheney_event) {
    Cheney_event.preventDefault();

    var Cheney_user = Cheney_userEl.value.trim();
    var Cheney_password = Cheney_passwordEl.value;

    if (!Cheney_user || !Cheney_password) {
      Cheney_renderError('请填写用户名和密码', 'EMPTY_INPUT');
      return;
    }

    Cheney_setLoading(true);
    Cheney_resultEl.className = 'Cheney_result';

    try {
      var Cheney_res = await fetch(Cheney_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          user: Cheney_user,
          password: Cheney_password,
          host: Cheney_CONN.host,
          port: Cheney_CONN.port,
          database: Cheney_CONN.database
        })
      });

      var Cheney_json = await Cheney_res.json();
      console.log('[Cheney_database] POST ' + Cheney_API + ' 返回：', Cheney_json);

      if (Cheney_json.code === 0) {
        Cheney_renderSuccess(Cheney_json.data || {});
      } else {
        console.error('[Cheney_database] 连接失败：', Cheney_json);
        Cheney_renderError(Cheney_json.msg || '未知错误', Cheney_json.data && Cheney_json.data.code);
      }
    } catch (Cheney_err) {
      console.error('[Cheney_database] 请求异常：', Cheney_err);
      Cheney_renderError('无法访问后端接口：' + Cheney_err.message + '（请确认已在 8325 端口启动服务）', 'NETWORK_ERROR');
    } finally {
      Cheney_setLoading(false);
    }
  }

  Cheney_formEl.addEventListener('submit', Cheney_submitTest);

  if (Cheney_resetEl) {
    Cheney_resetEl.addEventListener('click', function () {
      // type=reset 会自动还原输入框，这里只清空结果区
      window.setTimeout(function () {
        Cheney_resultEl.className = 'Cheney_result';
        Cheney_resultEl.innerHTML = '';
      }, 0);
    });
  }

  console.log('[Cheney_database] 数据库测试页已就绪，目标接口：POST ' + Cheney_API);
})();
