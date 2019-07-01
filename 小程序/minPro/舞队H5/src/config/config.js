import homeYes from "../images/home_yes.png";
import homeNo from "../images/home_no.png";
import myYes from "../images/my_yes.png";
import myNo from "../images/my_no.png";
import cfg from "./config.json"
class Config{
    constructor(){
        console.log(cfg)
        this.navBar=[
            {
                name: '精彩活动',
                title:'精彩活动',
                selected: false, 
                icon: homeNo,
                icon_s: homeYes, 
                path: '/' ,
                fontStyle:{
                    select_color:{
                        color:'#333'
                    },
                    color:{
                        color:'#999'
                    }
                },
                imgStyle:{
                    width:44/75+'rem',
                    height:40/75+'rem'
                }
               
            },
            {
                name: '个人中心',
                title:'个人中心',
                selected: false, 
                icon: myNo,
                icon_s: myYes, 
                path: '/myCenter' ,
                fontStyle:{
                    select_color:{
                        color:'#333'
                    },
                    color:{
                        color:'#999'
                    }
                },
                imgStyle:{
                    width:35/75+'rem',
                    height:40/75+'rem'
                }
               
            }
        ]
    }
    
}
let config=new Config()
export { config as Config }