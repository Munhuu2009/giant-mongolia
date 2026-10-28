"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Language = "en" | "mn";

const enMessages = {
    "nav.bikes": "Bikes",
    "nav.gear": "Gear",
    "nav.technology": "Technology",
    "nav.stores": "Stores",
    "nav.search": "Search",
    "nav.cart": "Shopping cart",
    "nav.account": "Account",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "nav.siteMenu": "Site menu",
    "nav.primary": "Primary",
    "nav.menu": "Menu",
    "nav.selectMarket": "Select market",
    "nav.mongolia": "Mongolia",
    "nav.global": "Global Giant",
    "nav.moreWays": "More ways to ride",
    "nav.forWomen": "For women",
    "nav.forCity": "For city life",
    "nav.forFit": "For the perfect fit",
    "hero.category": "Bicycle / Gravel series",
    "hero.headline.left1": "Ride",
    "hero.headline.left2": "Beyond",
    "hero.headline.left3": "Limits",
    "hero.headline.right1": "Spirit",
    "hero.headline.right2": "With",
    "hero.headline.right3": "Giant",
    "hero.description": "Explore Mongolia on a bike engineered for precision, speed, and terrain control.",
    "hero.cta": "Shop bicycles",
    "hero.feature.design.title": "Innovate Design",
    "hero.feature.design.description":
      "Our bikes pair purposeful form with rider-first details for a confident, effortless ride.",
    "hero.feature.engineering.title": "Precision Engineering",
    "hero.feature.engineering.description":
      "Every frame and component is tuned for responsive handling, lasting strength, and control.",
    "hero.feature.performance.title": "Sustainable Performance",
    "hero.feature.performance.description":
      "Thoughtful materials and durable construction help make every ride better for the long run.",
    "technology.story.eyebrow": "GIANT ENGINEERING",
    "technology.story.heading": "Technology & Innovation",
    "technology.story.tagline": "Six systems. One ride, refined.",
    "technology.story.rail": "Technology story",
    "technology.story.pause": "Pause showcase",
    "technology.story.play": "Play showcase",
    "technology.story.step01.category": "COMPOSITE ENGINEERING",
    "technology.story.step01.title": "ADVANCED SL COMPOSITE",
    "technology.story.step01.description": "Carbon woven in Giant's own factories for high stiffness at low weight.",
    "technology.story.step01.stat": "Giant-made carbon",
    "technology.story.step01.alt": "Close-up of the Propel Advanced SL head tube",
    "technology.story.step02.category": "AERODYNAMIC DESIGN",
    "technology.story.step02.title": "OVERDRIVE AERO",
    "technology.story.step02.description": "D-shaped steerer with internal cables for aero efficiency.",
    "technology.story.step02.stat": "Internal routing",
    "technology.story.step02.alt": "Close-up of the Propel front end and integrated cables",
    "technology.story.step03.category": "COMFORT ENGINEERING",
    "technology.story.step03.title": "D-FUSE TECHNOLOGY",
    "technology.story.step03.description": "D-shaped seatpost and bar that absorb vibration for comfort.",
    "technology.story.step03.stat": "All-day comfort",
    "technology.story.step03.alt": "Close-up of the D-Fuse handlebar and cockpit",
    "technology.story.step04.category": "SUSPENSION DESIGN",
    "technology.story.step04.title": "MAESTRO SUSPENSION",
    "technology.story.step04.description": "Floating pivots give active suspension without pedal bob.",
    "technology.story.step04.stat": "Zero pedal bob",
    "technology.story.step04.alt": "Close-up of the Maestro e-bike rear shock",
    "technology.story.step05.category": "E-BIKE SYSTEMS",
    "technology.story.step05.title": "SYNCDRIVE PRO MOTOR",
    "technology.story.step05.description": "Yamaha-powered, with Smart Assist automatic support.",
    "technology.story.step05.stat": "85 Nm torque",
    "technology.story.step05.alt": "Close-up of the SyncDrive Pro motor",
    "technology.story.step06.category": "ALUMINUM ENGINEERING",
    "technology.story.step06.title": "ALUXX SL ALUMINUM",
    "technology.story.step06.description": "Double-butted 6061 alloy tubes, light and durable.",
    "technology.story.step06.stat": "6061 alloy",
    "technology.story.step06.alt": "Close-up of the Talon head tube and aluminum frame",
    "disciplines.eyebrow": "Shop by discipline",
    "disciplines.title": "Find Your Ride",
    "category.ebikes": "E-Bikes",
    "category.road": "Road Bikes",
    "category.mountain": "Mountain Bikes",
    "category.womens": "Women's Bikes",
    "store.eyebrow": "Flagship store",
    "store.title": "Visit Giant Mongolia",
    "store.description": "Test ride the full range, get a professional bike fit, and keep your bike running with our certified service workshop.",
    "store.address": "Address",
    "store.hours": "Opening Hours",
    "store.phone": "Phone",
    "store.dailyHours": "Monday–Sunday: 10:00 – 20:00",
    "store.weekdays": "Mon–Fri: 10:00 – 20:00",
    "store.weekends": "Sat–Sun: 11:00 – 19:00",
    "store.directions": "Get Directions",
    "footer.stay": "Stay in the ride",
    "footer.description": "New arrivals, group rides, and service offers from Giant Mongolia.",
    "footer.shop": "Shop",
    "footer.services": "Services",
    "footer.giant": "Giant Mongolia",
    "footer.customer": "Customer",
    "footer.road": "Road",
    "footer.gear": "Gear",
    "footer.mountain": "Mountain",
    "footer.ebikes": "E-Bikes",
    "footer.gravel": "Gravel",
    "footer.city": "City",
    "footer.kids": "Kids",
    "footer.bikeFitting": "Bike Fitting",
    "footer.serviceRepair": "Service & Repair",
    "footer.testRides": "Test Rides",
    "footer.warranty": "Warranty",
    "footer.about": "About Us",
    "footer.flagship": "Flagship Store",
    "footer.groupRides": "Group Rides",
    "footer.careers": "Careers",
    "footer.contact": "Contact",
    "footer.shipping": "Shipping",
    "footer.returns": "Returns",
    "footer.faq": "FAQ",
    "footer.official": "Official Giant Bicycles retailer.",
    "newsletter.email": "Email address",
    "newsletter.placeholder": "Your email address",
    "newsletter.submit": "Subscribe",
    "newsletter.success": "Thanks for subscribing. We'll be in touch with new arrivals and rides.",
    "language.label": "Language",
    "language.english": "English",
    "language.mongolian": "Mongolian",
    "search.title": "Search bikes",
    "search.placeholder": "Search by name, category, or discipline",
    "search.close": "Close search",
    "search.disciplines": "Shop by discipline",
    "search.results": "Matching bikes",
    "search.hint": "Enter to see all matches",
    "search.empty": "No bikes match",
} as const;

