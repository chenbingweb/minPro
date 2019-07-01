import React, { Component } from 'react';
import cfg from "../../config/config.json";
import {Tool,History} from "../../libs/Tool"
import { Link } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import {ProStep,Captain} from "../pro-step/pro-step"
import OCRBG from "../../images/ocr_bg.jpg"
import {User} from "../../model/user"
import "./ocr.css"
const wx=window.wx;
const $=window.$;


export default class OCR extends Component
{
    constructor(props){
        super(props)
        this.state={
            teamInfo:this.props.teamInfo || {},
            regiserTeamInfo:{},
            ocrInfo:{
                    // name:'张三',//姓名
                    // sex:'男',//性别
                    // mz:'汉族',//名族
                    // birthday:'19900909',//出身
                    // address:'北京大兴',//地址
                    // ID_card:'1319999888822222'//身份证号码

            },
            joinSucc:false,//加入舞队提示
            captSign:false,//队长注册成功提示
            localId:'',//本地图片地址
            cfg,

        }
         //如果为真，则是跳转队长否则加入队伍
         this.src=Tool.GetUrlPara('src')!='qrcode';
    }
    //上传图片
    async onOCRImg(){
        let { cfg:{interface:{ocr}}}=this.state;
       
        // let res=await Tool.Post(ocr,{},true);
       
        // if(res.errcode==0)
        // {
        //     $.hideLoading()
        //     this.setState({
        //         ocrInfo:res.data
        //     })
        // }
        if(wx)
        {
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success:  (res)=> {
                    $.showLoading('上传证件认证中')
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    // if(!window.__wxjs_is_wkwebview)//
                    // {
                    //     console.log('')
                    //     localIds='data:image/jgp;base64,'+localIds.replace(/\s/g,"");
                    // }
                    let imgData=localIds[0] || '';
                    console.log(imgData)
                    this.setState({
                        localId:imgData
                    })
                    wx.getLocalImgData({
                        localId: imgData, // 图片的localID
                        success: async (res) => {
                            console.log(res)
                            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                            if( /(Android)/i.test(navigator.userAgent))
                            {
                                localData=localData.replace(/\s/g,"")
                              // localData='data:image/jgp;base64,'+localData;
                            }
                            else
                            {
                                localData=localData.replace(/^data:image\/jgp;base64,/g,'');
                            }
                            let result=await Tool.Post(ocr,{image_data:localData});
                            $.hideLoading()
                            if(result.errcode==0)
                            {
                               
                                this.setState({
                                    ocrInfo:result.data
                                })
                            }
                            else
                            {
                                $.toptip('身份证识别失败，请重新上传', 'warning');
                                this.setState({
                                    localId:''
                                })
                            }
                        }
                    });
                    // wx.uploadImage({
                    //     localId:localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                    //     isShowProgressTips: 1, // 默认为1，显示进度提示
                    //     success: async(res)=> {
                    //         var serverId = res.serverId; // 返回图片的服务器端ID
                    //         let result=await Tool.Post(ocr,{serverId});
                    //         $.hideLoading()
                    //         if(result.errcode==0)
                    //         {
                               
                    //             this.setState({
                    //                 ocrInfo:result.data
                    //             })
                    //         }
                    //         else
                    //         {
                    //             $.toptip('身份证识别失败，请重新上传', 'warning');
                    //         }
                    //     }
                    // });
                  
                },
                fail:(err)=>{
                    console.log(err)
                }
            });
        }
    }
    async onSubmit(){
        
        let { cfg:{interface:{registCaptain,scanjoinTeam}},ocrInfo,cfg:{ImgURL}}=this.state;
        if(Object.keys(ocrInfo).length==0)
        {
            $.toptip('请上传身份证，进行身份确认', 'warning');
            return
        }
        $.showLoading('提交中...')
        let {fillInfo}=this.props;
       
        fillInfo=Object.assign(fillInfo,ocrInfo)
        fillInfo.teamName=fillInfo.itemName;
        fillInfo.sex=fillInfo.sex==='男'?1:2;
        fillInfo.address=fillInfo.addressDetail;
        let src=Tool.GetUrlPara('src');
        let url=registCaptain;
        //加入舞队
        if(src=='qrcode')
        {
            url=scanjoinTeam
            fillInfo.teamId=Tool.GetUrlPara('team_id')
        }
       
        let res=await Tool.Post(url,fillInfo);
        $.hideLoading()
        if(res.errcode==0)
        {
            console.log(res.data)
           // User.userInfo.Authentication=true;
            User.updataUserInfo({
                role:res.data.role,
                Authentication:true
            })
            //第一认证完成成舞队成员，提示加入舞队成功
            if(User.userInfo.role=='team_member')
            {
                this.setState({
                    joinSucc:true
                })
            }
            else if(User.userInfo.role=='captain')
            {
               // res.data.qrcode=ImgURL+res.data.qrcode
               res.data.qrcode=res.data.qrcode
                this.setState({
                    captSign:true,
                    regiserTeamInfo:res.data
                })
            }
            else
            {
                //跳转到首页
                User.NavHomeEvent.Emit()
            }
           
            // sessionStorage.setItem('userInfo',JSON.stringify({
            //     role:'dz',
            //     Authentication:true
            // }));

           
        //    User.setUserInfo()
            //window.location.replace('/')
        }
        else
        {
            $.toptip(res.msg, 'warning');
        }
    }
    componentDidMount(){
 
    }
    render(){
        let {ocrInfo,joinSucc,captSign,teamInfo,localId}=this.state;
   
        return <div className="orc rr">
                   {
                       !this.src?'':<ProStep/>
                   }
                    
                    <div className="img" onClick={e=>{
                        e.stopPropagation();
                        this.onOCRImg()
                    }}>
                       <div className="img_mask flex_center">
                           {
                                localId==''?'添加图片':
                                <img className="ocr_img"  src={localId}></img>
                            }
                       </div>
                    </div>  
                    <ul className="user_info" style={{
                        display:ocrInfo.name?'block':'none'
                    }}>
                        <li className="flex_start">
                            <span className="title flex_between"><span>姓</span><span>名</span></span>
                            <span className="content">{ocrInfo.name||''}</span>
                        </li>
                        <li className="flex_start">
                            <span className="title flex_between"><span>姓</span><span>别</span></span>
                            <span className="content">{ocrInfo.sex||''}</span>
                        </li>
                        <li className="flex_start ">
                            {/* mz_select */}
                            <span className="title flex_between"><span>民</span><span>族</span></span>
                            <span className="content">{ocrInfo.mz}</span>
                        </li>
                        <li className="flex_start">
                            <span className="title flex_between"><span>出</span><span>生</span></span>
                            <span className="content">{ocrInfo.birthday||''}</span>
                        </li>
                        <li className="flex_start" style={{
                                height: 'auto',
                                paddingTop:'0.2rem',
                                paddingBottom:'0.2rem'
                        }}>
                            <span style={{
                                    alignSelf:'flex-start'
                            }} className="title flex_between"><span>地</span><span>址</span></span>
                            <span  style={{
                                    alignSelf:'flex-start'
                            }} className="content">{ocrInfo.ID_address||''}</span>
                        </li>
                        <li className="flex_start">
                            <span className="title">身份号码</span>
                            <span className="content">{ocrInfo.ID_card}</span>
                        </li>
                    </ul>
                    <div className="submit_btn_active submit" onClick={e=>{
                        e.stopPropagation();
                        this.onSubmit()
                    }}>提交</div>
                    {
                        //加入舞队
                        joinSucc?<JoinSuccess teamInfo={teamInfo} onOK={()=>{
                            this.setState({
                                joinSucc:false
                            })
                            //跳转到首页
                            User.NavHomeEvent.Emit()
                        }}/>:''
                        
                    }
                    {
                        //舞队认证
                       captSign ? <Captain regiserTeamInfo={this.state.regiserTeamInfo} onClode={()=>{
                           this.setState({
                            captSign:false
                           })
                           //跳转到首页
                             User.NavHomeEvent.Emit()
                       }}/>:''
                    }
                   
              </div>
    }
}

//加入舞队成功
function JoinSuccess(props){
    let {onOK,teamInfo}=props;
    return <div className="jonin_mak">
            <div className="join_tip_box">
                <p>加入成功</p>
                <div className="flex_center join_team">
                    <span>恭喜您成功加入</span>
                    <span>{teamInfo.team_name}</span>
                </div>
                <div className="btn_ok" onClick={
                    e=>{
                        e.stopPropagation()
                        onOK()
                    }
                   
                }>确认</div>
            </div>
    </div>
}
//队长注册成功
// function Captain(props){
//     let {onClode}=props;
//     return <div className="jonin_mak">
//             <div className="cap_pannel">
//                 <p className="cap_title">
//                     完成注册
//                     <span className="cancel_btn" onClick={
//                         e=>{
//                             e.stopPropagation()
//                             onClode()
//                         }
//                     }></span>
//                 </p>
//                 <img className="qr_img" src={require("../../images/static/qr.jpg")}></img>
                
//                 <div className="team_name_4">
//                     <p className="team_title_7">女子十二坊</p>
//                     <p className="qr_code_tip">长按保存舞队二维码</p>
//                     <p className="qr_code_tip">可在舞队信息中查看二维码</p>
//                 </div>
                

//             </div>
//         </div>
// }