let MostraSuoni = window.localStorage.getItem("MostraSuoni") == null;
let filtro = window.localStorage.getItem("Filtro");
let InvertiVA = window.localStorage.getItem("InvertiVA") != null;
let InvertiMC = window.localStorage.getItem("InvertiMC") != null;
let BottoneAltSopra = window.localStorage.getItem("BottoneAltSopra") != null;
let PannelloOpzioni = document.querySelector('#Opzioni');
let BottoneSalva = document.querySelector('#Salva');
let BottoneSuoni = document.querySelector('#MostraISuoni');
let BottoneInvertiVA = document.querySelector("#InvertiVA");
let BottoneInvertiMC = document.querySelector("#InvertiMC");
let TastoBottoneAltSopra = document.querySelector("#BottoneAltSopra");
let BottoneFiltro = document.querySelector('#Filtro');
let PannelloTutorial = document.querySelector('#Tutorial');
let FiltroColore = document.querySelector("#filtroColore");
let PosizioniSuper = document.querySelectorAll(".Super");
let PosizioniCambio = document.querySelectorAll(".Cambio");
function AlternaSiONo(bottone,sì)
{
    if(sì)
    {
        bottone.style.backgroundColor = "green";
        bottone.textContent = "√";
    }
    else
    {
        bottone.style.backgroundColor = "red";
        bottone.textContent = "x";
    }
}
function Filtra(filtro)
{   
    if(FiltroColore != null)
    {
    if(filtro != null)
    {   
        FiltroColore.innerHTML = `*{filter: grayscale(${100/filtro}%); -webkit-filter: grayscale(${100/filtro}%);}`;
    }
    else
    {
        FiltroColore.innerHTML = `*{filter: none; -webkit-filter: none;}`;
    }
    }
    else
    {
    if(filtro == 1)
    {
        Elementi.forEach(E => {E.classList.remove("MezzoFiltro"); E.classList.add("Filtro");});
    }
    else if(filtro == 2)
    {
        Elementi.forEach(E => {E.classList.remove("Filtro"); E.classList.add("MezzoFiltro");});
    }
    else
    {
        Elementi.forEach(E => {E.classList.remove("Filtro"); E.classList.remove("MezzoFiltro");});
    }
    }
}
function AggiornaImmagineImpostazioni()
{   
    PosizioniSuper.forEach((S,i) => {if(window.localStorage.getItem(S.name) != null){S.value = window.localStorage.getItem(S.name);} else{S.value = i + 1;}});
    PosizioniCambio.forEach((S,i) => {if(window.localStorage.getItem(S.name) != null){S.value = window.localStorage.getItem(S.name);} else{S.value = i + 1;}});
    AlternaSiONo(BottoneSuoni,MostraSuoni);
    AlternaSiONo(BottoneInvertiVA,InvertiVA);
    AlternaSiONo(BottoneInvertiMC,InvertiMC);
    AlternaSiONo(TastoBottoneAltSopra,BottoneAltSopra);
    if(filtro != null)
    {
        if(filtro == 1)
        {
            BottoneFiltro.textContent = "Bianco e nero";
        }
        else
        {
            BottoneFiltro.textContent = "Flashback";
        }
    }
    else
    {
        BottoneFiltro.textContent = "Predefinito";
    }
}
function SmistaBottoneCambio(bottone)
{   
    if(BottoneAltSopra)
    {
        switch(window.localStorage.getItem(bottone.id))
        {
            case "1":
            bottone.style.bottom = "15vh";
            if(InvertiMC)
            {
                bottone.style.left = "0vw";
            }
            else
            {
                bottone.style.right = "7.5vw";
            }
            break;

            case "2":
            bottone.style.bottom = "15vh";
            if(InvertiMC)
            {
                bottone.style.left = "7.5vw";
            }
            else
            {
                bottone.style.right = "0vw";
            }
            break;

            case "3":
            bottone.style.bottom = "0vh";
            if(InvertiMC)
            {
                bottone.style.left = "0vw";
            }
            else
            {
                bottone.style.right = "7.5vw";
            }
            break;

            case "4":
            bottone.style.bottom = "0vh";
            if(InvertiMC)
            {
                bottone.style.left = "7.5vw";
            }
            else
            {
                bottone.style.right = "0vw";
            }
            break;
        }
    }
    else
    {
        switch(window.localStorage.getItem(bottone.id))
        {
            case "1":
            bottone.style.bottom = "30vh";
            if(InvertiMC)
            {
                bottone.style.left = "0vw";
            }
            else
            {
                bottone.style.right = "7.5vw";
            }
            break;

            case "2":
            bottone.style.bottom = "30vh";
            if(InvertiMC)
            {
                bottone.style.left = "7.5vw";
            }
            else
            {
                bottone.style.right = "0vw";
            }
            break;

            case "3":
            bottone.style.bottom = "15vh";
            if(InvertiMC)
            {
                bottone.style.left = "0vw";
            }
            else
            {
                bottone.style.right = "7.5vw";
            }
            break;

            case "4":
            bottone.style.bottom = "15vh";
            if(InvertiMC)
            {
                bottone.style.left = "7.5vw";
            }
            else
            {
                bottone.style.right = "0vw";
            }
            break;
        }
    }
}
function SmistaSuperBottone(bottone)
{
    switch(window.localStorage.getItem(bottone.id))
        {
            case "1":
            bottone.style.bottom = "25vh";
            bottone.style.left = "17vw";
            break;

            case "2":
            bottone.style.bottom = "25vh";
            bottone.style.left = "68vw";
            break;

            case "3":
            bottone.style.bottom = "0vh";
            bottone.style.left = "17vw";
            break;

            case "4":
            bottone.style.bottom = "0vh";
            bottone.style.left = "68vw";
            break;
        }
}
function AggiornaImpostazioni()
{   
    BottoniArma.forEach(A => {A.style.cssText = "";});
    BottoniSuperComandi.forEach(A => {A.style.cssText = "";});
    hp.style.cssText = "";
    InfoArmi.forEach(I => {I.style.cssText = "";});
    BottoniMovimento.forEach(M => {M.style.cssText = "";});
    BottoneEstensione.style.cssText = "";
    if(!MostraSuoni)
    {
        RumoriArma.style.color = "transparent";
    }
    else if(Giocando)
    {
        RumoriArma.style.color = "white";
    }
    if(InvertiVA)
    {
        hp.style.right = "1vw";
        InfoArmi.forEach(I => {I.style.left = "1vw";});
        PiuInfo.style.left = "2vw";
    }
    else
    {
        hp.style.right = "";
        InfoArmi.forEach(I => {I.style.right = "1vw";});
        PiuInfo.style.left = "79vw";
    }
    if(BottoneAltSopra)
    {
        BottoneEstensione.style.bottom = "30vh";
    }
    else
    {
        BottoneEstensione.style.bottom = "0vh";
    }
    if(InvertiMC)
    {
        BottoniMovimento.forEach(M => {M.style.left = "86vw";});
        BottoneEstensione.style.left = "0vw";
    }
    else
    {
        BottoniMovimento.forEach(M => {M.style.left = "4vw";});
        BottoneEstensione.style.right = "0vw";
    }
    BottoniArma.forEach(A => {SmistaBottoneCambio(A);});
    BottoniSuperComandi.forEach(B => {SmistaSuperBottone(B);});
    AggiornaImmagineImpostazioni();
}
function ControllaPosizioni()
{
    let esito = true;
    for(let c = 0;c < PosizioniSuper.length - 1;c++)
    { 
        if(PosizioniSuper[c].value == PosizioniSuper[c + 1].value)
        {
            esito = false;
        }
    }
    if(esito)
    {
        for(let i = 0;i < PosizioniCambio.length - 1;i++)
        {
            if(PosizioniCambio[i].value == PosizioniCambio[i + 1].value)
            {
                esito = false;
            }
        }
    }
    return esito;
}
function Salva()
{   
    if(ControllaPosizioni())
    {
        if(!MostraSuoni)
        {
            window.localStorage.setItem("MostraSuoni",MostraSuoni);
        }
        else
        {
            window.localStorage.removeItem("MostraSuoni");
        }
        if(filtro != null)
        {
            window.localStorage.setItem("Filtro",filtro);
        }
        else
        {
            window.localStorage.removeItem("Filtro");
        }
        if(InvertiVA)
        {
            window.localStorage.setItem("InvertiVA",InvertiVA);
        }
        else
        {
            window.localStorage.removeItem("InvertiVA");
        }
        if(InvertiMC)
        {
            window.localStorage.setItem("InvertiMC",InvertiMC);
        }
        else
        {
            window.localStorage.removeItem("InvertiMC");
        }
        if(BottoneAltSopra)
        {
            window.localStorage.setItem("BottoneAltSopra",BottoneAltSopra);
        }
        else
        {
            window.localStorage.removeItem("BottoneAltSopra");
        }
        PosizioniSuper.forEach(S => {window.localStorage.setItem(S.name,S.value)});
        PosizioniCambio.forEach(S => {window.localStorage.setItem(S.name,S.value)});
        if(FiltroColore == null)
        {
            AggiornaImpostazioni();
        }
        else
        {
            AggiornaImmagineImpostazioni();
        }
        PannelloOpzioni.close();
    }  
    else
    {   
        BottoneSalva.textContent = "Posizioni non valide";
        BottoneSalva.classList.add('animated','Scuoti');
        setTimeout(() => {BottoneSalva.textContent = "Salva"; BottoneSalva.classList.remove('animated','Scuoti');},1000);
    }
}
function Reset()
{
    window.localStorage.removeItem("MostraSuoni");
    window.localStorage.removeItem("Filtro");
    window.localStorage.removeItem("InvertiVA");
    window.localStorage.removeItem("InvertiMC");
    window.localStorage.removeItem("BottoneAltSopra");
    MostraSuoni = true;
    filtro = null;
    InvertiVA = false;
    InvertiMC = false;
    BottoneAltSopra = false;
    Filtra(filtro);
    PosizioniCambio.forEach((A,i) => {window.localStorage.removeItem(A.name);});
    PosizioniSuper.forEach((A,i) => {window.localStorage.removeItem(A.name);});
    if(FiltroColore == null)
    {
        AggiornaImpostazioni();
    }
    else
    {
        AggiornaImmagineImpostazioni();
    }
    PannelloOpzioni.close();
}