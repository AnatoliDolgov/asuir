// mind-adaptor.js
let mindState = null;
let mindURL = 'mind.json';

// Загружаем текущее состояние
fetch(mindURL)
    .then(res => res.json())
    .then(data => { mindState = data; });

function updateMind(currentId, scenarioTitle = null) {
    if (!mindState) return;

    // Добавляем текущий узел в trail, если его ещё нет
    if (!mindState.trail) mindState.trail = [];
    if (!mindState.trail.includes(currentId)) {
        mindState.trail.push(currentId);
    }

    // Обновляем next: следующий шаг в сценарии (если известен)
    if (scenario && step < scenario.steps.length) {
        mindState.next = scenario.steps[step];
    } else {
        mindState.next = "";
    }

    // Обновляем состояние
    mindState.state = "выполняется";

    // Если сценарий был передан — обновим
    if (scenarioTitle) mindState.scenario = scenarioTitle;

    // Сохраняем JSON-файл (если сервер поддерживает PUT)
    fetch(mindURL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mindState, null, 2)
    }).catch(err => console.warn("mind.json: сохранение не удалось", err));
}

// Встраиваем в выполнение узла
function executeNode(id) {
    // ... оригинальный код ...

    // обновим ум
    updateMind(id, scenario?.title);
}
