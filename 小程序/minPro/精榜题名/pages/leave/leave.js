import { Player } from "../../modules/Player" 
let datas = {
  wndname: "leave",//窗体名称
  display: false,//block none  
    wndAlpha:1,
    wndPosX:0,
}

let wndinstance = new Wnd(datas)
module.exports = { Wnd_Leave: wndinstance }