// ===== StorageManager.js =====

export class StorageManager {
    constructor(key = 'asuir_cache_ru_v30') {
        this.key = key;
    }

    save(data) {
        try {
            localStorage.setItem(this.key, JSON.stringify(data));
        } catch (e) { /* ignore */ }
    }

    load() {
        try {
            const raw = localStorage.getItem(this.key);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    exportToFile(data, filename = 'asuir_project.json') {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    importFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try { resolve(JSON.parse(e.target.result)); } 
                catch (err) { reject(new Error('Неверный формат JSON')); }
            };
            reader.onerror = () => reject(new Error('Ошибка чтения файла'));
            reader.readAsText(file);
        });
    }
}