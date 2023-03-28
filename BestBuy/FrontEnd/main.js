import {Prodavnica} from './prodavnica.js'
import { Kategorija } from './kategorija.js'
import {Proizvod_prodavnica} from './proizvod_prodavnica.js'
import { SecondPage } from './secondpage.js'

let divZaNaslov=document.createElement("div")
divZaNaslov.className="divZaNaslov"
document.body.appendChild(divZaNaslov)

let naslov=document.createElement("title")
naslov.innerHTML="BestBuy"
naslov.addEventListener("click",()=>{
    let p=document.querySelectorAll('.divPopularno')
    if(p.length==0)
    main()
})
divZaNaslov.appendChild(naslov)


//glavni deo
let divGlavni = document.createElement('div')
divGlavni.className = "divGlavni"
document.body.appendChild(divGlavni)

let p=document.querySelectorAll('.divPopularno')
console.log(p)
if(p.length==0){
    main()}

function main()
{
    //popularni deo
    let divPopularno = document.createElement('div')
    divPopularno.className = "divPopularno"
    divGlavni.appendChild(divPopularno)

    let divNaslov = document.createElement('div')
    divNaslov.className = "divNaslov"
    divNaslov.innerHTML = "Popusti"
    divPopularno.appendChild(divNaslov)

    var proizvod_prodavnica = []
    fetch("http://localhost:3000/getAll_proizvod_prodavnica")
        .then(p => {
            p.json().then(
                data => {
                    data.forEach(el => {
                        let prod = new Proizvod_prodavnica(el._id, el.prodavnica, el.proizvod, el.na_stanju, el.popust, el.cena)
                        proizvod_prodavnica.push(prod)
                    });
                    crtajPopularno(proizvod_prodavnica, divPopularno)
                }
            )
        })


    //ostale kategorije
    let divOstaleKategorije = document.createElement('div')
    divOstaleKategorije.className = "divOstaleKategorije"
    divGlavni.appendChild(divOstaleKategorije)

    var kategorije = []
    fetch("http://localhost:3000/getAll_tip_proizvod")
        .then(p => {
            p.json().then(
                data => {
                    data.forEach(el => {
                        let k = new Kategorija(el._id, el.naziv)
                        kategorije.push(k)
                    });
                    crtajKategorije(kategorije, divOstaleKategorije)
                }
            )
        })


}


export function removeAllChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function crtajKategorije(kategorije,host){
    kategorije.forEach(k=>{
        let divKategorijaKartica=document.createElement('div')
        divKategorijaKartica.className="divKategorijaKartica"
        divKategorijaKartica.innerHTML=k.naziv
        divKategorijaKartica.value=k.id
        divKategorijaKartica.addEventListener("click",()=>{
            var host=document.querySelector('.divGlavni')
            if(host!=null){
                var s=new SecondPage(host)
                s.crtaj()
            }
        }
        )
        host.appendChild(divKategorijaKartica) 
    })
}

function crtajPopularno(proizvod_prodavnica,host){

    var sortiranaLista=proizvod_prodavnica.sort((a,b)=>a.popust>b.popust)
    var listaZaPrikaz=sortiranaLista.slice(0,15)
    listaZaPrikaz.forEach(l=>{
        let divZaProizvode=document.createElement('div')
        divZaProizvode.className="divZaProizvode"
        let divZaSliku=document.createElement('div')
        divZaSliku.className="divZaSliku"
        divZaSliku.innerHTML="SLIKA"
        divZaProizvode.appendChild(divZaSliku)

        let divZaOpisProizvoda=document.createElement('div')
        divZaOpisProizvoda.className="divZaOpisProizvoda"
        divZaProizvode.appendChild(divZaOpisProizvoda)

        let divZaLabela=document.createElement('div')
        divZaLabela.className="divZaLabela"
        divZaOpisProizvoda.appendChild(divZaLabela)

        let nizLabela=["Popust","Cena","Prodavnica"]
        nizLabela.forEach(n=>{
            let labela=document.createElement("label");
            labela.innerHTML=n+":";
            labela.className="ProizvodLabela";
            divZaLabela.appendChild(labela);
        })

        let divZaInformacije=document.createElement('div')
        divZaInformacije.className="divZaInformacije"
        divZaOpisProizvoda.appendChild(divZaInformacije)

        var labelZaInformaciju=document.createElement("label");
        labelZaInformaciju.innerHTML=l.popust
        divZaInformacije.appendChild(labelZaInformaciju);

        var labelZaInformaciju=document.createElement("label");
        labelZaInformaciju.innerHTML=Math.round(l.cena*100/l.popust*100)/100
        divZaInformacije.appendChild(labelZaInformaciju);

        fetch(`http://localhost:3000/getOne_prodavnica/${l.prodavnica}`)
        .then(p=>{
            p.json().then(
                data=>{
                    let p = new Prodavnica(data._id,data.naziv,data.adresa,data.telefon,data.sajt)

                    var labelZaInformaciju=document.createElement("label");
                    labelZaInformaciju.innerHTML=p.naziv
                    divZaInformacije.appendChild(labelZaInformaciju);
                }
            )
    })

        host.appendChild(divZaProizvode)
    })
}

