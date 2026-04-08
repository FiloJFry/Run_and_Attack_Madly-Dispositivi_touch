let DatiDiPosizione = new SaccoDiDati(0,100,100,100,false,false,false,false,false);
let RimaniQui = true;
let stavaattaccando;
let stavamuovendosi;
let Boss = document.querySelector('#Nemico');
let ArmaInCanna = document.querySelector('#Arma');
let Mirino = document.querySelector('#Mirino');
let PiuInfo = document.querySelector('#Info');
let AttaccoNemico = document.querySelector('#Attacco');
let BarraVita = document.querySelector('#Barra');
let hp = document.querySelector('#HP');
let BarraMischia = document.querySelector('#BarraMischia');
let Segnaposto1 = document.querySelector('#S1');
let Segnaposto2 = document.querySelector('#S2');
let RumoriArma = document.querySelector('#Rumori');
let FrasiNemico = document.querySelector('#Frasi');
let PannelloPausa = document.querySelector('#Pausa');
let PannelloConferma = document.querySelector('#Conferma');
let BottoneSpara = document.querySelector("#Spara");
let BottoneRicarica = document.querySelector("#Ricarica");
let BottoneMuoviSu = document.querySelector("#MuoviSu");
let BottoneMuoviGiù = document.querySelector("#MuoviGiù");
let BottoneSchiva = document.querySelector("#Schiva");
let BottoneMischia = document.querySelector("#Mischia");
let BottoneShotgun = document.querySelector("#Shotgun");
let BottoneAssalto = document.querySelector("#Assalto");
let BottoneCecchino = document.querySelector("#Cecchino");
function AggiornaImpostazioni()
{   
    if(window.localStorage.getItem("MostraSuoni") != null)
    {
        RumoriArma.style.color = "transparent";
    }
    else
    {
        RumoriArma.style.color = "white";
    }
    AggiornaTasti();
}
function Salva()
{   
    AggiornaImpostazioni();
    PannelloOpzioni.close();
}
function Reset()
{
    window.localStorage.removeItem("MostraSuoni");
    AggiornaImpostazioni();
    PannelloOpzioni.close();
}
function AggiornaMirino(ArmaEquipaggiata,distanza)
{
    if(ArmaEquipaggiata.portata >= distanza && Mirino.style.color != "red")
    {
        Mirino.style.color = 'red';
    }
    else if(ArmaEquipaggiata.portata < distanza && Mirino.style.color != "white")
    {
        Mirino.style.color = 'white';
    }
}
function CambioArma(ArmaPresa,Spara,gap)
{
    ArmaInCanna.classList.add('slideOutDown');
    if(Spara != undefined){clearInterval(Spara); Spara = undefined;}
    if(gap != undefined){clearTimeout(gap); gap = undefined;}
    setTimeout(() => {ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}.jpg`);
    ArmaInCanna.classList.remove('slideOutDown');
    ArmaInCanna.classList.add('slideInUp');},500);
    setTimeout(() => {ArmaInCanna.classList.remove('slideInUp');Mirino.innerHTML = ArmaPresa.mirino;if(ArmaPresa.rateo != 45000){PiuInfo.textContent = `${ArmaPresa.munizioni}|${ArmaPresa.inventario}`;} else{PiuInfo.textContent = ""};},1000);
    return false;
}
function LampeggiaHP(colore)
{
    hp.style.backgroundColor = colore;
    setTimeout(() => {hp.style.backgroundColor = 'white'; hp.style.color = colore},300);
    setTimeout(() => {hp.style.backgroundColor = colore; hp.style.color = 'white'},600);
    setTimeout(() => {hp.style.backgroundColor = 'white'; hp.style.color = colore},900);
    setTimeout(() => {hp.style.backgroundColor = colore; hp.style.color = 'white'},1200);
    setTimeout(() => {hp.style.backgroundColor = 'blue'},1500);
}
function Preso(ArmaPresa,NemicoScelto,distanza,muny)
{
    if(ArmaPresa.portata >= distanza && muny)
    {
        NemicoScelto.vita = NemicoScelto.vita - ArmaPresa.danni;
        BarraVita.style.width = `${Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2)*30.875}vw`;
        BarraVita.style.right = `${15.4375*(1 - Math.pow(NemicoScelto.vita/NemicoScelto.maxvita,2))}vw`;
        return true;
    }
    else
    {
        return false;
    }
}
function Colpito(Protagonista,DatiDiPosizione,EccoloCheArriva)
{
    if(AttaccoNemico.style.color == NemicoScelto.coloreAttacco && DatiDiPosizione.distanzaAG <= 0 && !DatiDiPosizione.Schivando)
    {
        Protagonista.vita -= 1;
        hp.textContent = `HP: ${Protagonista.vita}`;
        LampeggiaHP('red');
    }
    DatiDiPosizione.distanzaAG = DatiDiPosizione.distanza;
    AttaccoNemico.style.color = "transparent";
    AttaccoNemico.style.transform = `scale(${Math.max(10/DatiDiPosizione.distanzaAG,1)})`;
    clearInterval(EccoloCheArriva);
}
function PausaRiprendi(DatiDiPosizione,NemicoScelto)
{   
    if(!DatiDiPosizione.InPausa)
    {
        DatiDiPosizione.InPausa = true;
        stavaattaccando = DatiDiPosizione.AllAttacco;
        stavamuovendosi = DatiDiPosizione.InMoto;
        if(BarraMischia.style.width != "20vw")
        {
            BarraMischia.style.animationPlayState = "paused";
        }
        PannelloPausa.showModal();
    }
    else
    {
        DatiDiPosizione.InPausa = false;
        if(stavaattaccando)
        {   
            DatiDiPosizione.AllAttacco = true;
            NemicoScelto.Attacco(DatiDiPosizione); 
        }
        if(stavamuovendosi)
        {   
            NemicoScelto.Moto(DatiDiPosizione);
        }
          if(BarraMischia.style.width != "20vw")
        {
            BarraMischia.style.animationPlayState = "running";
        }
        PannelloPausa.close();
    }
}
function Fine(Partita,DatiDiPosizione,MirID,Spara,vittoria,NemicoScelto)
{
        clearInterval(Partita);
        DatiDiPosizione.InPausa = true;
        PiuInfo.style.color = "transparent";
        BarraMischia.style.backgroundColor = "transparent";
        document.querySelector('#PienBarraMischia').style.backgroundColor = "transparent";
        if(MirID != undefined)
        {
            clearInterval(MirID);
        }
        if(Spara != undefined)
        {
            clearInterval(Spara)
        }
        Mirino.style.color = "transparent";
        AttaccoNemico.style.color = "transparent";
        if(vittoria)
        {   
            document.querySelector('#SchermataPausa').style.color = "green";
            document.querySelector('#SchermataPausa').innerHTML = `VITTORIA! <button type = "button" id = "Riprendi" onclick = "event.stopPropagation(); PausaRiprendi(DatiDiPosizione,NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
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
            setTimeout(() => {ArmaInCanna.src = `./Immagini/Animazioni/Animazione Vittoria contro ${NemicoScelto.nome}_2.jpg`; Boss.src = `./Immagini/Animazioni/Animazione Vittoria ${NemicoScelto.nome}_2.jpg`;},1500);
            setTimeout(() => {PannelloPausa.showModal();},3000);
        }
        else
        {   
            document.querySelector('#SchermataPausa').style.color = "red";
            document.querySelector('#SchermataPausa').innerHTML = `Game Over <button type = "button" id = "Riprendi" onclick = "event.stopPropagation(); PausaRiprendi(DatiDiPosizione,NemicoScelto);" style = "opacity: 0.5" disabled>Riprendi</button>
            <button type = "button" id = "Riprova" onclick = "if(!RimaniQui){RimaniQui = true;} PannelloConferma.showModal()">Riprova</button>
            <button type="button" id = "BottoneOpzioni" onclick="PannelloOpzioni.showModal();">Opzioni</button>
            <button type = "button" id = "Abbandona" onclick = "if(RimaniQui){RimaniQui = false;} PannelloConferma.showModal()">Gioca ancora</button>`;
            ArmaInCanna.classList.add('slideOutDown');
            setTimeout(() =>{FrasiNemico.textContent = `${NemicoScelto.Frasi[1]}`},500);
            setTimeout(() => {ArmaInCanna.classList.remove('slideOutDown'); ArmaInCanna.classList.add('slideInUp'); ArmaInCanna.src = "./Immagini/Animazioni/Animazione Sconfitta.jpg"},500);
            setTimeout(() => {ArmaInCanna.classList.remove('slideInUp')},1000);
            setTimeout(() => {PannelloPausa.showModal();},3000);
        }
}
function Gioco(Protagonista,ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato,MischiaEquipaggiata,NemicoScelto,DatiDiPosizione)
{
    let ArmaPresa = AssaltoEquipaggiato;
    Boss.setAttribute('src',`./Immagini/Nemici/${NemicoScelto.nome}.jpg`);
    ArmaInCanna.setAttribute('src',`./Immagini/Armi/${ArmaPresa.nome}.jpg`);
    Mirino.innerHTML = ArmaPresa.mirino;
    AttaccoNemico.textContent = NemicoScelto.attacco;
    PiuInfo.textContent = `${ArmaPresa.munizioni}|${ArmaPresa.inventario}`;
    NemicoScelto.velocità = Math.pow(1.5,difficoltà)*10;
    NemicoScelto.vita = Math.pow(1.2,difficoltà)*300000;
    NemicoScelto.maxvita = NemicoScelto.vita;
    Boss.style.transform = `scale(${10/Math.max(DatiDiPosizione.distanza,10)})`;
    AttaccoNemico.style.transform = `scale(${10/Math.max(DatiDiPosizione.distanzaAG,1)})`;
    Segnaposto1.style.transform = `scale(${10/Math.max(DatiDiPosizione.posG,10)})`;
    Segnaposto2.style.transform = `scale(${10/Math.max(200 - DatiDiPosizione.posG,10)})`;
    let Colpo = false;
    let InCarica = false;
    let Spara;
    let Partita;
    let MirID;
    let muny;
    let gap;
    let PuoSchivare = true;
    let colpito;
    let risparo = true;
    let EccoloCheArriva;
    let Dotazione = [ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato];
    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
    BottoneMischia.addEventListener('touchstart', (event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){BottoneMischia.style.opacity = "1"; setTimeout(() => {BottoneMischia.style.opacity = "0.5";},100);
            if(ArmaPresa != MischiaEquipaggiata && !InCarica)
            {
            Colpo = CambioArma(MischiaEquipaggiata,Spara,gap,risparo);
            risparo = true;
            ArmaPresa = MischiaEquipaggiata;
            if(MirID == undefined)
                {
                    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
                }
            }}});
    BottoneShotgun.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){BottoneShotgun.style.opacity = "1"; setTimeout(() => {BottoneShotgun.style.opacity = "0.5";},100);
                            if(ArmaPresa != ShotgunEquipaggiato && !InCarica)
                {
            Colpo = CambioArma(ShotgunEquipaggiato,Spara,gap,risparo);
            risparo = true;
            ArmaPresa = ShotgunEquipaggiato;
            if(MirID == undefined)
                {
                    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
                }
            }}});
    BottoneAssalto.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){BottoneAssalto.style.opacity = "1"; setTimeout(() => {BottoneAssalto.style.opacity = "0.5";},100);
                if(ArmaPresa != AssaltoEquipaggiato && !InCarica)
                {
            Colpo = CambioArma(AssaltoEquipaggiato,Spara,gap,risparo);
            risparo = true;
            ArmaPresa = AssaltoEquipaggiato;
            if(MirID == undefined)
                {
                    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
                }
            }}});
    BottoneCecchino.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){BottoneCecchino.style.opacity = "1"; setTimeout(() => {BottoneCecchino.style.opacity = "0.5";},100);
                if(ArmaPresa != CecchinoEquipaggiato && !InCarica)
                {
            Colpo = CambioArma(CecchinoEquipaggiato,Spara,gap,risparo);
            risparo = true;
            ArmaPresa = CecchinoEquipaggiato;
            if(MirID == undefined)
                {
                    AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza);
                }
            }}});
    BottoneRicarica.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){BottoneRicarica.style.opacity = "1"; setTimeout(() => {BottoneRicarica.style.opacity = "0.5";},100);
            if(ArmaPresa != MischiaEquipaggiata && !InCarica)
            {   
                InCarica = true;
                ArmaPresa.Ricarica();
                setTimeout(() => {InCarica = false;},3000);
            }}});
    BottoneSchiva.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){BottoneSchiva.style.opacity = "1"; setTimeout(() => {BottoneSchiva.style.opacity = "0.5";},100);
                if(!DatiDiPosizione.Schivando && PuoSchivare)
                {  
                   DatiDiPosizione.Schivando = true;
                   PuoSchivare = false;
                   Protagonista.Schiva(); 
                   setTimeout(() => {DatiDiPosizione.Schivando = false;},400);
                   setTimeout(() => {PuoSchivare = true;},1000);
                }}});
    BottoneSpara.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){BottoneSpara.style.opacity = "1";
            if(!Colpo && !InCarica && risparo)
            {   
                muny = ArmaPresa.munizioni > 0;
                ArmaPresa.Spara();
                colpito = Preso(ArmaPresa,NemicoScelto,DatiDiPosizione.distanza,muny);
                if(NemicoScelto.vita <= 0)
                {   
                    Fine(Partita,DatiDiPosizione,MirID,Spara,true,NemicoScelto);
                    return;
                }
                Colpo = true;
            if(ArmaPresa.altorateo)
            {   
                Spara = setInterval(() => {  
                    muny = ArmaPresa.munizioni > 0;
                    ArmaPresa.Spara();
                    Preso(ArmaPresa,NemicoScelto,DatiDiPosizione.distanza,muny);
                    if(NemicoScelto.vita <= 0)
                    {   
                        Fine(Partita,DatiDiPosizione,MirID,Spara,true,NemicoScelto);
                        return;
                    }
            },ArmaPresa.rateo + 100);
            }
            else
            {   
                risparo = false;
                gap = setTimeout(() => {risparo = true;},ArmaPresa.rateo + 100);
                if(ArmaPresa == MischiaEquipaggiata)
                {
                    ArmaPresa.Ricarica();
                if(colpito)
                {
                    Dotazione.forEach(A => {A.inventario = A.inventario + 3*A.maxmunizioni;});
                }
                }
            }
        }}
        else
        {
            Colpo = false;
            if(ArmaPresa.altorateo)
            {
                if(Spara != undefined)
                {
                    clearInterval(Spara);
                    Spara = undefined;
                }
            }
        }});
    BottoneMuoviSu.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){BottoneMuoviSu.style.opacity = "1";
                if(!DatiDiPosizione.Corri)
                {
                    ArmaInCanna.classList.add('shake');
                    DatiDiPosizione.Corri = true;
                    Protagonista.Muovi(true,DatiDiPosizione);
                    if(MirID == undefined)
                    {
                        MirID = setInterval(() => {AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza); if(!DatiDiPosizione.Corri && !DatiDiPosizione.InMoto){clearInterval(MirID); MirID = undefined;}},10);
                    }
                }}
            else
            {
                DatiDiPosizione.Corri = false;
                ArmaInCanna.classList.remove('shake');
            }});
    BottoneMuoviGiù.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){BottoneMuoviGiù.style.opacity = "1";
                if(!DatiDiPosizione.Corri)
                {
                    ArmaInCanna.classList.add('shake');
                    DatiDiPosizione.Corri = true;
                    Protagonista.Muovi(false,DatiDiPosizione);
                    if(MirID == undefined)
                    {
                        MirID = setInterval(() => {AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza); if(!DatiDiPosizione.Corri && !DatiDiPosizione.InMoto){clearInterval(MirID); MirID = undefined;}},10);
                    }
                }}
                else
                {
                    DatiDiPosizione.Corri = false;
                    ArmaInCanna.classList.remove('shake');
                }});
    BottoneMuoviSu.addEventListener('touchend',(event) => {event.stopPropagation(); BottoneMuoviSu.style.opacity = "0.5"; DatiDiPosizione.Corri = false; ArmaInCanna.classList.remove('shake');});
    BottoneMuoviGiù.addEventListener('touchend',(event) => {event.stopPropagation(); BottoneMuoviGiù.style.opacity = "0.5"; DatiDiPosizione.Corri = false; ArmaInCanna.classList.remove('shake');});
    BottoneSpara.addEventListener('touchend',(event) => {event.stopPropagation(); BottoneSpara.style.opacity = "0.5";
                    Colpo = false;
                    if(ArmaPresa.altorateo)
                    {
                        if(Spara != undefined)
                        {
                            clearInterval(Spara);
                            Spara = undefined;
                        }
                    }
                });
    document.addEventListener('touchstart',(event) => {event.stopPropagation(); if(!DatiDiPosizione.InPausa){PausaRiprendi(DatiDiPosizione,NemicoScelto)}});
    Partita = setInterval(() => {
        if(Protagonista.vita == 0)
        {
            clearInterval(Partita);
        }
        else
        {
        if(Math.random() < 0.5 && !DatiDiPosizione.AllAttacco)
        {
            NemicoScelto.AllAttacco(DatiDiPosizione);
            EccoloCheArriva = setInterval(() => {if(!DatiDiPosizione.AllAttacco){Colpito(Protagonista,DatiDiPosizione,EccoloCheArriva); if(Protagonista.vita == 0){Fine(Partita,DatiDiPosizione,MirID,Spara,false,NemicoScelto);}}},10); 
        }
        else
        {   
            if(!DatiDiPosizione.InPausa)
            {
            NemicoScelto.Moto(DatiDiPosizione);
            if(MirID == undefined)
            {
                MirID = setInterval(() => {AggiornaMirino(ArmaPresa,DatiDiPosizione.distanza); if(!DatiDiPosizione.Corri && !DatiDiPosizione.InMoto){clearInterval(MirID); MirID = undefined;}},10);
            }
            }
        }
        }
    },4000/difficoltà);
}
function VaiVaiVai()
{
    Nemici.forEach(N => {if(sessionStorage.getItem("Nemico scelto") == N.nome){NemicoScelto = N;}});
    Armi.forEach(A => {if(sessionStorage.getItem("ShotgunEquipaggiato") == A.nome){ShotgunEquipaggiato = A;} else if (sessionStorage.getItem("AssaltoEquipaggiato") == A.nome){AssaltoEquipaggiato = A;} else if (sessionStorage.getItem("CecchinoEquipaggiato") == A.nome){CecchinoEquipaggiato = A;}});
    Mischie.forEach(M => {if(sessionStorage.getItem("MischiaEquipaggiata") == M.nome){MischiaEquipaggiata = M;}})
    difficoltà = Number(sessionStorage.getItem("Difficoltà"));
    AggiornaImpostazioni();
    Gioco(Protagonista,ShotgunEquipaggiato,AssaltoEquipaggiato,CecchinoEquipaggiato,MischiaEquipaggiata,NemicoScelto,DatiDiPosizione);
}
