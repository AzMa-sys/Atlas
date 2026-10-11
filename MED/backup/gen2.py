# -*- coding: utf-8 -*-
# Генератор описаний v2: полный машинный перевод названия + привязка к системе органов.
import json, re, hashlib

ADJ = {
 'right':'правый','left':'левый','upper':'верхний','lower':'нижний',
 'anterior':'передний','posterior':'задний','superior':'верхний','inferior':'нижний',
 'medial':'медиальный','lateral':'латеральный','internal':'внутренний','external':'наружный',
 'great':'большой','major':'большой','minor':'малый','deep':'глубокий','superficial':'поверхностный',
 'accessory':'добавочный','transverse':'поперечный','ascending':'восходящий','descending':'нисходящий',
 'common':'общий','proper':'собственный','long':'длинный','short':'короткий','broad':'широкий',
 'middle':'средний','distal':'дистальный','proximal':'проксимальный',
 'first':'первый','second':'второй','third':'третий','fourth':'четвёртый','fifth':'пятый',
 'sixth':'шестой','seventh':'седьмой','eighth':'восьмой','ninth':'девятый','tenth':'десятый',
 'small':'малый','oblique':'косой','horizontal':'горизонтальный','vertical':'вертикальный',
 'sagittal':'сагиттальный','frontal':'фронтальный','coronal':'корональный','dorsal':'спинной','ventral':'брюшной',
 'palmar':'ладонный','plantar':'подошвенный','digital':'пальцевый','radial':'лучевой','ulnar':'локтевой',
 'tibial':'большеберцовый','fibular':'малоберцовый','femoral':'бедренный','brachial':'плечевой',
 'carpal':'запястный','metacarpal':'пястный','tarsal':'тарзальный','metatarsal':'плюсневой','phalangeal':'фаланговый',
 'vertebral':'позвоночный','spinal':'спинной','cranial':'черепной','cerebral':'церебральный','cerebellar':'мозжечковый',
 'cardiac':'сердечный','coronary':'венечный','pulmonary':'лёгочный','hepatic':'печёночный','splenic':'селезёночный',
 'renal':'почечный','gastric':'желудочный','intestinal':'кишечный','colonic':'ободочнокишечный','rectal':'прямокишечный',
 'vesical':'пузырный','prostatic':'предстательный','uterine':'маточный','ovarian':'яичниковый','testicular':'яичковый',
 'clavicular':'ключичный','scapular':'лопаточный','humeral':'плечевой','iliac':'подвздошный','pubic':'лобковой',
 'ischial':'седалищный','sacral':'крестцовый','coccygeal':'копчиковый','costal':'рёберный','sternal':'грудинный',
 'nasal':'носовой','oral':'ротовой','lingual':'язычный','palatine':'нёбный','labial':'губной','buccal':'щёчный',
 'temporal':'височный','occipital':'затылочный','parietal':'теменной','ethmoidal':'решётчатый','sphenoidal':'клиновидный',
 'lacrimal':'слёзный','zygomatic':'скуловой','mandibular':'нижнечелюстной','maxillary':'верхнечелюстной',
 'optic':'зрительный','olfactory':'обонятельный','auditory':'слуховой','acoustic':'слуховой','vestibular':'вестибулярный',
 'cochlear':'улитковый','retinal':'сетчаточный','choroid':'сосудистый','ciliary':'цилиарный','conjunctival':'конъюнктивальный',
 'ventricular':'желудочковый','atrial':'предсердный','interventricular':'межжелудочковый','atrioventricular':'атриовентрикулярный',
 'marginal':'краевой','septal':'перегородочный','diagonal':'диагональный','circumflex':'окружной','conus':'конусовидный',
 'apicoposterior':'верхнезадний','anterolateral':'переднебоковой','anteromedial':'переднемедиальный',
 'posterolateral':'заднебоковой','posteromedial':'заднемедиальный','anterosuperior':'передневерхний',
 'inferolateral':'нижнелатеральный','superolateral':'верхнелатеральный','mid':'средний',
 'anomalous':'аномальный','variant':'вариантный','pectoral':'грудной','lumbar':'поясничный',
 'thoracic':'грудной','cervical':'шейный','gluteal':'ягодичный','perineal':'промежностной',
 'capsular':'капсульный','articular':'суставной','synovial':'синовиальный','mucosal':'слизистый','serous':'серозный',
 'sciatic':'седалищный','suprarenal':'надпочечный','infrarenal':'подпочечный','supraclavicular':'надключичный',
 'infraclavicular':'подключичный','supratrochlear':'надмыщелковый','infratrochlear':'подмыщелковый',
 'supraorbital':'надглазничный','infraorbital':'подглазничный','supratentorial':'надтенторный',
 'epigastric':'эпигастральный','hypogastric':'гипогастральный','umbilical':'пупочный','inguinal':'паховый',
 'lumbar':'поясничный','iliac':'подвздошный','femoral':'бедренный','crural':'голеневой','pedal':'подошвенный',
 'cutaneous':'кожный','subcutaneous':'подкожный','visceral':'висцеральный','terminal':'конечный',
 'initial':'начальный','precentral':'предцентральный','postcentral':'постцентральный',
 'prefrontal':'предлобный','mastoid':'сосцевидный','styloid':'шиловидный','coronoid':'венечный',
 'odontoid':'зубовидный','straight':'прямой','round':'круглый',
 'semilunar':'полулунный','semicircular':'полукружный','triangular':'треугольный','quadrangular':'четырёхгранный',
 'rhomboid':'ромбовидный','trapezoid':'трапециевидный','serrated':'зубчатый',
 'alar':'крыловидный','alveolar':'альвеолярный','gingival':'десневой','periodontal':'периодонтальный',
 'azygos':'непарный','hemiazygos':'полунепарный','internal':'внутренний','external':'наружный',
 'thoracodorsal':'грудоспинной','thoracoacromial':'грудоакромиальный','thoracoepigastric':'грудобрюшной',
 'suprascapular':'надлопаточный','infrascapular':'подлопаточный','intercostal':'межрёберный',
 'subcostal':'подрёберный','supracostal':'надрёберный','transverse':'поперечный',
 'anterior':'передний','posterior':'задний','ascending':'восходящий','descending':'нисходящий',
 'superior':'верхний','inferior':'нижний','medial':'медиальный','lateral':'латеральный',
}

