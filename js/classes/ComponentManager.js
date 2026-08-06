// ===== ComponentManager.js =====

export class ComponentManager {
    constructor(tbodyId, onDataChange) {
        this.tbody = document.getElementById(tbodyId);
        this.onDataChange = onDataChange;
        this.rowCounter = 0;
    }

    addRow(name = '', url = '', qty = 1, price = 0, searchQuery = '', recalc = true) {
        const rowId = `comp-row-${Date.now()}-${this.rowCounter++}`;
        const tr = document.createElement('tr');
        tr.id = rowId;
        tr.innerHTML = `
            <td>
                <input type="text" id="${rowId}-name" class="input-table-cell" value="${name}" data-q="${searchQuery || name}" placeholder="Название детали..." oninput="window.componentManager.handleNameInput(this, '${rowId}')">
                <input type="text" id="${rowId}-url" class="input-supplier-link" value="${url}" placeholder="🔗 Вставьте ссылку на товар с Alibaba..." oninput="window.storageManager.save()">
            </td>
            <td style="text-align: center;"><button class="btn-search" onclick="window.componentManager.searchAlibaba('${rowId}')">🔍 Поиск</button></td>
            <td><input type="number" step="0.1" class="input-table-cell-num comp-qty" value="${qty}" oninput="window.app.calculateAll()"></td>
            <td>
                <div style="display:flex; align-items:center; gap:5px; justify-content: flex-end;">
                    <input type="number" step="0.0001" class="input-table-cell-num comp-price" id="${rowId}-price" value="${price}" oninput="window.app.calculateAll()">
                    <button title="Расчет оптовой партии" onclick="window.app.openBulkCalc('${rowId}')" class="btn-calc-bulk">🧮</button>
                </div>
            </td>
            <td style="text-align: center;"><button class="btn-delete" onclick="window.componentManager.deleteRow('${rowId}')">❌</button></td>
        `;
        this.tbody.appendChild(tr);
        if (recalc) this.onDataChange();
    }

    deleteRow(rowId) {
        const row = document.getElementById(rowId);
        if (row) {
            row.remove();
            this.onDataChange();
        }
    }

    handleNameInput(input, rowId) {
        input.dataset.q = input.value.trim();
        window.storageManager.save();
    }

    searchAlibaba(rowId) {
        const nameInput = document.getElementById(`${rowId}-name`);
        const query = nameInput?.dataset?.q || nameInput?.value?.trim() || 'Material';
        if (query) {
            window.open(`https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(query)}`, '_blank');
        }
    }

    getComponents() {
        const result = [];
        for (const tr of this.tbody.children) {
            const rowId = tr.id;
            const nameInput = document.getElementById(`${rowId}-name`);
            const urlInput = document.getElementById(`${rowId}-url`);
            const qtyInput = tr.querySelector('.comp-qty');
            const priceInput = tr.querySelector('.comp-price');
            result.push({
                name: nameInput ? nameInput.value : '',
                url: urlInput ? urlInput.value : '',
                q: nameInput ? nameInput.dataset.q : '',
                qty: qtyInput ? parseFloat(qtyInput.value) || 0 : 0,
                price: priceInput ? parseFloat(priceInput.value) || 0 : 0
            });
        }
        return result;
    }

    loadFromArray(components) {
        this.tbody.innerHTML = '';
        components.forEach(c => {
            this.addRow(c.name, c.url || '', c.qty, c.price, c.q || '', false);
        });
        this.onDataChange();
    }

    clear() {
        this.tbody.innerHTML = '';
    }
}