const mnMessages: Record<keyof typeof enMessages, string> = {
    "nav.bikes": "Дугуй",
    "nav.gear": "Хэрэгсэл",
    "nav.technology": "Технологи",
    "nav.stores": "Дэлгүүр",
    "nav.search": "Хайх",
    "nav.cart": "Сагс",
    "nav.account": "Бүртгэл",
    "nav.openMenu": "Цэс нээх",
    "nav.closeMenu": "Цэс хаах",
    "nav.siteMenu": "Сайтын цэс",
    "nav.primary": "Үндсэн навигаци",
    "nav.menu": "Цэс",
    "nav.selectMarket": "Зах зээл сонгох",
    "nav.mongolia": "Монгол",
    "nav.global": "Giant олон улс",
    "nav.moreWays": "Унах олон сонголт",
    "nav.forWomen": "Эмэгтэйчүүдэд",
    "nav.forCity": "Хотын амьдралд",
    "nav.forFit": "Төгс тохиргоонд",
    "hero.category": "Унадаг дугуй / Гравел",
    "hero.headline.left1": "ХУРДАН",
    "hero.headline.left2": "БОЛОН",
    "hero.headline.left3": "БАТ БЭХ",
    "hero.headline.right1": "GIANT",
    "hero.headline.right2": "ТАНТАЙ",
    "hero.headline.right3": "ХАМТ",
    "hero.description": "Нарийвчлал, хурд, замын барьцад зориулан бүтээгдсэн дугуйгаар Монголыг нээгээрэй.",
    "hero.cta": "Дугуй үзэх",
    "hero.feature.design.title": "Шинэлэг загвар",
    "hero.feature.design.description":
      "Зорилготой хийц, унаачдад зориулсан нарийн шийдэл нь итгэлтэй, хөнгөн мэдрэмж төрүүлнэ.",
    "hero.feature.engineering.title": "Нарийн инженерчлэл",
    "hero.feature.engineering.description":
      "Рам болон эд анги бүрийг удирдлага, бат бөх чанар, шуурхай мэдрэмжид зориулан тохируулдаг.",
    "hero.feature.performance.title": "Тогтвортой байдал",
    "hero.feature.performance.description":
      "Нарийн сонгосон материал, удаан эдэлгээтэй хийц нь аялал бүрийг илүү үнэ цэнтэй болгоно.",
    "technology.story.eyebrow": "Giant-ийн инженерчлэл", // TODO native review
    "technology.story.heading": "Технологи ба инноваци", // TODO native review
    "technology.story.tagline": "Зургаан шийдэл. Нэг төгс уналт.", // TODO native review
    "technology.story.rail": "Технологийн түүх", // TODO native review
    "technology.story.pause": "Түр зогсоох", // TODO native review
    "technology.story.play": "Үргэлжлүүлэх", // TODO native review
    "technology.story.step01.category": "Нийлмэл материалын инженерчлэл", // TODO native review
    "technology.story.step01.title": "ADVANCED SL КАРБОН", // TODO native review
    "technology.story.step01.description": "Өөрийн үйлдвэрт нэхсэн карбон: хөнгөн, хөшүүн.", // TODO native review
    "technology.story.step01.stat": "Giant-ийн карбон", // TODO native review
    "technology.story.step01.alt": "Propel Advanced SL-ийн толгойн хоолойн ойрын зураг", // TODO native review
    "technology.story.step02.category": "Аэродинамик хийц", // TODO native review
    "technology.story.step02.title": "OVERDRIVE AERO", // TODO native review
    "technology.story.step02.description": "D хэлбэрийн гол, далд кабель — аэро үр ашиг.", // TODO native review
    "technology.story.step02.stat": "Далд кабель", // TODO native review
    "technology.story.step02.alt": "Propel-ийн урд хэсэг, далд кабелийн ойрын зураг", // TODO native review
    "technology.story.step03.category": "Тав тухын инженерчлэл", // TODO native review
    "technology.story.step03.title": "D-FUSE ТЕХНОЛОГИ", // TODO native review
    "technology.story.step03.description": "D хэлбэрийн суудал, бариул доргилт шингээнэ.", // TODO native review
    "technology.story.step03.stat": "Өдрийн турш тав тух", // TODO native review
    "technology.story.step03.alt": "D-Fuse бариул, залуурын хэсгийн ойрын зураг", // TODO native review
    "technology.story.step04.category": "Түдгэлзүүлэлтийн хийц", // TODO native review
    "technology.story.step04.title": "MAESTRO ТҮДГЭЛЗҮҮЛЭЛТ", // TODO native review
    "technology.story.step04.description": "Хөвөгч холбоос дөрөө савлуулахгүй түдгэлзүүлнэ.", // TODO native review
    "technology.story.step04.stat": "Дөрөө савлалтгүй", // TODO native review
    "technology.story.step04.alt": "Maestro цахилгаан дугуйн арын амортизаторын ойрын зураг", // TODO native review
    "technology.story.step05.category": "Цахилгаан дугуйн систем", // TODO native review
    "technology.story.step05.title": "SYNCDRIVE PRO МОТОР", // TODO native review
    "technology.story.step05.description": "Yamaha мотор, Smart Assist автомат дэмжлэг.", // TODO native review
    "technology.story.step05.stat": "85 Nm мушгих хүч", // TODO native review
    "technology.story.step05.alt": "SyncDrive Pro моторын ойрын зураг", // TODO native review
    "technology.story.step06.category": "Хөнгөн цагааны инженерчлэл", // TODO native review
    "technology.story.step06.title": "ALUXX SL ХӨНГӨН ЦАГААН", // TODO native review
    "technology.story.step06.description": "Давхар нимгэлсэн 6061 хайлш: хөнгөн, бат бөх.", // TODO native review
    "technology.story.step06.stat": "6061 хайлш", // TODO native review
    "technology.story.step06.alt": "Talon-ийн толгойн хоолой, хөнгөн цагаан рамын ойрын зураг", // TODO native review
    "disciplines.eyebrow": "Төрлөөр сонгох",
    "disciplines.title": "Өөрт тохирох дугуйгаа ол",
    "category.ebikes": "Цахилгаан дугуй",
    "category.road": "Замын дугуй",
    "category.mountain": "Уулын дугуй",
    "category.womens": "Эмэгтэй дугуй",
    "store.eyebrow": "Төв дэлгүүр",
    "store.title": "Giant Mongolia дэлгүүрт зочлох",
    "store.description": "Бүх төрлийн дугуйг туршиж, мэргэжлийн хэмжилт хийлгэн, баталгаат засварын үйлчилгээг аваарай.",
    "store.address": "Хаяг",
    "store.hours": "Ажиллах цаг",
    "store.phone": "Утас",
    "store.dailyHours": "Өдөр бүр: 10:00 – 20:00",
    "store.weekdays": "Даваа–Баасан: 10:00 – 20:00",
    "store.weekends": "Бямба–Ням: 11:00 – 19:00",
    "store.directions": "Чиглэл авах",
    "footer.stay": "Дугуйтайгаа хамт",
    "footer.description": "Шинэ загвар, хамтын аялал, үйлчилгээний мэдээллийг Giant Mongolia-аас аваарай.",
    "footer.shop": "Дугуй",
    "footer.services": "Үйлчилгээ",
    "footer.giant": "Giant Mongolia",
    "footer.customer": "Хэрэглэгч",
    "footer.road": "Замын",
    "footer.gear": "Хэрэгсэл",
    "footer.mountain": "Уулын",
    "footer.ebikes": "Цахилгаан дугуй",
    "footer.gravel": "Гравел",
    "footer.city": "Хотын",
    "footer.kids": "Хүүхдийн",
    "footer.bikeFitting": "Дугуйн тохиргоо",
    "footer.serviceRepair": "Засвар үйлчилгээ",
    "footer.testRides": "Туршилтын аялал",
    "footer.warranty": "Баталгаа",
    "footer.about": "Бидний тухай",
    "footer.flagship": "Төв дэлгүүр",
    "footer.groupRides": "Хамтын аялал",
    "footer.careers": "Ажлын байр",
    "footer.contact": "Холбоо барих",
    "footer.shipping": "Хүргэлт",
    "footer.returns": "Буцаалт",
    "footer.faq": "Түгээмэл асуулт",
    "footer.official": "Giant брэндийн албан ёсны дугуйн дэлгүүр.",
    "newsletter.email": "И-мэйл хаяг",
    "newsletter.placeholder": "И-мэйл хаягаа оруулна уу",
    "newsletter.submit": "Бүртгүүлэх",
    "newsletter.success": "Бүртгүүлсэнд баярлалаа. Шинэ загвар болон аяллын мэдээллийг хүргэх болно.",
    "language.label": "Хэл",
    "language.english": "Англи",
    "language.mongolian": "Монгол",
    "search.title": "Дугуй хайх",
    "search.placeholder": "Нэр, төрөл эсвэл ангиллаар хайх",
    "search.close": "Хайлтыг хаах",
    "search.disciplines": "Төрлөөр сонгох",
    "search.results": "Тохирох дугуй",
    "search.hint": "Бүх үр дүнг харахын тулд Enter дарна уу",
    "search.empty": "Тохирох дугуй олдсонгүй",
};

