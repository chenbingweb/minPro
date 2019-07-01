import React, { Component,Fragment } from 'react';
import {Tool,History} from "../libs/Tool";
import { Link,Route } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import {WXFN} from "../libs/wxFn.js"
import {User} from "../model/user";
import { Captain } from "../components/pro-step/pro-step";
import { Team } from "../model/teamSet"
import OCR from "../components/ocr/ocr";
import "../css/register.css";
import arrIcon from "../images/arrow_right.png";
import GxOk from "../images/gx.png";
import GxNo from "../images/gx_no.png";
import cfg from "../config/config.json";
import About from "../view/about"
const $=window.$;
export default class Register extends Component
{
    constructor(props){
        super(props)
        this.state={
            regiserTeamInfo:{},//注册舞队信息
            createTeamFlag:false,//默认关闭创建舞队提示
            itemName:'',
            mobile:this.props.mobile||'',
            address:'',
            isShowOCR:false,
            addressDetail:'',
            province:'',
            city:'',
            county:'',
            agree:true,
            code:this.props.code || '',
            isActive:false,//是否可以提交信息
            time:60
        }
    }
    static getDerivedStateFromProps(props,state){
     
        //this.src=Tool.GetUrlPara('src')!='qrcode';
        if(Tool.GetUrlPara('src')=='qrcode')
        {
            return {
                isShowOCR:props.ocr && Tool.GetUrlPara('src')=='qrcode',
            }
        }
        else
        {
            return state
        }
        
        
       
    }
    componentDidMount(){
        let that=this;
        $("#city-picker").cityPicker({
            title: "请选择地址"
          }).change(function(){
            let arr=$(this).val().split(' ');
           
            that.setState({
                address:$(this).val(),
                province:arr[0],
                city:arr[1],
                county:arr[2]
            },()=>{
                that.checkInfo()
            })
        });
           
    }
    //舞队名称
    onInputItemName=(val)=>{
        this.setState({
            itemName:val
        },()=>{
            this.checkInfo()
        })
      
        
    }
    //手机号
    onInputItemMobile=(val)=>{
        this.setState({
            mobile:val
        },()=>{
            this.checkInfo()
        })
       
        
    }
    onClear=()=>{
        $('.weui-picker-container-visible').remove();
    }
    //地址
    onInputItemAddress=(val)=>{
        this.setState({
            addressDetail:val
        },()=>{
            this.checkInfo()
        })
    }
    //输入code
    onInputCode = (val) => {
        
        this.setState({
            code:val//val+''.slice(0,6)
        })
    }
      //检查是否添加所有信息
    checkInfo=()=>{
        let {itemName,mobile,address,province,city,county,addressDetail}=this.state;
        if(itemName!=='' && mobile!=='' && address!=='' &&province!=='' &&city!=='' &&county!=='' && addressDetail!=='')
        {
            this.setState({
                isActive:true
            })
        }
        else
        {
            this.setState({
                isActive:false
            })
        }
    }
    
