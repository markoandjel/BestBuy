import {removeAllChildNodes} from './main.js'
import { Kategorija } from './kategorija.js'
import {Proizvodjac} from './proizvodjac.js'
export class SecondPage
{
    constructor(kontejner,kategorijaID)
    {
        this.kontejner=kontejner
        this.kategorijaID=kategorijaID
    }

    crtaj() 
    {
        removeAllChildNodes(this.kontejner)

        let divZaOpcije=document.createElement('div')
        divZaOpcije.className="divZaOpcije"
        this.kontejner.appendChild(divZaOpcije)

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
        fetch(`http://localhost:3000/getAll_proizvodi`)
            .then(p => {
                p.json().then(
                    data => {
                        data.forEach(el => {
                            if (el.tip_proizvod == this.kategorijaID) {
                                fetch(`http://localhost:3000/getAll_proizvodjaci`)
                                    .then(p => {
                                        p.json().then(data2=>
                                            data2.forEach(el=>{
                                                var p=new Proizvodjac(el._id,el.naziv)
                                                proizvodjaci.push(p)
                                            })
                                            

                                        )
                                        
                                        
                                })
                                console.log(proizvodjaci[0]) 
                            }
                        });
                    }
                )
            })




    }


}