# существительные и термины (многословные приоритетны)
TERM_RU = {
 'vascular tree':'сосудистое русло','segment of artery':'сегмент артерии','variant artery':'вариантная артерия',
 'segment of vein':'сегмент вены','segment of nerve':'сегмент нерва',
 'cusp of cardiac valve':'куспид сердечного клапана','leaflet of tricuspid valve':'створка трёхстворчатого клапана',
 'leaflet of mitral valve':'створка митрального клапана','cusp of pulmonary valve':'куспид лёгочного клапана',
 'cusp of aortic valve':'куспид аортального клапана','valve':'клапан','vein':'вена','artery':'артерия','nerve':'нерв',
 'muscle':'мышца','bone':'кость','space':'пространство','junction':'соединение','membrane':'мембрана','wall':'стенка',
 'lobe':'доля','segment':'сегмент','part':'часть','portion':'часть','branch':'ветвь','tributary':'приток','head':'головка',
 'body':'тело','neck':'шея','root':'корень','fundus':'дно','angle':'угол','border':'край','surface':'поверхность',
 'line':'линия','point':'точка','region':'область','zone':'зона','area':'область','organ':'орган','structure':'структура',
 'unit':'элемент','system':'система','tree':'дерево','network':'сеть','plexus':'сплетение','cord':'струна','tract':'тракт',
 'pathway':'путь','channel':'канал','recess':'углубление','ridge':'гребень','eminence':'возвышение','prominence':'выступ',
 'aperture':'отверстие','ostium':'устье','orifice':'устье','cavity':'полость','chamber':'камера','compartment':'отдел',
 'septum':'перегородка','commissure':'комиссура','isthmus':'перешейк','dome':'купол','cupola':'купол','apex':'верхушка',
 'base':'основание','hilum':'ворота','crus':'ножка','column':'столб','pillar':'столб','fold':'складка','anastomosis':'анастомоз',
 'vascular anastomosis':'сосудистый анастомоз','arterial anastomosis':'артериальный анастомоз','venous anastomosis':'венозный анастомоз',
 'skull':'череп','cranium':'череп','mandible':'нижняя челюсть','maxilla':'верхняя челюсть',
 'frontal bone':'лобная кость','parietal bone':'теменная кость','temporal bone':'височная кость','occipital bone':'затылочная кость',
 'sphenoid bone':'клиновидная кость','ethmoid bone':'решётчатая кость','nasal bone':'носовая кость','lacrimal bone':'слёзная кость',
 'zygomatic bone':'скуловая кость','palatine bone':'нёбная кость','vomer':'сошник','hyoid bone':'подъязычная кость',
 'sternum':'грудина','rib':'ребро','ribs':'рёбра','vertebra':'позвонок','vertebrae':'позвоночник',
 'cervical vertebra':'шейный позвонок','thoracic vertebra':'грудной позвонок','lumbar vertebra':'поясничный позвонок',
 'sacrum':'крестец','coccyx':'копчик','clavicle':'ключица','scapula':'лопатка','humerus':'плечевая кость','radius':'лучевая кость',
 'ulna':'локтевая кость','carpal bone':'запястная кость','metacarpal bone':'пястная кость','phalanx':'фаланга','phalanges':'фаланги',
 'femur':'бедренная кость','patella':'надколенник','tibia':'большеберцовая кость','fibula':'малоберцовая кость',
 'tarsal bone':'предплюсневая кость','metatarsal bone':'плюсневая кость','calcaneus':'пяточная кость','talus':'таранная кость',
 'hip bone':'тазовая кость','ilium':'подвздошная кость','ischium':'седалищная кость','pubis':'лобковая кость',
 'acetabulum':'вертлужная впадина','condyle':'мыщелок','epicondyle':'надмыщелок','tubercle':'бугорок','tuberosity':'бугор',
 'crest':'гребень','spine':'остистый отросток','process':'отросток','foramen':'отверстие','fossa':'ямка','fovea':'ямка',
 'sinus':'пазуха','meatus':'ход','canal':'канал','groove':'борозда','suture':'шов','fontanelle':'родничок',
 'masseter':'жевательная мышца','temporalis':'височная мышца','frontalis':'лобная мышца',
 'orbicularis oculi':'круговая мышца глаза','orbicularis oris':'круговая мышца рта','buccinator':'щёчная мышца',
 'sternocleidomastoid':'грудино-ключично-сосцевидная мышца','trapezius':'трапециевидная мышца','deltoid':'дельтовидная мышца',
 'pectoralis major':'большая грудная мышца','pectoralis minor':'малая грудная мышца','latissimus dorsi':'широчайшая мышца спины',
 'serratus anterior':'передняя зубчатая мышца','rhomboid':'ромбовидная мышца','supraspinatus':'надостная мышца','infraspinatus':'подостная мышца',
 'biceps':'двуглавая мышца','triceps':'трёхглавая мышца','brachialis':'плечевая мышца','brachioradialis':'лучевой разгибатель',
 'forearm':'предплечье','pronator teres':'круглый пронатор','flexor':'сгибатель','extensor':'разгибатель',
 'rectus abdominis':'прямая мышца живота','external oblique':'наружная косая мышца живота','transversus abdominis':'поперечная мышца живота',
 'diaphragm':'диафрагма','psoas':'подвздошно-поясничная мышца','iliacus':'подвздошная мышца','gluteus maximus':'большая ягодичная мышца',
 'gluteus medius':'средняя ягодичная мышца','gluteus minimus':'малая ягодичная мышца','tensor fasciae latae':'напрягатель широкой фасции',
 'quadriceps':'четырёхглавая мышца бедра','rectus femoris':'прямая мышца бедра','vastus lateralis':'латеральная широкая мышца',
 'vastus medialis':'медиальная широкая мышца','vastus intermedius':'промежуточная широкая мышца',
 'biceps femoris':'двуглавая мышца бедра','semitendinosus':'полусухожильная мышца','semimembranosus':'полуперепончатая мышца',
 'gastrocnemius':'икроножная мышца','soleus':'камбаловидная мышца','tibialis anterior':'передняя большеберцовая мышца',
 'tibialis posterior':'задняя большеберцовая мышца','fibularis':'малоберцовая мышца','peroneus':'малоберцовая мышца',
 'adductor':'приводящая мышца','abductor':'отводящая мышца','gracilis':'тонкая мышца','pectineus':'гребенчатая мышца',
 'sphincter':'сфинктер','levator ani':'поднимающая мышца заднего прохода','coccygeus':'копчиковая мышца',
 'tongue':'язык','genioglossus':'подбородочно-язычная мышца','mylohyoid':'подчелюстно-подъязычная мышца','digastric':'двубрюшная мышца',
 'sternohyoid':'грудино-подъязычная мышца','omohyoid':'лопаточно-подъязычная мышца','thyrohyoid':'щитоподъязычная мышца',
 'erector spinae':'разгибатель позвоночника','transversospinalis':'поперечно-остистая группа','longus colli':'длинная мышца шеи',
 'scalene':'скаленовая мышца','platysma':'подкожная мышца шеи','orbital':'глазница','occipitofrontalis':'затылочно-лобная мышца',
 'heart':'сердце','lung':'лёгкое','lungs':'лёгкие','liver':'печень','spleen':'селезёнка','pancreas':'поджелудочная железа',
 'kidney':'почка','kidneys':'почки','ureter':'мочеточник','ureters':'мочеточники','urinary bladder':'мочевой пузырь','urethra':'уретра',
 'stomach':'желудок','small intestine':'тонкая кишка','large intestine':'толстая кишка','duodenum':'двенадцатиперстная кишка',
 'jejunum':'тощая кишка','ileum':'подвздошная кишка','cecum':'слепая кишка','appendix':'аппендикс','colon':'ободочная кишка',
 'rectum':'прямая кишка','anus':'задний проход','esophagus':'пищевод','pharynx':'глотка','larynx':'гортань','trachea':'трахея',
 'bronchus':'бронх','bronchi':'бронхи','thyroid gland':'щитовидная железа','parathyroid gland':'паращитовидная железа',
 'adrenal gland':'надпочечник','suprarenal gland':'надпочечник','pituitary gland':'гипофиз','hypophysis':'гипофиз',
 'pineal gland':'шишковидная железа','epiphysis':'эпифиз','thymus':'тимус','thymus gland':'вилочковая железа',
 'prostate':'предстательная железа','testis':'яичко','testes':'яички','epididymis':'придаток яичка','vas deferens':'семявыносящий проток',
 'seminal vesicle':'семенной пузырёк','penis':'половой член','scrotum':'мошонка','ovary':'яичник','ovaries':'яичники',
 'uterus':'матка','fallopian tube':'маточная труба','vagina':'влагалище','placenta':'плацента','mammary gland':'молочная железа',
 'gallbladder':'желчный пузырь','bile duct':'желчный проток','portal vein':'воротная вена','celiac trunk':'чревный ствол',
 'mesentery':'брыжейка','omentum':'сальник','peritoneum':'брюшина','pleura':'плевра','pericardium':'перикард','mediastinum':'средостение',
 'aorta':'аорта','vena cava':'полая вена','superior vena cava':'верхняя полая вена','inferior vena cava':'нижняя полая вена',
 'pulmonary artery':'лёгочная артерия','pulmonary vein':'лёгочная вена','coronary artery':'венечная артерия','carotid artery':'сонная артерия',
 'internal carotid':'внутренняя сонная артерия','external carotid':'наружная сонная артерия','vertebral artery':'позвоночная артерия',
 'subclavian artery':'подключичная артерия','axillary artery':'подмышечная артерия','brachial artery':'плечевая артерия',
 'radial artery':'лучевая артерия','ulnar artery':'локтевая артерия','femoral artery':'бедренная артерия',
 'popliteal artery':'подколенная артерия','tibial artery':'большеберцовая артерия','fibular artery':'малоберцовая артерия',
 'iliac artery':'подвздошная артерия','brachiocephalic':'брахиоцефальный ствол','celiac':'чревный','mesenteric':'брыжеечный',
 'renal artery':'почечная артерия','splenic artery':'селезёночная артерия','hepatic artery':'печёночная артерия',
 'gastric artery':'желудочная артерия','dorsal':'спинной','plantar':'подошвенный','palmar':'ладонный','digital':'пальцевый',
 'jugular vein':'язвенная вена','subclavian vein':'подключичная вена','brachial vein':'плечевая вена','femoral vein':'бедренная вена',
 'saphenous vein':'большая подкожная вена','popliteal vein':'подколенная вена','portal':'воротный',
 'brain':'мозг','cerebrum':'большой мозг','cerebellum':'мозжечок','brainstem':'ствол мозга',
 'medulla':'продолговатый мозг','pons':'мост','midbrain':'средний мозг','thalamus':'таламус','hypothalamus':'гипоталамус',
 'spinal cord':'спинной мозг','brachial plexus':'плечевое сплетение','lumbosacral plexus':'пояснично-крестцовое сплетение',
 'vagus nerve':'блуждающий нерв','phrenic nerve':'диафрагмальный нерв','sciatic nerve':'седалищный нерв','femoral nerve':'бедренный нерв',
 'radial nerve':'лучевой нерв','ulnar nerve':'локтевой нерв','median nerve':'срединный нерв','tibial nerve':'большеберцовый нерв',
 'common peroneal nerve':'общий малоберцовый нерв','trigeminal nerve':'тройничный нерв','facial nerve':'лицевой нерв',
 'glossopharyngeal nerve':'язычно-глоточный нерв','accessory nerve':'добавочный нерв','hypoglossal nerve':'подъязычный нерв',
 'olfactory nerve':'обонятельный нерв','optic nerve':'зрительный нерв','oculomotor nerve':'глазодвигательный нерв','trochlear nerve':'блоковый нерв',
 'abducens nerve':'отводящий нерв','cervical plexus':'шея','sympathetic':'симпатический','parasympathetic':'парасимпатический',
 'ganglion':'ганглий','ramus':'ветвь','nerve root':'корешок','cauda equina':'конский хвост',
 'eye':'глаз','eyes':'глаза','ear':'ухо','ears':'уши','nose':'нос','tooth':'зуб','teeth':'зубы','tooth socket':'альвеола',
 'incisor':'резец','canine':'клык','molar':'коренной зуб','premolar':'предкоренной зуб','gingiva':'десна','gum':'десна','palate':'нёбо',
 'uvula':'нёбная занавеска','tonsil':'миндалина','tongue papilla':'сосочек языка','cochlea':'улитка',
 'semicircular canal':'полукружный канал','tympanic membrane':'барабанная перепонка','auditory tube':'слуховая труба',
 'eustachian tube':'евстахиева труба','ossicle':'слуховая косточка','malleus':'молоточек','incus':'наковальня','stapes':'стреме',
 'retina':'сетчатка','cornea':'роговица','lens':'хрусталик','iris':'радужка','pupil':'зрачок','sclera':'склера','choroid':'сосудистая оболочка',
 'conjunctiva':'конъюнктива','eyelid':'веко','eyebrow':'бровь','eyelash':'ресница','lacrimal gland':'слёзная железа','optic disc':'зрительный диск',
 'cartilage':'хрящ','fibrocartilage':'волокнистый хрящ','ligament':'связка','ligaments':'связки','tendon':'сухожилие','tendons':'сухожилия',
 'fascia':'фасция','aponeurosis':'апоневроз','bursa':'синовиальная сумка','meniscus':'мениск','disc':'диск','disk':'диск',
 'skin':'кожа','hair':'волос','nail':'ноготь','adipose':'жировая ткань','fat':'жир','mucosa':'слизистая оболочка',
 'serosa':'серозная оболочка','gland':'железа','duct':'проток','vessel':'сосуд','vessels':'сосуды','capillary':'капилляр','capillaries':'капилляры',
 'lymph node':'лимфатический узел','lymph':'лимфа','lymphatic vessel':'лимфатический сосуд',
 'red bone marrow':'красный костный мозг','yellow bone marrow':'жёлтый костный мозг','bone marrow':'костный мозг','periosteum':'надкостница',
 'compact bone':'компактное вещество','spongy bone':'губчатое вещество','diaphysis':'диафиз','metaphysis':'метафиз','growth plate':'зона роста',
 'cruciate ligament':'крестообразная связка',
 # общие слова
 'trunk':'ствол','twig':'веточка','division':'отдел','band':'полоса','stripe':'полоса','stria':'полоса','loop':'петля','ansa':'петля',
 'extremity':'конечность','limb':'конечность','digit':'палец','opening':'отверстие','hiatus':'хиатус','ring':'кольцо','arch':'дуга',
 'plate':'пластинка','lamina':'пластинка','squama':'чешуя','facet':'фасетка','edge':'край','horn':'рог','cornu':'рог','tail':'хвост',
 'floor':'дно','roof':'крыша','fibers':'волокна','fiber':'волокно','nucleus':'ядро','nuclei':'ядра','matter':'вещество','cortex':'кора',
 'lobule':'долька','papilla':'сосочек','villus':'ворсинка','tuft':'пучок','bundle':'пучок','fasciculus':'пучок','lemniscus':'лентовидный пучок',
 'peduncle':'ножка','decussation':'перекрёст','chiasm':'перекрёст','capsule':'капсула','fluid':'жидкость','secretion':'секрет',
 'blood':'кровь','plasma':'плазма','serum':'сыворотка','pulp':'пульпа','medulla':'мозговое вещество','tissue':'ткань',
 'bronchiole':'бронхиола','alveolus':'альвеола','glomerulus':'клубочек','acinus':'ацинус','pyramid':'пирамидка',
 'cuspis':'куспид','cusp':'куспид','leaflet':'створка','flap':'створка','cusps':'куспиды','cuspid':'куспид',
 'margin':'край','sulcus':'борозда','fissure':'щель','notch':'вырезка','groove':'борозда',
 'sulci':'борозды','foramina':'отверстия','ostia':'устья','recesses':'углубления','fossae':'ямки',
 'jaw':'челюсть','atrium':'предсердие','ventricle':'желудочек','auricle':'ушко','appendage':'придаток',
 'valve of coronary sinus':'клапан венечного синуса','valve of inferior vena cava':'клапан нижней полой вены',
 'valve of foramen ovale':'клапан овального окна','tendon of todaro':'сухожилие Тодаро',
 'triangle of koch':'треугольник Коха','limb of':'ветвь','septal band':'перегородочная мышца',
 'septomarginal trabecula':'перегородочно-краевая трабекула','moderator band':'перегородочно-краевая трабекула',
 'crista terminalis':'терминальный гребень','pectinate muscles':'гребенчатые мышцы',
 'opening of coronary sinus':'устье венечного синуса','opening of inferior vena cava':'устье нижней полой вены',
 'fossa ovalis':'овальная ямка','limbus of fossa ovalis':'край овальной ямки',
 'valve of fossa ovalis':'клапан овальной ямки','tendon of infundibulum':'сухожилие воронковидного отростка',
 'valves':'клапаны','arteries':'артерии','veins':'вены','nerves':'нервы','muscles':'мышцы','bones':'кости',
 'nodes':'узлы','ganglia':'ганглии','plexuses':'сплетения','branches':'ветви','tributaries':'притоки','roots':'корни',
 'walls':'стенки','cavities':'полости','chambers':'камеры','lobes':'доли','segments':'сегменты','portions':'части','parts':'части',
 'regions':'области','zones':'зоны','areas':'области','organs':'органы','structures':'структуры','systems':'системы',
}


