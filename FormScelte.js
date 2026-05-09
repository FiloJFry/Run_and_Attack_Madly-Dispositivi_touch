let BottoneConferma = document.querySelector('#Conferma');
function SegnaRisposta(classe,nome,s)
{   
    document.querySelectorAll(`${classe}`).forEach(Blocco => {Blocco.style.backgroundColor = "black"});
    switch(classe)
    {
        case '.N':
        Nemici.forEach(N => {if(N.nome == `${nome}`){NemicoScelto = N;}});
        Nemici.forEach(N => {ColoraNemico(N.nome)});
        break;

        case '.M':
        Mischie.forEach(M => {if(M.nome == `${nome}`){MischiaEquipaggiata = M;}});
        break;

        case '.D':
        difficoltà = s;
        break;

        default:
        Armi.forEach(A => {if(A.nome == `${nome}`){if(s == 1){ShotgunEquipaggiato = A;} else if(s == 2){AssaltoEquipaggiato = A;} else if(s == 3){CecchinoEquipaggiato = A;}}});
        break;
    }
    document.querySelector(`#${nome.replace(/\s/g, '')}`).style.backgroundColor = "blue"; 
}
function ColoraNemico(Nome)
{
    switch(window.localStorage.getItem(`${Nome}`))
    {   
        case 1:
        document.querySelector(`#${Nome.replace(/\s/g, '')}`).style.backgroundColor = "green";
        break;
    
        case 2:
        document.querySelector(`#${Nome.replace(/\s/g, '')}`).style.backgroundColor = "orange";
        break;
    
        case 3:
        document.querySelector(`#${Nome.replace(/\s/g, '')}`).style.backgroundColor = "tomato";
        break;
        
        case 4:
        document.querySelector(`#${Nome.replace(/\s/g, '')}`).style.backgroundColor = "purple";
        break;
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
        setTimeout(() =>  {BottoneConferma.classList.remove('Scuoti'); BottoneConferma.textContent = "Battaglia battaglia battaglia!";},1000);
    }
}
