import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";


dotenv.config();

const dummyProducts = [
  // MOBILE (15 items)
  { title: "Samsung Galaxy S24 Ultra", description: "Flagship Samsung phone with AI features and S-Pen.", price: 1299, thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80", category: "mobile" },
  { title: "iPhone 15 Pro Max", description: "Apple's best iPhone with Titanium body.", price: 1199, thumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80", category: "mobile" },

  { title: "Xiaomi 14 Pro", description: "Leica optics and blazing fast charging.", price: 899, thumbnail: "https://specials-images.forbesimg.com/imageserve/65cead7b8295afb07b70cab4/960x0.jpg", category: "mobile" },
  { title: "Sony Xperia 1 V", description: "Professional grade camera on a phone.", price: 1199, thumbnail: "https://images.unsplash.com/photo-1549439602-43ebca2327af?w=500&q=80", category: "mobile" },
  { title: "Asus ROG Phone 8", description: "Ultimate gaming phone with cooling.", price: 999, thumbnail: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500&q=80", category: "mobile" },
  { title: "Motorola Edge 50 Ultra", description: "Beautiful curved display and fast charging.", price: 749, thumbnail: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500&q=80", category: "mobile" },
  { title: "Nothing Phone (2)", description: "Glyph interface and transparent design.", price: 599, thumbnail: "https://images.unsplash.com/photo-1677442135136-760c813028c0?w=500&q=80", category: "mobile" },
  { title: "Samsung Galaxy Z Fold 5", description: "Premium foldable productivity machine.", price: 1799, thumbnail: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500&q=80", category: "mobile" },

  { title: "iPhone 15", description: "Dynamic island and great everyday performance.", price: 799, thumbnail: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80", category: "mobile" },

  { title: "Poco F5 Pro", description: "Flagship killer with massive performance.", price: 450, thumbnail: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500&q=80", category: "mobile" },
  { title: "Vivo X100 Pro", description: "Zeiss lenses for incredible photography.", price: 950, thumbnail: "https://images.unsplash.com/photo-1533228100845-08145b01de14?w=500&q=80", category: "mobile" },

  // TV (15 items)
  { title: "Sony Bravia XR 65-Inch OLED", description: "Flagship 4K OLED with incredible colors.", price: 2199, thumbnail: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80", category: "tv" },
  { title: "Samsung 55-Inch Neo QLED", description: "Super bright mini-LED 4K TV.", price: 1499, thumbnail: "https://images.unsplash.com/photo-1558888401-3cc1de77652d?w=500&q=80", category: "tv" },
  { title: "LG C3 65-Inch OLED", description: "Perfect black levels and amazing gaming features.", price: 1899, thumbnail: "https://images.unsplash.com/photo-1552831388-6a0b3575b32a?w=500&q=80", category: "tv" },
  { title: "TCL 6-Series 55-Inch", description: "Best value mini-LED gaming TV.", price: 699, thumbnail: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80", category: "tv" },
  { title: "Hisense U8K 65-Inch", description: "Bright HDR and excellent contrast.", price: 1099, thumbnail: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&q=80", category: "tv" },

  { title: "LG G3 77-Inch Gallery Edition", description: "Ultra bright OLED for premium home theaters.", price: 3499, thumbnail: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=500&q=80", category: "tv" },
  { title: "Sony A95L QD-OLED 65-Inch", description: "The pinnacle of TV picture quality.", price: 3299, thumbnail: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=500&q=80", category: "tv" },
  { title: "Vizio Quantum Pro 65-Inch", description: "Great colors for a mid-range price.", price: 899, thumbnail: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80", category: "tv" },
  { title: "Panasonic MZ2000 55-Inch", description: "Hollywood-tuned OLED panel.", price: 1999, thumbnail: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=500&q=80", category: "tv" },
  { title: "Samsung 85-Inch 8K QLED", description: "Massive 8K resolution display.", price: 4999, thumbnail: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=500&q=80", category: "tv" },
  { title: "LG QNED 75-Inch", description: "Vibrant colors for bright rooms.", price: 1599, thumbnail: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80", category: "tv" },
  { title: "TCL 4-Series 43-Inch", description: "Affordable 4K smart TV for small rooms.", price: 259, thumbnail: "https://images.unsplash.com/photo-1505322022379-7c3353ee6291?w=500&q=80", category: "tv" },
  { title: "Hisense A6 Series 50-Inch", description: "Google TV with Dolby Vision.", price: 349, thumbnail: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=500&q=80", category: "tv" },
  { title: "Sony Bravia X90L 55-Inch", description: "Excellent full-array LED TV.", price: 1199, thumbnail: "https://images.unsplash.com/photo-1585807530663-1d0de172eb96?w=500&q=80", category: "tv" },

  // REFRIGERATOR (15 items)
  { title: "LG InstaView Door-in-Door", description: "Knock twice to see what's inside.", price: 2199, thumbnail: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&q=80", category: "refrigerator" },
  { title: "Samsung Bespoke 4-Door", description: "Customizable color panels and beverage center.", price: 2499, thumbnail: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&q=80", category: "refrigerator" },
  { title: "Whirlpool French Door", description: "25 cu. ft. with external water dispenser.", price: 1599, thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80", category: "refrigerator" },
  { title: "GE Profile Smart Refrigerator", description: "Built-in Keurig K-Cup brewing system.", price: 2799, thumbnail: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&q=80", category: "refrigerator" },
  { title: "Frigidaire Gallery Side-by-Side", description: "Smudge-proof stainless steel.", price: 1299, thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80", category: "refrigerator" },
  { title: "Bosch 800 Series French Door", description: "Dual compressors and FarmFresh system.", price: 3299, thumbnail: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=500&q=80", category: "refrigerator" },
  { title: "KitchenAid PrintShield French Door", description: "Premium interior with wood accents.", price: 3499, thumbnail: "https://images.unsplash.com/photo-1606822159891-bde1758e578c?w=500&q=80", category: "refrigerator" },
  { title: "Haier Quad French Door", description: "Compact design for urban living.", price: 999, thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80", category: "refrigerator" },
  { title: "Samsung Family Hub Refrigerator", description: "Smart fridge with a touchscreen.", price: 2999, thumbnail: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80", category: "refrigerator" },
  { title: "Hisense Bottom Mount Fridge", description: "Sleek and energy efficient.", price: 699, thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80", category: "refrigerator" },
  { title: "Café Smart French Door", description: "Customizable hardware options.", price: 3899, thumbnail: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&q=80", category: "refrigerator" },
  { title: "Fisher & Paykel ActiveSmart", description: "Sleek flat-door design.", price: 2499, thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=80", category: "refrigerator" },

  // LAPTOP (15 items)
  { title: "Apple MacBook Pro 16 M3 Max", description: "Ultimate performance for creative pros.", price: 3499, thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", category: "laptop" },
  { title: "Dell XPS 15", description: "Premium infinity edge display and powerful internals.", price: 1899, thumbnail: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80", category: "laptop" },
  { title: "Lenovo ThinkPad X1 Carbon Gen 11", description: "The gold standard for business laptops.", price: 1699, thumbnail: "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=500&q=80", category: "laptop" },
  { title: "Asus ROG Zephyrus G14", description: "Compact and incredibly powerful gaming laptop.", price: 1499, thumbnail: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80", category: "laptop" },
  { title: "Apple MacBook Air M2", description: "Thin, light, and fanless.", price: 1099, thumbnail: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80", category: "laptop" },

  { title: "Microsoft Surface Laptop 5", description: "Clean Alcantara design by Microsoft.", price: 999, thumbnail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80", category: "laptop" },
  { title: "Acer Swift 3", description: "Excellent budget thin and light.", price: 649, thumbnail: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80", category: "laptop" },
  { title: "Alienware m18", description: "Desktop replacement gaming behemoth.", price: 2999, thumbnail: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500&q=80", category: "laptop" },
  { title: "LG Gram 17", description: "Incredibly light for a 17-inch display.", price: 1599, thumbnail: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80", category: "laptop" },
  { title: "Lenovo Legion Pro 7i", description: "Esports ready gaming rig.", price: 1999, thumbnail: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?w=500&q=80", category: "laptop" },
  { title: "HP Envy 16", description: "Creator-focused multimedia laptop.", price: 1299, thumbnail: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80", category: "laptop" },
  { title: "Asus Zenbook Duo", description: "Dual screen laptop for maximum productivity.", price: 1499, thumbnail: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=500&q=80", category: "laptop" },
  { title: "Dell Inspiron 14", description: "Reliable every day student laptop.", price: 599, thumbnail: "https://images.unsplash.com/photo-1544390060-645eff2df584?w=500&q=80", category: "laptop" },

  // WASHING MACHINE (15 items)
  { title: "LG 8.0 Kg Front Load", description: "AI DD technology with steam wash.", price: 499, thumbnail: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80", category: "washing machine" },
  { title: "Samsung 7.5 Kg Top Load", description: "Eco bubble tech for a gentle wash.", price: 349, thumbnail: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=500&q=80", category: "washing machine" },
  { title: "Bosch Serie 6 Front Load", description: "Anti-tangle, anti-vibration design.", price: 549, thumbnail: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80", category: "washing machine" },
  { title: "Whirlpool 7.0 Kg Top Load", description: "Hard water wash capable.", price: 299, thumbnail: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&q=80", category: "washing machine" },
  { title: "IFB 8.5 Kg Front Load", description: "Aqua energy feature for better detergent action.", price: 599, thumbnail: "https://images.unsplash.com/photo-1580584126903-c17d41830450?w=500&q=80", category: "washing machine" },

  { title: "LG WashTower", description: "Stacked washer and dryer unit.", price: 1899, thumbnail: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500&q=80", category: "washing machine" },
  { title: "Samsung Bespoke Washer", description: "AI Wash with auto dispenser.", price: 1199, thumbnail: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=500&q=80", category: "washing machine" },
  { title: "Electrolux Perfect Steam", description: "StainTreat II option for stubborn spots.", price: 999, thumbnail: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&q=80", category: "washing machine" },

  { title: "Maytag Commercial Grade", description: "Built to last heavy-duty washing machine.", price: 1099, thumbnail: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80", category: "washing machine" },

  // AIR CONDITIONER (15 items)
  { title: "Daikin 1.5 Ton Inverter AC", description: "Split AC with Coanda Airflow.", price: 699, thumbnail: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=500&q=80", category: "air conditioner" },
  { title: "LG 1.5 Ton Dual Inverter", description: "Super convertible 6-in-1 cooling.", price: 649, thumbnail: "https://images.pexels.com/photos/4489735/pexels-photo-4489735.jpeg?w=500", category: "air conditioner" },
  { title: "Voltas 1.0 Ton Split AC", description: "Adjustable cooling levels and HD filter.", price: 399, thumbnail: "https://images.unsplash.com/photo-1585253818366-03c004dcdd5b?w=500&q=80", category: "air conditioner" },
  { title: "Panasonic 1.5 Ton Wi-Fi AC", description: "MirAIe enabled smart AC.", price: 689, thumbnail: "https://images.pexels.com/photos/3935350/pexels-photo-3935350.jpeg?w=500", category: "air conditioner" },
  { title: "Blue Star 1.5 Ton 5 Star", description: "Turbo cool with eco-friendly refrigerant.", price: 729, thumbnail: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=500&q=80", category: "air conditioner" },
  { title: "Hitachi 1.5 Ton Expandable AC", description: "Ice clean technology.", price: 749, thumbnail: "https://images.unsplash.com/photo-1585253818366-03c004dcdd5b?w=500&q=80", category: "air conditioner" },
  { title: "Samsung 1 Ton WindFree", description: "Draft-free cooling technology.", price: 549, thumbnail: "https://images.unsplash.com/photo-1556909212-d5b604d03596?w=500&q=80", category: "air conditioner" },
  { title: "Carrier 1.5 Ton Flexicool", description: "Adjustable 4-in-1 hybrid cooling.", price: 619, thumbnail: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=500&q=80", category: "air conditioner" },
  { title: "Lloyd 1.5 Ton Window AC", description: "Clean air filter and strong copper coils.", price: 349, thumbnail: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=500&q=80", category: "air conditioner" },
  { title: "Mitsubishi Heavy 1.5 Ton", description: "Heavy duty performance and long life.", price: 799, thumbnail: "https://images.unsplash.com/photo-1585253818366-03c004dcdd5b?w=500&q=80", category: "air conditioner" },
  { title: "Godrej 1 Ton Inverter AC", description: "Anti-corrosive blue fins.", price: 389, thumbnail: "https://images.unsplash.com/photo-1510525039572-9db8a716c5b9?w=500&q=80", category: "air conditioner" },
  { title: "Haier 1.5 Ton CleanCool", description: "Self-cleaning feature frost wash.", price: 499, thumbnail: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=500&q=80", category: "air conditioner" },
  { title: "Whirlpool 1.5 Ton Supreme", description: "6th sense Intellicool tech.", price: 549, thumbnail: "https://images.unsplash.com/photo-1556909212-d5b604d03596?w=500&q=80", category: "air conditioner" },
  { title: "LG 2.0 Ton Dual Inverter", description: "For very large rooms.", price: 899, thumbnail: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=500&q=80", category: "air conditioner" },
  { title: "Midea 1 Ton Portable AC", description: "Cooling on the go everywhere.", price: 399, thumbnail: "https://images.unsplash.com/photo-1585253818366-03c004dcdd5b?w=500&q=80", category: "air conditioner" },

  // HEADPHONES (15 items)
  { title: "Sony WH-1000XM5", description: "Industry leading noise cancelling headphones.", price: 349, thumbnail: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80", category: "headphones" },
  { title: "Apple AirPods Max", description: "High-fidelity audio and spatial sound.", price: 549, thumbnail: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&q=80", category: "headphones" },
  { title: "Bose QuietComfort Ultra", description: "Legendary ANC with immersive spatial audio.", price: 429, thumbnail: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80", category: "headphones" },
  { title: "Sennheiser Momentum 4", description: "60-hour battery life and audiophile sound.", price: 379, thumbnail: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80", category: "headphones" },
  { title: "Beats Studio Pro", description: "Lossless audio via USB-C and iconic design.", price: 349, thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", category: "headphones" },
  { title: "Bowers & Wilkins Px8", description: "Luxurious build and stunning audio clarity.", price: 699, thumbnail: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=500&q=80", category: "headphones" },
  { title: "Shure AONIC 50", description: "Studio-quality wireless sound.", price: 299, thumbnail: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=500&q=80", category: "headphones" },
  { title: "Jabra Elite 85h", description: "Smart active noise cancellation.", price: 199, thumbnail: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", category: "headphones" },
  { title: "Soundcore Space Q45", description: "Incredible value ANC headphones.", price: 149, thumbnail: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80", category: "headphones" },

  { title: "Focal Bathys", description: "Hi-Fi wireless headphones for purists.", price: 799, thumbnail: "https://images.unsplash.com/photo-1585298723682-7115561c51b7?w=500&q=80", category: "headphones" },
  { title: "Sony WH-CH720N", description: "Lightweight and affordable ANC.", price: 129, thumbnail: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80", category: "headphones" },
  { title: "Skullcandy Crusher ANC 2", description: "Adjustable sensory bass.", price: 229, thumbnail: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80", category: "headphones" },
  { title: "Bang & Olufsen Beoplay H95", description: "Exquisite craftsmanship and sound.", price: 899, thumbnail: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=500&q=80", category: "headphones" },
  { title: "JBL Tour One M2", description: "True adaptive noise cancelling.", price: 299, thumbnail: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80", category: "headphones" },

  // SMARTWATCH (15 items)
  { title: "Apple Watch Series 9", description: "Double tap gesture and brighter display.", price: 399, thumbnail: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=500&q=80", category: "smartwatch" },
  { title: "Samsung Galaxy Watch 6 Classic", description: "Returning physical rotating bezel.", price: 399, thumbnail: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80", category: "smartwatch" },
  { title: "Garmin Fenix 7 Pro", description: "Ultimate multisport GPS smartwatch.", price: 799, thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", category: "smartwatch" },
  { title: "Apple Watch Ultra 2", description: "Rugged and capable watch for adventurers.", price: 799, thumbnail: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=500&q=80", category: "smartwatch" },
  { title: "Google Pixel Watch 2", description: "Refined design with Fitbit health tracking.", price: 349, thumbnail: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80", category: "smartwatch" },
  { title: "Garmin Venu 3", description: "Amoled display and built-in speaker/mic.", price: 449, thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", category: "smartwatch" },
  { title: "Samsung Galaxy Watch 6", description: "Slim profile and great sleep tracking.", price: 299, thumbnail: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80", category: "smartwatch" },
  { title: "Amazfit GTR 4", description: "Long battery life and accurate GPS.", price: 199, thumbnail: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80", category: "smartwatch" },
  { title: "Fitbit Sense 2", description: "Advanced health and stress management.", price: 249, thumbnail: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80", category: "smartwatch" },
  { title: "Apple Watch SE (2nd Gen)", description: "Best value Apple Watch.", price: 249, thumbnail: "https://images.unsplash.com/photo-1434493789847-2f02b0c1e878?w=500&q=80", category: "smartwatch" },
  { title: "Garmin Forerunner 265", description: "Brilliant Amoled running watch.", price: 449, thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", category: "smartwatch" },
  { title: "Huawei Watch GT 4", description: "Stylish design with up to 14 days battery.", price: 249, thumbnail: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80", category: "smartwatch" },
  { title: "Withings ScanWatch 2", description: "Hybrid smartwatch with medical-grade ECG.", price: 349, thumbnail: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80", category: "smartwatch" },
  { title: "TicWatch Pro 5", description: "Wear OS with ultra-low power secondary display.", price: 349, thumbnail: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80", category: "smartwatch" },
  { title: "Fossil Gen 6 Wellness Edition", description: "Classic fashion meets smart technology.", price: 299, thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", category: "smartwatch" }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB, clearing existing products...");
    await Product.deleteMany({});
    console.log("Inserting manually curated dummy products...");
    await Product.insertMany(dummyProducts);
    console.log("Products seeded successfully.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });
