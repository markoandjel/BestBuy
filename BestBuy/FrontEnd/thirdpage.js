import {removeAllChildNodes} from './main.js'
import { Prodavnica } from './prodavnica.js'
export class ThirdPage{
    constructor()
    {
        
    }
    crtaj(proiz_prod)
    {
        var divGlavni=document.querySelector('.divGlavni')
        removeAllChildNodes(divGlavni)

        let divProizvod=document.createElement('div')
        divProizvod.className='divProizvod'
        divGlavni.appendChild(divProizvod)

        let divZaSliku=document.createElement('div')
        divZaSliku.className="divZaSlikuProizvoda"
        divZaSliku.innerHTML="SLIKA"
        divProizvod.appendChild(divZaSliku)

        let divZaOpisProizvodaPonuda=document.createElement('div')
        divZaOpisProizvodaPonuda.className='divZaOpisProizvodaPonuda'
        divProizvod.appendChild(divZaOpisProizvodaPonuda)

        fetch(`http://localhost:3000/getOne_proizvod/${proiz_prod[0].proizvod}`)
            .then(p => {
                p.json().then(data => {
                    let divZaNaslovProizovda = document.createElement('div')
                    divZaNaslovProizovda.className = 'divZaNaslovProizovda'
                    divZaNaslovProizovda.innerHTML = data.naziv
                    divZaOpisProizvodaPonuda.appendChild(divZaNaslovProizovda)

                    let divOpis = document.createElement('div')
                    divOpis.className = "divOpis"
                    divOpis.innerHTML = data.opis
                    divZaOpisProizvodaPonuda.appendChild(divOpis)
                    let labelaCena = document.createElement('label')
                    labelaCena.className = 'labelaCena'
                    labelaCena.innerHTML ="Cena od " +Math.min(...proiz_prod.map(el => el.cena)) + " cena do " + Math.max(...proiz_prod.map(el => el.cena)) + " rsd"
                    divZaOpisProizvodaPonuda.appendChild(labelaCena)

                    let labelaBrojProdavnica = document.createElement('label')
                    labelaBrojProdavnica.className = 'labelaBrojProdavnica'
                    labelaBrojProdavnica.innerHTML = proiz_prod.length + ' prodavnica'
                    divZaOpisProizvodaPonuda.appendChild(labelaBrojProdavnica)
                })

            })
        let divKarticaZaPonudu=document.createElement('div')
        divKarticaZaPonudu.className='divKarticaZaPonudu'

        divGlavni.appendChild(divKarticaZaPonudu,divKarticaZaPonudu)

        this.crtajPonude(proiz_prod,divKarticaZaPonudu)

        
    }
    crtajPonude(proiz_prod, divKarticaZaPonudu) {
        var prodavnice = []
        fetch(`http://localhost:3000/getAll_prodavnice`)
            .then(p => {
                p.json().then(data => {
                    data.forEach(el => {
                        var prod = new Prodavnica(el._id, el.naziv, el.adresa, el.telefon, el.sajt)
                        prodavnice.push(prod)
                    })
                    this.crtajPonudePonovo(proiz_prod, divKarticaZaPonudu, prodavnice)
                })

            })
    }
    crtajPonudePonovo(proiz_prod,divKarticaZaPonudu,prodavnice)
    {
        console.log(proiz_prod,prodavnice)
        var res = prodavnice.filter(n=>proiz_prod.some(m=>m.prodavnica==n.id))

        console.log(res)
        res.forEach(el => {
            let divKartica = document.createElement('div')
            divKartica.className = 'divKartica'
            divKarticaZaPonudu.appendChild(divKartica)

            let divNaslovProdavnice=document.createElement('div')
            divNaslovProdavnice.className = 'divNaslovProdavnice'
            divNaslovProdavnice.innerHTML = el.naziv
            divKartica.appendChild(divNaslovProdavnice)
            let label=document.createElement('label')
            label.innerHTML='Na stanju '
            divKartica.appendChild(label)

            let divNaStanju=document.createElement('div')
            divNaStanju.className = 'divNaStanju'
            var pprod=proiz_prod.find(x=>x.prodavnica==el.id)
            if(pprod.na_stanju)
                divNaStanju.style.backgroundColor='green'            
            else divNaStanju.style.backgroundColor='red'  
            label.appendChild(divNaStanju)

            let labelCena=document.createElement('label')
            labelCena.innerHTML=pprod.cena
            divKartica.appendChild(labelCena)

            let dugmePoseti=document.createElement('button')
            dugmePoseti.innerHTML="Poseti"
            dugmePoseti.addEventListener('click',()=>{location.href=el.sajt})
            divKartica.appendChild(dugmePoseti)


        })
        
    }
}