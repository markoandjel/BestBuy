import {removeAllChildNodes} from './main.js'
import { Kategorija } from './kategorija.js'
import {Proizvodjac} from './proizvodjac.js'
import { Proizvod } from './proizvod.js'
import { Prodavnica } from './prodavnica.js'
import { Proizvod_prodavnica } from './proizvod_prodavnica.js'
import { ThirdPage } from './thirdpage.js'
export class SecondPage
{
    constructor(kontejner,kategorijaID)
    {
        this.kontejner=kontejner
        this.kategorijaID=kategorijaID
        this.filteri=null
        this.sviProizvodi=null
    }

    crtaj() 
    {
        removeAllChildNodes(this.kontejner)

        let divZaPrikaz=document.createElement('div')
        divZaPrikaz.className="divZaPrikaz"
        this.kontejner.appendChild(divZaPrikaz)

        let divZaOpcije=document.createElement('div')
        divZaOpcije.className="divZaOpcije"
        divZaPrikaz.appendChild(divZaOpcije)

        let naslovKategorije=document.createElement('title')
        naslovKategorije.className='naslovKategorije'

        divZaOpcije.appendChild(naslovKategorije)

        fetch(`http://localhost:3000/getOne_tip_proizvod/${this.kategorijaID}`)
        .then(p => {
            p.json().then(
                data => {
                    var kat =new Kategorija(data._id, data.naziv)
                    naslovKategorije.innerHTML=kat.naziv
                }
            )
        })

        let naslovProizvodjaca=document.createElement('title')
        naslovProizvodjaca.className="naslovProizvodjaca"
        naslovProizvodjaca.innerHTML="Proizvodjaci:"
        divZaOpcije.appendChild(naslovProizvodjaca)
        
        var proizvodjaci=[]
        var pom = []
        fetch(`http://localhost:3000/getAll_proizvodi`)
            .then(p => {
                p.json().then(
                    data => {
                        data.forEach(el => {
                            if (el.tip_proizvod == this.kategorijaID) {
                                fetch(`http://localhost:3000/getAll_proizvodjaci`)
                                    .then(p => {
                                        p.json().then(data2=>{
                                            data2.forEach(elemenet=>{
                                                var p=new Proizvodjac(elemenet._id,elemenet.ime)
                                                proizvodjaci.push(p)   
                                            })
                                            proizvodjaci.forEach(proiz => {                                        
                                            if(proiz.id === el.proizvodjac)
                                            {   
                                                pom.push(proiz)
                                            }
                                        
                                        }) 
                                        this.crtajBoxove(pom,divZaOpcije)                
                                    })                                                                           
                                })
                                    
                               
                            }
                        });
                    }
                )
            })




    }

    crtajBoxove(box,host)
    {
        box.forEach(k=>{
            let divProizvodjac=document.createElement('div')
            divProizvodjac.className="divProizvodjac"
            divProizvodjac.value=k.id

            let checkbox1 = document.createElement('input');
            checkbox1.type = 'checkbox';
            checkbox1.value=k.id
            checkbox1.className = "CBox";
            divProizvodjac.appendChild(checkbox1);

            let label1 = document.createElement('label');
            label1.innerHTML = k.naziv;
            divProizvodjac.appendChild(label1);

            host.appendChild(divProizvodjac) 
            })

        let divZaCenu=document.createElement('div')
        divZaCenu.className="divZaCenu"

        host.appendChild(divZaCenu)

        var labele=["Cena od","Cena do"]

        labele.forEach(el=>{
            let labela = document.createElement("labela")
            labela.innerHTML=el
            divZaCenu.appendChild(labela)
            let input=document.createElement('input')
            input.type='number'
            input.className="UnosCene"
            divZaCenu.appendChild(input)
        })

        let dugme=document.createElement("button")
        dugme.className="dugmeZaFiltere"
        dugme.addEventListener("click",()=>this.kreirajFiltere())
        dugme.innerHTML="Primeni filtere"
        divZaCenu.appendChild(dugme)

        this.crtajProizvode()

            
    }

