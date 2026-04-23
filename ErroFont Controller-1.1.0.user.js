// ==UserScript==
// @name         ErroFont Controller
// @version      1.2.0
// @description  Professional Arabic typography controller for Google Translate and beyond.
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const fonts = {
        'Tajawal': 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap',
        'Cairo': 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap',
        'IBM Plex Sans Arabic': 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;600&display=swap'
    };

    Object.values(fonts).forEach(url => {
        const link = document.createElement('link');
        link.href = url;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    });

    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        #font-ctrl-panel { position:fixed; bottom:80px; right:20px; z-index:999999; background:#ffffff; color:#333; padding:15px; border-radius:12px; font-family:sans-serif; display:none; width:220px; box-shadow:0 4px 15px rgba(0,0,0,0.2); border: 1px solid #ddd; }
        #toggle-btn { position:fixed; bottom:20px; right:20px; z-index:1000000; padding:8px; cursor:pointer; background:#007bff; border:none; color:white; border-radius:12px; width:90px; height:40px; font-weight:bold; box-shadow:0 2px 10px rgba(0,0,0,0.2); }
        .ctrl-row { margin: 10px 0; display:flex; justify-content:space-between; align-items:center; }
        input, select { background:#f9f9f9; color:#333; border:1px solid #ccc; padding:4px; border-radius:4px; }
        button#reset-btn { width:100%; margin-top:10px; background:#dc3545; cursor:pointer; border-radius:4px; border:none; color:white; padding:6px; }
        input::-webkit-outer-spin-button, input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    `;
    document.head.appendChild(styleTag);

    const btn = document.createElement('button');
    btn.id = "toggle-btn"; btn.innerHTML = "ErroFont";
    document.body.appendChild(btn);

    const panel = document.createElement('div');
    panel.id = "font-ctrl-panel";
    panel.innerHTML = `
        <div class="ctrl-row">الخط: <select id="ff"><option value="Tajawal">تجوال</option><option value="Cairo">Cairo</option><option value="IBM Plex Sans Arabic">IBM Plex</option></select></div>
        <div class="ctrl-row">الحجم: <input type="number" id="fs" value="16" style="width:50px">px</div>
        <div class="ctrl-row">التباعد: <input type="number" step="0.1" id="lh" value="1.6" style="width:50px"></div>
        <div class="ctrl-row">الوزن: <select id="fw"><option value="400">عادي</option><option value="700">عريض</option></select></div>
        <button id="reset-btn">إعادة تعيين</button>
    `;
    document.body.appendChild(panel);

    const elements = ['fs', 'lh', 'fw', 'ff'];

    function apply() {
        const fs = document.getElementById('fs').value;
        const lh = document.getElementById('lh').value;
        const fw = document.getElementById('fw').value;
        const ff = document.getElementById('ff').value;

        const style = document.createElement('style');
        style.id = 'main-style';

        style.innerHTML = `
        /* * ErroFont Controller Styles */
            body, p, span, div, h1, h2, h3, h4, h5, h6, li, article, section, font, td, th {
                font-family: '${ff}', sans-serif !important;
                font-size: ${fs}px !important;
                line-height: ${lh} !important;
                font-weight: ${fw} !important;
            }

            button, input, select, textarea, i, svg,
            [class*="icon"], [class*="fa-"], [class*="glyph"], .btn, .nav, .menu,
            #font-ctrl-panel, #font-ctrl-panel *, #toggle-btn {
                font-family: sans-serif !important;
                font-size: 14px !important;
                line-height: 1.4 !important;
                font-weight: 400 !important;
            }
        `;

        const old = document.getElementById('main-style');
        if (old) old.remove();
        document.head.appendChild(style);

        localStorage.setItem('erroFontSettings', JSON.stringify({ fs, lh, fw, ff }));
    }

    btn.onclick = () => panel.style.display = (panel.style.display === 'block' ? 'none' : 'block');
    document.getElementById('reset-btn').onclick = () => { localStorage.removeItem('erroFontSettings'); location.reload(); };
    elements.forEach(id => document.getElementById(id).oninput = apply);

    // * Shortcurt Alt + T
    document.addEventListener('keydown', (e) => { if (e.altKey && e.key === 't') btn.onclick(); });

    const saved = JSON.parse(localStorage.getItem('erroFontSettings'));
    if (saved) {
        elements.forEach(id => document.getElementById(id).value = saved[id]);
        apply();
    }
})();
