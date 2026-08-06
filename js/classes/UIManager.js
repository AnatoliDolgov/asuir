// ===== UIManager.js =====

export class UIManager {
    static updateText(id, value, prefix = '') {
        const el = document.getElementById(id);
        if (el) el.textContent = prefix + value;
    }

    static updateInput(id, value) {
        const el = document.getElementById(id);
        if (el) el.value = value;
    }

    static openModal(id) {
        const el = document.getElementById(id);
        if (el) el.style.display = 'block';
    }

    static closeModal(id) {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    }

    static setStatus(text) {
        const el = document.getElementById('status-equip');
        if (el) el.innerText = text;
    }

    static showBulkResult(price, rowId) {
        const priceInput = document.getElementById(`${rowId}-price`);
        if (priceInput) {
            priceInput.value = parseFloat(price.toFixed(4));
            priceInput.dispatchEvent(new Event('input'));
        }
    }
}