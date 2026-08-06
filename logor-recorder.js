// logor-recorder.js
const logURL = 'log.json';

function logAction({ intent, actor, node }) {
    const time = new Date().toISOString().replace('T', ' ').split('.')[0];
    const entry = { intent, actor, node, time };

    // Загружаем текущий журнал
    fetch(logURL)
        .then(res => res.json())
        .then(log => {
            log.push(entry);
            return fetch(logURL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(log, null, 2)
            });
        })
        .catch(err => console.warn('❗ Не удалось записать в log.json:', err));
}
