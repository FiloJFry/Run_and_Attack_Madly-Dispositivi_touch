const Quadrupletta = new Arma("Quadrupletta",28000,10,1,3000,400,false,"[####]",["BAM", "KSH", "CRRLCK"],
    ["Fucile automatico", 2000, 52, 0.25, 12, 91, 460, true, "Bum!"],
    ["Fuochi d'artificio", 20000, 18, 0.5, 3, 1800, 640, false, "FWSH"]);
const DoppiaPistolaDaClown = new Arma("Doppia pistola da clown",17000,12,2,300,150,false,"@ @",["D-bsh!", "crrt", "f-flump"],
    ["Torta in faccia", 14000, 26, 2, 2, 1600, 256, false, "Splch!"],
    ["Falso allarme", 500, 67, 0.1, 30, 85, 1000, true, "Ahah!"]);
const SpargiSchegge = new Arma("Spargischegge",10000,25,4,1000,550,false,"|***|",["splsh!", "fr-ln", "fr-ln"],
    ["Bomba", 8000, 70, 2, 3, 1500, 712, false, "BOOM!"],
    ["Superschegge", 450, 63, 0.2, 40, 80, 900, true, "tzn"]);
const LanciafiammeTriforcuto = new Arma("Lanciafiamme triforcuto",5500,20,5,1,800,true,"^ ^ ^",["FFFSH", "", "blblblbl..."],
    ["Palla di fuoco", 3250, 73, 2.5, 6, 95, 630, true, "Fum!"],
    ["Ventata infuocata", 15200, 150, 20, 1, 2000, 2500, false, "Fvsh!"]);
const DistributoreDiPalline = new Arma("Distributore di palline",225,78,50,40,950,true,"I<br/>==O==<br/>I",["Boing!", "tk", "CRT-CRT-CRT"],
    ["Megadistruzione", 7425, 124, 50, 3, 1600, 530, false, "BOOING"],
    ["Cascataclisma", 8750, 35, 25, 5, 800, 840, false, "Br-bng!"]);
const Sparaossa = new Arma("Sparaossa",100,88,80,75,680,true,"I<br/>--X--<br/>I",["tln", "tsh!", "frrlll!"],
    ["Sparateschi", 270, 80, 2, 60, 85, 590, true, "t-tsh"],
    ["Soffiaossa", 75, 70, 0.5, 150, 50, 820, true, "t-fsh"]);
const FriggitriceDAssalto = new Arma("Friggitrice da assalto",324,64,30,56,810,true,"I<br/>~~(#)~~<br/>I",["tsn", "ffssh", "zzz"],
    ["Getto acido", 7800, 27, 15, 5, 1800, 610, false, "FHHHSH"],
    ["Supergoccia d'olio", 2800, 130, 10, 10, 850, 1320, false, "Fsssh"]);
const LanciaMiniRazzi = new Arma("Lanciaminirazzi",384,92,16,120,1000,true,"‼<br/>≡≡Ø≡≡<br/>‼",["vsh!", "c-clck", "c-clck"],
    ["Lanciarazzi", 8200, 160, 40, 4, 2000, 1800, false, "F-VSH!"],
    ["Lanciatestate", 25000, 200, 80, 1, 6000, 220, false, "KRA-BOOM!!!"]);
const GeneratoreDaBattaglia = new Arma("Generatore da battaglia",2050,145,8,1200,3000,false,"/ <br/>-·-<br/> /",["BZ", "bng", "clk-c-clk"],
    ["Taser", 4800, 15, 2, 8, 1400, 4000, false, "Trrrzn!"],
    ["Elettrizzatore", 350, 81, 0.1, 80, 1, 2200, true, "ZZZ"]);
const LanciaGranateDiPrecisione = new Arma("Lanciagranate di precisione",3840,128,5,1600,875,false,"|<br/>= ᴓ =<br/>|",["fln-BOOM", "k-cluk", "k-cluk"],
    ["Grappolo di granate", 13500, 101, 5, 3, 5000, 320, false, "fr-fln-BROBOBOOM!!!"],
    ["Granata infuocata", 5000, 140, 1.5, 9, 145, 500, true, "Fvsh-BVHHH!"]);
const ManoAPistola = new Arma("Mano a pistola",800,165,10,500,Infinity,false,"ɵ",["Pium!", "mmmh...", "gnam!"],
    ["Fucile a pompa", 3500, 20, 1, 15, 800, Infinity, false, "Pum!"],
    ["Mitragliatrice", 180, 95, 0.12, 210, 65, Infinity, true, "pam"]);
const CannoneDiCarroArmato = new Arma("Cannone di carro armato",11800,152,1,2500,2000,false,"||<br/>≡≡O≡≡<br/>||",["POM", "B-DSH", "C-DSH"],
    ["Polvere rovente", 1000, 15, 0.25, 40, 1, 260, true, "ssss"],
    ["Ciminiera tossica", 735, 46, 0.2, 50, 1, 310, true, "ffff"]);
const SchiaffoTermico = new Mischia("Schiaffo termico",50000,5,"▒▒",["BISHZ!"]);
const GelatoSciolto = new Mischia("Gelato sciolto",48000,6,"##",["splch!"]);
const BorsaTarocca = new Mischia("Borsa tarocca",43000,7,"$$",["dsh!"]);
const CinturaDragone = new Mischia("Cintura dragone",35000,10,"[#]",["U-DSH"]);
const Armi = [Quadrupletta, DoppiaPistolaDaClown, SpargiSchegge, LanciafiammeTriforcuto, DistributoreDiPalline, Sparaossa, FriggitriceDAssalto, LanciaMiniRazzi, GeneratoreDaBattaglia, LanciaGranateDiPrecisione, ManoAPistola, CannoneDiCarroArmato];
const Mischie = [SchiaffoTermico, GelatoSciolto, BorsaTarocca, CinturaDragone];
const MetalSkeletonCowBoy = new Nemico("Metal skeleton cowboy","● ●","gray",["Non c'è spazio per tutt'e due in questo campo", "Y-HAH!", "Se solo fossi stato un pistolero più abile..."]);
const IlRobotDelCartoneAnni80 = new Nemico("Il Robot del cartone anni 80","<●>","red",["*spara un colpo energetico dall'occhio*", "*ti osserva cadere a terra*", "*non fa nulla*"]);
const CartellonePubblicitarioConLeGambe = new Nemico("Cartellone pubblicitario con le gambe","^$^","green",["ACQUISTA!", "ACQUISTA!", "ACQUISTA!"]);
const PaperaCavalcaPappardelle = new Nemico("Papera cavalcapappardelle","███","yellow",["Ti va un po' di...PASTA?", "Muah-quaqua-quaqua-qua-qua!", "Zzz..."]);
const Nemici = [MetalSkeletonCowBoy, IlRobotDelCartoneAnni80, CartellonePubblicitarioConLeGambe, PaperaCavalcaPappardelle];
let ShotgunEquipaggiato = new Arma("",0,0,0,0,0,undefined,"",[],[],[]);
let AssaltoEquipaggiato = new Arma("",0,0,0,0,0,undefined,"",[],[],[]);
let CecchinoEquipaggiato = new Arma("",0,0,0,0,0,undefined,"",[],[],[]);
let MischiaEquipaggiata = new Mischia();
const Protagonista = new Personaggio();
let NemicoScelto = new Nemico();
let difficoltà = 0;