def gender(ru):
    w = ru.split()[-1]
    if w.endswith(('о','е')): return 'n'
    if w.endswith(('ость','ция','рия','ка','га','жа','за','ша','ча','ща','на','ра','да','та','ла','ма','са','ва','а','я','ь','ость')): return 'f'
    return 'm'

def agree(adj, g):
    if g == 'f':
        if adj.endswith('ий'): return adj[:-2] + 'яя'
        if adj.endswith('ый'): return adj[:-2] + 'ая'
        if adj.endswith('ой'): return adj[:-2] + 'ая'
        return adj
    if g == 'n':
        if adj.endswith('ий'): return adj[:-2] + 'ее'
        if adj.endswith('ый'): return adj[:-2] + 'ое'
        if adj.endswith('ой'): return adj[:-2] + 'ое'
    return adj

def genitive(ru):
    """Упрощённый родительный падеж для фразы 'ветвь (чего?)'."""
    w = ru.split()
    def adj_gen(word):
        if word.endswith('яя'): return word[:-2] + 'ей'
        if word.endswith('ая'): return word[:-2] + 'ой'
        if word.endswith('ий'): return word[:-2] + 'его'
        if word.endswith('ый'): return word[:-2] + 'ого'
        if word.endswith('ее'): return word[:-2] + 'его'
        if word.endswith('ое'): return word[:-2] + 'ого'
        return word
    last = w[-1]
    if last.endswith('ь'):
        last2 = last[:-1] + 'и'
    elif last.endswith('ия'):
        last2 = last[:-2] + 'ии'
    elif last.endswith(('а','я')):
        last2 = last[:-1] + 'и'
    elif last.endswith(('о','е')):
        last2 = last[:-1] + ('а' if last.endswith('о') else 'я')
    else:
        last2 = last + 'а'
    w[-1] = last2
    return ' '.join(adj_gen(x) for x in w)