    crtajProizvode()
    {
        var host=document.querySelector('.divZaPrikaz')

        var divZaBrisanje=document.querySelector('.divcinaZaProizvode')
        if(divZaBrisanje!=null)
        {   
            host.removeChild(divZaBrisanje)
            removeAllChildNodes(divZaBrisanje)
        }


        let divcinaZaProizvode=document.createElement('div')
        divcinaZaProizvode.className="divcinaZaProizvode"
        host.appendChild(divcinaZaProizvode)
        
        var proizvodi=[]
        fetch(`http://localhost:3000/getAll_proizvodi`)
            .then(p => {
                p.json().then(data2 => {
                    data2.forEach(el => {
                        if(el.tip_proizvod==this.kategorijaID){
                            var p = new Proizvod(el._id,el.naziv,el.tip_proizvod,el.opis,el.proizvodjac)
                            proizvodi.push(p)
                        }
                    })
                    this.sviProizvodi=proizvodi
                    this.prikazProizvoda(divcinaZaProizvode,proizvodi)
                    
                })
            })
    }
    prikazProizvoda(host,proizvodi)
    {
        if (this.filteri == null || (this.filteri[0] == '' && this.filteri[1] == '' && this.filteri[2].length == 0)) {
            proizvodi.forEach(el => {

                let divZaProizvode = document.createElement('div')
                divZaProizvode.className = "divZaProizvode"

                let divZaSliku = document.createElement('div')
                divZaSliku.className = "divZaSliku"
                divZaSliku.innerHTML = "SLIKA"
                divZaProizvode.appendChild(divZaSliku)

                host.appendChild(divZaProizvode)

                let divZaOpis = document.createElement('div')
                divZaOpis.className = "divZaOpis"
                divZaProizvode.appendChild(divZaOpis)

                let label = document.createElement('label')
                label.innerHTML = el.naziv
                divZaOpis.appendChild(label)
                var proiz_prod = []

                fetch(`http://localhost:3000/getAll_proizvod_prodavnica`)
                    .then(p => {
                        p.json().then(data => {
                            data.forEach(element => {
                                if (element.proizvod == el.id) {
                                    var p = new Proizvod_prodavnica(element._id, element.prodavnica, element.proizvod, element.na_stanju, element.popust, element.cena)
                                    proiz_prod.push(p)
                                }
                            })
                            this.opisProizvoda(divZaOpis, proiz_prod)
                        })
                    })
            })
        }
        else {
            proizvodi.forEach(el => {
                var proiz_prod = []
                fetch(`http://localhost:3000/getAll_proizvod_prodavnica`)
                    .then(p => {
                        p.json().then(data => {
                            data.forEach(element => {
                                if (element.proizvod == el.id && parseInt(element.cena)>parseInt(this.filteri[0])
                                && parseInt(element.cena)<parseInt(this.filteri[1])) {
                                    var p = new Proizvod_prodavnica(element._id, element.prodavnica, element.proizvod, element.na_stanju, element.popust, element.cena)
                                    proiz_prod.push(p)
                                }
                            })
                            if(proiz_prod.length!=0)
                            {
                                var nizFiltriranihProizvoda=[]
                                for (const t of this.sviProizvodi) {
                                    if (this.filteri[2].includes(t.proizvodjac)) {

                                        nizFiltriranihProizvoda.push(t)
                                    }
                                }
                                proiz_prod=nizFiltriranihProizvoda
                                //console.log(this.sviProizvodi,this.filteri[2])
                                let divZaProizvode = document.createElement('div')
                                divZaProizvode.className = "divZaProizvode"

                                let divZaSliku = document.createElement('div')
                                divZaSliku.className = "divZaSliku"
                                divZaSliku.innerHTML = "SLIKA"
                                divZaProizvode.appendChild(divZaSliku)

                                host.appendChild(divZaProizvode)

                                let divZaOpis = document.createElement('div')
                                divZaOpis.className = "divZaOpis"
                                divZaProizvode.appendChild(divZaOpis)

                                let label = document.createElement('label')
                                label.innerHTML = el.naziv
                                divZaOpis.appendChild(label)
                                this.opisProizvoda(divZaOpis, proiz_prod)
                            }
                        })
                    })
            })
        }

        
    }
    opisProizvoda(host,proiz_prod)
    {
        let labelaCena=document.createElement('label')
        labelaCena.className='labelaCena'
        labelaCena.innerHTML=Math.min(...proiz_prod.map(el=>el.cena))+" - "+Math.max(...proiz_prod.map(el=>el.cena))+" rsd"
        host.appendChild(labelaCena)

        let labelBrojProdavnica=document.createElement('label')
        labelBrojProdavnica.className='labelBrojProdavnica'
        labelBrojProdavnica.innerHTML=proiz_prod.length+' prodavnica'
        host.appendChild(labelBrojProdavnica)

        let dugmeUporedi=document.createElement('button')
        dugmeUporedi.className='dugmeUporedi'
        dugmeUporedi.innerHTML='Uporedi cene'
        dugmeUporedi.addEventListener('click',()=>this.uporediCene(proiz_prod))
        host.appendChild(dugmeUporedi)
    }

    kreirajFiltere()
    {
        let t=document.querySelectorAll('.UnosCene')
        let cenaOd=t[0].value
        let cenaDo=t[1].value

        if (parseInt(cenaOd)>parseInt(cenaDo))
        {
            alert('Unos cena nije adekvatan')
            return
        }

        var selectProizvodjaci=[]
        var p=document.querySelectorAll('.CBox')
        p.forEach(el=>{
            if(el.checked==true)
            selectProizvodjaci.push(el.value)
        })

        var filteri=[]
        filteri.push(cenaOd)
        filteri.push(cenaDo)
        filteri.push(selectProizvodjaci)
        this.filteri=filteri
        this.crtajProizvode()
    }
    uporediCene(proiz_prod)
    {
        var t=new ThirdPage()
        t.crtaj(proiz_prod)
    }   
}
    
