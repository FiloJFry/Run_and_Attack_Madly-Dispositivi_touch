let MostraSuoni = window.localStorage.getItem("MostraSuoni") == null;
let filtro = window.localStorage.getItem("Filtro");
let PannelloOpzioni = document.querySelector('#Opzioni');
let BottoneSalva = document.querySelector('#Salva');
let BottoneSuoni = document.querySelector('#MostraISuoni');
let BottoneFiltro = document.querySelector('#Filtro');
let PannelloTutorial = document.querySelector('#Tutorial');
let FiltroColore = document.querySelector("#filtroColore");
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
function AggiornaBottoniImpostazioni()
{
    AlternaSiONo(BottoneSuoni,MostraSuoni);
    if(window.localStorage.getItem("Filtro") != null)
    {
        if(window.localStorage.getItem("Filtro") == 1)
        {
            BottoneFiltro.textContent = "Bianco e nero";
        }
        else
        {
            BottoneFiltro.textContent = "Flashback";
        }
    }
}
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
    AggiornaBottoniImpostazioni();
}
function Salva()
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
        if(FiltroColore == null)
        {
            AggiornaImpostazioni();
        }
        else
        {
            AggiornaBottoniImpostazioni();
        }
        PannelloOpzioni.close();
}
function Reset()
{
    window.localStorage.removeItem("MostraSuoni");
    window.localStorage.removeItem("Filtro");
    if(FiltroColore == null)
    {
        AggiornaImpostazioni();
    }
    else
    {
        AggiornaBottoniImpostazioni();
    }
    PannelloOpzioni.close();
}