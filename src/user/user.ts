interface IUser {
    id: number | null
    email: string
    password: string
    token: string | null
}

export class User implements IUser {
    id: number | null = null
    email: string = ""
    password: string = ""
    token: string | null = null
    constructor(init: IUser) {
        Object.assign(this, init as Partial<User>)
    }
}
