interface IKutya {
  id: number | null;
  nev: string;
  fajta: string;
  nem: boolean;
  eletkor: number;
  kepUrl: string | null;
}

 class Kutya implements IKutya {

  id: number | null;
  nev: string;
  fajta: string;
  nem: boolean;
  eletkor: number;
  kepUrl: string | null;

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
}

class Maci {

}

export default Kutya
export { Maci, IKutya }