import React, { Component } from 'react';
import { Link } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import  {Tool,History} from "../libs/Tool";
import { Team } from "../model/teamSet";
import cfg from "../config/config.json";
import "../css/signUp.css"
import Konva from 'konva';
import { Stage, Layer, Star, Text,Image } from 'react-konva';
import Register from "./register"
import Poster from "../model/poster"
const $=window.$;
export default class SignUp extends Component
{
    constructor(props){
        super(props)
        this.state={
            regiserTeam:false,//
            cfg,
            isShowQRCode:false,
            list:[ ],
            currentItem:{},
            w:0,
            h:0,
            imgs:[]
        }
      
        // let { cfg:{interface:{getActiveList}}}=this.state;
    }
    async componentDidMount(){
        console.log(History)
        let { cfg:{interface:{getUserTeamList},ImgURL}}=this.state;
        if(Team.getAllTeamList().length)
        {   
           
            if(History.location.state && Object.keys(History.location.state).length)
            {
                // History.location.state.qrcode_img=ImgURL+History.location.state.qrcode_img;
                History.location.state.qrcode_img=History.location.state.qrcode_img;
                Team.addTeam(History.location.state)
                History.location.state={}
            }
            let result=Team.getAllTeamList()
          
            this.setDefault(result)
            Team.saveTeamList(result);
            console.log(result)
            this.setState({
                list:result
            })  
        }
        else
        {
           let result =await Tool.Post(getUserTeamList,{
            id:Tool.GetUrlPara('id')
           });
           
           if(result.errcode==0)
           {
            result.data.forEach(item=>{
               
                // item.qrcode_img=ImgURL+item.qrcode_img;
               item.qrcode_img=item.qrcode_img;
                item.activity_id=Tool.GetUrlPara('id');
            })
            this.setDefault(result.data)
            Team.saveTeamList(result.data);
            this.setState({
                list:result.data
            })
           }
        }
        
    }
   //设置默认队长
    setDefault(result){
         
         result.forEach(item=>{
            if(item.team_member.length  )
            {
                item.team_member.forEach(_child=>{
                    _child.checked=false;
                })
                
                //debugger
                if(item.team_member.every(child=>child.is_leader!=1))
                {  // debugger
                    item.team_member[0].is_leader=1;
                }
                
               
            }

           
        })
    }
    onSelectTeam=(id)=>{
        
        let {list}=this.state;
        
        list = list.map(item=>{
                if(item.id==id)
                {
                    
                    // join_team_num item.team_member.length
                    if(item.team_member.length>item.sign_person_num_max)
                    {
                        $.toptip('参加的舞队的人数超过报名人数范围', 'warning');
                    }
                    else if(item.team_member.length==0){
                        $.toptip('当前舞队没有队员', 'warning');
                    }
                    else if(item.team_member.length<item.sign_person_num_min){
                        $.toptip('参加的舞队的人数少于报名人数范围', 'warning');
                    }
                    else
                    {
                        if( item.checked)
                        {
                            item.checked=false
                        }
                        else
                        {
                            item.checked=true
                        }
                    }
                  
                    
                }
                return item
            })
         
            this.setState({
                list
            })
     
    }
    //完成分配 报名
    async onSubmSignUp(){
        let {list, cfg:{interface:{signSucc}}}=this.state;
        let isOk=list.some(item=>{
            return item.checked==true && !item.is_sign
        })
        
        if(isOk)
        {
            let sendList=list.filter(item=>item.checked);

            sendList.forEach(item=>{
                item.team_member= item.team_member.filter(_item=>_item.is_captain==false)
                item.member=item.team_member;
                item.activity_id=Tool.GetUrlPara('id')
               
             });
             $.showLoading('提交中...')
            let result=await Tool.Post(signSucc,{sign:sendList});
            $.hideLoading()
            if(result.errcode==0)
            {
               
                $.toast("报名成功",function() {
                   History.goBack()
                });
            }
            else
            {
               
                $.toptip(result.msg, 'warning');
            }
            console.log(sendList)
        }
        else
        {
            $.toptip('请选择要参加的舞队', 'warning');
        }
    }
    //注册舞队成功
    createTeam=()=>{
        this.setState({
            regiserTeam:false
        })
        
    }
    //获取我的舞队列表
    getTeamList=(data)=>{
        let {list}=this.state;
        list.push(...data)
        this.setState({
            list
        })
    }
    //移除拆分后的舞队
     removeTeam(val,flag){
        //删除已经报名的舞队
        if(flag)
        {
            
            let { cfg:{interface:{delTeam}}}=this.state;
            $.confirm("确认删除？", ()=> {
                $.showLoading('删除中...')
                //点击确认后的回调函数
                Tool.Post(delTeam,{
                    id:val.id
                }).then(res=>{
                    $.hideLoading()
                    if(res.errcode==0)
                    {
                        sessionStorage.removeItem("teamList");
                        this.componentDidMount()
                    }
                    else
                    {
                        $.toast('服务器异常','text')
                    }
                }).catch(err=>{
                   
                    $.hideLoading()
                    $.toast('服务器异常','text')
                })
                }, function() {
                  //点击取消后的回调函数
                });
        }
        else
        {
          Team.removeSplitTeam(val)
          this.componentDidMount()
        }
      
       
    }
   
