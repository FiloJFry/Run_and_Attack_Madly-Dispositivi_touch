let MostraSuoni = true;
let PannelloOpzioni = document.querySelector('#Opzioni');
let BottoneSalva = document.querySelector('#Salva');
let BottoneSuoni = document.querySelector('#MostraISuoni');
function AggiornaTasti()
{   
    if(window.localStorage.getItem('MostraSuoni') != null)
    {
        BottoneSuoni.style.backgroundColor = 'red';
        BottoneSuoni.textContent = 'x';
    }
    else
    {
        BottoneSuoni.style.backgroundColor = 'green';
        BottoneSuoni.textContent = '√';
    }
}