SYSTEM_RU = {
 'arterial':'сердечно-сосудистой системы','venous':'сердечно-сосудистой системы','cardiac':'сердечно-сосудистой системы',
 'nervous':'нервной системы','muscular':'мышечной системы','skeletal':'опорно-двигательного аппарата',
 'digestive':'пищеварительной системы','respiratory':'дыхательной системы','urinary':'мочевыделительной системы',
 'endocrine':'эндокринной системы','lymphatic':'лимфатической системы','reproductive':'репродуктивной системы',
 'sensory':'органов чувств','integumentary':'кожного покрова','connective':'соединительной ткани',
}

# богатые описания для частых однословных/специальных терминов
SP = {
 'bone':'Костная структура тела. Входит в опорно-двигательный аппарат и служит опорой для мягких тканей.',
 'artery':'Кровеносный сосуд, относящий кровь от сердца к органам и тканям.',
 'vein':'Кровеносный сосуд, возвращающий кровь от органов и тканей к сердцу.',
 'nerve':'Нервный ствол, проводящий импульсы между центральной нервной системой и органами.',
 'lymph node':'Орган лимфатической системы, фильтрующий лимфу и участвующий в иммунном ответе.',
 'lymphatic vessel':'Сосуд лимфатической системы, оттекающий лимфу от тканей к кровотоку.',
 'muscle':'Скелетная мышца, создающая движение за счёт сокращения.',
 'tooth':'Орган ротовой полости, предназначенный для измельчения пищи.',
 'rib':'Изогнутая кость грудной клетки, защищающая грудные внутренние органы.',
 'vertebra':'Кость позвоночного столба, образующая опору туловища и защищающая спинной мозг.',
 'phalanx':'Малая трубчатая кость пальцев кисти или стопы.',
 'foramen':'Естественное отверстие в кости или ткани, через которое проходят сосуды или нервы.',
 'fossa':'Углубление на поверхности кости, служащее местом прикрепления мышц или расположения органов.',
 'process':'Костный выступ, к которому прикрепляются мышцы, связки или сухожилия.',
 'canal':'Канал в кости или ткани, проводящий сосуды, нервы или другие структуры.',
 'sinus':'Полость в кости или органе, заполненная воздухом, кровью или другой жидкостью.',
 'gland':'Железа, выделяющая вещества для работы органов и обмена веществ.',
 'tendon':'Плотная соединительнотканная структура, прикрепляющая мышцу к кости.',
 'ligament':'Связка, соединяющая кости и стабилизирующая сустав.',
 'cartilage':'Эластичная хрящевая ткань, смягчающая трение и образующая опору.',
 'bursa':'Синовиальная сумка, уменьшающая трение между тканями.',
 'ganglion':'Нервное образование, собирающее и перераспределяющее нервные импульсы.',
 'vessel':'Сосуд, по которому движется кровь или лимфа.',
 'duct':'Проток, по которому выделяемые вещества направляются к органу или наружу.',
 'tooth socket':'Лунка челюсти, в которой располагается корень зуба.',
 'gingiva':'Десна, окружающая зубы и фиксирующая их в челюсти.',
 'ramus':'Ветвь нерва или сосуда, отходящая от основного ствола.',
 'meniscus':'Хрящевая прокладка в суставе, амортизирующая и стабилизирующая его.',
 'disc':'Хрящевая или соединительнотканная пластинка, соединяющая или амортизирующая структуры.',
 'fascia':'Соединительнотканная оболочка, обволакивающая мышцы и органы.',
 'aponeurosis':'Широкое сухожильное пластинчатое образование.',
 'mucosa':'Слизистая оболочка, выстилающая внутренние полости органов.',
 'serosa':'Серозная оболочка, покрывающая органы и обеспечивающая их скольжение.',
 'suture':'Неподвижное соединение костей черепа.',
 'crest':'Костный гребень, служащий местом прикрепления мышц.',
 'tubercle':'Небольшой костный бугорок для прикрепления связок и сухожилий.',
 'tuberosity':'Костный бугор для прикрепления мышц.',
 'condyle':'Суставной костный выступ, образующий суставную поверхность.',
 'epicondyle':'Выступ над суставным мыщелком для прикрепления сухожилий.',
 'spine':'Остистый отросток позвонка, служащий для прикрепления мышц и связок.',
 'meatus':'Естественный канал в кости или органе.',
 'fontanelle':'Мягкая ткань между костями черепа новорождённого.',
 'skeleton':'Совокупность костей, образующих опору тела.',
 'anastomosis':'Естественное соединение между сосудами, обеспечивающее обходной кровоток.',
 'vascular tree':'Совокупность ветвящихся сосудов, снабжающих орган или область тела.',
 'left atrium':'Левое предсердие сердца, принимающее кровь из лёгких и перекачивающее её в левый желудочек.',
 'right atrium':'Правое предсердие сердца, принимающее венозную кровь от всего тела и перекачивающее её в правый желудочек.',
 'left ventricle':'Левый желудочек сердца — самая мощная камера, нагнетающая кровь в большой круг кровообращения.',
 'right ventricle':'Правый желудочек сердца, нагнетающий кровь в лёгочную артерию для насыщения кислородом в лёгких.',
 'arch of aorta':'Дуга аорты — изогнутая часть аорты, дающая начало крупным артериям головы, рук и грудной стенки.',
 'ascending aorta':'Восходящая часть аорты от выхода из сердца до дуги аорты.',
 'descending aorta':'Нисходящая часть аорты, идущая через грудную и брюшную полости.',
 'abdominal aorta':'Брюшная часть аорты, снабжающая органы живота и нижние конечности.',
 'thoracic aorta':'Грудная часть аорты, проходящая через грудную полость.',
 'aortic arch':'Дуга аорты с ветвями к голове и верхним конечностям.',
 'eye':'Орган зрения, воспринимающий свет и передающий сигналы в мозг.',
 'ear':'Орган слуха и равновесия.',
 'skin':'Защитный покров тела, участвующий в терморегуляции и обмене веществ.',
 'hair':'Роговое образование кожи.',
 'nail':'Роговая пластинка на кончиках пальцев.',
 'joint':'Подвижное соединение костей.',
 'joint capsule':'Суставная капсула, удерживающая суставную полость.',
 'synovial membrane':'Синовиальная оболочка, вырабатывающая смазку сустава.',
 'synovial fluid':'Синовиальная жидкость, смазывающая суставные поверхности.',
 'heart':'Мышечный насос в груди. Правая половина сердца отправляет кровь в лёгкие, левая — в большой круг кровообращения.',
}

