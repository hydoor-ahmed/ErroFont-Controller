// ==UserScript==
// @name         ErroFont Controller
// @match        *://*/*
// @grant        none
// @description Change AR Font to Tajawal for Google Translate & Font Controller
// @version 1.1.0
// ==/UserScript==

(function() {
    'use strict';

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        #font-ctrl-panel { position:fixed; bottom:80px; right:20px; z-index:999999; background:#222; color:#fff; padding:15px; border-radius:10px; font-family:sans-serif; display:none; }
        #toggle-btn { position:fixed; bottom:20px; right:20px; z-index:1000000; padding:8px; cursor:pointer; background:#007bff; opacity: 0.4; border:none; color:white; border-radius:12px; width:80px; height:40px; }
        .ctrl-row { margin: 10px 0; }
    `;
    document.head.appendChild(styleTag);

    const btn = document.createElement('button');
    btn.id = "toggle-btn"; btn.innerHTML = "ErroFont";
    document.body.appendChild(btn);

    const panel = document.createElement('div');
    panel.id = "font-ctrl-panel";
    panel.innerHTML = `
        <div class="ctrl-row">الحجم: <input type="number" id="fs" value="16" style="width:40px">px</div>
        <div class="ctrl-row">التباعد: <input type="number" step="0.1" id="lh" value="1.6" style="width:40px"></div>
        <div class="ctrl-row">الوزن:
            <select id="fw">
                <option value="400">عادي (400)</option>
                <option value="700">عريض (700)</option>
            </select>
        </div>
    `;
    document.body.appendChild(panel);

    btn.onclick = () => panel.style.display = (panel.style.display === 'block' ? 'none' : 'block');

    function apply() {
        const fs = document.getElementById('fs').value;
        const lh = document.getElementById('lh').value;
        const fw = document.getElementById('fw').value;

        const style = document.createElement('style');
        style.innerHTML = `* { font-family: 'Tajawal', sans-serif !important; font-size: ${fs}px !important; line-height: ${lh} !important; font-weight: ${fw} !important; }`;
        const old = document.getElementById('main-style');
        if (old) old.remove();
        style.id = 'main-style';
        document.head.appendChild(style);
    }

    ['fs', 'lh', 'fw'].forEach(id => document.getElementById(id).oninput = apply);
})();
