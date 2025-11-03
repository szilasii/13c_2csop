export interface IDog {
    id: number | undefined | null
    nev: string,
    fajta: string,
    nem: boolean,
    eletkor: number | null
    kepUrl: string | null
}

export default class Dog implements IDog {
    id: number | undefined | null
    nev: string = ""
    fajta: string = ""
    nem: boolean = false
    eletkor: number | null = null
    kepUrl: string | null = null
   
    constructor(init?: Partial<Dog>) {
             
          Object.assign(this, init as Partial<Dog>)        
   }
  
} 