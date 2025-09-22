 interface IKutya {
  id: number | null;
  nev: string;
  fajta: string;
  nem: boolean;
  eletkor: number;
  kepUrl: string | null;
}
interface IKutya2 {
  nev: number;
  szin: string;
}


type UdvozletFuggveny = { 
  leiras : string 
  (a: string): void
}

const szoveg = "a"
function udv(fn:UdvozletFuggveny) {
  fn(szoveg);
}



udv( (a) => {
  console.log(a)

})



const f = () : void  => {
  
}

function fg(a:Kutya) : void  {

}


export type KutyaFull = IKutya & IKutya2;
type valmai = number | null;

class Kutya implements IKutya {
  id: valmai;
  nev!: string;
  fajta: string;
  nem!: boolean;
  eletkor!: number;
  kepUrl!: string | null;

  constructor(dog: IKutya) {
    this.id = dog.id || null;
    this.nev = dog.nev;
    this.fajta = dog.fajta;
    this.nem = dog.nem;
    this.eletkor = dog.eletkor;
    this.kepUrl = dog.kepUrl || null;
  }

  get Id() {
    return this.id;
  }
  set Id(id: number | null) {
    this.id = id;
  }
  public dog(): IKutya {
    const dog: IKutya = {
      id: this.id,
      nev: this.nev,
      fajta: this.fajta,
      nem: this.nem,
      eletkor: this.eletkor,
      kepUrl: this.kepUrl,
    };
    return dog;
  }
  public dogs(kutyak: IKutya[]): IKutya[] {
    const dogs: IKutya[] = [];
    dogs.push(...kutyak);
    return dogs;
  }

//  public renderTable(containerId: string, data:IKutya[]): void {
//     const container = document.getElementById(containerId);
//     if (!container) {
//       throw new Error("A megadott container nem található!");
//     }

//     // Táblázat létrehozása
//     const table = document.createElement("table");
//     table.border = "1";

//     // Fejléc generálás (az objektum kulcsai alapján)
//     const headerRow = document.createElement("tr");
//     if (!data[0]) {
//       throw "üres kutya"
//     }
//     Object.keys(data[0]).forEach(key => {
//       const th = document.createElement("th");
//       th.innerText = key;
//       headerRow.appendChild(th);
//     });
//     table.appendChild(headerRow);

//     // Adatok feltöltése
//     data.forEach(row => {
//       const tr = document.createElement("tr");
//       Object.values(row).forEach(value => {
//         const td = document.createElement("td");
//         td.innerText = String(value);
//         tr.appendChild(td);
//       });
//       table.appendChild(tr);
//     });
//     container.appendChild(table)
//   }
}
class Maci {}

export function valamifugg() {}

export default Kutya;
export { Maci, IKutya };