ADJ_KEYS = sorted(ADJ, key=len, reverse=True)
TERM_KEYS = sorted(TERM_RU, key=len, reverse=True)

def translate_side(words):
    """Переводит цепочку слов 'adj adj noun ...' в русское название.
    Возвращает (ru_text, ok) — ok=False, если есть непереведённые слова."""
    words = list(words)
    adjs = []
    while words and words[0] in ADJ:
        adjs.append(ADJ[words.pop(0)])
    rest = ' '.join(words)
    # многословный термин целиком
    for k in TERM_KEYS:
        if rest == k:
            ru = TERM_RU[k]
            g = gender(ru)
            return ' '.join([agree(a, g) for a in adjs] + [ru]), True
    # термин как хвост фразы: 'ventricular branch' и т.п.
    for k in TERM_KEYS:
        if ' ' in k and rest.endswith(' ' + k):
            prefix = rest[:-len(k)].strip()
            extra = []
            ok = True
            for w in prefix.split():
                if w in ADJ: extra.append(ADJ[w])
                elif w in TERM_RU: extra.append(TERM_RU[w])
                else: ok = False
            if ok:
                ru = TERM_RU[k]
                g = gender(ru)
                return ' '.join([agree(a, g) for a in adjs] + extra + [ru]), True
    # слово за словом
    ru_words = []
    ok = True
    for w in words:
        if w in TERM_RU: ru_words.append(TERM_RU[w])
        elif w in ('of','the','a','an'): ok = False; break
        else: ok = False; break
    if ok and ru_words:
        g = gender(ru_words[-1])
        return ' '.join([agree(a, g) for a in adjs] + ru_words), True
    return None, False

