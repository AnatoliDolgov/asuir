// ============================================================
//  asuir-main.js — ГЛАВНЫЙ СКРИПТ (чистая версия)
//  БЕЗ переключателя языка, БЕЗ i18n
// ============================================================

import { masterDatabase, universalTemplate } from './js/data/catalog-data.js';

// ----- ГЛОБАЛЬНЫЕ ФУНКЦИИ -----

// Открытие/закрытие модальных окон
window.openModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
};

window.closeModal = function(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
};

window.closeOnBackgroundClick = function(event, id) {
    const el = document.getElementById(id);
    if (event.target === el) el.style.display = 'none';
};

// Поиск на Alibaba
window.searchAlibaba = function(rowId) {
    if (rowId === 'equip') {
        const productName = document.getElementById('product-name-input')?.value || 'manufacturing';
        const query = encodeURIComponent(productName.trim() + ' production line equipment');
        window.open(`https://www.alibaba.com/trade/search?SearchText=${query}`, '_blank');
    } else {
        const nameInput = document.getElementById(`${rowId}-name`);
        const query = nameInput ? encodeURIComponent(nameInput.value.trim()) : 'Material';
        window.open(`https://www.alibaba.com/trade/search?SearchText=${query}`, '_blank');
    }
};

// Добавление строки в таблицу
window.addComponentRow = function(name = '', url = '', qty = 1, price = 0) {
    const tbody = document.getElementById('component-dynamic-rows');
    if (!tbody) return;

    const rowId = 'comp-row-' + Date.now() + Math.random().toString(36).substr(2, 5);
    const tr = document.createElement('tr');
    tr.id = rowId;
    tr.innerHTML = `
        <td>
            <input type="text" id="${rowId}-name" class="input-table-cell" value="${name}" placeholder="Название детали...">
            <input type="text" id="${rowId}-url" class="input-supplier-link" value="${url}" placeholder="🔗 Вставьте ссылку на товар с Alibaba...">
        </td>
        <td style="text-align: center;"><button class="btn-search" onclick="searchAlibaba('${rowId}')">🔍 Поиск</button></td>
        <td><input type="number" step="0.1" class="input-table-cell-num comp-qty" value="${qty}" oninput="calculateAll()"></td>
        <td>
            <div style="display:flex; align-items:center; gap:5px; justify-content: flex-end;">
                <input type="number" step="0.0001" class="input-table-cell-num comp-price" id="${rowId}-price" value="${price}" oninput="calculateAll()">
                <button title="Расчет оптовой партии" onclick="openBulkCalc('${rowId}')" class="btn-calc-bulk">🧮</button>
            </div>
        </td>
        <td style="text-align: center;"><button class="btn-delete" onclick="deleteComponentRow('${rowId}')">❌</button></td>
    `;
    tbody.appendChild(tr);
    calculateAll();
};

// Удаление строки
window.deleteComponentRow = function(rowId) {
    const row = document.getElementById(rowId);
    if (row) row.remove();
    calculateAll();
};

// ----- ОСНОВНЫЕ РАСЧЁТЫ -----

window.updateDynamicOverhead = function() {
    const equipPrice = parseFloat(document.getElementById('val-equip')?.value) || 0;
    const staff = parseFloat(document.getElementById('val-staff')?.value) || 0;
    const salary = parseFloat(document.getElementById('val-salary')?.value) || 0;

    const amort = equipPrice / 5 / 365;
    const salaryPerDay = (salary * staff) / 30;
    const total = Math.round(amort + salaryPerDay);
    const overheadEl = document.getElementById('base-overhead');
    if (overheadEl) overheadEl.innerText = total;
    calculateAll();
};

window.calculateAll = function() {
    let totalBom = 0;
    const rows = document.querySelectorAll('#component-dynamic-rows tr');
    rows.forEach(tr => {
        const qty = parseFloat(tr.querySelector('.comp-qty')?.value) || 0;
        const price = parseFloat(tr.querySelector('.comp-price')?.value) || 0;
        totalBom += qty * price;
    });

    const equipPrice = parseFloat(document.getElementById('val-equip')?.value) || 0;
    const staff = parseFloat(document.getElementById('val-staff')?.value) || 0;
    const salary = parseFloat(document.getElementById('val-salary')?.value) || 0;
    const marketPrice = parseFloat(document.getElementById('market-price-input')?.value) || 0;

    const amort = equipPrice / 5 / 365;
    const salaryPerDay = (salary * staff) / 30;
    const overhead = amort + salaryPerDay;
    const perf = totalBom > 0 ? Math.ceil(overhead / (totalBom * 0.1)) : 0;
    const machineShare = perf > 0 ? overhead / perf : 0;
    const totalCost = totalBom + machineShare;
    const profitPerDay = perf * (marketPrice - totalCost);
    const monthProfit = Math.round(profitPerDay * 30);
    const payback = profitPerDay > 0 ? Math.ceil(equipPrice / profitPerDay) : Infinity;

    document.getElementById('total-bom-cost').innerText = totalBom.toFixed(2);
    document.getElementById('base-overhead').innerText = Math.round(overhead);
    document.getElementById('perf-val').innerText = perf;
    document.getElementById('total-product-cost').innerText = totalCost.toFixed(2);
    document.getElementById('payback-days').innerText = payback === Infinity ? '∞' : payback;
    document.getElementById('income-month').innerText = monthProfit > 0 ? monthProfit.toLocaleString('ru-RU') : '0';

    saveCurrentDataToStorage();
};

