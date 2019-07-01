import * as Res from "./res/HuanliangConfig"
import { jscsv } from "../dati_comm/sdata/jscsv"

const SDataHuanliang = new jscsv(Res.data);
module.exports = { SDataHuanliang }
