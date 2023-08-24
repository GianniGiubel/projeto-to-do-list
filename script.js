const listaTarefa=document.querySelector('#listaTarefa')
const nomeTarefa=document.querySelector('#nova_tarefa')
const novaTarefa=document.querySelector('#novaTarefa')
const editTarefa=document.querySelector('#editTarefa')
const div_edit=document.querySelector('#div_edit')
const btn_addTarefa=document.querySelector('#btn_addTarefa')
const btn_cancelarTarefa=document.querySelector('#btn_cancelarTarefa')
const btn_novaTarefa=document.querySelector('#btn_novaTarefa')
const btn_confirmarEditTarefa=document.querySelector('#btn_confirmarEditTarefa')
const btn_cancelarEditTarefa=document.querySelector('#btn_cancelarEditTarefa')

const div_relogio=document.querySelector('#hora')
const div_alarme=document.querySelector('#div_alarme')
const hora_alarme=document.querySelector('#hora_alarme')
const tempo_alarme=document.querySelector('#tempo_alarme')
const btn_ativar=document.querySelector('#btn_ativar')
const btn_parar=document.querySelector('#btn_parar')
const som_alarme= new Audio("#"); som_alarme.loop=-1;
let testeAlarme
let tempoAtual
let tempoAlarme
let alarme_ativado=false
let alarme_tocando=false

const novoAlarme=(alarmeNovo)=> {
    const todasTarefas=document.querySelectorAll('.tarefa')
    todasTarefas.forEach((elemento)=> {
        let divTempoAlarme=elemento.querySelector("#tempo_alarme")
        if(divTempoAlarme.innerText===testeAlarme){
            divTempoAlarme.innerText=alarmeNovo                        
        }
    })    
}

btn_ativar.addEventListener("click",(e)=> {
    tempoAtual=Date.now()
    tempoAlarme=tempoAtual+(hora_alarme.value*1000)    
    let alarme=new Date(tempoAlarme)      
    alarme=alarme.toLocaleTimeString()    
    novoAlarme(alarme)
    div_alarme.classList.toggle("hide") 
    hora_alarme.value=""
    if(alarme) {
        setTimeout()
    }    
})

const relogio=()=> {
    const data=new Date()
    div_relogio.innerHTML=data.toLocaleTimeString()
}

setInterval(relogio,1000)

let tarefaAntiga
let indice=0

const criarTarefa=(tarefa)=> {
    const novoElemento=document.createElement("div")
    novoElemento.setAttribute("id","tarefa"+indice)
    novoElemento.setAttribute("class","tarefa")
    listaTarefa.appendChild(novoElemento)

    const elementoAlarme=document.createElement("div")
    elementoAlarme.setAttribute("id","tempo_alarme")
    elementoAlarme.innerHTML="00:00:00"
    novoElemento.appendChild(elementoAlarme)

    const novoParagrafo=document.createElement("p")
    novoParagrafo.innerHTML=tarefa
    novoElemento.appendChild(novoParagrafo)

    const divIcones=document.createElement("div")
    divIcones.setAttribute("id","div_icones")
    novoElemento.appendChild(divIcones)    

    const iCompletar=document.createElement("i")
    iCompletar.setAttribute("class","fa-solid fa-check completar")
    divIcones.appendChild(iCompletar)
    const iEditar=document.createElement("i")
    iEditar.setAttribute("class","fa-solid fa-pen editar")
    divIcones.appendChild(iEditar)
    const iAlarme=document.createElement("i")
    iAlarme.setAttribute("class","fa-solid fa-bell alarme")
    divIcones.appendChild(iAlarme)
    const iExcluir=document.createElement("i")
    iExcluir.setAttribute("class","fa-solid fa-trash-can excluir")
    divIcones.appendChild(iExcluir) 
    
    indice++
}

btn_novaTarefa.addEventListener("click",()=> {
    novaTarefa.classList.toggle("hide")
    nomeTarefa.focus()
})

btn_addTarefa.addEventListener("click",()=> {
    if(nomeTarefa.value==""){
        alert("Por Favor! Digite um nome para sua Tarefa!")
    } else {
        criarTarefa(nomeTarefa.value)
        novaTarefa.classList.toggle("hide")
        nomeTarefa.value=""
    }
})

btn_cancelarTarefa.addEventListener("click",()=> {
    novaTarefa.classList.toggle("hide")
    nomeTarefa.value=""
})

document.addEventListener("click",(e)=> {
    let elemento=e.target    
    let elementoP=elemento.parentNode.previousElementSibling    
    let elementoDivPai=elementoP.parentNode
    let tituloTarefa
    let horaTarefa    

    if(elementoDivPai && elementoDivPai.querySelector("p")) {
        tituloTarefa = elementoDivPai.querySelector("p").innerText      
    }
    if(elementoDivPai && elementoDivPai.querySelector("#tempo_alarme")) {
        horaTarefa= elementoDivPai.querySelector("#tempo_alarme").innerText
    }

    if(elemento.classList.contains("completar")){
        elemento.classList.toggle("feito")
        elementoP.classList.toggle("pFeito")
    }
    if(elemento.classList.contains("excluir")) {
        elementoDivPai.remove()
    }
    if(elemento.classList.contains("editar")) {
        div_edit.classList.toggle("hide")
        editTarefa.focus()
        editTarefa.value=tituloTarefa
        tarefaAntiga=tituloTarefa        
    }
    if(elemento.classList.contains("alarme")) {
        div_alarme.classList.toggle("hide")
        elemento.classList.toggle("feito") 
        hora_alarme.focus() 
        testeAlarme=horaTarefa
    }
})

const updateTarefa=(texto)=> {
    const todasTarefas= document.querySelectorAll('.tarefa')
    todasTarefas.forEach((elemento)=> {
        let tituloTarefa=elemento.querySelector("p")
        if(tituloTarefa.innerText===tarefaAntiga){
            tituloTarefa.innerText=texto
        }
    })
}

btn_confirmarEditTarefa.addEventListener("click",(e)=> {
    e.preventDefault()
    const tarefaEditada=editTarefa.value
    if(tarefaEditada){
        updateTarefa(tarefaEditada)
    }
    div_edit.classList.toggle("hide")
})

btn_cancelarEditTarefa.addEventListener("click",(e)=> {
    e.preventDefault()
    div_edit.classList.toggle("hide")
})
 
