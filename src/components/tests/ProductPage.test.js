import { render, screen, fireEvent } from "@testing-library/react";
import ProductPage from "../ProductPage/ProductPage";
import * as reduxHooks from 'react-redux'
import * as routerHooks from "react-router-dom";
import * as actions from '../../redux/Slices/products'
jest.mock('react-redux')
jest.mock('react-router-dom')
const products = [
  {
    id: 1,
    imageUrl:
      "https://avatars.mds.yandex.net/get-mpic/5191276/img_id2219247364529302510.jpeg/orig",
    name: "Borger Мицеллярная вода для всех типов кожи",
    typeOfSize: "Объём",
    size: 250,
    barcode: 4604049097548,
    manufacturer: "Франция",
    brand: "Bioderma",
    description: `Бренд Биодерма - создается командой биологов и дерматологов. Косметические средства для лечения и профилактики кожных проблем.
          Линия Sensibio - уход за чувствительной кожей, лечение себорейного дерматита, купероза
          Bioderma Sensibio Micelle solution (Биодерма Сенсибио H2O мицелловый раствор) - подходит всем типам кожи, в том числе чувствительной и реактивной.
          Внешний вид и свойства: Консистенция жидкая, подобная обычной воде, цвет прозрачный без примесей, запах почти отсутствует. Если банку потрясти, она начинает немного пенится.
          Мицеллярная вода содержит мицеллы - сферические жидкие кристаллы, образуемые поверхностно-активными веществами, молекулы которых сгруппированы в сферы, где они ориентированы своими липофильными концами в середину, а гидрофильными - наружу. Размер таких шариков крайне мал, их диаметр около 0,00001 мм.
          Мицеллярная структура:
          - нейтрализует раздражающее действие, присущее всем поверхностно-активным веществам;
          - обеспечивает эффективное удаление с поверхности кожи не только водорастворимых, но и жировых загрязнений, которые активно захватываются мицеллами.
          Поэтому мицеллярный раствор является оптимальным средством для снятия макияжа.
          Чувствительность кожи может проявляться не только в виде легкого покраснения, но и различных проявлений розацеа.
          Лаборатория Bioderma разработала культовую мицеллярную воду Sensibio H2O с отличной переносимостью и наилучшими результатами.
          Сегодня это первое и единственное средство с высокой эффективностью среди продуктов данной категории, направленных на очищение кожи.
          Каждые 5 секунд в мире продается один флакон Сенсибио Н2О.
          Sensibio H2O предназначена для мягкого ухода за чувствительной кожей: она удаляет все виды загрязнений и декоративную косметику с кожи лица и глаз.
          Мицелловый раствор бережно и тщательно очищает, успокаивает, регенерирует и освежает кожные покровы, уменьшает проявления покраснения.
          Применяется также для снятия водостойкого макияжа.
          После применения средства нет необходимости умываться, что экономит время.
          В состав мицеллярной воды от Биодермa включены уникальные вещества:
          • мицеллы эфиров жирных кислот, по структуре аналогичные фосфолипидам эпидермиса;
          • экстракт огурца успокаивает реактивную кожу
          Специальные особенности: Без спирта, парабенов и отдушек. Гипоаллергенно.
          Результат: Чистая, нежная кожа лица и области вокруг глаз.`,
    price: 500,
    type: ["уход за лицом"],
  },
  {
    id: 2,
    imageUrl:
      "https://avatars.mds.yandex.net/get-mpic/5235397/img_id7173043578754141942.jpeg/orig",
    name: "Крем-спрей PERFECT HAIR многофункциональный OLLIN PROFESSIONAL 15 в 1 несмываемый",
    typeOfSize: "Объём",
    size: 250,
    barcode: 1264844716747,
    manufacturer: "Россия",
    brand: "OLLIN PROFESSIONAL",
    description: `Perfect Hair 15 в 1 - это несмываемое средство для комплексного ухода за волосами. Крем-спрей универсален! Уходовая косметика возвращает мягкость волосам. Жидкий шелк для волос устраняет эффект пушистости. Спрей термозащита для волос защищает от теплового воздействия. Многофункциональное средство разглаживает поврежденную структуру. Несмываемый уход для волос обеспечивает максимальное увлажнение сухих ломких волос и облегчает процесс расчесывания. Увлажняющий спрей предотвращает сечение кончиков и защищает от негативного влияния окружающей среды. Кератин для волос профессиональный облегчает укладку жестких непослушных локонов. Разглаживающий крем для волос продлевает яркость цвета окрашенных прядей. Активный компонент Lustreplex создает и сохраняет глянцевый блеск, придает естественный объем. Термозащитный спрей придает прочность и защиту от механических повреждений. Защита для волос продлевает яркость цвета окрашенных прядей. Косметическое средство обволакивает приятным ароматом.
          СПОСОБ ПРИМЕНЕНИЯ:
          Нанести на чистые, подсушенные полотенцем волосы. Распределить расческой по всей длине, включая кончики. Не смывая, приступить к укладке.`,
    price: 379,
    type: ["уход за волосами"],
  },
  {
    id: 3,
    imageUrl:
      "https://avatars.mds.yandex.net/get-mpic/3612791/img_id2339276838975679083.jpeg/orig",
    name: "Natura Siberica Пилинг-активатор для кожи головы Hair Evolution Re-Grow Укрепление и рост волос",
    typeOfSize: "Объём",
    size: 120,
    barcode: 1196484754377,
    manufacturer: "Россия",
    brand: "Natura Siberica",
    description: `Пилинг-активатор для кожи головы "RE-GROW Укрепление & рост волос" - первый шаг в системе RE-GROW. Удаляет из кожи головы устойчивые загрязнения, придает ощущение чистоты и свежести, восстанавливает здоровый баланс влаги и липидов, стимулирует рост волос. Подготавливает к глубокому проникновению ингредиентов из последующих этапов ухода, усиливая их действие. Корень маньчжурского женьшеня: укрепит корни и сократит выпадение, разбудит неактивные фолликулы Кофеин: стимулирует работу волосяных луковиц Биотин: заметно ускорит рост волос при регулярном применении.Способ применения: Разделить волосы на 6-8 частей. Нанести пилинг по образовавшимся проборам. Легкими массажными движениями распределить по коже и оставить на 10 мин. Смыть средство большим количеством воды и приступить к нанесению тоника- спрея для волос RE-GROW. Для достижения наилучшего результата использовать вместе с другими продуктами серии RE-GROW.`,
    price: 224,
    type: ["уход за волосами"],
  },
  {
    id: 4,
    imageUrl:
      "https://avatars.mds.yandex.net/get-mpic/6879515/img_id7705141150539334019.jpeg/orig",
    name: "ARAVIA Крем регенерирующий от трещин с лавандой",
    typeOfSize: "Объём",
    size: 150,
    barcode: 3276998645479,
    manufacturer: "Россия",
    brand: "ARAVIA",
    description: `Регенерирующий крем способствует нормализации процесса регенерации кожи, повышает эластичность. Специальный комплекс масел восстанавливает липидный барьер, снижая транс-эпидермальную потерю влаги и способствует естественному увлажнению глубоких слоев эпидермиса.
          Способ применения: Для очень сухой кожи. Нанести немного крема на область сухой кожи в виде маски, оставить на 15 минут. Остатки распределить по коже до полного впитывания. Не наносить на поврежденную кожу. Во избежание индивидуальной непереносимости компонентов перед применением протестируйте на небольшом участке кожи.`,
    price: 551,
    type: ["уход за ногами"],
  },
  {
    id: 5,
    imageUrl:
      "https://avatars.mds.yandex.net/get-mpic/7430655/img_id5647655404806821469.jpeg/orig",
    name: "Дезодорант DRY RU женский мужской, противомикробный спрей для ног от пота и запаха",
    typeOfSize: "Объём",
    size: 100,
    barcode: 8711965885412,
    manufacturer: "Швеция",
    brand: "DRY RU",
    description: `Эффективное Spray средство против потливости ног, обладающее охлаждающим и освежающим эффектом, c пролонгированным антимикробным действием. (Призведено в России) Преимущества: Высокоэффективное косметическое средство, имеющее в своем составе ментол. Идеальное средство против потливости ног. Имеет пролонгированное антимикробное действие. Обладает охлаждающим эффектом. Удобная упаковка в виде спрея. Устраняет неприятный запах. Не нарушает функции потовых желез. Безопасно и нетоксично. Универсально. Подходит как женщинам, так и мужчинам. Нет ограничений по длительности и частоте использования. Активные ингредиенты. Состав: Aqua, Al. Chlorohydrate, Alcohol, Polysorbate 20, Propylene Glycol, Menthol, Ethylhexylglycerin, Menthone, Octenidine HCI, Isomenthone, D, L-Limonene, L-Beta-Pinene, L-Alpha-Pinene, D-Pulegone, Limonene, Alpha-Terpineol, T-Butyl Alcohol, Isopulegol, Linalool, Denatonium Benzoate. Способ применения: основное назначение данного средства заключается в уменьшении потоотделения в области ног (лодыжки, стопы, пальцы). В зависимости от уровня потоотделения, однократное использование DRY DRY Foot Spray позволяет сохранять ощущение сухости и свежести до нескольких дней. Как правильно наносить DRY RU Foot Spray: в средстве используется система Spray. Антиперспирант для ног предназначен для ежедневного применения в утреннее, дневное и вечернее время. Утром, на вымытые и насухо вытертые ноги, наносится по 2 - 5 распылений на каждую стопу. После этого рекомендуется растереть средство массажными движениями по поверхности ног и убедиться, что средство покрыло поверхность всей стопы, места между пальцами и собственно пальцы. Приблизительно через 15 секунд ноги снова будут сухими. Действие DRY RU Foot Spray обеспечивает защиту сроком от суток до нескольких дней; полученная защита способна выдержать трехкратное мытье ног. Если на протяжение дня появляется ощущение недостаточной сухости, то можно без опасений использовать препарат и днем. В случае обильного и очень обильного потоотделения рекомендуется использовать средство на ночь, после мытья и тщательного просушивания ног. Для достижения наилучшего результата можно использовать средство до десяти дней подряд. Необходимо отметить, для того, чтобы DRY RU Foot Spray радовал своей эффективностью, результативностью, безопасностью и удобством применения долгие годы, рекомендуется делать короткий перерыв в использовании средства (например, по схеме "год использования - месяц перерыва").`,
    price: 604,
    type: ["уход за ногами"],
  },
  {
    id: 6,
    imageUrl:
      "https://avatars.mds.yandex.net/get-mpic/5234357/img_id4245850205365930065.png/orig",
    name: "GARNIER Ambre Solaire масло для интенсивного загара с ароматом кокоса",
    typeOfSize: "Объём",
    size: 200,
    barcode: 1149833555372,
    manufacturer: "Франция",
    brand: "GARNIER",
    description: `Для интенсивного загара. Смягчает и питает. Придает сияние. Низкая степень защиты SPF 2. Проверено дерматологическим контролем. Для очень смуглой уже загорелой кожи. Масло для загара, традиционно популярное среди любителей солнца, создано на основе превосходной питательной формулы и очень приятно в использовании. Оно придает коже сияние и необычайную мягкость и сияние. Интенсивный загар. Стойкая защита от UVA/UVB лучей. Мягкая и сияющая кожа.
          Внимание: дизайн упаковки может отличаться от представленного на фото.`,
    price: 499,
    type: ["средства для загара"],
  },
  {
    id: 7,
    imageUrl:
      "https://avatars.mds.yandex.net/get-mpic/5303146/img_id8514030574777424744.jpeg/orig",
    name: "Подарочный набор косметики девушке / бьюти бокс подарок на выпускной девушке / готовый подарок учителю / Подарочный набор уходовой косметики для лица",
    typeOfSize: "Вес",
    size: 1020,
    barcode: 8776447922411,
    manufacturer: "Россия",
    brand: "Bouquet Gourmet",
    description: `Подарочный набор STRAWBERRY собран для неги и удовольствий.
          Только в наших наборах косметики уход за лицом и телом + сладости!
          Поверьте, всегда приятнее, когда ухаживаешь за собой пить вкусный чай с травами и вкусняшками.
          Уходовые средства, входящие в состав подарочного набора, увлажняют и питают кожу, делая её сияющей, как после Спа салона!
          Подарите своей любимой женщине несколько часов неги и тишины.
          Когда ей не надо никуда спешить и она можно зажечь свечу, заварить вкусный чай, нанести косметику и погрузиться в мир приятных ощущений.
          Мы собрали только лучшие и самые необходимые косметические средства для ухода за кожей лица и тела и этот Бьюти бокс - идеальный вариант подарка!
          Косметика для увлажнения и питания кожи подойдет женщине любого возраста: подруге, жене, коллеге, свекрови, сестре, дочке. А антивозрастные и омолаживающие средства на каждый день хорошо зарекомендовали себя, как для сухой, так и проблемной кожи.
          В составе набора: тканевая маска для лица - 2 шт, патчи для глаз - 2 шт, крем для рук клубника - 1шт, бурлящие кристаллы соль для ванн - 1шт, бомбочка для ванны - 1шт, свеча из медовой вощины ручной работы - 1 шт, чай в стеклянной колбе - 1 шт, ореховый микс арахис и миндаль в бельгиском шоколаде в мешочке из органзы - 1шт, диффузор ароматический "богатство аромата" - 1 шт и открытка в подарок, которую вы можете подписать.
          Подарочный Набор упакован в крафтовую розовую коробку с атласным бантом.
          Вам осталось его лишь вручить и наслаждаться счастливыми эмоциями любимого человека!
          Подарки дойдут до вас в целости! Так как мы предусмотрели упаковку в дополнительную транспортировочную картонную коробку.`,
    price: 1550,
    type: ["подарочные наборы", "уход за лицом", "уход за руками"],
  },
  {
    id: 8,
    imageUrl:
      "https://avatars.mds.yandex.net/get-mpic/4080967/img_id2478084510987295619.png/orig",
    name: "Biomed ополаскиватель для полости рта",
    typeOfSize: "Объём",
    size: 500,
    barcode: 5565717334489,
    manufacturer: "Россия",
    brand: "Biomed",
    description: `Комплексный натуральный ополаскиватель Biomed Well Gum обеспечивает тонус и здоровье дёсен, защищает от бактерий. Средство на 98% состоит из натуральных компонентов. Содержит лактат кальция, L-аргинин, цинк, медь и магний, которые укрепляют и восстанавливают зубную эмаль.
          Фермент бромелаин из экстракта ананаса обеспечивает расщепление белкового налёта. Экстракты шалфея, подорожника и листьев берёзы оказывают антикариесное и противовоспалительное действие. Эфирные масла эвкалипта, аниса, кедра, гвоздики и розмарина обладают противовоспалительными, антисептическими и антиоксидантными свойствами. Средство не содержит фтора, триклозана, хлоргексидина, парабенов, сахарината, этилового спирта, SLES, PEG и синтетических ароматизаторов.
          Способ применения: наполнить колпачок ополаскивателем. Не разбавлять. Полоскать рот в течение минуты, затем выплюнуть. Не глотать. Для здоровья дёсен и зубов рекомендуется регулярно использовать ополаскиватель после приёма пищи или чистки зубов. Ополаскиватель рекомендован для взрослых и детей в возрасте от 6 лет.`,
    price: 276,
    type: ["гигиена полости рта", "гигиеническая продукция"],
  },
  {
    id: 9,
    imageUrl:
      "https://avatars.mds.yandex.net/get-mpic/5151433/img_id645987246608312141.jpeg/orig",
    name: "GARNIER Крем для рук Интенсивный уход Питание",
    typeOfSize: "Объём",
    size: 100,
    barcode: 2337651434984,
    manufacturer: "Франция",
    brand: "GARNIER",
    description: `Крем для рук Garnier Интенсивный уход питание для очень сухой кожи с аллантоином, 100мл`,
    price: 284,
    type: ["уход за руками"],
  },
  {
    id: 10,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-d/wc1000/6050122237.jpg",
    name: "Салфетки бумажные в коробке Zewa Everyday, 2 слоя, 250 шт.",
    typeOfSize: "Вес",
    size: 250,
    barcode: 1771881694664,
    manufacturer: "Россия",
    brand: "Zewa",
    description: `Бумажные салфетки Zewa Everyday не только всегда под рукой, если нужно быстро справиться с неловкими ситуациями, но и достаточно прочные, чтобы выдержать даже случайную машинную стирку*. Хотя они и очень прочные, салфетки Zewa Everyday еще и очень мягкие. Они заботятся о коже вашего лица и носа и помогают вам и вашей семье чувствовать себя в чистоте и комфорте, несмотря на загрязнения или простуду, чтобы вы встречали каждый день, полные уверенности! Также, мы заменили пластиковое окошко на бумажное для уменьшения влияния на окружающую среду, а яркие дизайны упаковок дополнят ваш интерьер!`,
    price: 343,
    type: ["уход за телом", "бумажная продукция"],
  },
  {
    id: 11,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-q/wc1000/6540371042.jpg",
    name: "EVELINE Бальзам после бритья MEN X-TREME Q10+R SENSITIVE защита от раздражения 5в1, 200 мл",
    typeOfSize: "Объём",
    size: 200,
    barcode: 4471661474238,
    manufacturer: "Польша",
    brand: "EVELINE",
    description: `БАЛЬЗАМ ПОСЛЕ БРИТЬЯ 5в1 ЗАЩИТА ОТ РАЗДРАЖЕНИЯ 24ч обеспечивает моментальный комплексный уход за чувствительной и склонной к раздражению кожей после бритья. Новая усовершенствованная формула, обогащенная коэнзимами Q10+R, а также экстрактом ромашки эффективно разглаживает морщины, снимает раздражение, которое может возникнуть после бритья, интенсивно увлажняет кожу и придает ей эластичность. Благодаря содержанию витамина Е и провитамина В 5 бальзам стимулирует защитные функции кожи.
          1. Мгновенно успокаивает кожу и уменьшает покраснение
          2. Интенсивно увлажняет и ухаживает за кожей
          3. Восстанавливает кожу
          4. Разглаживает морщины и питает
          5. Обеспечивает антибактериальную защиту
          Мгновенно впитывается
          Не оставляет жирного блеска
          Не содержит спирта`,
    price: 208,
    type: ["средства для бритья", "уход за лицом"],
  },
  {
    id: 12,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-b/wc1000/6055342775.jpg",
    name: "Маска гигиеническая маска медицинская СпецМедЗащита",
    typeOfSize: "Вес",
    size: 4,
    barcode: 2245212639438,
    manufacturer: "Россия",
    brand: "СпецМедЗащита",
    description: `Маска медицинская четырёхслойная одноразовая СпецМедЗащита, на резинках с носовым фиксатором, гигиеническая, синтетический нетканый материал, сертифицированная, российское производство. Четырехслойная одноразовая маска на резинках. Данная продукция изготовлена из высококачественного синтетического нетканого материала и имеет коэффициент бактериальной эффективности 99%. Маски предназначены для защиты органов дыхания от возможного заражения инфекционными, вирусными заболеваниями и попадания пыли. Маски надежно крепятся с помощью ушных резинок, обеспечивая комфорт в течение длительного времени использования. Медицинские гигиенические маски снабжены антибактериальным фильтром, который изготовлен из нетканого материала технологии SMS. Композитный материал (S - спанбонд, M - мелтблаун, S – спанбонд) имеет массу достоинств и отлично защищает от инфекций.`,
    price: 190,
    type: ["гигиеническая продукция", "уход за лицом"],
  },
  {
    id: 13,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-v/wc1000/6018718339.jpg",
    name: "Салфетки бумажные в коробке Zewa Deluxe Арома Коллекция, 3 слоя, 60 шт.",
    typeOfSize: "Вес",
    size: 100,
    barcode: 9936582611138,
    manufacturer: "Россия",
    brand: "Zewa",
    description: `Бумажные салфетки Zewa Deluxe Aroma Collection с приятным цветочным ароматом не только всегда под рукой, если нужно быстро справиться с неловкими ситуациями, но и достаточно прочные, чтобы выдержать даже случайную машинную стирку*. Хотя они и очень прочные, салфетки Zewa Deluxe Aroma Collection еще и очень мягкие. Они заботятся о коже вашего лица и носа и помогают вам и вашей семье чувствовать себя в чистоте и комфорте, несмотря на загрязнения или простуду, чтобы вы встречали каждый день, полные уверенности! Также, мы заменили пластиковое окошко на бумажное для уменьшения влияния на окружающую среду, а благодаря стильным дизайнам упаковок - салфетки станут незаменимой деталью вашего интерьера!`,
    price: 109,
    type: ["бумажная продукция", "уход за лицом"],
  },
  {
    id: 14,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-g/wc1000/6335532976.jpg",
    name: "Bioderma Sensibio Очищающий мицеллярный гель для чувствительной кожи, 500 мл",
    typeOfSize: "Объём",
    size: 500,
    barcode: 1477113366422,
    manufacturer: "Франция",
    brand: "Bioderma",
    description: `Гель для умывания Bioderma Sensibio мягко очищает кожу, даже самую чувствительную, в том числе и область вокруг глаз. Не вызывает раздражения. Со временем кожа становится менее реактивной, более увлажненной и защищенной от негативного воздействия свободных радикалов.

          АКТИВНЫЕ ИНГРЕДИЕНТЫ
          
          Патент D.A.F. (Dermatological Advanced Formulation) повышает переносимость кожи и помогает ей противостоять неблагоприятному воздействию извне;
          
          Мягкая очищающая база не сушит кожу и помогает восстановить естественный уровень увлажнения.`,
    price: 1691,
    type: ["уход за лицом", "уход за телом"],
  },
  {
    id: 15,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-u/wc1000/6538667166.jpg",
    name: "EVELINE Масло-бальзам для тела BOTANIC EXPERT ультра-питательное для сухой кожи 5 ДРАГОЦЕННЫХ МАСЕЛ, 350 мл",
    typeOfSize: "Объём",
    size: 350,
    barcode: 4996355688542,
    manufacturer: "Польша",
    brand: "EVELINE",
    description: `Интенсивный питательно-регенерирующий уход Ультрапитательное масло-бальзам для тела на основе уникальной формулы body glow придает коже эластичность и восстанавливает ее естественный блеск. Комбинация 5 драгоценных растительных масел богатых антиоксидантами обеспечивает интенсивное увлажнение и глубокую регенерацию кожи. Уже после 1-го применения кожа приобретает невероятную упругость и шелковистую гладкость.`,
    price: 319,
    type: ["уход за руками", "уход за телом"],
  },
  {
    id: 16,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-h/wc1000/6562862897.jpg",
    name: `Лосьон после бритья Nivea Men "Fresh Kick", приятная свежесть, с мятой, 100 мл`,
    typeOfSize: "Объём",
    size: 100,
    barcode: 8769915514321,
    manufacturer: "Германия",
    brand: "Nivea",
    description: `Не хватает свежести? Попробуй новую линейку средств для и после бритья NIVEA MEN Fresh Kick с мятой и кактусовой водой! Лосьон после бритья NIVEA MEN Fresh Kick содержит кактусовую воду и экстракт мяты для увлажнения и ощущения свежести и прохлады после бритья. А еще он быстро впитывается, тонизирует кожу после бритья, придает коже естественный и здоровый вид, надолго заряжает свежестью. Попробуй ежедневный заряд свежести для твоей кожи и будь естественно свеж вместе с NIVEA MEN Fresh Kick! Для достижения максимального результата используй вместе с пеной или гелем для бритья NIVEA MEN Fresh Kick. Дерматологически протестировано. Способ применения: Нанеси на кожу лица после бритья. Избегай контакта с глазами. Использование в пищевых целях недопустимо.`,
    price: 460,
    type: ["уход за лицом", "средства для бритья"],
  },
  {
    id: 17,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-c/wc1000/6416578512.jpg",
    name: `CLOSEUP ополаскиватель для полости рта Взрывной ментол, борется с бактериями, без спирта 250 мл`,
    typeOfSize: "Объём",
    size: 250,
    barcode: 6522538886117,
    manufacturer: "Россия",
    brand: "CLOSEUP",
    description: `Будь ближе! Гарантированная свежесть дыхания с ополаскивателем для полости рта Closeup Взрывной ментол, который эффективно борется с бактериями 24/7*! Почувствуй леденящий ментол с нотами мяты, – такое сочетание придает уверенность в свежести дыхания и длится по-настоящему долго. Для самых горячих поцелуев и общения в тесном кругу. 100% доказано действие против бактерий*, вызывающих несвежее дыхание, кариес, а также проблемы дёсен.
          Ополаскиватель для полости рта Closeup Взрывной ментол действует комплексно и защищает всю полость рта.
          Продукт не сушит полость рта и не содержит спирт. Для максимального эффекта ополаскиватель для полости рта Closeup Взрывной ментол рекомендуется использовать ежедневно после приема пищи, а также до и после чистки зубов для очищения межзубных промежутков, не реже двух раз в день.
          Компания Unilever ответственно относится к окружающей среде, поэтому ополаскиватель для полости рта Сloseup Взрывной ментол выпускается в экофлаконе голубого цвета, который произведен из 100% переработанного пластика.
          Попробуйте все продукты Closeup и выберите идеально подходящие для себя! Еще больше информации о составе ополаскивателя и других продуктах бренда вы сможете найти на официальном сайте close-up.com/ru.
          Будьте готовы быть ближе с Closeup и ощутите невероятную уверенность в свежести дыхания!
          *при регулярном использовании. На основании клинических исследований компании Unilever, Великобритания, 2014.
          Не является лекарственным средством. Применение не освобождает от посещения стоматолога.`,
    price: 166,
    type: ["гигиена полости рта", "гигиеническая продукция"],
  },
]

