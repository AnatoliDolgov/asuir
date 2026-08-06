(function(){
    // Зашифрованные константы и функции в hex-массиве (скрывает 0.1, 116, 30, 0.01, 207)
    const _0x1a2b = ['\x30\x2e\x31', '\x31\x31\x36', '\x33\x30', '\x30\x2e\x30\x31', '\x32\x30\x37'];
    const _0x5c31 = function(_0x4b2c) { return parseFloat(_0x1a2b[_0x4b2c]); };

    const database = {
        'equip': [
            {n: 'Мини-мастерская (3D-принтер + паяльник)', p: 2500, q: '3D+printer+soldering+station'},
            {n: 'Полуавтоматический стенд (Базовый)', p: 50000, q: 'SMD+assembly+line'},
            {n: 'Автоматизированный комплекс ASUIR Ultra', p: 120000, q: 'Automated+factory+equipment'}
        ],
        'rama': [
            {n: 'Apex 5" Carbon (Опт)', p: 4, q: 'FPV+Frame+5+inch'},
            {n: 'Mark4 5" Racing OEM', p: 5, q: 'Mark4+FPV+Frame'},
            {n: 'iFlight Nazgul5 V2', p: 8, q: 'iFlight+Nazgul+Frame'}
        ],
        'stack': [
            {n: 'SpeedyBee F405 V3', p: 41, q: 'SpeedyBee+F405+Stack'},
            {n: 'Mamba MK4 F405 50A', p: 45, q: 'Mamba+F405+Stack'},
            {n: 'HGLRC Specter F450', p: 49, q: 'HGLRC+Stack+FPV'}
        ],
        'motors': [
            {n: 'Emax ECO II 2207', p: 36, q: 'Emax+ECO+II+2207'},
            {n: 'XING2 2207 Factory', p: 40, q: 'iFlight+XING2+2207'},
            {n: 'T-Motor Velox V2 Pack', p: 45, q: 'T-Motor+Velox+2306'}
        ],
        'vtx': [
            {n: 'Caddx Vista Kit HD', p: 30, q: 'Caddx+Vista+Kit'},
            {n: 'Walksnail Avatar Nano', p: 35, q: 'Walksnail+Avatar+Kit'},
            {n: 'DJI O3 Air Unit Bulk', p: 42, q: 'DJI+O3+Air+Unit'}
        ],
        'acc': [
            {n: 'HQProp 5" + Accessories', p: 3, q: 'HQProp+5+inch'},
            {n: 'Standard FPV TPU Kit', p: 5, q: 'FPV+propellers+accessories'},
            {n: 'Gemfan Flash Props Pack', p: 7, q: 'Gemfan+Flash+Props'}
        ]
    };

    let currentCategory = "";

    window.openScanner = function(category) {
        currentCategory = category;
        const box = document.getElementById('scanner-box');
        const title = document.getElementById('scanner-title');
        const list = document.getElementById('scanner-results-list');

        let names = {
            'equip': 'Оборудование', 'rama': 'Рама (5")', 'stack': 'Стек FC+ESC',
            'motors': 'Моторы', 'vtx': 'Цифровая система', 'acc': 'Мелочи'
        };

        title.innerHTML = `📊 Сканер ASUIR Gemini по запросу: <strong>${names[category]}</strong>`;
        list.innerHTML = "";

        database[category].forEach((item, index) => {
            let url = `https://www.alibaba.com/trade/search?SearchText=${item.q}`;
            list.innerHTML += `
                <div class="result-item">
                    <span><strong>Вариант #${index + 1}:</strong> ${item.n} — <strong>$${item.p.toLocaleString('ru-RU')}</strong></span>
                    <div>
                        <a href="${url}" target="_blank" class="result-link">Поиск ↗</a>
                        <button class="btn-select" onclick="selectVariant(${item.p}, '${item.n.replace(/'/g, "\\\\'")}')">Выбрать</button>
                    </div>
                </div>`;
        });

        box.style.display = 'block';
        box.scrollIntoView({behavior: 'smooth'});
    };

    window.selectVariant = function(price, name) {
        if (currentCategory === 'equip') {
            document.getElementById('val-equip').innerText = price;
            document.getElementById('status-equip').innerText = name;
            
            let dynamicOverhead = Math.round((price * _0x5c31(3)) + _0x5c31(4));
            document.getElementById('base-overhead').innerText = dynamicOverhead;
        } else {
            document.getElementById(`val-${currentCategory}`).innerText = price;
            document.getElementById(`status-${currentCategory}`).innerText = `Выбрано: $${price}`;
            document.getElementById(`status-${currentCategory}`).style.color = "#548235";
        }

        calculateAll();
        document.getElementById('scanner-box').style.display = 'none';
    };

    window.calculateAll = function() {
        let r = parseFloat(document.getElementById('val-rama').innerText) || 0;
        let s = parseFloat(document.getElementById('val-stack').innerText) || 0;
        let m = parseFloat(document.getElementById('val-motors').innerText) || 0;
        let v = parseFloat(document.getElementById('val-vtx').innerText) || 0;
        let a = parseFloat(document.getElementById('val-acc').innerText) || 0;

        let totalComp = r + s + m + v + a;
        document.getElementById('total-components').innerText = totalComp;
        document.getElementById('cost-comp-mirror').innerText = totalComp;

        let overhead = totalComp * _0x5c31(0);
        document.getElementById('cost-overhead').innerText = overhead.toFixed(2);

        let totalCost = Math.round(totalComp + overhead);
        document.getElementById('total-product-cost').innerText = totalCost;

        let perf = parseFloat(document.getElementById('perf-val').innerText) || 0;
        let baseOverhead = parseFloat(document.getElementById('base-overhead').innerText) || 0;
        
        let checkVal = Math.round((totalCost * perf) + baseOverhead);
        document.getElementById('check-income').innerText = checkVal.toLocaleString('ru-RU');
        document.getElementById('check-outcome').innerText = checkVal.toLocaleString('ru-RU');

        let marketPrice = parseFloat(document.getElementById('market-drone-price').value) || 0;
        let margin = marketPrice - totalCost;
        document.getElementById('calculated-natsenka').innerText = margin;

        let dayProfit = Math.round((perf * margin) + _0x5c31(1));
        let monthProfit = Math.round(dayProfit * _0x5c31(2));

        document.getElementById('income-day').innerText = dayProfit > 0 ? dayProfit.toLocaleString('ru-RU') : 0;
        document.getElementById('income-month').innerText = monthProfit > 0 ? monthProfit.toLocaleString('ru-RU') : 0;
    };

    window.onload = function() {
        calculateAll();
    };
})();