import React, { Component,Fragment } from 'react';
import { Link,Route } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import  {Tool} from "../libs/Tool";
import Register from "./register";
import cfg from "../config/config.json";
import "../css/entryPage.css"
// import {WXFN} from "../libs/wxFn"
const $ = window.$;
const wx = window.wx;
export default class EntryPage extends Component
{
    constructor(props){
        super(props)
        this.state={
            teamInfo:{},//舞队信息
            showSign:false,
            cfg,
            ocr:false,
            mobile:'',
            src:Tool.GetUrlPara('src')!='qrcode',
            teamId:Tool.GetUrlPara("team_id")||'',
            code:'',
            time:60
        }
        //如果为真，则是跳转队长否则加入队伍
        this.src=Tool.GetUrlPara('src')!='qrcode';
        //获取舞队ID
        this.teamId=Tool.GetUrlPara("team_id")||''
        // let { cfg:{interface:{getActiveList}}}=this.state;
    }
    //输入手机号码
    onFillMobile=(val)=>{
        this.setState({
            mobile:val
        })
    }
    onFillCode=(val)=>{
        this.setState({
            code:val//val+''.slice(0,6)
        })
    }
    //加入舞队下一步
    onNextJoinTeam=(val)=>{
        let {mobile,code}=this.state;
        if(mobile.trim()=='')
        {
            $.toptip('请输入手机号码', 'warning');
            return
        }
        if(!/^1\d{10}/.test(mobile.trim()))
        {
            $.toptip('手机号码不正确', 'warning');
            return
        }
        if(code.trim()=='')
        {
            $.toptip('请输入验证码', 'warning');
            return
        }
        Tool.checkCode( mobile,code,(res=>{
            if(res.errcode==0)
            {
                this.setState({
                    showSign:true,
                    ocr:true,
                    mobile,
                    code
                })
            }
            else
            {
                $.toptip(res.msg, 'warning');
            }
           
        }))
      
    }
    //获取验证码
    onGetCode(){
        
        if(this.state.time==60)
        {
            let {mobile}=this.state;
            if(mobile.trim()=='')
            {
                $.toptip('请输入手机号码', 'warning');
                return
            }
            if(!/^1\d{10}/.test(mobile.trim()))
            {
                $.toptip('手机号码不正确', 'warning');
                return
            }
            $.showLoading('发送中...')
            Tool.getCode(mobile,(result)=>{
                $.hideLoading()
                if(result.errcode==0)
                {
                    Tool.countTime()(res=>{
                        console.log(res)
                        this.setState({
                            time:res == 0 ? 60 : res
                        })
                    })
                }
                else
                {
                    $.toptip(result.msg, 'warning');
                }
                
            })
            
        }
    }
    componentDidMount(){
        let { cfg:{interface:{getTeamInfo}}}=this.state;
        //获取舞队信息
        if(this.src!=='' && this.teamId!=='')
        {
            $.showLoading()
            Tool.Post(getTeamInfo,{teamId:this.teamId}).then(res=>{
                $.hideLoading()
                if(res.errcode==0){
                    this.setState({
                        teamInfo:res.data
                    })
                }
            }).catch(err=>{
                $.hideLoading()
            })
        }
    }
    render(){
        let {showSign,ocr,mobile,teamInfo,code}=this.state;
        if(this.src)
        {
            document.title="加入舞队"
        }
        else
        {
            document.title="梦舞九州"
        }
        return <Fragment>
                {
                    showSign ? <Register mobile={mobile} code={code} teamInfo={teamInfo}  ocr={ocr}/> : <div className="entry_page">
                    <div className="tip_box"> 
                        {
                            this.src ? <div className="tip_content_box flex_center">
                                    <div className="tip_img_1"></div>
                                    <p className="tip_content_1">请先注册</p>
                                    <p className="dz_tip">您还不是舞队成员，可直接注册为队长</p>
                                    <p  className="dz_tip">或扫舞队二维码，注册为舞队成员！</p>
                                </div>
                                :<div className="tip_content_box flex_center">
                                        <div className="tip_img_2"></div>
                                        <p className="tip_content_1">确认加入舞队</p>
                                        <p className="dz_tip">{teamInfo.team_name+teamInfo.team_total}人</p>        
                                </div>
                        }
                    
                    </div>
                    {
                        this.src ?  <div> 
                            <div onClick={e=>{
                                    e.stopPropagation();
                                    this.setState({
                                        showSign:true
                                    })
                            }} className="sba sub_btn ">队长注册</div>
                            <div className="join_team" style={{display:'none'}} onClick={e => { 
                                e.stopPropagation();
                                if(wx)
                                {
                                    wx.scanQRCode({
                                        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                                        success: function (res) {
                                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                                        }
                                    });
                                        
                                }
                                window.location.replace('http://localhost:3000/?src=qrcode')
                            }}>
                                加入舞队
                            </div>
                        </div>
                        :
                        <div className="fill_mobile">
                            <p className="flex_between fill_mobile_box">
                                <span>
                                    手机号码
                                </span>
                                <input type="tel" value={mobile} onChange={e=>{
                                    e.stopPropagation();
                                    this.onFillMobile(e.target.value)
                                }} placeholder="请填写真实的手机号码"/>
                            </p>
                            <div className="flex_between fill_mobile_box">
                                <p className="flex_start">
                                <span>验<b style={{
                                        fontWeight:'normal',
                                        padding:"0 0.2rem"
                                    }}>证</b>码</span>
                                <input type="tel" value={code} style={{
                                        width: '4rem',
                                        paddingLeft: '0.5rem'
                                }} onChange={e=>{
                                    e.stopPropagation();
                                    this.onFillCode(e.target.value)
                                }} placeholder="请输入手机验证码"/>
                                </p>
                               
                                <span  className="code_btn" onClick={ e => {
                                     e.stopPropagation();
                                     this.onGetCode()
                                    
                                } }>{this.state.time == 60 ?  '获取验证码' : this.state.time + 's'}</span>
                            </div>
                            <div onClick={e=>{
                                    e.stopPropagation();
                                    this.setState({
                                        showSign:true
                                    })
                             }} className="sba sub_btn_2" onClick={e=>{
                                 e.stopPropagation();
                                 this.onNextJoinTeam()
                             }}>确认加入</div>
                        </div>
                    }
                    
                    </div>
                }
                  
            </Fragment>
       
    }
}