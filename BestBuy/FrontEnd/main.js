import {Prodavnica} from './prodavnica.js'
import {getAllKategorije} from './kategorija.js'

let divZaNaslov=document.createElement("div")
divZaNaslov.className="divZaNaslov"
document.body.appendChild(divZaNaslov)

let naslov=document.createElement("title")
naslov.innerHTML="BestBuy"
divZaNaslov.appendChild(naslov)


//glavni deo
let divGlavni=document.createElement('div')
divGlavni.className="divGlavni"
document.body.appendChild(divGlavni)

//popularni deo
let divPopularno=document.createElement('div')
divPopularno.className="divPopularno"
divGlavni.appendChild(divPopularno)



//ostale kategorije
let divOstaleKategorije=document.createElement('div')
divOstaleKategorije.className="divOstaleKategorije"
divGlavni.appendChild(divOstaleKategorije)

let kategorije=[]
await getAllKategorije(kategorije)
console.log(kategorije)

let divKategorijaKartica=document.createElement('div')
divKategorijaKartica.className="divKategorijaKartica"
divOstaleKategorije.appendChild(divKategorijaKartica)


export function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

