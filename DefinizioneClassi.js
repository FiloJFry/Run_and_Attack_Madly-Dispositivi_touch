let direzione;
let spazio;
class Nemico
{
    constructor(nome,attacco,coloreAttacco,Frasi)
    {
        this._nome = nome;
        this._velocità = 0;
        this._vita = 0;
        this._maxvita = 0;
        this._attacco = attacco;
        this._coloreAttacco = coloreAttacco;
        this._Frasi = Frasi
    }
    get nome()
    {
        return this._nome;
    }
    get vita()
    {
        return this._vita;
    }
    set vita(life)
    {
        this._vita = life;
    }
    set velocità(boost)
    {
        this._velocità = boost;
    }
    get velocità()
    {
        return this._velocità;
    }
    set maxvita(lifelife)
    {
        this._maxvita = lifelife;
    }
    get maxvita()
    {
        return this._maxvita;
    }
    set attacco(at)
    {
        this._attacco = at;
    }
    get attacco()
    {
        return this._attacco;
    }
    set coloreAttacco(cat)
    {
        this._coloreAttacco = cat;
    }
    get coloreAttacco()
    {
        return this._coloreAttacco;
    }
    set Frasi(voiceline)
    {
        this._Frasi = voiceline;
    }
    get Frasi()
    {
        return this._Frasi;
    }
    Attacco()
    {   
        setTimeout(() => {
        if(distanzaAG > 0 && !InPausa)
        {
            distanzaAG = distanzaAG - 1;
            AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,1)})`;
            return this.Attacco();
        }
        else if(distanzaAG <= 0)
        {   
            Colpito();
            AllAttacco = false;
            return;
        }
        else
        {   
            document.removeEventListener("Riprendi",this.Attacco.bind(this),{once: true,});
            document.addEventListener("Riprendi",this.Attacco.bind(this),{once: true,});
        }},1000/this.velocità);
    }
    AltAttacco()
    {   
        AltAttacco = true;
        Boss.setAttribute('src',`./Immagini/Nemici/${this.nome}_attaccando.jpg`);
        FrasiNemico.textContent = `${this.Frasi[0]}`;
        document.querySelector('body').classList.add("Sfondone");
        SalvezzInfo.innerHTML = "Infliggi danni entro<br/>o schiva fra"
        Countdown.textContent = 8;
        let nds = 80;
        conto = setInterval(() => {if(!InPausa){nds--; if(nds%10 == 0 && nds > 0){Countdown.textContent = nds/10;} else if(nds == 0){clearInterval(conto);}}},100);
        Sfondo.addEventListener('animationend',SuperColpito.bind(event));
    }
    AllAttacco()
    {   
        Boss.setAttribute('src',`./Immagini/Nemici/${this.nome}_attaccando.jpg`);
        FrasiNemico.textContent = `${this.Frasi[0]}`;
        AttaccoNemico.style.color = this.coloreAttacco;
        let t = 0;
        let dice = setInterval(() => {if(!InPausa){t += 100; if(t >= 1000){Boss.setAttribute('src',`./Immagini/Nemici/${this.nome}.jpg`); if(Giocando){FrasiNemico.textContent = "";} clearInterval(dice)}}},100);
        AllAttacco = true;
        this.Attacco();
    }
    AggiornaPosizione()
    {   
        setTimeout(() => {
        if(spazio > 0 && InMoto && posA >= 0 && posA <= 200 && !InPausa)
        {
        if(direzione && posA > 0)
        {
            posA -= 1;
            if(posA < posG)
            {
                distanza = distanza + 1;
            }
            else
            {
                distanza = distanza - 1;
            }
        }
        else if(!direzione && posA < 200)
        {
            posA += 1;
            if(posA > posG)
            {
                distanza = distanza + 1;
            }
            else
            {
                distanza = distanza - 1;
            }
        }
        if((direzione && posA == 0) || (!direzione && posA == 200))
        {   
            InMoto = false;
            return;
        }
        else
        {
        spazio -= 1;
        Boss.style.transform = `scale(${10/Math.max(distanza,10)})`; 
        if(!AllAttacco)
        {
            distanzaAG = distanza;   
        }
        AggiornaMirino();
        return this.AggiornaPosizione();
        }
        }
        else if(spazio == 0)
        {
            InMoto = false;
            return;
        }
        else
        {   
            document.removeEventListener("Riprendi",this.AggiornaPosizione.bind(this),{once: true,});
            document.addEventListener("Riprendi",this.AggiornaPosizione.bind(this),{once: true,});
        }},1000/this.velocità);
    }
    Moto()
    {   
        direzione = Math.random() < 0.5;
        spazio = Math.floor(Math.random()*200);
        InMoto = true;
        this.AggiornaPosizione();
    }

}
class Mischia
{   
    constructor(nome,danni,portata,mirino,Rumori)
    {
        this._nome = nome;
        this._danni = danni;
        this._portata = portata;
        this._mirino = mirino;
        this._Rumori = Rumori;
        this._munizioni = 1;
    }
    set nome(name)
    {   
        this._nome = name;
    }
    get nome()
    {
        return this._nome;
    }
    set danni(danni)
    {
        this._danni = danni;
    }
    get danni()
    {
        return this._danni;
    }
    set portata(portata)
    {
        this._portata = portata;
    }
    get portata()
    {
        return this._portata;
    }
    set munizioni(ammo)
    {
        this._munizioni = ammo;
    }
    get munizioni()
    {
        return this._munizioni;
    }
    set mirino(testo)
    {
        this._mirino = testo;
    }
    get mirino()
    {
        return this._mirino;
    }
    set Rumori(suoni)
    {
        this._Rumori = suoni; 
    }
    get Rumori()
    {
        return this._Rumori;
    }
    Fuoco()
    {   
        Colpo = true;
        if(this.munizioni == 1)
        {   
            ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}_attaccando.jpg`);
            this.munizioni = 0;
            if(Preso(this))
            {
                ShotgunEquipaggiato.inventario += 3*ShotgunEquipaggiato.maxmunizioni;
                AssaltoEquipaggiato.inventario += 3*AssaltoEquipaggiato.maxmunizioni;
                CecchinoEquipaggiato.inventario += 3*CecchinoEquipaggiato.maxmunizioni;
            }
            setTimeout(() => {ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}.jpg`);},100);
        }
        else
        {   
            PBMischia.style.backgroundColor = 'red';
            setTimeout(() => {if(Giocando){PBMischia.style.backgroundColor = 'white';}},1000);
        }
        this.Ricarica();
    }
    Arresta()
    {
        Colpo = false;
    }
    Ricarica()
    {   
        BarraMischia.classList.add('BarraInCarica');
        BarraMischia.addEventListener('animationend',() => {this.munizioni = 1; BarraMischia.classList.remove('BarraInCarica');},{once: true,});
    }
}
class Arma extends Mischia
{   
 constructor(nome,danni,portata,munizioni,rateo,velocità,altorateo,mirino,Rumori,Mod1,Mod2)
    {   
        super(nome,danni,portata,mirino,Rumori);
        this._munizioni = munizioni;
        this._maxmunizioni = munizioni;
        this._inventario = 4*munizioni;
        this._rateo = rateo;
        this._altorateo = altorateo;
        this._velocità = velocità;
        this._Estensione = new Estensione(Mod1,Mod2,0);
    }
    set inventario(ammo)
    {
        this._inventario = ammo;
    }
    get inventario()
    {
        return this._inventario;
    }
    set rateo(rateo)
    {
        this._rateo = rateo;
    }
    get rateo()
    {
        return this._rateo;
    }
    set altorateo(altorateo)
    {
        this._altorateo = altorateo;
    }
    get altorateo()
    {
        return this._altorateo;
    }
    set velocità(v)
    {
        this._velocità = v;
    }
    get velocità()
    {
        return this._velocità;
    }
    set maxmunizioni(riferimento)
    {
        this._maxmunizioni = riferimento;
    }
    get maxmunizioni()
    {
        return this._maxmunizioni;
    }
    set Estensione(E)
    {
        this._Estensione = E;
    }
    get Estensione()
    {
        return this._Estensione;
    }
    Fuoco()
    {
        this.Spara();
        Colpo = true;
        if(this.altorateo)
        {   
            Spara = setInterval(() => {this.Spara();},ArmaPresa.rateo + 20);
        }
        else if(risparo)
        {   
            risparo = false;
            let cont = 0;
            gap = setInterval(() => {if(!InPausa){cont += 100; if(cont >= this.rateo + 100){clearInterval(gap); risparo = true;}}},100);
        }
    }
    Arresta()
    {
        Colpo = false;
        if(this.altorateo)
        {
            if(Spara != undefined)
            {
                clearInterval(Spara);
                Spara = undefined;
            }
        }
    }
    Spara()
    {    
        if(this.munizioni > 0)
        { 
            ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}_attaccando.jpg`);
            this.munizioni--;
            PiuInfo.textContent = `${this.munizioni}|${this.inventario}`;
            RumoriArma.textContent = `${this.Rumori[0]}`; 
            setTimeout(() => {if(Preso(this) && this.Estensione.carica < this.Estensione.maxcarico)
            {
                this.Estensione.carica++;
                this.Estensione.cariche = this.Estensione.carica/this.Estensione.step;
                BarraEstensione.style.width = `${0.25 + 20*this.Estensione.carica/this.Estensione.maxcarico}vw`;
            };},1000*distanza/this.velocità);
            setTimeout(() => {ArmaInCanna.setAttribute('src',`./Immagini/Armi/${this.nome}.jpg`); RumoriArma.textContent = "";},20);
        }
        else
        {   
            PiuInfo.style.color = 'red';
            setTimeout(() => {if(Giocando){PiuInfo.style.color = 'white';}},1000);
        }
    }
    Ricarica()
    {   
        if(this.inventario > 0 && this.munizioni < this.maxmunizioni)
        {   
            InCarica = true;
            this.Step("Ricarica","_ricarica1");
        }
        else if(this.inventario == 0)
        {
            PiuInfo.style.color = "red";
            setTimeout(() => {if(Giocando){PiuInfo.style.color = "white";}},1000);
        }
    }
    Step(a,p)
    {   
        if(Giocando)
        {
        ArmaInCanna.classList.add('VaiGiù');
        ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "vaiGiù"){
        ArmaInCanna.classList.remove('VaiGiù'); 
        ArmaInCanna.setAttribute('src',`./Immagini/${a}/${this.nome}${p}.jpg`); 
        ArmaInCanna.classList.add('TornaSu'); 
        ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "tornaSu"){
        ArmaInCanna.classList.remove('TornaSu');
        if(p != "")
        {
            RumoriArma.textContent = `${this.Rumori[p.split('a')[2]]}`;
            if(p.split('a')[2] == 1)
            {   
                this.Step("Ricarica","_ricarica2");
            }
            else
            {   
                this.Step("Armi","");
            }
        } 
        else
        {
            RumoriArma.textContent = "";
            let carica = this.maxmunizioni - this.munizioni;
        if(this.inventario < carica)
        {
            this.munizioni += this.inventario;
            this.inventario = 0;
        }
        else
        {
            this.inventario -= carica;
            this.munizioni = this.maxmunizioni;
        }
            PiuInfo.textContent = `${this.munizioni}|${this.inventario}`;
            InCarica = false;
        }
        }},{once: true,});
        }},{once: true,});
    }
    }
}
class Personaggio
{   
    constructor()
    {
        this._vita = 4;
        this._velocità = 12.5;
    }
    set vita(vita)
    {
        this._vita = vita;
    }
    get vita()
    {
        return this._vita;
    }
    set velocità(boost)
    {
        this._velocità = boost;
    }
    get velocità()
    {
        return this._velocità;
    }
    Schiva()
    {
        PersonaggioGiocabile.classList.add('Schivata');
        Schivando = true;
        PuòSchivare = false;
        PersonaggioGiocabile.addEventListener('animationend',() => {PersonaggioGiocabile.classList.remove('Schivata');
        Schivando = false;
        let sec = 0;
        let riprenditi = setInterval(() => {if(!InPausa){sec += 100; if(sec >= 600){PuòSchivare = true; clearInterval(riprenditi);}}},100);},{once: true,});
    }
    Muovi(verso)
    {   
        setTimeout(() => {if(Corri && !InPausa)
        {
        if(verso && posG < 200)
        {
            posG = posG + 1;
            if(posG > posA)
            {
                distanza = distanza + 1;
                distanzaAG = distanzaAG + 1;
            }
            else
            {
                distanza = distanza - 1;
                distanzaAG = distanzaAG - 1;
            }
        }
        else if(!verso && posG > 0)
        {
            posG = posG - 1;
            if(posG < posA)
            {
                distanza = distanza + 1;
                distanzaAG = distanzaAG + 1;
            }
            else
            {
                distanza = distanza - 1;
                distanzaAG = distanzaAG - 1;
            }
        }
        if((verso && posG == 200) || (!verso && posG == 0))
        {
            PersonaggioGiocabile.classList.remove('Scuoti');
            Corri = false;
            return;
        }
        else
        {
        Boss.style.transform = `scale(${10/Math.max(distanza,10)})`;
        AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,1)})`;
        Segnaposto1.style.transform = `scale(${10/Math.max(posG,10)})`;
        Segnaposto2.style.transform = `scale(${10/Math.max(200 - posG,10)})`;
        AggiornaMirino(ArmaPresa,distanza);
        return this.Muovi(verso);
    }
    }
    else
    {   
        PersonaggioGiocabile.classList.remove('Scuoti');
        Corri = false;
        return;
    }},1000/this.velocità);
    }
    
    CambioArma(ArmaEquipaggiata)
{
    ArmaInCanna.classList.add('VaiGiù');
    Pulisci();
    InCarica = true;
    ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "vaiGiù") {{ArmaInCanna.classList.remove('VaiGiù');
    ArmaInCanna.classList.add('TornaSu');
    ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaEquipaggiata.nome}.jpg`);
    ArmaInCanna.addEventListener('animationend',(event) => {if(event.animationName == "tornaSu"){
    ArmaInCanna.classList.remove('TornaSu');
    Mirino.innerHTML = ArmaEquipaggiata.mirino;
    if(ArmaEquipaggiata.Estensione != null)
    {
        GirgliaEstensione.style.setProperty("--spazicariche",`${20/ArmaEquipaggiata.Estensione.maxcariche}vw`);
        BarraEstensione.style.width = `${0.25 + 20*ArmaEquipaggiata.Estensione.carica/ArmaEquipaggiata.Estensione.maxcarico}vw`;
        NomeDellEstensione.textContent = `${ArmaEquipaggiata.Estensione.nome}`;
        PiuInfo.textContent = `${ArmaEquipaggiata.munizioni}|${ArmaEquipaggiata.inventario}`;
    }
    else
    {
        PiuInfo.textContent = "";
    }
    AggiornaMirino();
    InCarica = false;}
    },{once: true,});
    }}},{once: true,});
    return false;
}
}
class Estensione
{
    constructor(Mod1,Mod2,carica)
    {   
        this._nome = Mod1[0];
        this._danni = Mod1[1];
        this._portata = Mod1[2];
        this._step = Mod1[3];
        this._maxcariche = Mod1[4];
        this._maxcarico = Mod1[4]*Mod1[3];
        this._rateo = Mod1[5];
        this._velocità = Mod1[6];
        this._altorateo = Mod1[7];
        this._rumore = Mod1[8];
        this._Mod1 = Mod1;
        this._Mod2 = Mod2;
        this._carica = Math.min(carica,this._maxcarico);
        this._cariche = Math.trunc(this._carica/this._step);
    }
    set nome(name)
    {   
        this._nome = name;
    }
    get nome()
    {
        return this._nome;
    }
    set danni(danni)
    {
        this._danni = danni;
    }
    get danni()
    {
        return this._danni;
    }
    set portata(portata)
    {
        this._portata = portata;
    }
    get portata()
    {
        return this._portata;
    }
    set rateo(rateo)
    {
        this._rateo = rateo;
    }
    get rateo()
    {
        return this._rateo;
    }
    set altorateo(altorateo)
    {
        this._altorateo = altorateo;
    }
    get altorateo()
    {
        return this._altorateo;
    }
    set velocità(v)
    {
        this._velocità = v;
    }
    get velocità()
    {
        return this._velocità;
    }
    set rumore(r)
    {
        this._rumore = r;
    }
    get rumore()
    {
        return this._rumore;
    }
    set step(s)
    {
        this._step = s;
    }
    get step()
    {
        return this._step;
    }
    set maxcariche(m)
    {
        this._maxcariche = m;
    }
    get maxcariche()
    {
        return this._maxcariche;
    }
    set maxcarico(M)
    {
        this._maxcarico = M;
    }
    get maxcarico()
    {
        return this._maxcarico;
    }
    set Mod1(A)
    {
        this._Mod1 = A;
    }
    get Mod1()
    {
        return this._Mod1;
    }
    set Mod2(A)
    {
        this._Mod2 = A;
    }
    get Mod2()
    {
        return this._Mod2;
    }
    set carica(c)
    {
        this._carica = c;
    }
    get carica()
    {
        return this._carica;
    }
    set cariche(c)
    {
        this._cariche = c;
    }
    get cariche()
    {
        return this._cariche;
    }
    Scambia()
    {   
        this.nome = this.Mod2[0];
        this.danni = this.Mod2[1];
        this.portata = this.Mod2[2];
        this.step = this.Mod2[3];
        this.maxcariche = this.Mod2[4];
        this.maxcarico = this.Mod2[4]*this.Mod2[3];
        this.rateo = this.Mod2[5];
        this.velocità = this.Mod2[6];
        this.altorateo = this.Mod2[7];
        this.rumore = this.Mod2[8];
        this.carica = Math.min(this.carica,this.maxcarico);
        this.cariche = Math.trunc(this.carica/this.step);
        NomeDellEstensione.textContent = this.nome;
        GrigliaEstensione.style.setProperty("--spazicariche",`${20/this.maxcariche}vw`);
        BarraEstensione.style.width = `${0.25 + 20*this.carica/this.maxcarico}vw`;
        let M = this.Mod2;
        this.Mod2 = this.Mod1;
        this.Mod1 = M;
        AggiornaMirino();
    }
    SuperFuoco()
    {   
        RumoriArma.style.color = "red";
        this.SuperSpara();
        Colpo = true;
        if(this.altorateo)
        {   
            Spara = setInterval(() => {this.SuperSpara();},this.rateo + 20);
        }
        else if(risparo)
        {   
            risparo = false;
            let cont = 0;
            gap = setInterval(() => {if(!InPausa){cont += 100; if(cont >= this.rateo + 100){clearInterval(gap); risparo = true;}}},100);
        }
    }
    SuperArresta()
    {
        Colpo = false;
        RumoriArma.style.color = "white";
        if(this.altorateo)
        {
            if(Spara != undefined)
            {
                clearInterval(Spara);
                Spara = undefined;
            }
        }
    }
    SuperSpara()
    {    
        if(this.cariche > 0)
        { 
            ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}_${this.nome}.jpg`);
            this.cariche--;
            this.carica = this.cariche*this.step;
            RumoriArma.textContent = `${this.rumore}`; 
            BarraEstensione.style.width = `${0.25 + 20*this.carica/this.maxcarico}vw`;
            setTimeout(() => {Preso(this);},1000*distanza/this.velocità);
            setTimeout(() => {ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}.jpg`); RumoriArma.textContent = "";},20);
        }
    }
}
