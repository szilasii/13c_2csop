export interface IDog {
    id: number | undefined | null
    name: string,
    breed: string,
    gender: boolean | string,
    age: number | string | null
    picurl: string | null
}

export default class Dog implements IDog {
    id: number | undefined | null
    name: string = ""
    breed: string = ""
    gender: boolean = false
    age: number | null = null
    picurl: string | null = null
   
     constructor(init: IDog) {
    //      this.name = init.name
    //      this.breed = init.breed
    //      this.gender = init.gender === true || init.gender === "true"
    //      this.age = typeof init.age === "string" ? parseInt(init.age) : init.age ?? null;
    //      this.picurl = init.picurl
         


          Object.assign(this, init as Partial<Dog>)        
   }
  
} 