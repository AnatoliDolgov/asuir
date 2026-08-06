// ===== catalog-data.js =====

export const universalTemplate = {
    name: 'Универсальная сборочная линия',
    equipQuery: 'automated+manufacturing+assembly+machine',
    marketPrice: 200,
    equipPrice: 60000,
    components: [
        { name: 'Основной базовый материал', qty: 1, price: 40.0, q: 'raw+material+bulk' },
        { name: 'Вспомогательные функциональные модули', qty: 1, price: 25.0, q: 'electronic+control+board' },
        { name: 'Крепежные элементы и расходники', qty: 1, price: 8.0, q: 'industrial+fasteners+screws' },
        { name: 'Декоративный корпус или оболочка', qty: 1, price: 12.0, q: 'custom+plastic+casing' },
        { name: 'Потребительская коробка с штрихкодом', qty: 1, price: 3.0, q: 'custom+retail+packaging+box' }
    ]
};

export const masterDatabase = [
    {
        tags: ['дрон', 'коптер', 'drone', 'quadcopter', 'бпла'],
        name: 'Роботизированный сборочный комплекс БПЛА',
        equipQuery: 'drone+assembly+line+machine',
        marketPrice: 423,
        equipPrice: 120000,
        components: [
            { name: 'Карбоновая рама (5") Mark4 Racing OEM', qty: 1, price: 5.0, q: 'carbon+fiber+drone+frame' },
            { name: 'Полетный контроллер в сборе (FC + ESC 50A)', qty: 1, price: 45.0, q: 'drone+flight+controller' },
            { name: 'Бесколлекторные моторы (4 шт.) XING2 2207', qty: 1, price: 40.0, q: 'fpv+brushless+motor' },
            { name: 'Цифровая видеосистема VTX и камера', qty: 1, price: 35.0, q: 'drone+fpv+camera' },
            { name: 'Аккумулятор LiPo 6S 1300mAh', qty: 1, price: 25.0, q: 'lipo+battery+6s' }
        ]
    },
    {
        tags: ['планшет', 'tablet', 'pad', 'смартфон', 'телефон', 'гаджет'],
        name: 'Компактная SMT-линия сборки мобильных устройств',
        equipQuery: 'smartphone+tablet+assembly+equipment',
        marketPrice: 150,
        equipPrice: 45000,
        components: [
            { name: 'Сенсорный экран в сборе (IPS/OLED)', qty: 1, price: 35.0, q: 'tablet+touch+screen+display' },
            { name: 'Материнская плата SoC (ARM процессор + Wi-Fi)', qty: 1, price: 45.0, q: 'tablet+motherboard+pcba' },
            { name: 'Плоский литий-полимерный аккумулятор', qty: 1, price: 10.0, q: 'tablet+lithium+battery' },
            { name: 'Ультратонкий корпус и шлейфы', qty: 1, price: 8.0, q: 'tablet+metal+case+housing' },
            { name: 'Внешняя упаковочная коробка', qty: 1, price: 2.0, q: 'custom+tablet+packaging+box' }
        ]
    },
    {
        tags: ['телевизор', 'tv', 'television', 'lcd', 'screen', 'дисплей', 'монитор'],
        name: 'Линия сборки ЖК/OLED панелей и телевизоров',
        equipQuery: 'lcd+tv+assembly+line+equipment',
        marketPrice: 550,
        equipPrice: 280000,
        components: [
            { name: 'ЖК / OLED Матрица дисплея (Открытая ячейка)', qty: 1, price: 140.0, q: 'lcd+open+cell+tv' },
            { name: 'Материнская плата управления (Main Board)', qty: 1, price: 45.0, q: 'tv+main+board' },
            { name: 'Блок питания инверторный (PSU)', qty: 1, price: 25.0, q: 'tv+power+supply+board' },
            { name: 'Светодиодная линейка подсветки матрицы', qty: 1, price: 15.0, q: 'tv+led+backlight+strip' },
            { name: 'Тайминг-контроллер дисплея (T-CON Board)', qty: 1, price: 12.0, q: 'tv+t-con+board' },
            { name: 'Акустические стереодинамики и Корпус', qty: 1, price: 28.0, q: 'tv+plastic+housing+speakers' }
        ]
    },
    {
        tags: ['компьют', 'computer', 'pc', 'server', 'кассов', 'вычислитель', 'сервер', 'ноутбук'],
        name: 'Сборочный участок вычислительной и серверной техники',
        equipQuery: 'computer+assembly+line+machine',
        marketPrice: 1100,
        equipPrice: 180000,
        components: [
            { name: 'Центральный процессор (Desktop CPU)', qty: 1, price: 340.0, q: 'desktop+cpu+processor' },
            { name: 'Дискретная графическая карта (GPU)', qty: 1, price: 520.0, q: 'desktop+graphic+card+gpu' },
            { name: 'Материнская плата ATX/ITX', qty: 1, price: 140.0, q: 'desktop+motherboard' },
            { name: 'Модули оперативной памяти (RAM DDR5)', qty: 1, price: 105.0, q: 'desktop+ram+memory' },
            { name: 'Твердотельный накопитель данных (SSD NVMe)', qty: 1, price: 115.0, q: 'm2+nvme+ssd' },
            { name: 'Интерфейсный контроллер, блок питания и корпус', qty: 1, price: 130.0, q: 'computer+case+with+power+supply' }
        ]
    },
    {
        tags: ['станок', 'machine', 'press', 'bench', 'чпу', 'фрезер', 'инструмент'],
        name: 'Сборка настольных ЧПУ-станков для мастерских',
        equipQuery: 'desktop+cnc+milling+machine',
        marketPrice: 1500,
        equipPrice: 25000,
        components: [
            { name: 'Легкосплавная фрезерованная рама / станина', qty: 1, price: 300.0, q: 'cnc+aluminum+frame' },
            { name: 'Шаговые сервомоторы и драйверы', qty: 1, price: 150.0, q: 'nema+stepper+motor' },
            { name: 'Контроллер ЧПУ (Плата управления)', qty: 1, price: 80.0, q: 'cnc+control+board' },
            { name: 'Линейные направляющие и ШВП', qty: 1, price: 200.0, q: 'linear+guide+rail+ballscrew' },
            { name: 'Шпиндель фрезерный и блок питания', qty: 1, price: 200.0, q: 'cnc+spindle+motor+kit' }
        ]
    },
    {
        tags: ['ювелир', 'золот', 'серебр', 'кольц', 'кулон', 'ожерель', 'jewelry'],
        name: 'Ювелирный литейный микро-комплекс (Кольца)',
        equipQuery: 'jewelry+casting+making+equipment+machine',
        marketPrice: 350,
        equipPrice: 45000,
        components: [
            { name: 'Золото / Серебро (Литейный сплав, грамм)', qty: 10, price: 8.0, q: 'casting+gold+silver+grains' },
            { name: 'Драгоценные вставки (камни, фианиты)', qty: 2, price: 20.0, q: 'cubic+zirconia+precious+stones' },
            { name: 'Ювелирная фурнитура (застежки)', qty: 1, price: 5.0, q: 'jewelry+clasps+findings' },
            { name: 'Расходники для гальваники и полировочные пасты', qty: 1, price: 5.0, q: 'jewelry+polishing+compound' },
            { name: 'Подарочный бархатный футляр', qty: 1, price: 5.0, q: 'velvet+jewelry+gift+box' }
        ]
    },
    {
        tags: ['час', 'watch', 'хронометр', 'часы'],
        name: 'Сборочный участок наручных часов',
        equipQuery: 'watch+assembly+making+tools+machine',
        marketPrice: 450,
        equipPrice: 35000,
        components: [
            { name: 'Корпус часов и сапфировое стекло', qty: 1, price: 30.0, q: 'watch+case+sapphire+glass' },
            { name: 'Высокоточный часовой механизм', qty: 1, price: 40.0, q: 'watch+movement+mechanism' },
            { name: 'Металлический циферблат и стрелки', qty: 1, price: 10.0, q: 'watch+dial+hands' },
            { name: 'Ремешок (кожа или металл)', qty: 1, price: 15.0, q: 'genuine+leather+watch+strap' },
            { name: 'Подарочный футляр для часов', qty: 1, price: 8.0, q: 'luxury+watch+box' }
        ]
    },
    {
        tags: ['бижутер', 'украшен', 'bijouterie', 'аксессуар'],
        name: 'Автомат по сборке стильной бижутерии',
        equipQuery: 'costume+jewelry+making+machine+press',
        marketPrice: 25,
        equipPrice: 15000,
        components: [
            { name: 'Цинковый/латунный сплав (Заготовка)', qty: 1, price: 2.0, q: 'stamping+brass+blank+jewelry' },
            { name: 'Декоративные стразы (Кристаллы)', qty: 1, price: 1.0, q: 'glass+rhinestone+crystal' },
            { name: 'Бижутерная фурнитура (швензы, замочки)', qty: 1, price: 0.5, q: 'costume+jewelry+findings' },
            { name: 'Гальванический раствор (золочение)', qty: 1, price: 0.5, q: 'gold+plating+solution' },
            { name: 'Бархатная подложка и эко-пакетик', qty: 1, price: 1.5, q: 'jewelry+display+card+bag' }
        ]
    },
    {
        tags: ['научн', 'микроскоп', 'спектрометр'],
        name: 'Сборка научно-аналитических приборов',
        equipQuery: 'scientific+precision+instrument+manufacturing',
        marketPrice: 850,
        equipPrice: 320000,
        components: [
            { name: 'Прецизионный лазерный модуль / источник света', qty: 1, price: 120.0, q: 'precision+laser+module' },
            { name: 'Кремниевая сенсорная матрица', qty: 1, price: 95.0, q: 'cmos+sensor+module' },
            { name: 'Оптические линзы и светофильтры с просветлением', qty: 3, price: 25.0, q: 'optical+glass+lens' },
            { name: 'Металлический антимагнитный корпус', qty: 1, price: 45.0, q: 'aluminum+instrument+enclosure' },
            { name: 'Микроконтроллер обработки данных', qty: 1, price: 80.0, q: 'data+processing+pcba' }
        ]
    },
    {
        tags: ['морск', 'эхолот', 'гидроакуст', 'радар'],
        name: 'Стенд сборки морских навигационных приборов',
        equipQuery: 'marine+navigation+equipment+assembly',
        marketPrice: 950,
        equipPrice: 280000,
        components: [
            { name: 'Ультразвуковой гидроакустический излучатель', qty: 1, price: 110.0, q: 'ultrasonic+transducer+marine' },
            { name: 'Герметичный ударопрочный корпус (IP68)', qty: 1, price: 85.0, q: 'waterproof+marine+enclosure+ip68' },
            { name: 'Антикоррозийные разъемы и кабели', qty: 1, price: 25.0, q: 'marine+waterproof+connector' },
            { name: 'ЖК-дисплей морского исполнения', qty: 1, price: 150.0, q: 'sunlight+readable+lcd+marine' },
            { name: 'Материнская плата эхолота', qty: 1, price: 120.0, q: 'marine+radar+pcba' }
        ]
    },
    {
        tags: ['прибор', 'аппарат', 'измерител', 'оптическ', 'геодез', 'фото', 'кино', 'контрол', 'сигнал', 'регулят', 'трансформатор'],
        name: 'Сборка точных измерительных приборов',
        equipQuery: 'precision+instrument+assembly+machine',
        marketPrice: 450,
        equipPrice: 110000,
        components: [
            { name: 'Высокоточный сенсорный модуль', qty: 1, price: 120.0, q: 'high+precision+digital+sensor' },
            { name: 'Микропроцессорная плата сбора сигналов', qty: 1, price: 65.0, q: 'mcu+control+board+pcba' },
            { name: 'ЖК-индикаторная панель (Дисплей)', qty: 1, price: 25.0, q: 'lcd+segment+display+module' },
            { name: 'Стабилизированный импульсный блок питания', qty: 1, price: 35.0, q: 'switching+power+supply+board' },
            { name: 'Ударопрочный корпус (IP65)', qty: 1, price: 40.0, q: 'waterproof+ip67+plastic+enclosure' },
            { name: 'Шлейфы, проводка, клеммы', qty: 1, price: 15.0, q: 'wire+harness+connector+kit' }
        ]
    },
    {
        tags: ['хлеб', 'пекарн', 'bakery', 'bread', 'baking', 'пищев', 'еда'],
        name: 'Автоматизированная хлебопекарная мини-линия',
        equipQuery: 'commercial+automated+bakery+equipment',
        marketPrice: 1.5,
        equipPrice: 45000,
        components: [
            { name: 'Пшеничная мука высшего сорта (кг)', qty: 0.6, price: 0.4, q: 'premium+wheat+flour+bulk' },
            { name: 'Дрожжи, соль, сахар и хлебопекарные смеси', qty: 1, price: 0.05, q: 'dry+baking+yeast' },
            { name: 'Упаковочный пакет для выпечки', qty: 1, price: 0.08, q: 'bakery+paper+bag+custom' }
        ]
    },
    {
        tags: ['пожарн', 'огнет', 'тушен', 'fire', 'спасан'],
        name: 'Комплекс заправки и сборки систем огнетушения',
        equipQuery: 'fire+extinguisher+filling+machine',
        marketPrice: 250,
        equipPrice: 80000,
        components: [
            { name: 'Стальной баллон высокого давления', qty: 1, price: 45.0, q: 'empty+fire+extinguisher+cylinder' },
            { name: 'Устройство пусковое (ЗПУ) с манометром', qty: 1, price: 25.0, q: 'fire+extinguisher+valve' },
            { name: 'Огнетушащий порошок / хладон', qty: 1, price: 15.0, q: 'abc+dry+chemical+powder' },
            { name: 'Армированный резиновый шланг', qty: 1, price: 8.0, q: 'fire+extinguisher+hose' },
            { name: 'Чека, пломба и крепление на стену', qty: 1, price: 3.0, q: 'fire+extinguisher+bracket+pin' }
        ]
    },
    {
        tags: ['транспорт', 'автомоб', 'прицеп', 'лодок', 'самокат', 'скутер', 'велосипед'],
        name: 'Сборочный узел легкого электротранспорта',
        equipQuery: 'electric+scooter+ebike+assembly+line',
        marketPrice: 850,
        equipPrice: 140000,
        components: [
            { name: 'Несущая жесткая рама', qty: 1, price: 120.0, q: 'electric+scooter+aluminum+frame' },
            { name: 'Электромотор-колесо', qty: 1, price: 150.0, q: 'hub+motor+wheel' },
            { name: 'Контроллер тяги и управления', qty: 1, price: 80.0, q: 'brushless+motor+controller' },
            { name: 'Тяговая аккумуляторная батарея (Li-ion)', qty: 1, price: 180.0, q: 'lithium+ion+battery+pack' },
            { name: 'Колеса, тормоза и амортизаторы', qty: 1, price: 90.0, q: 'scooter+disc+brake+kit' },
            { name: 'Внешние элементы корпуса, фары', qty: 1, price: 45.0, q: 'scooter+plastic+parts+led' }
        ]
    },
    {
        tags: ['музык', 'гитар', 'пиан', 'барабан', 'аудио', 'звуко', 'music'],
        name: 'Фрезеровка и сборка струнных инструментов',
        equipQuery: 'guitar+cnc+making+machine',
        marketPrice: 400,
        equipPrice: 65000,
        components: [
            { name: 'Древесина выдержанная (Ель/Клен)', qty: 1, price: 65.0, q: 'guitar+tonewood+body+blank' },
            { name: 'Гриф гитары с разметкой', qty: 1, price: 35.0, q: 'guitar+neck+maple' },
            { name: 'Набор металлических струн', qty: 1, price: 18.0, q: 'acoustic+guitar+strings' },
            { name: 'Механические колки', qty: 1, price: 14.0, q: 'guitar+tuning+pegs' },
            { name: 'Акустический звукосниматель', qty: 1, price: 25.0, q: 'guitar+pickup+piezo' },
            { name: 'Лак резонансный и полировка', qty: 1, price: 8.0, q: 'guitar+finishing+lacquer' }
        ]
    },
    {
        tags: ['мебел', 'шкаф', 'стол', 'стул', 'зеркал', 'дерев', 'furniture'],
        name: 'Автоматическая столярная мастерская',
        equipQuery: 'cnc+woodworking+furniture+machine',
        marketPrice: 280,
        equipPrice: 90000,
        components: [
            { name: 'Листовой плитный материал (ЛДСП / МДФ)', qty: 4, price: 15.0, q: 'mdf+melamine+board' },
            { name: 'Кромочная декоративная лента ПВХ', qty: 1, price: 5.0, q: 'pvc+edge+banding' },
            { name: 'Мебельное зеркальное полотно', qty: 1, price: 22.0, q: 'furniture+tempered+glass+mirror' },
            { name: 'Металлическая фурнитура (петли)', qty: 1, price: 8.0, q: 'furniture+concealed+hinges' },
            { name: 'Выдвижные направляющие и ручки', qty: 1, price: 25.0, q: 'drawer+slides+soft+close' },
            { name: 'Гофрокартон и защитные уголки', qty: 1, price: 6.0, q: 'corrugated+carton+corner+protector' }
        ]
    },
    {
        tags: ['ткан', 'текстил', 'одеял', 'покрывал', 'штор', 'одежд', 'обувь', 'плать', 'куртк', 'шапк', 'сапог', 'clothes'],
        name: 'Программируемая швейно-раскройная станция',
        equipQuery: 'industrial+sewing+cutting+machine',
        marketPrice: 65,
        equipPrice: 35000,
        components: [
            { name: 'Текстильный материал (Хлопок, деним) - метры', qty: 1.8, price: 12.0, q: 'cotton+denim+fabric+roll' },
            { name: 'Мягкая подкладка / Утеплитель', qty: 1.2, price: 3.5, q: 'polyester+padding+lining+fabric' },
            { name: 'Высокопрочные нити на катушке', qty: 1, price: 1.0, q: 'industrial+sewing+thread' },
            { name: 'Фурнитура: пуговицы, молнии, шнурки', qty: 1, price: 4.0, q: 'garment+accessories+buttons+zipper' },
            { name: 'Ярлык и эко-упаковка', qty: 1, price: 1.5, q: 'custom+clothing+woven+label' }
        ]
    }
];
