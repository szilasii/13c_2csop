import  data  from "./data.js"
import Kutya  from "./kutya.js"

import type { IKutya } from "./kutya.js"

const valami2 = data[0]
type K = Kutya | undefined

if (data[0]) {
const ku: K = new Kutya(data[0])
//ku.renderTable("cont",data)
}




