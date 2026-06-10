let VRag;
let posG = 0;
let posA = 100;
let distanza = 100;
let distanzaAG = 100;
let Corri = false;
let Schivando = false;
let PuòSchivare = true;
let InMoto = false;
let AltAttacco = false;
let AllAttacco = false;
let InPausa = false;
let InCarica = false;
let RimaniQui = true;
let Spara;
let Partita;
let Colpo = false;
let gap;
let risparo = true;
let Giocando = true;
let ric;
let danni = 0;
let conto;
let ArmaPresa;
let Boss = document.querySelector('#Nemico');
let ArmaInCanna = document.querySelector('#Arma');
let PersonaggioGiocabile = document.querySelector('#PGiocabile');
let Mirino = document.querySelector('#Mirino');
let PiuInfo = document.querySelector('#Munizioni');
let AttaccoNemico = document.querySelector('#Attacco');
let PBMischia = document.querySelector("#PienBarraMischia");
let BarraVita = document.querySelector('#Barra');
let hp = document.querySelector('#HP');
let BarraMischia = document.querySelector('#BarraMischia');
let BarraEstensione = document.querySelector("#BarraEstensione");
let GirgliaEstensione = document.querySelector("#GrigliaEstensione");
let NomeDellEstensione = document.querySelector('#NomEstensione');
let Segnaposto1 = document.querySelector('#S1');
let Segnaposto2 = document.querySelector('#S2');
let RumoriArma = document.querySelector('#Rumori');
let FrasiNemico = document.querySelector('#Frasi');
let SalvezzInfo = document.querySelector("#SalvezzInfo");
let Countdown = document.querySelector("#Countdown");
let PannelloPausa = document.querySelector('#Pausa');
let PannelloConferma = document.querySelector('#Conferma');
let BottoneSpara = document.querySelector("#Spara");
let BottoneSuperSpara = document.querySelector("#SuperSpara");
let BottoneRicarica = document.querySelector("#Ricarica");
let BottoneMuoviSu = document.querySelector("#MuoviSu");
let BottoneMuoviGiù = document.querySelector("#MuoviGiù");
let BottoneSchiva = document.querySelector("#Schiva");
let BottoneMischia = document.querySelector("#Mischia");
let BottoneShotgun = document.querySelector("#Shotgun");
let BottoneAssalto = document.querySelector("#Assalto");
let BottoneCecchino = document.querySelector("#Cecchino");
let BottoneEstensione = document.querySelector("#Estensione");
let Sfondo = document.querySelector("body");
let Elementi = [Boss,ArmaInCanna,Mirino,PiuInfo,AttaccoNemico,BarraVita,hp,PBMischia,BarraMischia,Segnaposto1,Segnaposto2,RumoriArma,FrasiNemico,PannelloConferma,PannelloPausa,PannelloOpzioni,BottoneMischia,BottoneShotgun,BottoneCecchino,BottoneAssalto,BottoneRicarica,BottoneSchiva,BottoneSpara,BottoneMuoviSu,BottoneMuoviGiù,GirgliaEstensione,BarraEstensione,NomeDellEstensione,SalvezzInfo,Countdown];
let BottoniArma = [BottoneMischia,BottoneShotgun,BottoneAssalto,BottoneCecchino];
let BottoniSuperComandi = [BottoneSchiva,BottoneSpara,BottoneRicarica,BottoneSuperSpara];
let BottoniMovimento = document.querySelectorAll(".movimento");
let InfoArmi = [PiuInfo,BarraMischia,PienBarraMischia,GirgliaEstensione,BarraEstensione,NomeDellEstensione];
const VAI = new Event("Riprendi");
let poi;
function ScaricaImmaginiArma(a)
{
    new Image().src = `./Immagini/Armi/${a.nome}.jpg`;
    new Image().src = `./Immagini/Armi/${a.nome}_attaccando.jpg`;
    new Image().src = `./Immagini/Armi/${a.nome}_${a.Estensione.Mod1[0]}.jpg`;
    new Image().src = `./Immagini/Armi/${a.nome}_${a.Estensione.Mod2[0]}.jpg`;
    new Image().src = `./Immagini/Ricarica/${a.nome}_ricarica1.jpg`;
    new Image().src = `./Immagini/Ricarica/${a.nome}_ricarica2.jpg`;
}
function ScaricaImmagini(m,s,a,c,n)
{
    [s,a,c].forEach(A => {ScaricaImmaginiArma(A)});
    new Image().src = `./Immagini/Armi/${m}.jpg`;
    new Image().src = `./Immagini/Armi/${m}_attaccando.jpg`;
    new Image().src = `./Immagini/Nemici/${n}.jpg`;
    new Image().src = `./Immagini/Nemici/${n}_attaccando.jpg`;
}
function AggiornaMirino()
{   
    if(ArmaPresa.Estensione != null)
    {
        if(Math.max(ArmaPresa.portata,ArmaPresa.Estensione.portata) >= distanza)
    {
        if(ArmaPresa.portata < ArmaPresa.Estensione.portata)
        {
            if(ArmaPresa.portata >= distanza)
            {   
                if(Mirino.style.color != "purple")
                {
                    Mirino.style.color = 'purple';
                }
            }
            else if(ArmaPresa.Estensione.portata >= distanza && Mirino.style.color != "blue")
            {
                Mirino.style.color = 'blue';
            }
        }
        else
        {
            if(ArmaPresa.Estensione.portata >= distanza)
            {   
                if(Mirino.style.color != "purple")
                {
                    Mirino.style.color = 'purple';
                }
            }
            else if(ArmaPresa.portata >= distanza && Mirino.style.color != "red")
            {
                Mirino.style.color = 'red';
            }
        }
    }
    else if(Mirino.style.color != "white")
    {
        Mirino.style.color = "white";
    }
    }
    else
    {
        if(ArmaPresa.portata >= distanza && Mirino.style.color != "red")
        {
            Mirino.style.color = 'red';
        }
        else if(Mirino.style.color != "white")
        {
            Mirino.style.color = "white";
        }
    }
}
function Pulisci()
{
    if(Spara != undefined)
    {
        clearInterval(Spara);
        Spara = undefined;
    }
    if(gap != undefined)
    {
        clearInterval(gap);
        gap = undefined;
    }
}
function Preso(ArmaEquipaggiata)
{
    if(ArmaEquipaggiata.portata >= distanza)
    {
        NemicoScelto.vita = NemicoScelto.vita - ArmaEquipaggiata.danni;
        BarraVita.style.width = `${Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2)*30.875}vw`;
        BarraVita.style.right = `${15.4375*(1 - Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2))}vw`;
        if(NemicoScelto.vita <= 0)
        {
            Fine(true);
        }
        if(AltAttacco)
        {
            danni += ArmaEquipaggiata.danni;
            if(danni >= ric)
            {
                Sfondo.dispatchEvent(new AnimationEvent('animationend',{animationName: 'SuperAttacco'}));
            }
        }
        return true;
    }
    else
    {
        return false;
    }
}
function Colpito()
{
    if(!Schivando)
    {
        Protagonista.vita -= 1;
        hp.textContent = `HP: ${Protagonista.vita}`;
        hp.classList.add("LampeggiaHP");
        hp.addEventListener('animationend',() => {hp.classList.remove("LampeggiaHP");},{once: true,});
        if(Protagonista.vita <= 0)
        {
            Fine(false);
        }
    }
    distanzaAG = distanza;
    AttaccoNemico.style.color = "transparent";
    AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,1)})`;
}
function SuperColpito(event)
{       
    if(event.animationName == "SuperAttacco")
    {
            if(ric > danni && !Schivando)
            {
                Protagonista.vita -= 1;
                hp.textContent = `HP: ${Protagonista.vita}`;
                hp.classList.add("LampeggiaHP");
                hp.addEventListener('animationend',() => {hp.classList.remove("LampeggiaHP");},{once: true,});
                if(Protagonista.vita <= 0)
                {
                    Fine(false);
                }
            }
            clearInterval(conto);
            Sfondo.classList.remove("Sfondone");
            SalvezzInfo.textContent = "";
            Countdown.textContent = "";
            Boss.setAttribute('src',`./Immagini/Nemici/${NemicoScelto.nome}.jpg`);
            if(Giocando){FrasiNemico.textContent = "";}
            danni = 0;
            AltAttacco = false;
        Sfondo.removeEventListener('animationend',SuperColpito(event));
    }
}
function PausaRiprendi()
{   
    if(!InPausa)
    {
        InPausa = true;
        ArmaInCanna.style.animationPlayState = "paused";
        BarraMischia.style.animationPlayState = "paused";
        PersonaggioGiocabile.style.animationPlayState = "paused";
        hp.style.animationPlayState = "paused";
        Sfondo.style.animationPlayState = "paused";
        PannelloPausa.showModal();
    }
    else
    {
        InPausa = false;
        ArmaInCanna.style.animationPlayState = "running";
        BarraMischia.style.animationPlayState = "running";
        PersonaggioGiocabile.style.animationPlayState = "running";
        hp.style.animationPlayState = "running";
        Sfondo.style.animationPlayState = "running";
        clearTimeout(poi);
        document.dispatchEvent(VAI);
        PannelloPausa.close();
    }
}
function Fine(vittoria)
{       
        Giocando = false;
        InPausa = true;
        clearInterval(Partita);
        PersonaggioGiocabile.classList.remove('Scuoti','Schivata');
        ArmaInCanna.classList.remove('TornaSu','VaiGiù');
        Elementi.forEach(E => {E.style.opacity = 0;});
        ArmaInCanna.style.opacity = 1;
        Boss.style.opacity = 1;
        document.querySelector("#PienBarra").style.opacity = 0;
        FrasiNemico.style.opacity = 1;
        PannelloPausa.style.opacity = 1;
        PannelloConferma.style.opacity = 1;
        Pulisci();
        setTimeout(() => {document.querySelectorAll('.Comandi , .CambioArmi').forEach(B => {B.style.opacity = "0";});},500);
        if(vittoria)
        {   
            document.querySelector('#SchermataPausa').style.color = "green";
            document.querySelector('#SchermataPausa').innerHTML = `VITTORIA! <button type = "button" id = "Riprendi" onclick = "event.stopPropagation(); PausaRiprendi(NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
            <button type = "button" id = "Riprova" onclick = "if(!RimaniQui){RimaniQui = true;} PannelloConferma.showModal()">Riprova</button>
            <button type="button" id = "BottoneOpzioni" onclick="PannelloOpzioni.showModal();">Opzioni</button>
            <button type = "button" id = "Abbandona" onclick = "if(RimaniQui){RimaniQui = false;} PannelloConferma.showModal()">Gioca ancora</button>`;
            Boss.style.transform = `scale(1)`;
            Boss.src = `./Immagini/Animazioni/Animazione Vittoria ${NemicoScelto.nome}_1.jpg`;
            setTimeout(() =>{FrasiNemico.textContent = `${NemicoScelto.Frasi[2]}`; ArmaInCanna.src = `./Immagini/Animazioni/Animazione Vittoria contro ${NemicoScelto.nome}_1.jpg`;},500);
            if(window.localStorage.getItem(`${NemicoScelto.nome}`) == null || difficoltà > window.localStorage.getItem(`${NemicoScelto.nome}`))
            {
                window.localStorage.setItem(`${NemicoScelto.nome}`,`${difficoltà}`);
            }
            setTimeout(() => {ArmaInCanna.src = `./Immagini/Animazioni/Animazione Vittoria contro ${NemicoScelto.nome}_2.jpg`; Boss.src = `./Immagini/Animazioni/Animazione Vittoria ${NemicoScelto.nome}_2.jpg`; RumoriArma.textContent = "";},1500);
        }
        else
        {   
            document.querySelector('#SchermataPausa').style.color = "red";
            document.querySelector('#SchermataPausa').innerHTML = `Game Over <button type = "button" id = "Riprendi" onclick = "event.stopPropagation(); PausaRiprendi(NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
            <button type = "button" id = "Riprova" onclick = "if(!RimaniQui){RimaniQui = true;} PannelloConferma.showModal()">Riprova</button>
            <button type="button" id = "BottoneOpzioni" onclick="PannelloOpzioni.showModal();">Opzioni</button>
            <button type = "button" id = "Abbandona" onclick = "if(RimaniQui){RimaniQui = false;} PannelloConferma.showModal()">Gioca ancora</button>`;
            ArmaInCanna.classList.add('VaiGiù');
            setTimeout(() =>{FrasiNemico.textContent = `${NemicoScelto.Frasi[1]}`},500);
            setTimeout(() => {ArmaInCanna.classList.remove('VaiGiù'); ArmaInCanna.classList.add('TornaSu'); ArmaInCanna.src = "./Immagini/Animazioni/Animazione Sconfitta.jpg";},500);
            setTimeout(() => {ArmaInCanna.classList.remove('TornaSu'); RumoriArma.textContent = "";},1000);
        }
        setTimeout(() => {PannelloPausa.showModal();},3000);
}
function SchiacciaBottone(bottone,soloclick)
{
    bottone.style.opacity = 1;
    if(soloclick)
    {
        setTimeout(() => {bottone.style.opacity = 0.5;},100);
    }
}
function Gioco()
{   
    ArmaPresa = AssaltoEquipaggiato;
    Boss.setAttribute('src',`./Immagini/Nemici/${NemicoScelto.nome}.jpg`);
    ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}.jpg`);
    Mirino.innerHTML = ArmaPresa.mirino;
    AttaccoNemico.textContent = NemicoScelto.attacco;
    PiuInfo.textContent = `${ArmaPresa.munizioni}|${ArmaPresa.inventario}`;
    NemicoScelto.velocità = Math.pow(1.5,difficoltà)*10;
    NemicoScelto.vita = Math.pow(1.2,difficoltà)*450000;
    NemicoScelto.maxvita = NemicoScelto.vita;
    BarraEstensione.style.width = `0.25vw`;
    GirgliaEstensione.style.setProperty("--spazicariche",`${20.4/ArmaPresa.Estensione.maxcariche}vw`);
    NomeDellEstensione.textContent = `${ArmaPresa.Estensione.nome}`;
    Boss.style.transform = `scale(${10/Math.max(distanza,10)})`;
    AttaccoNemico.style.transform = `scale(${10/Math.max(distanzaAG,1)})`;
    Segnaposto1.style.transform = `scale(${10/Math.max(posG,10)})`;
    Segnaposto2.style.transform = `scale(${10/Math.max(200 - posG,10)})`;
    Sfondo.style.setProperty("--attaccolore",NemicoScelto.coloreAttacco);
    AggiornaMirino();
    ric = NemicoScelto.maxvita*0.02;
    BottoneMischia.addEventListener('touchstart', (event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneMischia,true);
            if(ArmaPresa != MischiaEquipaggiata && !InCarica)
            {
            risparo = true;
            Colpo = Protagonista.CambioArma(MischiaEquipaggiata);
            risparo = true;
            ArmaPresa = MischiaEquipaggiata;}}});
    BottoneShotgun.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneShotgun,true)
                if(ArmaPresa != ShotgunEquipaggiato && !InCarica)
                {
            risparo = true;
            Colpo = Protagonista.CambioArma(ShotgunEquipaggiato);
            risparo = true;
            ArmaPresa = ShotgunEquipaggiato;}}});
    BottoneAssalto.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneAssalto,true);
                if(ArmaPresa != AssaltoEquipaggiato && !InCarica)
                {
            risparo = true;
            Colpo = Protagonista.CambioArma(AssaltoEquipaggiato);
            risparo = true;
            ArmaPresa = AssaltoEquipaggiato;}}});
    BottoneCecchino.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneCecchino,true);
                if(ArmaPresa != CecchinoEquipaggiato && !InCarica)
                {
            risparo = true;
            Colpo = Protagonista.CambioArma(CecchinoEquipaggiato);
            risparo = true;
            ArmaPresa = CecchinoEquipaggiato;}}});
    BottoneEstensione.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneEstensione,true);
            ArmaPresa.Estensione.Scambia();
    }})
    BottoneRicarica.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneRicarica,true);
            if(ArmaPresa != MischiaEquipaggiata && !InCarica)
            {   
                Pulisci();
                risparo = true;
                ArmaPresa.Ricarica();}}});
    BottoneSchiva.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneSchiva,true);
                if(!Schivando && PuòSchivare)
                {  
                   Protagonista.Schiva(); 
}}});
    BottoneSpara.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneSpara,false);
            if(!Colpo && !InCarica && risparo)
            {   
                ArmaPresa.Fuoco();
            }}
        else
        {
            ArmaPresa.Arresta();
        }});
    BottoneSuperSpara.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneSuperSpara,false);
        if(!Colpo && !InCarica && risparo)
            {   
                ArmaPresa.Estensione.SuperFuoco();
            }}
        else
        {
            ArmaPresa.Estensione.SuperArresta();
        }});
    BottoneMuoviSu.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneMuoviSu,false);
                if(!Corri)
                {   
                    PersonaggioGiocabile.classList.add('Scuoti');
                    Corri = true;
                    Protagonista.Muovi(true);
}}});
    BottoneMuoviGiù.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){SchiacciaBottone(BottoneMuoviGiù,false);
                if(!Corri)
                {
                    PersonaggioGiocabile.classList.add('Scuoti');
                    Corri = true;
                    Protagonista.Muovi(false);
}}});
    BottoneMuoviSu.addEventListener('touchend',(event) => {event.stopPropagation(); if(!InPausa){BottoneMuoviSu.style.opacity = "0.5"; Corri = false;}});
    BottoneMuoviGiù.addEventListener('touchend',(event) => {event.stopPropagation(); if(!InPausa){BottoneMuoviGiù.style.opacity = "0.5"; Corri = false;}});
    BottoneSpara.addEventListener('touchend',(event) => {event.stopPropagation(); if(!InPausa){BottoneSpara.style.opacity = "0.5"; ArmaPresa.Arresta();}});
    BottoneSuperSpara.addEventListener('touchend',(event) => {event.stopPropagation(); if(!InPausa){BottoneSuperSpara.style.opacity = "0.5"; ArmaPresa.Estensione.SuperArresta();}});
    document.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!InPausa){if(Spara != undefined){clearInterval(Spara); Spara = undefined;} document.querySelectorAll(".movimento , #Spara","#SuperSpara").forEach(B => {B.style.opacity = "0.5";}); PausaRiprendi(NemicoScelto)}});
        Partita = setInterval(() => {
        let disc = Math.random()*Math.max(30,Math.min(distanza,60))/40 - Math.sqrt(Protagonista.vita)/(Math.trunc(Math.sqrt(Protagonista.vita))*10);
        if(disc < 0.5)
        {   
            if(!AllAttacco && (distanza > NemicoScelto.velocità || (PuòSchivare && distanza/NemicoScelto.velocità > 0.1)) && (disc > 0.12 || AltAttacco))
            {   
                if(!InPausa)
                {
                    NemicoScelto.AllAttacco(); 
                }
                else
                {
                    document.addEventListener("Riprendi",NemicoScelto.AllAttacco.bind(NemicoScelto),{once: true,});
                    poi = setTimeout(() => {document.removeEventListener("Riprendi",NemicoScelto.AllAttacco.bind(NemicoScelto),{once: true,});},VRag);
                }
            }
            else if(!AltAttacco)
            {   
                if(!InPausa)
                {
                    NemicoScelto.AltAttacco();
                }
                else
                {
                    document.addEventListener("Riprendi",NemicoScelto.AltAttacco.bind(NemicoScelto),{once: true,});
                    poi = setTimeout(() => {document.removeEventListener("Riprendi",NemicoScelto.AltAttacco.bind(NemicoScelto),{once: true,});},VRag);
                }
            }
        }
        else if(!InMoto)
        {   
            if(!InPausa)
            {
                NemicoScelto.Moto();
            }
            else
            {
                document.addEventListener("Riprendi",NemicoScelto.Moto.bind(NemicoScelto),{once: true,});
                poi = setTimeout(() => {document.removeEventListener("Riprendi",NemicoScelto.Moto.bind(NemicoScelto),{once: true,});},VRag);
            }
        }
    },VRag);
}
function VaiVaiVai()
{
    Nemici.forEach(N => {if(sessionStorage.getItem("Nemico scelto") == N.nome){NemicoScelto = N;}});
    Armi.forEach(A => {if(sessionStorage.getItem("ShotgunEquipaggiato") == A.nome){ShotgunEquipaggiato = A;} else if (sessionStorage.getItem("AssaltoEquipaggiato") == A.nome){AssaltoEquipaggiato = A;} else if (sessionStorage.getItem("CecchinoEquipaggiato") == A.nome){CecchinoEquipaggiato = A;}});
    Mischie.forEach(M => {if(sessionStorage.getItem("MischiaEquipaggiata") == M.nome){MischiaEquipaggiata = M;}});
    BottoneMischia.querySelector('img').src = `Immagini/Anteprime/${MischiaEquipaggiata.nome}_anteprima.jpg`;
    BottoneShotgun.querySelector('img').src = `Immagini/Anteprime/${ShotgunEquipaggiato.nome}_anteprima.jpg`;
    BottoneAssalto.querySelector('img').src = `Immagini/Anteprime/${AssaltoEquipaggiato.nome}_anteprima.jpg`;
    BottoneCecchino.querySelector('img').src = `Immagini/Anteprime/${CecchinoEquipaggiato.nome}_anteprima.jpg`;
    difficoltà = Number(sessionStorage.getItem("Difficoltà"));
    VRag = 4000/difficoltà;
    AggiornaImpostazioni();
    ScaricaImmagini(MischiaEquipaggiata.nome,ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato,NemicoScelto.nome);
    Filtra(filtro);
    Gioco();
}