describe('ProductPage', () => {
  it('should render ProductPage', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(products)
    jest.spyOn(routerHooks, 'useParams').mockReturnValue({ id: 5 })
    const component = render(<ProductPage />)
    expect(component).toMatchSnapshot()
  })

  it('dispatch should be called if button is pressed', () => {
    const dispatch = jest.fn()
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(products)
    jest.spyOn(routerHooks, 'useParams').mockReturnValue({ id: 5 })
    jest.spyOn(reduxHooks, 'useDispatch').mockReturnValue(dispatch)
    const mockedDeleteFromCart = jest.spyOn(actions, 'deleteFromCart')
    const component = render(<ProductPage />)
    const addButton = screen.getByTestId('alreadyAddButton')
    fireEvent.click(addButton)
    expect(component).toMatchSnapshot()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(mockedDeleteFromCart).toHaveBeenCalledWith(5)
  })

  it("product mustn't rendering when id=0", () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(products)
    jest.spyOn(routerHooks, 'useParams').mockReturnValue({ id: 0 })
    render(<ProductPage />)
    const product = screen.queryByTestId("product")
    expect(product).toBeNull()
  })

  it("product mustn't rendering when id is undefined", () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(products)
    jest.spyOn(routerHooks, 'useParams').mockReturnValue({ id: 'qweqwe' })
    render(<ProductPage />)
    const product = screen.queryByTestId("product")
    expect(product).toBeNull()
  })
})