def make_ru_name(name):
    """Полный перевод названия концепции. None — не удалось."""
    n = name.lower().strip()
    n = re.sub(r'^([a-z]+) (?:part|portion|segment|region) of ', r'\1 ', n)
    n = re.sub(r' ([a-z]+) part$', r' \1', n)
    parts = n.split(' of ')
    if len(parts) > 2: return None
    tail, ok1 = translate_side(parts[0].split())
    if not ok1: return None
    if len(parts) == 2:
        owner, ok2 = translate_side(parts[1].split())
        if not ok2: return None
        return tail + ' (' + genitive(owner) + ')'
    return tail

def make_desc(name, system):
    n = name.lower().strip()
    sys_phrase = SYSTEM_RU.get(system, 'соответствующей системы органов')
    # специальные богатые описания
    m = re.match(r'^(?:([a-z]+) )?([a-z]+(?: [a-z]+)?)$', n)
    sp_key = None
    if n in SP: sp_key = n
    if sp_key:
        d = SP[sp_key]
        if m and m.group(1) and m.group(1) in ADJ and sp_key == m.group(2):
            head = d.split()[0]
            g = 'f' if head.endswith(('ая','яя')) else 'm'
            d = agree(ADJ[m.group(1)], g) + ' ' + d[0].lower() + d[1:]
        return d
    ru = make_ru_name(name)
    if ru:
        cap = ru[0].upper() + ru[1:]
        h = int(hashlib.md5(n.encode()).hexdigest(), 16)
        tpls = [
            '{X} — структура {S}.',
            '{X}. Анатомический элемент {S}.',
            '{X}: образование {S}.',
        ]
        return tpls[h % 3].replace('{X}', cap).replace('{S}', sys_phrase)
    # fallback: частичный перевод по словарю терминов
    ru = None
    for k in TERM_KEYS:
        if n == k or n.startswith(k + ' ') or n.endswith(' ' + k) or (' ' + k + ' ' in ' ' + n + ' '):
            ru = TERM_RU[k]
            break
    if ru is None:
        return None
    g = gender(ru)
    h = int(hashlib.md5(n.encode()).hexdigest(), 16)
    A = ''
    m2 = re.match(r'^(right|left|upper|lower|anterior|posterior|superior|inferior|medial|lateral|internal|external|great|major|minor|deep|superficial|accessory|transverse|ascending|descending|common|proper|long|short|broad|middle|distal|proximal|first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|small|sciatic) (.+)$', n)
    if m2:
        A = agree(ADJ.get(m2.group(1), ''), g)
        if A: A = A + ' '
    tpls = {
     'f': ['{A}{RU} — структура {S}.','{A}{RU}: элемент {S}.','{A}{RU} — анатомическое образование {S}.'],
     'm': ['{A}{RU} — структура {S}.','{A}{RU}: элемент {S}.','{A}{RU} — анатомическое образование {S}.'],
     'n': ['{A}{RU} — структура {S}.','{A}{RU}: элемент {S}.','{A}{RU} — анатомическое образование {S}.'],
    }
    cap = ru[0].upper() + ru[1:]
    return tpls[g][h % 3].replace('{A}', A).replace('{RU}', cap).replace('{S}', sys_phrase)

def main():
    atlas = json.load(open('/mnt/agents/output/app/public/atlas/models/atlas.json'))
    sys_by_part = {p['id']: p['system'] for p in atlas['parts']}
    from collections import Counter
    desc = {}
    for c in atlas['concepts']:
        votes = Counter(sys_by_part.get(e) for e in c.get('elements', []) if e in sys_by_part)
        system = votes.most_common(1)[0][0] if votes else None
        d = make_desc(c['name'], system)
        if d:
            desc[c['name']] = d
    return desc

if __name__ == '__main__':
    d = main()
    print('total:', len(d))
    for k in ['patella','heart','first anterior ventricular branch of right coronary artery',
              'sciatic nerve','left ventricle','masseter','vascular tree','trunk of right coronary artery',
              'orbicularis oris','gingiva of upper jaw','anastomosis','cavity of right atrium']:
        print(k, '->', d.get(k))