    //提交
    onSubmit=(val)=>{
        console.log(val)
        let {interface:{createTeam},ImgURL}=cfg;
        let {itemName,mobile,address,addressDetail,code}=this.state;
        if (itemName == '') {
            $.toptip('请输入舞队名字', 'warning');
            return
        }
        if (itemName.length>10) {
            $.toptip('舞队名字不能超过10个字', 'warning');
            return
        }
        if (mobile == '') {
            $.toptip('手机号码不能为空', 'warning');
            return
        }
        if (!/^1\d{10}/.test(mobile)) {
            $.toptip('手机号码不正确', 'warning');
            return
        }
        if( code == '' &&  !User.userInfo.Authentication)
        {
            $.toptip('请输入手机验证码', 'warning');
            return
        }
        // if (itemName.length>10) {
        //     $.toptip('舞队名字不能超过10个字', 'warning');
        //     return
        // }
        if (address == '') {
            $.toptip('请选择地理位置', 'warning');
            return
        }
        if (addressDetail == '') {
            $.toptip('请输入详细地址', 'warning');
            return
        }
        //已经认证的队长直接创建舞队 createTeam
        if(User.userInfo.Authentication)
        {
           
            /** 
             * activity_id: "7"
                id: 10
                is_sign: false
                join_team_num: 2
                qrcode_img: "http://square-dance.jeemoo.com//api/wx/qrcode/10.png"
                sign_person_num_max: 40
                sign_person_num_min: 12
                team_name: "彩虹舞蹈"
                type: "split"
             * 
             * 
            */
            let {activity_id,id,is_sign,sign_person_num_max,sign_person_num_min,team_name,type}=Team.getAllTeamList()[0];
            let data=this.state;
            data.team_name=data.itemName
            Tool.Post(createTeam,{
               ...data,
                team:{activity_id,id,is_sign,sign_person_num_max,sign_person_num_min,team_name,type}
            }).then(res=>{
                if(res.errcode==0)
                {
                    // res.data.qrcode=ImgURL+ res.data.qrcode_img;
                    res.data.qrcode=res.data.qrcode_img;
                    Tool.onloadImg([require('../images/qr_bg.png'),res.data.qrcode],result=>{
                        console.log(result)
                        this.setState({
                            createTeamFlag:true,//打开成功创建舞队
                            regiserTeamInfo:res.data
                        })
                    })
                    
                }
            }).catch(err=>{

            })
           

           
        }
        else
        {
            Tool.checkCode( mobile,code,(res=>{
                if(res.errcode==0)
                {
                    //ocr认证
                    this.setState({
                        isShowOCR:true
                    },()=>{

                    })
                }
                else
                {
                    $.toptip(res.msg, 'warning');
                }
               
            }))
           
        }
       
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
    render(){
        let {itemName,mobile,isShowOCR,addressDetail,address,createTeamFlag,isActive,regiserTeamInfo,code}=this.state;
        if(!isShowOCR)
        {
            document.title="队长注册"
        }
        if(User.userInfo.Authentication)
        {
            document.title="注册舞队"
        }
       
        return <Fragment >
              
                <div className="fixed rr scroll" style={{background:'#fff'}}>
                    {
                        
                        !isShowOCR ? <div id="register">
                        <div className="register_header flex_between">
                            <div className="step_box flex_center">
                                <div className="step active">1</div>
                                <p className="step_name">舞队信息</p>
                            </div>
                            <div className="step_box flex_center">
                                <div className="step">2</div>
                                <p className="step_name">身份认证</p>
                            </div>
                            <div className="step_box flex_center">
                                <div className="step">3</div>
                                <p className="step_name">完成注册</p>
                            </div>
                        </div>
                        <p className="fill_titile">
                            请填写舞队信息
                        </p>
                        <div className="fill_info">
                            <div className="flex_start fill_item">
                                <span>舞队名称</span>
                                <input onClick={e=>{
                                    this.onClear()
                                }} onChange={e=>{
                                    e.stopPropagation();
                                    this.onInputItemName(e.target.value)
                                }} value={itemName} placeholder="为舞队创建名字，最多10个字"/>
                            </div>
                            <div className="flex_start fill_item">
                                <span>手机号码</span>
                                <input type="tel" onClick={e=>{
                                    this.onClear()
                                }} onChange={e=>{
                                    e.stopPropagation();
                                    this.onInputItemMobile(e.target.value)
                                }} value={mobile} placeholder="请填写真实的手机号码"/>
                            </div>
                            <div style={{
                                display:User.userInfo.Authentication ? 'none' :'flex'
                            }} className="flex_between fill_item">
                                <div className="flex_start">
                                    <span>验<b style={{
                                        fontWeight:'normal',
                                        padding:"0 0.2rem"
                                    }}>证</b>码</span>
                                    <input type="tel" style={{
                                        width:'4.5rem',
                                        marginLeft:'0.6rem'
                                    }} onClick={e=>{
                                        this.onClear()
                                    }} onChange={e=>{
                                        e.stopPropagation();
                                        this.onInputCode(e.target.value)
                                    }} value={code} placeholder="请输入手机验证码"/> 
                                </div>
                                <span onClick={e => {
                                    e.stopPropagation();
                                    this.onGetCode()
                                }}>{this.state.time == 60 ?  '获取验证码' : this.state.time + 's'}</span>
                            </div>
                            <div className="flex_start fill_item">
                                <span>地理位置</span>
                                <input type="text" placeholder="选择地理位置" readOnly value={address} id='city-picker'/>
                                <img className="arr_img"  src={arrIcon}></img>
                            </div>
                            <div className="flex_start fill_item">
                                <span>详细地址</span>
                                <input onClick={e=>{
                                    this.onClear()
                                }} onChange={e=>{
                                    e.stopPropagation();
                                    this.onInputItemAddress(e.target.value)
                                }} value={addressDetail} placeholder="请输入详细地址"/>
                            </div>
                            <div className="flex_start rule" >
                                <div className="flex_start" style={{width:'0.5rem',height:'0.8rem'}} onClick={e=>{
                                        e.stopPropagation();
                                        if(this.state.agree)
                                        {
                                            this.setState({
                                                agree:false
                                            })
                                        }
                                        else
                                        {
                                            this.setState({
                                                agree:true
                                            })
                                        }
                                    }}>
                                  <img className="select_img" src={this.state.agree?GxOk:GxNo}/>
                                </div>
                               
                                <p>
                                    同意加入<Link to="/about">《中国广场舞专业委员会》</Link>
                                </p>
                                
                            </div>

                        </div>
                        <div className={isActive?"next_button sba":"next_button sbn"} onClick={e=>{
                            e.stopPropagation();
                            this.onSubmit()
                        }}>下一步</div>
                    </div> 
                    :<OCR fillInfo={this.state} teamInfo={this.props.teamInfo}/>
                    }
                    
                  {
                    /**再次注册舞队，注册成功提示 */ 
                      createTeamFlag && <Captain onClode={this.props.createTeam} regiserTeamInfo={regiserTeamInfo}></Captain>
                    }

                </div>
                <Route exact path="/about" render={(param)=>{
                        document.title="中国广场舞专业委员会"
                        if( /(Android)/i.test(navigator.userAgent) )
                        {
                            WXFN.InitJsTicket()
                        }
                        return <About/>
                    }}>
                </Route>
              </Fragment>
    }
}

//提示页面
