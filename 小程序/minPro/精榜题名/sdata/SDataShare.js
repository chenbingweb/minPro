import * as Res from "./res/Share"
import { jscsv } from "../dati_comm/sdata/jscsv"
//const shareData = new jscsv(Res.data);

let SDataShare = new jscsv(Res.data) 
/*
const SDataShare = {
    getById(id) {
        //let v =
        
        
        // math.randomRange(0, data[id].length - 1);
        //return data[id][v];
    },

 
    // times: 第几次分享
    getByTimes(times) {
        let maxTimes = Object.keys(data).length;
        if (times > maxTimes) {
            times = maxTimes;
        }
        return this.getById(times * 1000 + 1);
    }

};*/

export {SDataShare};