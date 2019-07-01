import * as Res from "./res/UserFrame"
import { jscsv } from "../dati_comm/sdata/jscsv"

const SDataUserFrame = new jscsv(Res.data);
module.exports = { SDataUserFrame }