    render(){
        let {isShowQRCode,list,regiserTeam,currentItem,w,h,imgs}=this.state;
        let lists=[]
        if(list.length)
        {
            lists = list.map((item,index)=>{
                
                        if(item.type=='split')
                        {
                           
                            return <li className="flex_between" key={index+'_'}>
                            <div onClick={e=>{
                                e.stopPropagation();
                                if(item.is_sign ) return;
                                this.onSelectTeam(item.id)
                            }} className={item.is_sign ?'select_box_no flex_center select_box': item.checked  ?'flex_center select_box select_box_active':'flex_center select_box'}
                               
                            >
                                <p>{item.team_name}</p>
                                {
                                    //join_team_num item.team_member && item.team_member.length  
                                    (item.team_member.length) ? <p>{ item.team_member[0].nickname}等{item.team_member && item.team_member.length}人</p> :'无队员'
                                }
                                
                            </div>
                            {/* <input id={'_'+index} onChange={this.onSelectTeam} checked={item.checked} value={item.id} hidden type="checkbox"></input> */}
                            <div className="flex_start">
                                {
                                    // item.team_member.length > item.sign_person_num_min &&
                                    item.is_sign ? <div className="wdcf_btn">已报名</div> :  item.team_member.length ? <Link className="wdcf_btn" to={{
                                        pathname: "/editteam",
                                        search: "?child="+item.id,
                                        hash: "",
                                        state:{ }
                                }}>舞队拆分</Link> :''
                                    // item.team_member.length && !item.is_sign? <Link className="wdcf_btn" to={{
                                    //                                                         pathname: "/editteam",
                                    //                                                         search: "?child="+item.id,
                                    //                                                         hash: "",
                                    //                                                         state:{ }
                                    //                                                 }}>舞队拆分</Link> :<div className="wdcf_btn">已报名</div> 
                                }
                                {
                                    item.is_sign ? '' : <div className="qr_code_btn" onClick={e=>{
                                       
                                        e.stopPropagation()
                                        this.setState({
                                            isShowQRCode:true,
                                            currentItem:item,
                                           
                                        },()=>{
                                            console.log($('canvas')[0])
                                            // var data = $('canvas')[0].toDataURL('image/png', 1);  //1表示质量(无损压缩)
                                            //     var img=new Image()
                                            //     img.src = data;
                                            //     img.onload=function(){
                                            //         console.log(img)
                                            //         // $(img).addClass('poster')
                                            //         // $('.share_img_box').append(img)
                                            //     }
                                            
                                        })
                                        // Tool.onloadImg([require('../images/qr_bg.png'),item.qrcode_img],res=>{
                                        //    console.log(res)
                                        //    debugger
                                             
                                          
                                        //  })
                                        
    
                                    }}></div>
                                }
                           
                            </div>
                        </li> 
                        }   
                        else
                        {
                            return <li className="flex_between" key={index+'_'}>
                            <div  onClick={e=>{
                                 e.stopPropagation();
                                 if(item.is_sign ) return;
                                 this.onSelectTeam(item.id)
                                 //item.checked || item.is_sign ?'flex_center select_box select_box_active':'flex_center select_box'
                                 //item.is_sign ?'select_box_no flex_center select_box': item.checked  ?'flex_center select_box select_box_active':'flex_center select_box'
                            }} className={item.is_sign ?'select_box_no flex_center select_box': item.checked  ?'flex_center select_box select_box_active':'flex_center select_box'}>
                                <p>{item.team_name}</p>
                                {
                                    item.team_member.length ? <p>{item.team_member[0].nickname}等{item.team_member && item.team_member.length}人</p> : '无队员'
                                }
                                
                            </div>
                            {/* <input id={'__'+index} type="checkbox" hidden></input>  !item.is_sign &&*/
                               item.is_sign ? <div className="wdcf_btn">已报名</div> :''
                            }
                            {
                                ( item.type!='no_change' ) || item.ty=='new' || item.is_sign ? <div className="del_box_btn" onClick={e=>{
                                    e.stopPropagation();
                                    this.removeTeam(item,item.is_sign?true:false)
                                }}></div>:''
                            }
                            
                        </li>
                        }  
               
                })
        }

   
        // return regiserTeam ? <Register createTeam={this.createTeam}/> :
        return  <div className="sign_up_page">
                    <div className="sign_up_title flex_center">
                        <p>请选择要报名的舞队</p>
                        <p>人数超过报名条件可拆分人员</p>
                    </div>
                    <ul className="total_teams">
                        {
                           
                          lists.length ? lists :''
                        }
                 
                       
                    </ul>
                    {/* onClick={e=>{
                             e.stopPropagation();
                             History.push('/register')
                            //  this.setState({
                            //     regiserTeam:true
                            //  })
                         }} */}
                    <div className="btn_box_1 felx_center">
                         <Link to={
                            {
                                pathname: "/register",
                                search: "src=ct",
                                hash: "",
                                state:{}
                            }
                         } className="submit_btn_active" >注册新舞队</Link>
                         <div className="over_fp" onClick={e=>{
                             e.stopPropagation()
                             this.onSubmSignUp()
                         }}>完成分配 确认报名</div>
                    </div>
                    {
                        isShowQRCode ?<QRMark w={w} h={h} imgs={imgs} currentItem={currentItem} closeMark={
                            ()=>{
                                
                                this.setState({
                                    isShowQRCode:false 
                                },()=>{
                                   
                                })
                            }
                        }/>  :"" 
                    }
                    
                 </div>
    }
}


