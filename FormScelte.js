let BottoneConferma = document.querySelector('#Conferma');
function SegnaRisposta(classe,id)
{
    document.querySelectorAll(`${classe}`).forEach(Blocco => {Blocco.style.backgroundColor = "black"});
    Nemici.forEach(N => {ColoraNemico(N.nome)});
    document.querySelector(`#${id}`).style.backgroundColor = "blue";
}
function ScegliNemico(classe,nome)
{
    Nemici.forEach(N => {if(N.nome == `${nome}`){NemicoScelto = N;}});
    SegnaRisposta(classe,nome.replace(/\s/g, ''));
}
function ScegliMischia(classe,nome)
{
    Mischie.forEach(M => {if(M.nome == `${nome}`){MischiaEquipaggiata = M;}});
    SegnaRisposta(classe,nome.replace(/\s/g, ''));
}
function ScegliArma(classe,nome,s)
{
    Armi.forEach(A => {if(A.nome == `${nome}`){if(s == 1){ShotgunEquipaggiato = A;} else if(s == 2){AssaltoEquipaggiato = A;} else if(s == 3){CecchinoEquipaggiato = A;}}});
    SegnaRisposta(classe,nome.replace(/\s/g, ''));
}
function ScegliDifficoltà(classe,id,d)
{
    difficoltà = d;
    SegnaRisposta(classe,id);
}
function ColoraNemico(Nome)
{
    if(window.localStorage.getItem(`${Nome}`) == 1)
    {
        document.querySelector(`#${Nome.replace(/\s/g, '')}`).style.backgroundColor = "green";
    }
    if(window.localStorage.getItem(`${Nome}`) == 2)
    {
        document.querySelector(`#${Nome.replace(/\s/g, '')}`).style.backgroundColor = "orange";
    }
    if(window.localStorage.getItem(`${Nome}`) == 3)
    {
        document.querySelector(`#${Nome.replace(/\s/g, '')}`).style.backgroundColor = "tomato";
    }
    if(window.localStorage.getItem(`${Nome}`) == 4)
    {
        document.querySelector(`#${Nome.replace(/\s/g, '')}`).style.backgroundColor = "purple";
    }
}
function Conferma()
{
    if(NemicoScelto.nome != "" && MischiaEquipaggiata.nome != "" && ShotgunEquipaggiato.nome != "" && AssaltoEquipaggiato.nome != "" && CecchinoEquipaggiato.nome != "" && difficoltà > 0)
    {
        sessionStorage.setItem("Nemico scelto",NemicoScelto.nome);
        sessionStorage.setItem("ShotgunEquipaggiato",ShotgunEquipaggiato.nome);
        sessionStorage.setItem("AssaltoEquipaggiato",AssaltoEquipaggiato.nome);
        sessionStorage.setItem("CecchinoEquipaggiato",CecchinoEquipaggiato.nome);
        sessionStorage.setItem("MischiaEquipaggiata",MischiaEquipaggiata.nome);
        sessionStorage.setItem("Difficoltà",`${difficoltà}`);
        window.location.href = "./CampoDiBattaglia.html";
    } 
    else
    {
        BottoneConferma.textContent = "Controlla le risposte"; 
        BottoneConferma.classList.add('Scuoti'); 
        setTimeout(() =>  {BottoneConferma.classList.remove('Scuoti'); BottoneConferma.textContent = "Battaglia battaglia battaglia!";},1000)
    }
}