const mnText: Record<string, string> = {
    "2026 collection": "2026 оны цуглуулга",
    "Featured bikes": "Онцлох дугуйнууд",
    "View all bikes": "Бүх дугуйг үзэх",
    "Shop by discipline": "Төрлөөр сонгох",
    "Find Your Ride": "Өөрт тохирох дугуйгаа ол",
    "Engineered by Giant": "Giant-ийн инженерчлэл",
    "Technology": "Технологи",
    "Carbon, aluminum, suspension, and SyncDrive systems designed in-house and sold through Giant Mongolia.":
      "Giant Mongolia-д борлуулдаг карбон, хөнгөн цагаан, түдгэлзүүлэлт болон SyncDrive системүүдийг өөрсдөө зохион бүтээдэг.",
    "Close-up of carbon fiber weave on a Giant bicycle frame": "Giant дугуйн карбон рамыг ойроос харуулсан нь",
    "Advanced SL Carbon": "Advanced SL карбон",
    "Giant manufactures its own raw carbon, giving every frame a precise stiffness-to-weight ratio from the fiber up.":
      "Giant карбон түүхий эдээ өөрөө үйлдвэрлэдэг тул ширхэг бүрээс нь рамын хөшүүн чанар, жинг нарийн тохируулдаг.",
    "AluxX SL Aluminum": "AluxX SL хөнгөн цагаан",
    "Butted, hydroformed alloy tubing that delivers race-level performance with long-term durability.":
      "Зузааныг тохируулан гидроформдсон хайлшин хоолой нь уралдааны түвшний үзүүлэлтийг удаан эдэлгээтэй хослуулна.",
    "Maestro Suspension": "Maestro түдгэлзүүлэлт",
    "A four-bar, dual-link design that stays active under braking and efficient under power on rough terrain.":
      "Дөрвөн холбоостой хос холбоосон хийц нь бартаат замд тоормослох үед идэвхтэй, хүч дамжуулах үед үр ашигтай ажиллана.",
    "SyncDrive Motors": "SyncDrive мотор",
    "Smart Assist reads speed, cadence, and torque to deliver natural, responsive power exactly when you need it.":
      "Smart Assist хурд, дөрөөний эргэлт болон мушгих хүчийг мэдэрч, шаардлагатай үед жигд туслах хүч өгнө.",
    "Rider with a fat-tire electric bicycle in open mountain country": "Уулын задгай хөндийд өргөн дугуйтай цахилгаан унадаг дугуй унаж буй хүн",
    "Road cyclists riding together in a race": "Замын уралдаанд хамтдаа явж буй дугуйчид",
    "Mountain bikers riding a dirt trail outdoors": "Шороон жимээр уулын дугуй унаж буй хүмүүс",
    "Two women riding road bikes along an outdoor coastal road": "Гадаа замаар замын дугуй унаж буй хоёр эмэгтэй",
    "Giant gravel bicycle showcase": "Giant гравел дугуйн танилцуулга",
    "Giant gravel bicycle with drop handlebars and wide tires": "Уралдааны бариул, өргөн дугуйтай Giant гравел дугуй",
    "Advanced composite frame": "Advanced нийлмэл раман хийц",
    "Lightweight Advanced-grade composite built for fast, responsive gravel rides.":
      "Хөнгөн Advanced зэрэглэлийн нийлмэл материал нь хурдтай, мэдрэмжтэй гравел аялалд зориулагдсан.",
    "D-Fuse comfort": "D-Fuse тав тух",
    "D-Fuse components help absorb vibration across rough, all-terrain routes.":
      "D-Fuse эд анги нь бартаатай, олон төрлийн замын доргилтыг шингээхэд тусална.",
    "All-terrain control": "Бүх төрлийн замын удирдлага",
    "Confident geometry and tire clearance keep the ride composed when pavement ends.":
      "Найдвартай геометр болон дугуйн зай нь засмал зам дууссан ч тогтвортой жолоодлого өгнө.",
    "Close-up of a carbon bicycle frame": "Карбон дугуйн рамын ойрын зураг",
    "Advanced composite": "Advanced нийлмэл материал",
    "Engineered for the long way": "Алсын аялалд зориулан инженерчилсэн",
    "All bikes": "Бүх дугуй",
    "Road, mountain, gravel, city, kids, and e-bikes from Giant, ready to test ride in Ulaanbaatar.":
      "Giant-ийн замын, уулын, гравел, хотын, хүүхдийн болон цахилгаан дугуйг Улаанбаатарт туршиж үзээрэй.",
    "No bikes in this category yet. Check back soon or browse the full range.":
      "Энэ ангилалд одоогоор дугуй алга. Дараа дахин шалгах эсвэл бүх загварыг үзнэ үү.",
    "Apparel and accessories": "Хувцас болон дагалдах хэрэгсэл",
    "Gear": "Хэрэгсэл",
    "Explore Giant helmets, apparel, shoes, lights, and ride-ready accessories.":
      "Giant дуулга, хувцас, гутал, гэрэл болон аялалд хэрэгтэй дагалдах хэрэгслийг сонирхоорой.",
    "Gear for every ride": "Аялал бүрд тохирох хэрэгсэл",
    "All Gear": "Бүх хэрэгсэл",
    "Helmets": "Дуулга",
    "Apparel & Shoes": "Хувцас & гутал",
    "Lights & Electronics": "Гэрэл & электроник",
    "Bags, Pumps & Tools": "Цүнх, насос & багаж",
    "Sort": "Эрэмбэлэх",
    "Sort products": "Бүтээгдэхүүн эрэмбэлэх",
    "Price: Low to High": "Үнэ: Багаас их рүү",
    "New collection": "Шинэ цуглуулга",
    "All": "Бүгд",
    "products": "бүтээгдэхүүн",
    "Helmets, apparel, shoes, lights, and accessories": "Дуулга, хувцас, гутал, гэрэл болон дагалдах хэрэгсэл",
    "Gear categories": "Хэрэгслийн ангилал",
    "Helmets & Protection": "Дуулга & хамгаалалт",
    "Apparel & footwear": "Хувцас & гутал",
    "Lights & electronics": "Гэрэл & электроник",
    "Bags, pumps & tools": "Цүнх, насос & багаж",
    "GIANT PERFORMANCE GEAR": "GIANT ГҮЙЦЭТГЭЛИЙН ХЭРЭГСЭЛ",
    "Race-ready protection with MIPS rotational impact technology.": "MIPS эргэлтийн цохилтын хамгаалалттай, уралдаанд бэлэн дуулга.",
    "Trail-focused coverage and comfortable MIPS protection.": "Замын хамгаалалт сайтай, биед эвтэйхэн MIPS технологитой.",
    "Lightweight weather protection for wet rides and changing conditions.": "Бороотой болон цаг агаар өөрчлөгдөх үед өмсөх хөнгөн хамгаалалт.",
    "Clip-in trail shoes with a precise, easy-adjust BOA fit.": "BOA тохируулгатай, дөрөөнд түгжигддэг замын гутал.",
    "A coordinated riding kit made for comfort on long days in the saddle.": "Удаан аяллын тав тухад зориулсан хос өмсгөл.",
    "A powerful 1100-lumen front light for visibility after dark.": "Харанхуйд харагдах байдлыг сайжруулах 1100 люмен урд гэрэл.",
    "A compact rear light to help keep you visible on every ride.": "Аялал бүрд харагдах байдлыг нэмэх авсаархан арын гэрэл.",
    "A stable floor pump for reliable, precise everyday inflation.": "Өдөр тутмын найдвартай, нарийн хий шахалтад зориулсан суурин насос.",
    "A practical storage and hydration set for rides near and far.": "Ойрын болон холын аялалд хэрэгтэй цүнх, савны суурийн багц.",
    "QUICK ADD": "САГСАНД НЭМЭХ",
    "Prices and product availability are subject to change.": "Үнэ болон бүтээгдэхүүний бэлэн байдал өөрчлөгдөж болзошгүй.",
    "MIPS": "MIPS",
    "NEW": "ШИНЭ",
    "WATERPROOF": "УСНЫ ХАМГААЛАЛТТАЙ",
    "BEST SELLER": "ЭРЭЛТТЭЙ",
    "WORKSHOP PICK": "ЗАСВАРЫН ТӨВИЙН СОНГОЛТ",
    "SET": "ХОСЛОЛ",
    "One size": "Нэг хэмжээ",
    "Standard": "Стандарт",
    "Coming soon": "Удахгүй",
    "Helmets, kits, and components will live here. Until then, the 2026 bike range is ready to ride.":
      "Энд дуулга, хувцас болон эд ангиуд байрлана. Тэр хүртэл 2026 оны дугуйн цуглуулгыг үзээрэй.",
    "Shop bikes": "Дугуй үзэх",
    "Flagship": "Төв дэлгүүр",
    "Stores": "Дэлгүүрүүд",
    "Visit Giant Mongolia in Ulaanbaatar for the full range, professional fitting, and certified service.":
      "Бүх загвар, мэргэжлийн тохиргоо, баталгаат үйлчилгээг авахын тулд Улаанбаатар дахь Giant Mongolia дэлгүүрт зочлоорой.",
    "Workshop": "Засварын төв",
    "Service": "Үйлчилгээ",
    "Keep your Giant running with fitting, repairs, and warranty support from our certified technicians.":
      "Манай баталгаат мэргэжилтнүүдийн тохиргоо, засвар, баталгаат үйлчилгээгээр Giant дугуйгаа хэвийн ажиллуулаарай.",
    "Bike fitting": "Дугуйн тохиргоо",
    "A full-body fit session to set saddle height, reach, and cleat position so you ride more comfortably and efficiently.":
      "Эмээлийн өндөр, хүрэх зай болон гутлын бэхэлгээг тохируулж, илүү тухтай, үр ашигтай унах бүтэн биеийн хэмжилт.",
    "Service and repair": "Засвар үйлчилгээ",
    "From a safety check and tune-up to suspension service and wheel builds, our workshop handles Giant bikes and most other brands.":
      "Аюулгүй байдлын шалгалт, тохируулгаас эхлээд түдгэлзүүлэлтийн үйлчилгээ, дугуй угсрах хүртэл Giant болон бусад олон брэндийн дугуйг засварлана.",
    "Warranty": "Баталгаа",
    "We process Giant frame and parts warranty claims in store. Bring your bike, proof of purchase, and we will take it from there.":
      "Giant рам болон эд ангийн баталгаат хүсэлтийг дэлгүүрт хүлээн авна. Дугуй болон худалдан авалтын баримтаа авчирна уу.",
    "Visit the workshop": "Засварын төвд зочлох",
    "Giant Mongolia": "Giant Mongolia",
    "About us": "Бидний тухай",
    "Giant Mongolia is the official Giant Bicycles retailer in Ulaanbaatar, bringing world-class bikes to riders across the country.":
      "Giant Mongolia нь Улаанбаатар дахь Giant Bicycles брэндийн албан ёсны борлуулагч бөгөөд дэлхийн түвшний дугуйг Монголын дугуйчдад хүргэдэг.",
    "We stock road, mountain, gravel, city, kids, and e-bikes, plus the service workshop to keep them on the road through long winters and dusty summers.":
      "Бид замын, уулын, гравел, хотын, хүүхдийн болон цахилгаан дугуй, мөн урт өвөл, шороотой зуны турш хэвийн ашиглахад туслах засварын төвтэй.",
    "Our flagship store is built for test rides, professional bike fitting, and honest advice — whether you are commuting across the city or lining up a weekend in the hills.":
      "Манай төв дэлгүүр туршилтын аялал, мэргэжлийн дугуйн тохиргоо, үнэн зөв зөвлөгөө санал болгоно. Хот дотор зорчих эсвэл амралтын өдрөөр ууланд аялахад тань тусална.",
    "Talk to us": "Бидэнтэй холбогдох",
    "Contact": "Холбоо барих",
    "Questions about bikes, service, or a visit to the flagship store? Reach the Giant Mongolia team in Ulaanbaatar.":
      "Дугуй, үйлчилгээ эсвэл төв дэлгүүрийн талаар асуух зүйл байна уу? Улаанбаатар дахь Giant Mongolia багтай холбогдоорой.",
    "Address": "Хаяг",
    "Hours": "Ажиллах цаг",
    "Mon–Fri: 10:00 – 20:00": "Даваа–Баасан: 10:00 – 20:00",
    "Sat–Sun: 11:00 – 19:00": "Бямба–Ням: 11:00 – 19:00",
    "Phone": "Утас",
    "Email": "И-мэйл",
    "Flagship store details": "Төв дэлгүүрийн мэдээлэл",
    "This trail is a dead end": "Энэ зам мухардлаа",
    "That page is not on the map. Head home or browse the full Giant Mongolia bike range.":
      "Энэ хуудас олдсонгүй. Нүүр хуудас руу буцах эсвэл Giant Mongolia-ийн бүх дугуйг үзнэ үү.",
    "Back home": "Нүүр хуудас руу буцах",
    "Search bikes": "Дугуй хайх",
    "Search by name, category, or discipline": "Нэр, төрөл эсвэл ангиллаар хайх",
    "Close search": "Хайлтыг хаах",
    "Matching bikes": "Тохирох дугуйнууд",
    "Enter to see all matches": "Бүх үр дүнг харахын тулд Enter дарна уу",
    "No bikes match": "Тохирох дугуй олдсонгүй",
    "Search": "Хайх",
    "Bikes from the Giant Mongolia catalog that match your search.": "Таны хайлтад тохирох Giant Mongolia каталогийн дугуйнууд.",
    "Try another name, category, or discipline, or browse the full range.":
      "Өөр нэр, төрөл эсвэл ангиллаар хайх, эсвэл бүх загварыг үзнэ үү.",
    "Browse all bikes": "Бүх дугуйг үзэх",
    "Type a bike name in search, or": "Хайлтад дугуйн нэр бичих эсвэл",
    "Related bikes": "Төстэй дугуйнууд",
    "Keep exploring": "Үргэлжлүүлэн үзэх",
    "Select size": "Хэмжээг сонгох",
    "Available sizes": "Боломжит хэмжээнүүд",
    "Test ride in store": "Дэлгүүрт туршиж унах",
    "Learn more": "Дэлгэрэнгүй",
    "View bike": "Дугуй үзэх",
    "Remove {name} from wishlist": "{name} дугуйг хадгалсан жагсаалтаас хасах",
    "Save {name} to wishlist": "{name} дугуйг хадгалсан жагсаалтад нэмэх",
    "New": "ШИНЭ",
    "Best Seller": "ЭРЭЛТТЭЙ",
    "E-Bike": "Цахилгаан дугуй",
    "Kids": "Хүүхдийн",
    "Road / Aero": "Замын / Аэродинамик",
    "Road / Race": "Замын / Уралдааны",
    "Road": "Замын",
    "Mountain": "Уулын",
    "E-Bikes": "Цахилгаан дугуй",
    "Gravel": "Гравел",
    "City": "Хотын",
    "Mountain / Trail": "Уулын / Жимийн",
    "Mountain / Hardtail": "Уулын / Хатуу рамтай",
    "E-Bike / E-MTB": "Цахилгаан дугуй / Уулын",
    "Gravel / Adventure": "Гравел / Адал явдал",
    "City / Fitness": "Хотын / Фитнес",
    "Kids / Dirt": "Хүүхдийн / Шороон зам",
    "Frame": "Рам",
    "Fork": "Сэрээ",
    "Groupset": "Арааны систем",
    "Wheelset": "Дугуйн ком",
    "Weight": "Жин",
    "Suspension": "Түдгэлзүүлэлт",
    "Wheel size": "Дугуйн хэмжээ",
    "Travel": "Явдлын хэмжээ",
    "Motor": "Мотор",
    "Battery": "Батарей",
    "Range": "Явах зай",
    "Tire clearance": "Дугуйн завсар",
    "Tires": "Дугуй",
    "Brakes": "Тоормос",
    "Intended use": "Зориулалт",
    "Available sizes for {name}": "{name} дугуйн боломжит хэмжээнүүд",
    "Dark mode": "Харанхуй горим",
    "Giant Mongolia home": "Giant Mongolia нүүр хуудас",
    "Loading Giant Mongolia": "Giant Mongolia ачаалж байна",
    "Loading progress": "Ачааллын явц",
    "Loading ride...": "Дугуйг ачаалж байна...",
    "Featured bicycle 1 of 4": "Онцлох дугуй 4-өөс 1",
    "Road bikes": "Замын дугуй",
    "Mountain bikes": "Уулын дугуй",
    "E-Bikes bikes": "Цахилгаан дугуй",
    "Gravel bikes": "Гравел дугуй",
    "City bikes": "Хотын дугуй",
    "Kids bikes": "Хүүхдийн дугуй",
    "Giant road bikes available at Giant Mongolia. Speed & endurance.":
      "Giant Mongolia-д Giant-ийн замын дугуйнууд бэлэн байна. Хурд ба тэсвэр.",
    "Giant mountain bikes available at Giant Mongolia. Trail & enduro.":
      "Giant Mongolia-д Giant-ийн уулын дугуйнууд бэлэн байна. Жим ба эндуро.",
    "Giant e-bikes available at Giant Mongolia. Powered by SyncDrive.":
      "Giant Mongolia-д SyncDrive системтэй цахилгаан дугуйнууд бэлэн байна.",
    "Giant gravel bikes available at Giant Mongolia. Any road, any steppe.":
      "Giant Mongolia-д бүх зам, тал нутагт тохирох гравел дугуйнууд бэлэн байна.",
    "Giant city bikes available at Giant Mongolia. Commute & fitness.":
      "Giant Mongolia-д зорчих болон фитнесэд тохирох хотын дугуйнууд бэлэн байна.",
    "Giant kids bikes available at Giant Mongolia. First rides, big smiles.":
      "Giant Mongolia-д хүүхдийн анхны аялалд зориулсан дугуйнууд бэлэн байна.",
    "browse all bikes": "бүх дугуйг үзэх",
    "An aero road bike built to cut through wind on open steppe roads and race circuits. Lightweight Advanced-grade composite and integrated cockpit details keep you fast when the road is smooth and the pace is high.":
      "Талын нээлттэй зам болон уралдааны тойрогт салхийг зүсэн давхих аэродинамик замын дугуй. Хөнгөн Advanced зэрэглэлийн нийлмэл рам, нэгдмэл кокпит нь зам тэгш, хурд өндөр үед таныг хурдан байлгана.",
    "A compact road race bike for climbing, group rides, and all-day events. The TCR’s stiff, light chassis rewards every watt on Ulaanbaatar’s rolling roads and weekend hill repeats.":
      "Өгсүүр зам, хамтын аялал болон бүтэн өдрийн арга хэмжээнд зориулсан авсаархан уралдааны дугуй. TCR-ийн хөнгөн, хатуу рам Улаанбаатарын өгсөж уруудсан зам, амралтын өдрийн уулын давталтад хүч бүрийг үр дүнтэй дамжуулна.",
    "A versatile trail bike with Maestro suspension for Bogd Khan ridgelines and weekend park laps. Balanced geometry keeps you confident on descents without giving up the climb back to the ridge.":
      "Богд хан уулын нуруу болон амралтын өдрийн паркын тойрогт зориулсан Maestro түдгэлзүүлэлттэй олон талын жимийн дугуй. Тэнцвэртэй геометр нь уруудахдаа итгэлтэй байлгаж, өгсүүрт үр ашигтай хэвээр байна.",
    "A capable aluminum hardtail for first trail days and fitness rides around the city fringe. Wide-range gearing and a trail-ready fork make rutted tracks and fire roads feel composed.":
      "Анхны жимийн аялал болон хотын захын фитнес уналтад тохирох хөнгөн цагаан хатуу рамтай дугуй. Өргөн арааны сонголт, жимд бэлэн сэрээ нь ховилтой болон шороон замд тогтвортой байлгана.",
    "A SyncDrive-powered trail e-bike that makes longer loops and steeper climbs accessible. Smart Assist reads how you pedal so support feels natural on mixed paths around Ulaanbaatar.":
      "SyncDrive мотортой жимийн цахилгаан дугуй нь урт аялал, огцом өгсүүрийг илүү хүртээмжтэй болгоно. Smart Assist дөрөө жийх байдлыг мэдэрч, Улаанбаатарын холимог замд жигд тусална.",
    "A gravel bike for mixed pavement, dirt, and steppe tracks. Generous tire clearance and stable geometry invite all-day rides when the tarmac ends and the horizon opens.":
      "Засмал, шороон болон талын замд тохирох гравел дугуй. Өргөн дугуйн зай, тогтвортой геометр нь засмал зам дуусаж, алсын бараа нээгдэхэд бүтэн өдрийн аялалд урьж байна.",
    "A comfortable city bike for Peace Avenue commutes and evening fitness loops. Upright posture, reliable gearing, and mounts for fenders make it an everyday rider in every season.":
      "Энхтайваны өргөн чөлөөгөөр зорчих болон оройн фитнес аялалд зориулсан тухтай хотын дугуй. Цэх суулт, найдвартай араа, хамгаалалтын хаалт суурилуулах боломж нь улирал бүрийн өдөр тутмын хэрэглээнд тохирно.",
    "A 20-inch dirt jump and park bike for young riders learning manuals, pump tracks, and first trail days. Tough aluminum and a low standover keep the bike playful and easy to handle.":
      "Гараар өргөж унах, насосон зам, анхны жимийн аялал сурч буй хүүхдүүдэд зориулсан 20 инчийн паркын дугуй. Бат бөх хөнгөн цагаан рам, намхан хийц нь жолоодоход хялбар, хөгжилтэй болгоно.",
};