// ----- СОХРАНЕНИЕ/ЗАГРУЗКА -----

window.saveCurrentDataToStorage = function() {
    try {
        const data = {
            processName: document.getElementById('product-name-input')?.value || '',
            equip: document.getElementById('val-equip')?.value || 0,
            staff: document.getElementById('val-staff')?.value || 2,
            salary: document.getElementById('val-salary')?.value || 10000,
            marketPrice: document.getElementById('market-price-input')?.value || 0,
            components: []
        };

        const rows = document.querySelectorAll('#component-dynamic-rows tr');
        rows.forEach(tr => {
            const nameInput = tr.querySelector('.input-table-cell');
            const urlInput = tr.querySelector('.input-supplier-link');
            const qtyInput = tr.querySelector('.comp-qty');
            const priceInput = tr.querySelector('.comp-price');
            data.components.push({
                name: nameInput?.value || '',
                url: urlInput?.value || '',
                qty: qtyInput?.value || 1,
                price: priceInput?.value || 0
            });
        });
        localStorage.setItem('asuir_cache_ru_v30', JSON.stringify(data));
    } catch(e) { /* ignore */ }
};

window.loadDataFromStorage = function() {
    try {
        const raw = localStorage.getItem('asuir_cache_ru_v30');
        if (!raw) return;
        const data = JSON.parse(raw);
        if (!data.components || data.components.length === 0) return;

        document.getElementById('product-name-input').value = data.processName || '';
        document.getElementById('val-equip').value = data.equip || 0;
        document.getElementById('val-staff').value = data.staff || 2;
        document.getElementById('val-salary').value = data.salary || 10000;
        document.getElementById('market-price-input').value = data.marketPrice || 0;

        const tbody = document.getElementById('component-dynamic-rows');
        tbody.innerHTML = '';
        data.components.forEach(comp => {
            addComponentRow(comp.name, comp.url || '', comp.qty, comp.price);
        });
        calculateAll();
    } catch(e) { /* ignore */ }
};

// ----- МОДАЛЬНЫЕ ОКНА -----

window.openBulkCalc = function(rowId) {
    window._bulkRowId = rowId;
    document.getElementById('bulk-total-price').value = '';
    document.getElementById('bulk-total-qty').value = '';
    openModal('bulk-modal');
};

window.applyBulkCalc = function() {
    const totalPrice = parseFloat(document.getElementById('bulk-total-price')?.value) || 0;
    const totalQty = parseFloat(document.getElementById('bulk-total-qty')?.value) || 1;
    const unitPrice = totalQty > 0 ? totalPrice / totalQty : 0;

    const priceInput = document.getElementById(window._bulkRowId + '-price');
    if (priceInput) {
        priceInput.value = unitPrice.toFixed(4);
        calculateAll();
    }
    closeModal('bulk-modal');
};

window.selectFromCatalog = function(keyword) {
    document.getElementById('product-name-input').value = keyword;
    closeModal('catalog-modal');
    generateDynamicAsuirSpecificationRu();
};

window.generateDynamicAsuirSpecificationRu = function() {
    const input = document.getElementById('product-name-input').value.toLowerCase();
    let found = null;
    for (const item of masterDatabase) {
        if (item.tags.some(tag => input.includes(tag))) {
            found = item;
            break;
        }
    }
    if (!found) found = universalTemplate;

    document.getElementById('status-equip').innerText = found.name;
    document.getElementById('market-price-input').value = found.marketPrice;
    document.getElementById('val-equip').value = found.equipPrice;
    document.getElementById('val-staff').value = 2;
    document.getElementById('val-salary').value = 10000;
    document.getElementById('equip-url').value = '';

    const tbody = document.getElementById('component-dynamic-rows');
    tbody.innerHTML = '';
    found.components.forEach(comp => {
        addComponentRow(comp.name, comp.url || '', comp.qty, comp.price);
    });
    calculateAll();
};

// ----- ЗАПУСК ПРИ ЗАГРУЗКЕ -----
document.addEventListener('DOMContentLoaded', function() {
    const saved = localStorage.getItem('asuir_cache_ru_v30');
    if (saved) {
        loadDataFromStorage();
    } else {
        generateDynamicAsuirSpecificationRu();
    }
});

console.log('✅ ASUIR Gemini загружен!');
