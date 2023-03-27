export class Kategorija{
    constructor(id,naziv){
        this.id=id
        this.naziv=naziv
    }
}

export async function getAllKategorije(kategorije){
    await fetch("http://localhost:3000/getAll_tip_proizvod")
        .then(p=>{
            p.json().then(
                data=>{
                    data.forEach(el => {
                        let k=new Kategorija(el._id,el.naziv)
                        kategorije.push(k)
                    });
                }
            )
    })
}