const messages = { en: enMessages, mn: mnMessages };

export type TranslationKey = keyof typeof enMessages;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
  translate: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "giant-mongolia-language";
let currentLanguage: Language = "en";
const listeners = new Set<() => void>();

function readLanguage(): Language {
  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === "en" || savedLanguage === "mn") {
      currentLanguage = savedLanguage;
    }
  } catch (error) {
    if (!(error instanceof DOMException) || error.name !== "SecurityError") {
      throw error;
    }
  }
  return currentLanguage;
}

function subscribeToLanguage(listener: () => void) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function updateLanguage(language: Language) {
  currentLanguage = language;
  try {
    window.localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    if (!(error instanceof DOMException) || !["SecurityError", "QuotaExceededError"].includes(error.name)) {
      throw error;
    }
  }
  listeners.forEach((listener) => listener());
}

function getServerLanguage(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribeToLanguage, readLanguage, getServerLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextValue = {
    language,
    setLanguage: updateLanguage,
    t: (key) => messages[language][key],
    translate: (text) => {
      if (language === "en") return text;
      const directTranslation = mnText[text];
      if (directTranslation) return directTranslation;
      const wishlistMatch = text.match(/^(Remove|Save) (.+) from wishlist$/) ??
        text.match(/^(Save) (.+) to wishlist$/);
      if (wishlistMatch) {
        const [, action, name] = wishlistMatch;
        return action === "Remove"
          ? `${name} дугуйг хадгалсан жагсаалтаас хасах`
          : `${name} дугуйг хадгалсан жагсаалтад нэмэх`;
      }
      if (text.startsWith("Results for “") && text.endsWith("”")) {
        return `“${text.slice(13, -1)}” гэсэн хайлтын үр дүн`;
      }
      if (text.startsWith("No bikes match “") && text.endsWith("”")) {
        return `“${text.slice(16, -1)}” хайлтад тохирох дугуй олдсонгүй`;
      }
      if (text.startsWith("Available sizes for ")) {
        return `${text.slice("Available sizes for ".length)} дугуйн боломжит хэмжээнүүд`;
      }
      const moreBikesMatch = text.match(/^More (.+) bikes$/);
      if (moreBikesMatch) {
        const discipline = mnText[moreBikesMatch[1]] ?? moreBikesMatch[1];
        if (discipline === "Цахилгаан дугуй") {
          return "Илүү олон төрлийн цахилгаан дугуй";
        }
        return `Илүү олон ${discipline} дугуй`;
      }
      return text;
    },
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
