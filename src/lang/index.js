import english from './English'
import chinese from './Chinese'
import store from "@/store/index.js";

let type = store.state.currency.lang;
let obj;

if (type == "English") {
    obj = english;
} else {
    obj = chinese;
}

export default obj
