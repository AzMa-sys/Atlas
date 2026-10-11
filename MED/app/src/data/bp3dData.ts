export interface BpModel {
  id: string;
  file: string;
  pos: [number, number, number];
  color: string;
  label: string;
  labelLa: string;
  system: 'bones' | 'muscles' | 'organs' | 'vessels' | 'nerves' | 'respiratory';
  description: string;
}

export const BP_MODELS: BpModel[] = [
  {
    id: 'femur', file: 'femur.glb', pos: [-0.52, -2.39, 0.0], color: '#e9e2d0', system: 'bones',
    label: 'Бедренные кости', labelLa: 'Femora',
    description: 'Правая и левая бедренные кости — самые длинные и прочные кости тела. Каждая образует тазобедренный сустав проксимально и коленный дистально.',
  },
  {
    id: 'tibia', file: 'tibia.glb', pos: [-0.52, -5.94, -0.14], color: '#e9e2d0', system: 'bones',
    label: 'Большеберцовые кости', labelLa: 'Tibiae',
    description: 'Большеберцовые кости голени несут основную опорную нагрузку. Их дистальные концы образуют медиальную и латеральную лодыжки.',
  },
  {
    id: 'humerus', file: 'humerus.glb', pos: [-0.52, 3.47, -0.19], color: '#e9e2d0', system: 'bones',
    label: 'Плечевые кости', labelLa: 'Humeri',
    description: 'Плечевые кости соединяют плечевой сустав с локтевым. Головка суставится с лопаткой, блок и головка — с костями предплечья.',
  },
  {
    id: 'radius', file: 'radius.glb', pos: [-0.51, 0.77, 0.03], color: '#e9e2d0', system: 'bones',
    label: 'Лучевые кости', labelLa: 'Radii',
    description: 'Лучевые кости предплечья. Дистальные концы образуют запястный сустав, а проксимальная головка участвует в пронации-супинации.',
  },
  {
    id: 'clavicle', file: 'clavicle.glb', pos: [-0.52, 5.04, 0.14], color: '#e9e2d0', system: 'bones',
    label: 'Ключицы', labelLa: 'Claviculae',
    description: 'S-образные ключицы соединяют лопатки с грудиной — единственная кость, связывающая свободную конечность с осевым скелетом.',
  },
  {
    id: 'scapula', file: 'scapula.glb', pos: [-0.52, 4.51, -0.57], color: '#e9e2d0', system: 'bones',
    label: 'Лопатки', labelLa: 'Scapulae',
    description: 'Треугольные лопатки лежат на задней грудной стенке. Их суставные впадины образуют плечевые суставы с головками плечевых костей.',
  },
  {
    id: 'patella', file: 'patella.glb', pos: [-0.52, -4.33, 0.21], color: '#e9e2d0', system: 'bones',
    label: 'Надколенники', labelLa: 'Patellae',
    description: 'Крупнейшие сесамовидные кости, заложенные в сухожилие четырёхглавой мышцы. Защищают коленный сустав и усиливают разгибание.',
  },
  {
    id: 'hip_bone', file: 'hip_bone.glb', pos: [-0.53, 0.18, 0.0], color: '#e9e2d0', system: 'bones',
    label: 'Тазовые кости', labelLa: 'Ossa coxae',
    description: 'Правый и левый тазовые кости (ilium, ischium, pubis) образуют полость малого таза и крестцово-подвздошные суставы.',
  },
  {
    id: 'sacrum', file: 'sacrum.glb', pos: [-0.53, 0.33, -0.39], color: '#e9e2d0', system: 'bones',
    label: 'Крестец', labelLa: 'Os sacrum',
    description: 'Треугольная кость из пяти сросшихся позвонков. Соединяет позвоночник с тазовыми костями, передаёт вес тела на ноги.',
  },
  {
    id: 'sternum', file: 'sternum.glb', pos: [-0.52, 3.92, 1.02], color: '#e9e2d0', system: 'bones',
    label: 'Грудинa', labelLa: 'Sternum',
    description: 'Плоская кость передней стенки грудной клетки: рукоятка, тело и мечевидный отросток. К ней крепятся ключицы и хрящи рёбер.',
  },
  {
    id: 'ribs', file: 'ribs.glb', pos: [0.15, 4.8, 0.11], color: '#e9e2d0', system: 'bones',
    label: 'Рёбра', labelLa: 'Costae',
    description: 'Первые шесть пар рёбер с их хрящами. Истинные рёбра (1–7) соединяются с грудиной собственными хрящами, образуя переднюю стенку грудной клетки.',
  },
  {
    id: 'vertebrae', file: 'vertebrae.glb', pos: [-0.51, 5.73, -0.06], color: '#e9e2d0', system: 'bones',
    label: 'Позвоночник', labelLa: 'Columna vertebralis',
    description: 'Шейные (C1–C7) и грудные (Th1–Th12) позвонки. Шейный отдел самый подвижный, грудной — жёсткий, соединён с рёбрами.',
  },
  {
    id: 'hyoid', file: 'hyoid.glb', pos: [-0.52, 5.89, 0.37], color: '#e9e2d0', system: 'bones',
    label: 'Подъязычная кость', labelLa: 'Os hyoideum',
    description: 'Единственная кость без суставов — подвешена на мышцах шеи. Опора для языка и мышц глотки, участвует в речи и глотании.',
  },
  {
    id: 'pectoralis', file: 'pectoralis.glb', pos: [-0.52, 4.65, 0.33], color: '#d96a5a', system: 'muscles',
    label: 'Большие грудные мышцы', labelLa: 'Mm. pectorales majores',
    description: 'Покрывают переднюю поверхность груди: ключичная, грудинная и рёберная части. Приводят и внутренне ротируют плечо.',
  },
  {
    id: 'abs', file: 'abs.glb', pos: [-0.52, 1.74, 1.04], color: '#d96a5a', system: 'muscles',
    label: 'Прямые мышцы живота', labelLa: 'Mm. recti abdominis',
    description: 'Вертикальные мышцы передней брюшной стенки от грудины к лобку. Сгибают туловище, поддерживают внутрибрюшное давление.',
  },
  {
    id: 'deltoid', file: 'deltoid.glb', pos: [-0.51, 4.52, -0.25], color: '#d96a5a', system: 'muscles',
    label: 'Дельтовидные мышцы', labelLa: 'Mm. deltoidei',
    description: 'Покрывают плечевой сустав. Передние пучки сгибают, средние отводят, задние разгибают плечо.',
  },
  {
    id: 'biceps', file: 'biceps.glb', pos: [-0.51, 3.32, 0.02], color: '#d96a5a', system: 'muscles',
    label: 'Двуглавые мышцы плеча', labelLa: 'Mm. biceps brachii',
    description: 'Сгибатели предплечья в локтевом суставе, участвуют в супинации. Имеют короткую и длинную головки.',
  },
  {
    id: 'triceps', file: 'triceps.glb', pos: [-0.51, 3.19, -0.42], color: '#d96a5a', system: 'muscles',
    label: 'Трёхглавые мышцы плеча', labelLa: 'Mm. triceps brachii',
    description: 'Главные разгибатели локтя. Длинная головка проходит за плечевым суставом, латеральная и медиальная — только по плечу.',
  },
  {
    id: 'gluteus', file: 'gluteus.glb', pos: [-0.52, -0.07, -0.37], color: '#d96a5a', system: 'muscles',
    description: 'Большие, средние и малые ягодичные мышцы: разгибают бедро, отводят и стабилизируют таз при ходьбе.',
    label: 'Ягодичные мышцы', labelLa: 'Mm. glutei',
  },
  {
    id: 'gastrocnemius', file: 'gastrocnemius.glb', pos: [-0.22, -5.24, -0.58], color: '#d96a5a', system: 'muscles',
    label: 'Икроножные мышцы', labelLa: 'Mm. gastrocnemii',
    description: 'Поверхностные мышцы голени: сгибают стопу и помогают сгибать колено. Крепятся к пятке через ахиллово сухожилие.',
  },
  {
    id: 'trapezius', file: 'trapezius.glb', pos: [-0.45, 4.62, -0.78], color: '#d96a5a', system: 'muscles',
    label: 'Трапециевидные мышцы', labelLa: 'Mm. trapezii',
    description: 'Широчайшие мышцы верхней части спины и шеи. Поднимают, сводят и опускают лопатки, наклоняют голову.',
  },
  {
    id: 'latissimus', file: 'latissimus.glb', pos: [-0.52, 2.72, -0.57], color: '#d96a5a', system: 'muscles',
    label: 'Широчайшие мышцы спины', labelLa: 'Mm. latissimi dorsi',
    description: 'Самые широкие мышцы тела: покрывают нижнюю половину спины, тянут плечо вниз и назад.',
  },
  {
    id: 'masseter', file: 'masseter.glb', pos: [-0.32, 6.34, 0.41], color: '#d96a5a', system: 'muscles',
    label: 'Жевательные мышцы', labelLa: 'Mm. masseteres',
    description: 'Мощные мышцы прикусывания от скулового отростка к нижней челюсти. Обеспечивают до 50% силы жевания.',
  },
  {
    id: 'liver', file: 'liver.glb', pos: [-0.08, 2.84, 0.44], color: '#7a4b3a', system: 'organs',
    label: 'Печень', labelLa: 'Hepar',
    description: 'Крупнейшая железа тела (~1,5 кг) в правом подреберье. Обмен веществ, детоксикация, выработка желчи, запасание гликогена.',
  },
  {
    id: 'stomach', file: 'stomach.glb', pos: [-1.06, 2.71, 0.54], color: '#d9a08a', system: 'organs',
    label: 'Желудок', labelLa: 'Gaster',
    description: 'J-образный расширенный отдел пищеварительного тракта в левом подреберье. Накапливает пищу, начинает переваривать белки.',
  },
  {
    id: 'spleen', file: 'spleen.glb', pos: [-1.38, 2.6, 0.05], color: '#8a4a44', system: 'organs',
    label: 'Селезёнка', labelLa: 'Lien',
    description: 'Крупнейший орган лимфоидной системы в левом подреберье. Фильтрует кровь, удаляет старые эритроциты, участвует в иммунитете.',
  },
  {
    id: 'pancreas', file: 'pancreas.glb', pos: [-0.46, 2.1, 0.48], color: '#d9b08a', system: 'organs',
    label: 'Поджелудочная железа', labelLa: 'Pancreas',
    description: 'Смешанная железа за желудком: экзокринная часть вырабатывает ферменты, эндокринная (островки) — инсулин и глюкагон.',
  },
  {
    id: 'kidneys', file: 'kidneys.glb', pos: [-0.46, 2.09, -0.12], color: '#8a5a48', system: 'organs',
    label: 'Почки', labelLa: 'Renes',
    description: 'Парные бобовидные органы забрюшинного пространства. Фильтруют кровь, выводят мочу, регулируют давление.',
  },
  {
    id: 'bladder', file: 'bladder.glb', pos: [-0.52, -0.35, 0.03], color: '#c9a08a', system: 'organs',
    label: 'Мочевой пузырь', labelLa: 'Vesica urinaria',
    description: 'Полый мышечный орган малого таза. Накапливает мочу (до 500–700 мл), стенка образована детрузором.',
  },
  {
    id: 'gallbladder', file: 'gallbladder.glb', pos: [0.04, 2.26, 0.66], color: '#5a7a3a', system: 'organs',
    label: 'Желчный пузырь', labelLa: 'Vesica biliaris',
    description: 'Грушевидный мешочек на нижней поверхности печени. Концентрирует и накапливает желчь до её выделения в кишечник.',
  },
  {
    id: 'lungs', file: 'lungs.glb', pos: [0.14, 3.85, 0.0], color: '#c9937f', system: 'respiratory',
    label: 'Лёгкие', labelLa: 'Pulmones',
    description: 'Парные органы дыхания в грудной полости: правое с тремя, левое с двумя долями. Общая площадь альвеол ~70 м².',
  },
  {
    id: 'heart_wall', file: 'heart_wall.glb', pos: [-0.7, 3.86, 0.37], color: '#b85454', system: 'organs',
    label: 'Сердце', labelLa: 'Cor',
    description: 'Мышечный насос средостения. Четыре камеры (два предсердия, два желудочка) обеспечивают большой и малый круги кровообращения.',
  },
  {
    id: 'aorta', file: 'aorta.glb', pos: [-0.64, 3.54, 0.12], color: '#c65a5a', system: 'vessels',
    label: 'Аорта', labelLa: 'Aorta',
    description: 'Крупнейшая артерия: восходящий отдел, дуга и нисходящий отдел. От неё отходят сосуды, питающие все органы тела.',
  },
  {
    id: 'esophagus', file: 'esophagus.glb', pos: [-0.53, 4.41, -0.02], color: '#c98a6e', system: 'organs',
    label: 'Пищевод', labelLa: 'Oesophagus',
    description: 'Мышечная трубка от глотки до желудка (~25 см). Проводит пищевой комок, проходит через диафрагмальное отверстие.',
  },
  {
    id: 'trachea', file: 'trachea.glb', pos: [-0.52, 5.13, 0.14], color: '#c9b8a0', system: 'respiratory',
    label: 'Трахея', labelLa: 'Trachea',
    description: 'Хрящевой дыхательный канал (~10–12 см), делящийся на правый и левый главные бронхи. Снабжена полулунными хрящами.',
  },
  {
    id: 'diaphragm', file: 'diaphragm.glb', pos: [-0.48, 2.76, 0.23], color: '#b5604e', system: 'muscles',
    label: 'Диафрагма', labelLa: 'Diaphragma',
    description: 'Куполообразная главная дыхательная мышца, разделяющая грудную и брюшную полости. При вдохе опускается, увеличивая объём грудной клетки.',
  },
  {
    id: 'optic_nerves', file: 'optic_nerves.glb', pos: [-0.52, 6.88, 0.46], color: '#e5c76b', system: 'nerves',
    label: 'Зрительные нервы', labelLa: 'Nn. optici',
    description: 'Проводники зрительной информации от сетчатки к мозгу. В хиазме перекрещиваются волокна носовых половин полей зрения.',
  },
  {
    id: 'frontal_bone', file: 'frontal_bone.glb', pos: [-0.523, 7.182, 0.626], color: '#e9e2d0', system: 'bones',
    label: 'Лобная кость', labelLa: 'Os frontale',
    description: 'Крупная кость свода и лба. Образует переднюю стенку черепа, надглазничные отверстия и переднюю часть основания черепа; в ней расположены лобные пазухи.',
  },
  {
    id: 'parietal_bones', file: 'parietal_bones.glb', pos: [-0.514, 7.403, -0.192], color: '#e9e2d0', system: 'bones',
    label: 'Теменные кости', labelLa: 'Ossa parietalia',
    description: 'Парные кости свода черепа, соединяющиеся посредине стреловидным швом. Защищают верхние отделы головного мозга.',
  },
  {
    id: 'occipital_bone', file: 'occipital_bone.glb', pos: [-0.515, 6.781, -0.432], color: '#e9e2d0', system: 'bones',
    label: 'Затылочная кость', labelLa: 'Os occipitale',
    description: 'Задняя стенка и часть основания черепа. Большое затылочное отверстие передаёт спинной мозг из черепа в позвоночный канал.',
  },
  {
    id: 'temporal_bones', file: 'temporal_bones.glb', pos: [-0.518, 6.685, 0.071], color: '#e9e2d0', system: 'bones',
    label: 'Височные кости', labelLa: 'Ossa temporalia',
    description: 'Сложные парные кости основания черепа. Включают слуховые камни с улиткой и полукружными каналами, сосцевидные отростки и мыщелковые суставные поверхности.',
  },
  {
    id: 'sphenoid_bone', file: 'sphenoid_bone.glb', pos: [-0.520, 6.749, 0.389], color: '#e9e2d0', system: 'bones',
    label: 'Клиновидная кость', labelLa: 'Os sphenoidale',
    description: 'Несущая («крылатая») кость средней черепной ямки. Соединяет все кости основания черепа, в ней находятся гипофизарная ямка и клиновидная пазуха.',
  },
  {
    id: 'ethmoid_bone', file: 'ethmoid_bone.glb', pos: [-0.505, 6.728, 0.656], color: '#e9e2d0', system: 'bones',
    label: 'Решётчатая кость', labelLa: 'Os ethmoidale',
    description: 'Кость перегородки и передней части основания черепа. Содержит решётчатый лабиринт с обонятельными костями и пазухами, формирует верхнюю стенку носа.',
  },
  {
    id: 'maxilla', file: 'maxilla.glb', pos: [-0.517, 6.467, 0.758], color: '#e9e2d0', system: 'bones',
    label: 'Верхние челюсти', labelLa: 'Maxillae',
    description: 'Парные кости верхней челюсти с зубными рядами, носовыми и глазничными поверхностями. Содержат верхнечелюстные (гайморовы) пазухи.',
  },
  {
    id: 'mandible', file: 'mandible.glb', pos: [-0.519, 6.229, 0.554], color: '#e9e2d0', system: 'bones',
    label: 'Нижняя челюсть', labelLa: 'Mandibula',
    description: 'Крупнейшая и самая прочная кость лица. Единственная подвижная кость черепа — участвует в жевании и речи.',
  },
  {
    id: 'zygomatic_bones', file: 'zygomatic_bones.glb', pos: [-0.514, 6.647, 0.659], color: '#e9e2d0', system: 'bones',
    label: 'Скуловые кости', labelLa: 'Ossa zygomatica',
    description: 'Парные кости скулового выступа, соединяющие лицевой и мозговой отделы черепа. Место прикрепления жевательных мышц.',
  },
  {
    id: 'nasal_bones', file: 'nasal_bones.glb', pos: [-0.513, 6.772, 0.983], color: '#e9e2d0', system: 'bones',
    label: 'Носовые кости', labelLa: 'Ossa nasalia',
    description: 'Парные прямоугольные кости переносицы, образующие костный скелет спинки носа.',
  },
  {
    id: 'vomer', file: 'vomer.glb', pos: [-0.506, 6.567, 0.603], color: '#e9e2d0', system: 'bones',
    label: 'Сошник', labelLa: 'Vomer',
    description: 'Пластинчатая кость, формирующая заднего-нижнюю часть носовой перегородки.',
  },
  {
    id: 'palatine_bones', file: 'palatine_bones.glb', pos: [-0.504, 6.476, 0.548], color: '#e9e2d0', system: 'bones',
    label: 'Нёбные кости', labelLa: 'Ossa palatina',
    description: 'Парные L-образные кости: горизонтальные пластинки образуют твёрдое нёбо, вертикальные — часть боковой стенки носа.',
  },
  {
    id: 'ulna', file: 'ulna.glb', pos: [-0.502, 1.144, -0.087], color: '#e9e2d0', system: 'bones',
    label: 'Локтевые кости', labelLa: 'Ulnae',
    description: 'Медиальные кости предплечья. Проксимальные концы образуют локтевые отростки, дистальные — головки для сустава с запястьем.',
  },
  {
    id: 'fibula', file: 'fibula.glb', pos: [-0.510, -6.360, -0.317], color: '#e9e2d0', system: 'bones',
    label: 'Малоберцовые кости', labelLa: 'Fibulae',
    description: 'Тонкие латеральные кости голени. Не участвуют в образовании коленного сустава, но образуют латеральную лодыжку и место прикрепения мышц.',
  },
  {
    id: 'carpal_bones', file: 'carpal_bones.glb', pos: [-0.518, -0.437, 0.326], color: '#e9e2d0', system: 'bones',
    label: 'Кости запястья', labelLa: 'Ossa carpi',
    description: 'Восемь мелких костей двух рядов в каждом запястье (лунная, трёхгранная, полулунная, гороховидная, тrapezium, тrapezoideum, капитатум, гаматум). Обеспечивают подвижность кисти.',
  },
  {
    id: 'tarsal_bones', file: 'tarsal_bones.glb', pos: [-0.533, -8.116, -0.019], color: '#e9e2d0', system: 'bones',
    label: 'Кости предплюсны', labelLa: 'Ossa tarsi',
    description: 'Семь костей скелета стопы (пяточная, таранная, ладьевидная, кубовидная и три клиновидные). Формируют свод стопы.',
  },
  {
    id: 'soleus', file: 'soleus.glb', pos: [-0.419, -5.845, -0.435], color: '#d96a5a', system: 'muscles',
    label: 'Икроножные мышцы (подошвенные части)', labelLa: 'Musculi solei',
    description: 'Мощные мышцы задней группы голени, лежащие под икроножными. Сгибают стопу и участвуют в поддержании тела в вертикальном положении.',
  },
  {
    id: 'quadriceps', file: 'quadriceps.glb', pos: [-0.449, -2.733, 0.265], color: '#d96a5a', system: 'muscles',
    label: 'Четырёхглавые мышцы бедра', labelLa: 'Musculi quadriceps femoris',
    description: 'Крупнейшие разгибатели колена: прямая мышца бедра и три широкие мышцы. Крепятся общим сухожилием к надколеннику.',
  },
  {
    id: 'biceps_femoris', file: 'biceps_femoris.glb', pos: [-0.472, -2.817, -0.302], color: '#d96a5a', system: 'muscles',
    label: 'Двуглавые мышцы бедра', labelLa: 'Musculi biceps femoris',
    description: 'Задние мышцы бедра с двумя головками. Сгибают колено и разгибают тазобедренный сустав.',
  },
  {
    id: 'adductor_longus', file: 'adductor_longus.glb', pos: [-0.421, -1.781, 0.334], color: '#d96a5a', system: 'muscles',
    label: 'Длинные приводящие мышцы', labelLa: 'Musculi adductores longi',
    description: 'Приводящие мышцы медиальной группы бедра, прижимающие ногу к средней линии.',
  },
  {
    id: 'intercostals', file: 'intercostals.glb', pos: [-0.488, 3.459, 0.035], color: '#d96a5a', system: 'muscles',
    label: 'Межрёберные мышцы', labelLa: 'Musculi intercostales',
    description: 'Наружные, внутренние и самые глубокие межрёберные мышцы — поднимают и опускают рёбра при дыхании.',
  },
  {
    id: 'rhomboids', file: 'rhomboids.glb', pos: [-0.505, 4.711, -0.810], color: '#d96a5a', system: 'muscles',
    label: 'Ромбовидные мышцы', labelLa: 'Musculi rhomboidei',
    description: 'Мышцы между лопатками и позвоночником, оттягивающие лопатки к позвоночнику и медиально вращающие их.',
  },
  {
    id: 'supraspinatus', file: 'supraspinatus.glb', pos: [-0.540, 4.914, -0.329], color: '#d96a5a', system: 'muscles',
    label: 'Надостные мышцы', labelLa: 'Musculi supraspinati',
    description: 'Мышцы надостной ямки лопатки. Запускают отведение плеча, удерживают головку плечевой кости в суставной впадине.',
  },
  {
    id: 'infraspinatus', file: 'infraspinatus.glb', pos: [-0.472, 4.545, -0.629], color: '#d96a5a', system: 'muscles',
    label: 'Подостные мышцы', labelLa: 'Musculi infraspinati',
    description: 'Мышцы подостной ямки лопатки — мощные наружные ротаторы плеча.',
  },
  {
    id: 'brachialis', file: 'brachialis.glb', pos: [-0.180, 2.634, -0.129], color: '#d96a5a', system: 'muscles',
    label: 'Плечевые мышцы', labelLa: 'Musculi brachiales',
    description: 'Мышцы передней поверхности плеча, сгибающие локтевой сустав.',
  },
  {
    id: 'brachioradialis', file: 'brachioradialis.glb', pos: [-0.429, 1.574, -0.002], color: '#d96a5a', system: 'muscles',
    label: 'Плечелучевые мышцы', labelLa: 'Musculi brachioradiales',
    description: 'Мышцы переднебоковой группы предплечья. Сгибают локоть и помогают пронации-супинации.',
  },
  {
    id: 'scm', file: 'scm.glb', pos: [-0.477, 5.555, 0.305], color: '#d96a5a', system: 'muscles',
    label: 'Грудино-ключично-сосцевидные мышцы', labelLa: 'Musculi sternocleidomastoidei',
    description: 'Косые мышцы шеи от грудины и ключиц к сосцевидному отростку. Наклоняют и поворачивают голову, участвуют в дыхании.',
  },
  {
    id: 'levator_scapulae', file: 'levator_scapulae.glb', pos: [-0.506, 5.443, -0.350], color: '#d96a5a', system: 'muscles',
    label: 'Мышцы, поднимающие лопатку', labelLa: 'Musculi levatores scapulae',
    description: 'Мышцы задней боковой поверхности шеи, поднимающие лопатку и участвующие в её ротации.',
  },
  {
    id: 'frontalis', file: 'frontalis.glb', pos: [-0.460, 7.254, 0.830], color: '#d96a5a', system: 'muscles',
    label: 'Лобные мышцы', labelLa: 'Musculi frontales',
    description: 'Мышцы лба, поднимающие брови и формирующие лобные морщины.',
  },
  {
    id: 'orbicularis_oris', file: 'orbicularis_oris.glb', pos: [-0.520, 6.202, 0.925], color: '#d96a5a', system: 'muscles',
    label: 'Круговая мышца рта', labelLa: 'Musculus orbicularis oris',
    description: 'Сфинктер ротовой щели: смыкает губы, участвует в артикуляции и выражении эмоций.',
  },
  {
    id: 'digastric', file: 'digastric.glb', pos: [-0.515, 6.193, 0.239], color: '#d96a5a', system: 'muscles',
    label: 'Двубрюшие мышцы', labelLa: 'Musculi digastrici',
    description: 'Поднижнечелюстные мышцы с двумя брюшами — поднимают поднижнечелюстную кость и опускают нижнюю челюсть.',
  },
  {
    id: 'mylohyoid', file: 'mylohyoid.glb', pos: [-0.519, 5.960, 0.592], color: '#d96a5a', system: 'muscles',
    label: 'Подбородочно-подъязычные мышцы', labelLa: 'Musculi mylohyoidei',
    description: 'Мышцы дна рта, формирующие подъязычную диафрагму. Поднимают язык и поднижнечелюстную кость.',
  },
  {
    id: 'medial_pterygoid', file: 'medial_pterygoid.glb', pos: [-0.517, 6.357, 0.371], color: '#d96a5a', system: 'muscles',
    label: 'Медиальные крыловидные мышцы', labelLa: 'Musculi pterygoidei mediales',
    description: 'Жевательные мышцы глубокой группы. Поднимают нижнюю челюсть и смещают её в противоположную сторону.',
  },
  {
    id: 'tibialis_anterior', file: 'tibialis_anterior.glb', pos: [-0.331, -6.355, 0.027], color: '#d96a5a', system: 'muscles',
    label: 'Передние большеберцовые мышцы', labelLa: 'Musculi tibialis anteriores',
    description: 'Дорсальные разгибатели стопы: поднимают её наружу и сгибают в голеностопе.',
  },
  {
    id: 'cerebellum', file: 'cerebellum.glb', pos: [-0.521, 6.716, -0.290], color: '#e5c76b', system: 'nerves',
    label: 'Мозжечок', labelLa: 'Cerebellum',
    description: 'Второй по величине отдел мозга. Координирует движения, равновесие и мышечный тонус; получает информацию от vestibularного аппарата и проприоцепторов.',
  },
  {
    id: 'pons', file: 'pons.glb', pos: [-0.516, 6.745, 0.057], color: '#e5c76b', system: 'nerves',
    label: 'Мост', labelLa: 'Pons',
    description: 'Передняя выпуклая часть ствола мозга. Связующее звено между корой и спинным мозгом, центры жевания и слёzоотделения.',
  },
  {
    id: 'medulla_oblongata', file: 'medulla_oblongata.glb', pos: [-0.520, 6.539, -0.049], color: '#e5c76b', system: 'nerves',
    label: 'Продолговатый мозг', labelLa: 'Medulla oblongata',
    description: 'Нижняя часть ствола, переходящая в спинной мозг. Центры дыхания, сердечной деятельности и сосудистого тонуса.',
  },
  {
    id: 'midbrain', file: 'midbrain.glb', pos: [-0.520, 6.955, 0.026], color: '#e5c76b', system: 'nerves',
    label: 'Средний мозг', labelLa: 'Mesencephalon',
    description: 'Верхняя часть ствола: включает ножки мозга, крышу с колликулами и водопровод мозга. Центры зрительных и слуховых рефлексов.',
  },
  {
    id: 'thalamus', file: 'thalamus.glb', pos: [-0.563, 7.101, 0.031], color: '#e5c76b', system: 'nerves',
    label: 'Таламусы', labelLa: 'Thalami',
    description: 'Крупные подкорковые узлы — «шлюз» сенсорной информации на пути в кору больших полушарий.',
  },
  {
    id: 'hypothalamus', file: 'hypothalamus.glb', pos: [-0.518, 7.003, 0.249], color: '#e5c76b', system: 'nerves',
    label: 'Гипоталамус', labelLa: 'Hypothalamus',
    description: 'Отдел промежуточного мозга, управляющий вегетативными функциями, температурой, аппетитом и эндокринной системой.',
  },
  {
    id: 'amygdala', file: 'amygdala.glb', pos: [-0.519, 6.958, 0.247], color: '#e5c76b', system: 'nerves',
    label: 'Миндалевидные комплексы', labelLa: 'Corpus amygdaloideum',
    description: 'Подкорковые структуры лимбической системы — центры эмоций, страха и формирования эмоциональной памяти.',
  },
  {
    id: 'hippocampus', file: 'hippocampus.glb', pos: [-0.513, 6.952, 0.061], color: '#e5c76b', system: 'nerves',
    label: 'Гиппокампы', labelLa: 'Hippocampi',
    description: 'Структуры медиальной височной доли — ключевая роль в формировании памяти и пространственной навигации.',
  },
  {
    id: 'corpus_callosum', file: 'corpus_callosum.glb', pos: [-0.542, 7.232, 0.100], color: '#e5c76b', system: 'nerves',
    label: 'Мозолистое тело', labelLa: 'Corpus callosum',
    description: 'Крупнейшая комиссура, соединяющая правое и левое полушария из ~200 млн нервных волокон.',
  },
  {
    id: 'caudate_nucleus', file: 'caudate_nucleus.glb', pos: [-0.517, 7.148, 0.184], color: '#e5c76b', system: 'nerves',
    label: 'Хвостатые ядра', labelLa: 'Nuclei caudati',
    description: 'Стриарные ядра базальных ганглиев, дугообразно обхватывающие боковые желудочки. Участвуют в регуляции движений и обучении.',
  },
  {
    id: 'putamen', file: 'putamen.glb', pos: [-0.511, 7.141, 0.213], color: '#e5c76b', system: 'nerves',
    label: 'Пута́мены', labelLa: 'Putamina',
    description: 'Составная часть хвостатого ядра базальных ганглиев — регуляция скорости и амплитуды движений.',
  },
  {
    id: 'globus_pallidus', file: 'globus_pallidus.glb', pos: [-0.546, 7.113, 0.202], color: '#e5c76b', system: 'nerves',
    label: 'Бледные шары', labelLa: 'Globi pallidi',
    description: 'Внутренний отдел чечевицеобразного комплекса — главный выход базальных ганглиев к таламусу.',
  },
  {
    id: 'pituitary', file: 'pituitary.glb', pos: [-0.519, 6.859, 0.291], color: '#e5c76b', system: 'nerves',
    label: 'Гипофиз', labelLa: 'Hypophysis',
    description: 'Железа внутренней секреции в турецком седле. Передняя доля продуцирует гормоны роста, ТТГ, АКТГ и др., задняя — окситоцин и вазопрессин.',
  },
  {
    id: 'pineal', file: 'pineal.glb', pos: [-0.519, 7.014, -0.098], color: '#e5c76b', system: 'nerves',
    label: 'Эпифиз (шишковидная железа)', labelLa: 'Corpus pineale',
    description: 'Эндокринная железа промежуточного мозга, вырабатывающая мелатонин и регулирующая суточные ритмы.',
  },
  {
    id: 'fornix', file: 'fornix.glb', pos: [-0.521, 7.085, 0.060], color: '#e5c76b', system: 'nerves',
    label: 'Своды', labelLa: 'Fornices',
    description: 'Парные дугообразные волоконные пучки — главный выход гиппокампа к сосцевидным телам и мамиллярным телам.',
  },
  {
    id: 'duodenum', file: 'duodenum.glb', pos: [-0.423, 1.989, 0.493], color: '#c98a6e', system: 'organs',
    label: 'Двенадцатиперстная кишка', labelLa: 'Duodenum',
    description: 'Первая часть тонкой кишки (25–30 см), C-образно охватывающая головку поджелудочной железы. Здесь поступают желчь и панкреатический сок.',
  },
  {
    id: 'jejunum', file: 'jejunum.glb', pos: [-0.739, 1.345, 0.669], color: '#c98a6e', system: 'organs',
    label: 'Тощая кишка', labelLa: 'Jejunum',
    description: 'Средняя часть тонкой кишки с круглыми складками и ворсинками — основное место всасывания питательных веществ.',
  },
  {
    id: 'ileum', file: 'ileum.glb', pos: [-0.477, 0.418, 0.589], color: '#c98a6e', system: 'organs',
    label: 'Подвздошная кишка', labelLa: 'Ileum',
    description: 'Нижняя часть тонкой кишки; через баугиниеву заслонку переходит в слепую кишку.',
  },
  {
    id: 'colon', file: 'colon.glb', pos: [-0.714, 1.314, 0.378], color: '#c98a6e', system: 'organs',
    label: 'Ободочная кишка', labelLa: 'Colon',
    description: 'Часть толстой кишки: восходящая, поперечная, нисходящая и сигмовидная части. Всасывает воду и формирует кал.',
  },
  {
    id: 'rectum', file: 'rectum.glb', pos: [-0.534, -0.206, -0.349], color: '#c98a6e', system: 'organs',
    label: 'Прямая кишка', labelLa: 'Rectum',
    description: 'Конечная часть толстой кишки (12–15 см), накапливающая каловые массы перед дефекацией.',
  },
  {
    id: 'appendix', file: 'appendix.glb', pos: [0.068, 0.487, 0.455], color: '#c98a6e', system: 'organs',
    label: 'Червеобразный отросток', labelLa: 'Appendix vermiformis',
    description: 'Небольшой отросток слепой кишки. Содержит лимфоидную ткань, участвует в иммунных реакциях кишечника.',
  },
  {
    id: 'bronchus', file: 'bronchus.glb', pos: [-0.651, 4.001, -0.026], color: '#c9b8a0', system: 'respiratory',
    label: 'Бронхи', labelLa: 'Bronchi',
    description: 'Правый и левый главные бронхи разветвляются на долевые и сегментарные. Проводят воздух и очищают его с помощью мерцательного эпителия.',
  },
  {
    id: 'pancreatic_duct', file: 'pancreatic_duct.glb', pos: [-0.535, 2.169, 0.438], color: '#c98a6e', system: 'organs',
    label: 'Панкреатический проток', labelLa: 'Ductus pancreaticus',
    description: 'Главный проток поджелудочной железы, несущий панкреатический сок. Обычно открывается в двенадцатиперстную кишку общим устьем с желчным протоком.',
  },
  {
    id: 'adrenal_glands', file: 'adrenal_glands.glb', pos: [-0.618, 2.559, -0.148], color: '#c98a6e', system: 'organs',
    label: 'Надпочечники', labelLa: 'Glandulae suprarenales',
    description: 'Парные железы над верхними полюсами почек. Кора вырабатывает кортикостероиды, мозговое вещество — адреналин и норадреналин.',
  },
  {
    id: 'thymus', file: 'thymus.glb', pos: [-0.633, 4.316, 0.614], color: '#c98a6e', system: 'organs',
    label: 'Вилочковая железа (тимус)', labelLa: 'Thymus',
    description: 'Лимфоидный орган переднего средостения. Место созревания Т-лимфоцитов; активна у детей, атрофируется с возрастом.',
  },
  {
    id: 'ureter', file: 'ureter.glb', pos: [-0.516, 1.531, -0.068], color: '#c98a6e', system: 'organs',
    label: 'Мочеточники', labelLa: 'Ureteres',
    description: 'Парные трубки (25–30 см) от почечных лоханок к мочевому пузырю. Перистальтически проводят мочу.',
  },
  {
    id: 'urethra', file: 'urethra.glb', pos: [-0.519, -0.819, 0.320], color: '#c98a6e', system: 'organs',
    label: 'Мочеиспускательный канал', labelLa: 'Urethra',
    description: 'Канал от мочевого пузыря наружу; у мужчин также семявыносящий путь (20 см), у женщин — короткий (3–5 см).',
  },
  {
    id: 'prostate', file: 'prostate.glb', pos: [-0.517, -0.680, -0.029], color: '#c98a6e', system: 'organs',
    label: 'Предстательная железа', labelLa: 'Prostata',
    description: 'Железа мужской половой сферы, окружающая уретру ниже мочевого пузыря. Секрет составляет основную часть семенной плазмы.',
  },
  {
    id: 'seminal_vesicles', file: 'seminal_vesicles.glb', pos: [-0.520, -0.441, -0.229], color: '#c98a6e', system: 'organs',
    label: 'Семенные пузырьки', labelLa: 'Vesiculae seminales',
    description: 'Парные железы позади мочевого пузыря, продуцирующие фруктозу и питательную среду для сперматозоидов.',
  },
  {
    id: 'testis', file: 'testis.glb', pos: [-0.516, -1.455, 0.663], color: '#c98a6e', system: 'organs',
    label: 'Яички', labelLa: 'Testes',
    description: 'Мужские половые железы в мошонке. Семенносозревающие канальцы производят сперматозоиды, клетки Лейдига — тестостерон.',
  },
  {
    id: 'epididymis', file: 'epididymis.glb', pos: [-0.634, -1.337, 0.629], color: '#c98a6e', system: 'organs',
    label: 'Придатки яичек', labelLa: 'Epididyides',
    description: 'Извитые канальцы на задней поверхности яичек — место созревания и накопления сперматозоидов.',
  },
  {
    id: 'corpus_cavernosum', file: 'corpus_cavernosum.glb', pos: [-0.517, -0.907, 0.556], color: '#c98a6e', system: 'organs',
    label: 'Пещеристые тела полового члена', labelLa: 'Corpora cavernosa penis',
    description: 'Парные эректильные ткани, заполняющиеся кровью при эрекции.',
  },
  {
    id: 'svc', file: 'svc.glb', pos: [-0.372, 4.527, 0.301], color: '#c65a5a', system: 'vessels',
    label: 'Верхняя полая вена', labelLa: 'Vena cava superior',
    description: 'Собирает кровь от верхней половины тела: головы, шеи, рук и грудной стенки — впадает в правое предсердие.',
  },
  {
    id: 'ivc', file: 'ivc.glb', pos: [-0.399, 2.034, 0.348], color: '#c65a5a', system: 'vessels',
    label: 'Нижняя полая вена', labelLa: 'Vena cava inferior',
    description: 'Крупнейшая вена организма, доставляющая кровь от нижних конечностей и всего туловища к сердцу.',
  },
  {
    id: 'common_carotid', file: 'common_carotid.glb', pos: [-0.419, 5.095, 0.250], color: '#c65a5a', system: 'vessels',
    label: 'Общие сонные артерии', labelLa: 'Arteriae carotides communes',
    description: 'Правая от плечеголовного ствола, левая от дуги аорты. На уровне щитовидного хряща делятся на наружную и внутреннюю.',
  },
  {
    id: 'subclavian_artery', file: 'subclavian_artery.glb', pos: [-0.624, 5.019, 0.150], color: '#c65a5a', system: 'vessels',
    label: 'Подключичные артерии', labelLa: 'Arteriae subclaviae',
    description: 'Доставляют кровь к верхним конечностям, шее и головному мозгу (через позвоночные артерии).',
  },
  {
    id: 'subclavian_vein', file: 'subclavian_vein.glb', pos: [-0.582, 5.014, 0.280], color: '#c65a5a', system: 'vessels',
    label: 'Подключичные вены', labelLa: 'Venae subclaviae',
    description: 'Отводят кровь от рук, соединяясь с внутренними яремными венами в плечеголовные.',
  },
  {
    id: 'internal_jugular', file: 'internal_jugular.glb', pos: [-0.544, 5.211, 0.317], color: '#c65a5a', system: 'vessels',
    label: 'Внутренние яремные вены', labelLa: 'Venae jugulares internae',
    description: 'Главные оттоковые пути крови от головного мозга, лица и шеи.',
  },
  {
    id: 'coronary_sinus', file: 'coronary_sinus.glb', pos: [-0.656, 3.673, 0.146], color: '#c65a5a', system: 'vessels',
    label: 'Венозный синус сердца', labelLa: 'Sinus coronarius',
    description: 'Главный сборник венозной крови собственной мышечной стенки сердца, впадает в правое предсердие.',
  },
  {
    id: 'splenic_artery', file: 'splenic_artery.glb', pos: [-1.062, 2.455, 0.180], color: '#c65a5a', system: 'vessels',
    label: 'Селезёночная артерия', labelLa: 'Arteria splenica',
    description: 'Крупнейшая ветвень чревного ствола, снабжающая селезёнку, поджелудочную железу и желудок.',
  },
  {
    id: 'splenic_vein', file: 'splenic_vein.glb', pos: [-1.059, 2.407, 0.201], color: '#c65a5a', system: 'vessels',
    label: 'Селезёночная вена', labelLa: 'Vena splenica',
    description: 'Оттекает кровь от селезёнки, соединяясь с верхней брыжеечной веной в воротную вену печени.',
  },
  {
    id: 'renal_arteries', file: 'renal_arteries.glb', pos: [-0.556, 2.067, 0.167], color: '#c65a5a', system: 'vessels',
    label: 'Почечные артерии', labelLa: 'Arteriae renales',
    description: 'Парные артерии от брюшной аорты к почкам — до 25% сердечного выброса идёт в почки.',
  },
  {
    id: 'renal_veins', file: 'renal_veins.glb', pos: [-0.289, 2.001, 0.189], color: '#c65a5a', system: 'vessels',
    label: 'Почечные вены', labelLa: 'Venae renales',
    description: 'Короткие толстые вены от почек к нижней полой вене.',
  },
  {
    id: 'common_hepatic_artery', file: 'common_hepatic_artery.glb', pos: [-0.481, 2.423, 0.528], color: '#c65a5a', system: 'vessels',
    label: 'Общая печёночная артерия', labelLa: 'Arteria hepatica communis',
    description: 'Ветвень чревного ствола, снабжающая печень, желчный пузырь и двенадцатиперстную кишку.',
  },
  {
    id: 'common_iliac_arteries', file: 'common_iliac_arteries.glb', pos: [-0.554, 1.053, 0.365], color: '#c65a5a', system: 'vessels',
    label: 'Общие подвздошные артерии', labelLa: 'Arteriae iliacae communes',
    description: 'Продолжение аорты ниже её развилки. Делятся на наружные (к ногам) и внутренние (к органам таза).',
  },
  {
    id: 'common_iliac_veins', file: 'common_iliac_veins.glb', pos: [-0.432, 1.081, 0.318], color: '#c65a5a', system: 'vessels',
    label: 'Общие подвздошные вены', labelLa: 'Venae iliacae communes',
    description: 'Формируются слиянием наружных и внутренних подвздошных вен, сливаются в нижнюю полую вену.',
  },
  {
    id: 'skin', file: 'skin.glb', pos: [-0.623, 0.970, 0.007], color: '#c9a58a', system: 'organs',
    label: 'Кожа', labelLa: 'Cutis',
    description: 'Самый большой орган тела (около 2 м²). Барьер, терморегуляция, чувствительность, иммунная защита.',
  },
];

export function getBpModel(id: string): BpModel | undefined {
  return BP_MODELS.find((m) => m.id === id);
}
