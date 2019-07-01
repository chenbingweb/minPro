
import React, { Component } from 'react';
import { Link } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import Poster from "../../model/poster"
import  {Tool,History} from "../../libs/Tool";
import "./step.css"
import cfg from "../../config/config.json";
const $ = window.$;

export  class ProStep extends Component
{
    constructor(props){
        super(props)
        this.state={
            
            cfg
        }
        // let { cfg:{interface:{getActiveList}}}=this.state;
    }
    render(){
        return <div className="register_header flex_between">
                <div className="step_box flex_center">
                    <div className="step active">1</div>
                    <p className="step_name">舞队信息</p>
                </div>
                <div className="step_box flex_center">
                    <div className="step active">2</div>
                    <p className="step_name">身份认证</p>
                </div>
                <div className="step_box flex_center">
                    <div className="step">3</div>
                    <p className="step_name">完成注册</p>
                </div>
            </div>
    }
}
//投票成功
export class Suport extends Component{
    static defaultProps = { 
        
    }
    constructor(props){
        super(props)
        this.state={
            showPanel:false,
            cfg
        }

        // let { cfg:{interface:{getActiveList}}}=this.state;
    }
    static getDerivedStateFromProps(prop,state){
        console.log(prop)
   
        return {
            showPanel:prop.showPanel || false
        }
    }
    //点赞成功
    render(){
        let {showPanel}=this.state;
        let { currentTicket }=this.props;
        if(!showPanel)
        {
            return ''
        }
        return <div className="suport_mark">
                    <div className="suport_pannel">
                        <span className="close_box_img_icon" onClick={e=>{
                            e.stopPropagation()
                            //关闭投票和投票成功提示
                            this.props.CloseCallBack &&  this.props.CloseCallBack(false)
                           
                        }}></span>
                        <p className="title_pannel_12">投票成功</p>
                        <p className="suport_title_content_10">您的礼物已送出</p>
                        <p className="suport_title_content_10">成功为该舞队投票<span className="tickes_total_num">+{currentTicket}</span></p>
                        <p className="success_icon"></p>
                        <p className="g_l_r go_o_btn" onClick={e=>{
                            e.stopPropagation()
                            //不关闭投票，但关闭投票成功提示
                            this.props.CloseCallBack &&  this.props.CloseCallBack(true)
                            
                        }}>继续投票</p>

                    </div>
            </div>
    }
}
//队长注册成功
export class Captain extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        let {regiserTeamInfo}=this.props;
        let poster = new Poster($('#poster')[0]);
        poster.drawImg(require('../../images/qr_bg.png'),regiserTeamInfo.team_name ,regiserTeamInfo.qrcode ,()=>{
            setTimeout(function(){
                   var data = $('canvas')[0].toDataURL('image/png', 1);  //1表示质量(无损压缩)
                   $('#touchImg').attr('src',data)
                },500)
        },246);
    }
    render(){
        let {onClode,regiserTeamInfo}=this.props;
        return <div className="suport_mark">
                
                <div className="cap_pannel ">
                    <div  id="poster" className="absolute"  style={{opacity:0}}></div>
                    <div className="absolute">
                        <p className="cap_title">
                            完成注册
                            <span className="cancel_btn" onClick={
                                e=>{
                                    debugger
                                    e.stopPropagation()
                                    onClode &&  onClode()
                                    if(Tool.GetUrlPara('src')=='ct')
                                    {
                                        
                                        History.location.state=regiserTeamInfo
                                        History.goBack()
                                    }
                                
                                }
                            }></span>
                        </p>
                        {/* regiserTeamInfo.qrcode ||  */}
                        <img className="qr_img" src={regiserTeamInfo.qrcode}></img>
                        <img className="qr_img" id="touchImg" style={{opacity:0}}></img>
                        <div className="team_name_4">
                            <p className="team_title_7">{regiserTeamInfo.team_name}</p>
                            <p className="qr_code_tip">长按保存舞队二维码</p>
                            <p className="qr_code_tip">可在舞队信息中查看二维码</p>
                        </div>
                    </div>
                   
                </div>
               


            </div>
    }
}
//分页
/** 
 * 
 * className="active_detail" 
isScroll={tabIndex==1} 
callBack={this.getJoinList}
loaderClass="loaderClass"
path={joinTeamList}
param={}
 * 
*/
export class PageWap extends Component{

    constructor(props)
    {
        super(props);
        this.state={
            loader:false,
            block:'block',
            content:''
        }
        this.pageFlag=false;
        this.page_num=0;
        this.page_size=10;

    }
    componentWillReceiveProps(props,state){
        // let { isScroll }=props;
        // if(isScroll)
        // {
        //     this.callBackFn()
        // }

    }
    componentDidMount(){
        $.showLoading()
        this.callBackFn()
      
    }
    componentDidUpdate(){
        let {isScroll}=this.props;
        if(isScroll)
        {
            window.addEventListener("scroll",this.scrollFn.bind(this))
        }
        else
        {
            window.removeEventListener('scroll',this.scrollFn,false)
        }
    }
    scrollFn(e){
        let {isScroll}=this.props;
        if(!this.pageFlag || !isScroll) return

        if(document.body.scrollHeight <= window.screen.height + document.body.scrollTop)
        {
            this.pageFlag=false
            this.setState({
                content:'加载更多',
                
            },()=>{
                this.callBackFn()
            })
           
           
            
        }
        // let that=this;
        // console.log(233)
        // if(!that.pageFlag) return
    
        // var viewHeight = $(this).height(); //可见高度  
        // var contentHeight = $(".active_detail").get(0).scrollHeight; //内容高度  
        // var scrollHeight = $(this).scrollTop(); //滚动高度  
        // if (scrollHeight / (contentHeight - viewHeight) >= 1) { //到达底部100%时,加载新内容 
        //    console.log(23)
         
        // }
    }
    callBackFn=async ()=>{
        let {callBack,path,loaderClass,debug,param}=this.props;
        let sendData={
            page_size:this.page_size,
            page_num:++this.page_num
        }
        if(param)
        {
            sendData=Object.assign(sendData,param)
        }

        let result = await Tool.Post(path,sendData,debug);
        $.hideLoading()
        if(result.errcode==0)
        {
            setTimeout(()=>{
            let data=result.data;
            if(data.length>=this.page_size)
            {
                this.pageFlag=true;
                if(this.page_num>1)
                {
                    this.setState({
                        
                        content:'',
                    })
                }
            }
            else
            {
                this.pageFlag=false;
                if(this.page_num>1)
                {
                    this.setState({
                        content:'暂无更多'
                    })
                }

            }
            callBack(data)
           
               
            },400)
            
        }
    }
    render(){
        let {className,isScroll,loaderClass}=this.props;
        let {content}=this.state;
        return <div className={className}>
            {
                this.props.children
                
            }
            {
                isScroll ?<p className={'no_data '+loaderClass || ''} >{content}</p> :''
            }
        </div>
    }
}
