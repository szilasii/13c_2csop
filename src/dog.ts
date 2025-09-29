export interface IDog {
    id: number
    nev: string,
    fajta: string,
    nem: boolean,
    eletkor: number
    kepUrl: string
}

export default class Dog implements IDog {
    id: number
    nev: string
    fajta: string
    nem: boolean
    eletkor: number
    kepUrl: string
   
    constructor(dog: IDog ) {
            this.id = dog.id
            this.nev = dog.nev || ""
            this.fajta = dog.fajta
            this.eletkor = dog.eletkor
            this.nem = dog.nem
            this.kepUrl = dog.kepUrl
            
   }
  
} 