// 二维码
class QRMark extends Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount(){
        let{currentItem}=this.props;
        let poster = new Poster($('#poster')[0]);
        // if(currentItem.qrcode_img)
        // {
            
        //     Tool.onloadImg([require('../images/qr_bg.png'),currentItem.qrcode_img],result=>{
        //         console.log(result)
        //         debugger
        //         poster.drawImg(result[0],currentItem.team_name ,result[1],()=>{
        //             console.log($('canvas')[0])
        //             setTimeout(function(){
        //                 console.log($('canvas')[0])
        //                 var data = $('canvas')[0].toDataURL('image/png', 1);  //1表示质量(无损压缩)
        //                 $('#imgs').attr('src',data);
        //             },500)
        //         });
        //     })
        // }
        
        poster.drawImg(require('../images/qr_bg.png'),currentItem.team_name ,currentItem.qrcode_img,()=>{
            setTimeout(function(){
                console.log($('canvas')[0])
               var data = $('canvas')[0].toDataURL('image/png', 1);  //1表示质量(无损压缩)
                $('#imgs').attr('src',data);
            },500)
        });
      
    }
    render(){
        let{closeMark,currentItem}=this.props;
        return <div className="qr_mark" >
                    <div className="qr_panel scanel_qrcode">
                    
                   
                    <div className="absolute" id="poster" ref={ele=>{
                            console.log(ele)
                            if(ele)
                            {
                                // let poster = new Poster(ele);
                                // poster.drawImg(require('../images/qr_bg.png'),currentItem.team_name ,currentItem.qrcode_img);
                              
                            }
                            
                        }}>

                    </div>
                   
                    <div className="content_bg">

                        <p className="qr_title">{currentItem.team_name} <span>{currentItem.team_member.length}人</span>
                            <b onClick={closeMark} className="close_panel"></b>
                        </p>
                        <p className="relative">
                        
                         <img className="qr_img_4" src={currentItem.qrcode_img}></img>
                         <img className="qr_img_4" id="imgs" style={{opacity:0}}></img>
                        </p>
                    </div>
                    
                </div>
                </div>
    }
    
}
function QRMark_(props){

    let{closeMark,currentItem,w,h,imgs}=props;


    return <div className="qr_mark" >
                {/* <div  className="qr_panel scanel_qrcode">
                    <Stage width={w} height={h} >
                        <Layer>
                            <Image 
                                x={0}
                                y={0}
                                image={imgs[0]}
                                width={w} height={h}
                            ></Image>
                            <Text 

                               x={0}
                               y={ToHeight(46)}
                               text={currentItem.team_name +' '+currentItem.team_member.length +'人'}
                               fontSize={20}
                               fill='#000000'
                               align="center"
                               width={w}
                            ></Text>
                            <Image 
                                x={ToWith(126)}
                                y={ToHeight(235)}
                                image={imgs[1]}
                                width={ToWith(424)}
                                height={ToWith(424)}
                               
                            ></Image>
                        </Layer>
                    </Stage>
                </div>  */}
               

                { <div className="qr_panel scanel_qrcode">
                    
                    <div className="content_bg">

                        <p className="qr_title">{currentItem.team_name} <span>{currentItem.team_member.length}人</span>
                            <b onClick={closeMark} className="close_panel"></b>
                        </p>
                        <p className="relative">
                        {////currentItem.qrcode_img
                        }
                        <img className="qr_img_4" src={currentItem.qrcode_img}></img>
                        </p>
                    </div>
                    <div className="absolute" ref={ele=>{
                            console.log(ele)
                            if(ele)
                            {
                                let poster = new Poster(ele);
                                poster.drawImg(require('../images/qr_bg.png'),currentItem.team_name ,currentItem.qrcode_img);
                                console.log($('canvas')[0])
                                 // var data = $('canvas')[0].toDataURL('image/png', 1);  //1表示质量(无损压缩)
                                                //     var img=new Image()
                                                //     img.src = data;
                                                //     img.onload=function(){
                                                //         console.log(img)
                                                //         // $(img).addClass('poster')
                                                //         // $('.share_img_box').append(img)
                                                //     }
                            }
                            
                        }}>

                    </div>
                    <img className="absolute" ></img>
                   
                </div> }
          </div>
}