import React, { Component } from 'react';
import cfg from "../../config/config.json";
import Swiper from 'swiper/dist/js/swiper.js';
import { Tool } from "../../libs/Tool"
import 'swiper/dist/css/swiper.min.css';
import "./VoteTeam.css"
import {Suport} from "../pro-step/pro-step"
import { format } from 'url';
import { T } from 'antd/lib/upload/utils';
const $ =window.$;
//投票队伍
export default class VoteTeam extends Component
{
   
    constructor(props){
        super(props);
        this.state={
            currentTicket:0,
            joinLTeamList:this.props.joinLTeamList,
            openTick:false,
            currentTeamName:'',
            currentTeamId:'',
            voteList:[],//投票列表
            voteTip:false,//投票提示
            cfg
        }
        this.swiper=null
    }
    componentWillMount(){
        console.log(223)
    }
    async componentDidMount(){
        let { cfg:{interface:{getVoteList}}}=this.state;
        //获取打赏列表
        let resulte=await Tool.Post(getVoteList,{id:Tool.GetUrlPara('id')})
        if(resulte.errcode==0)
        {   
            let list=[];
            let child=[];
            for(let i=0;i<resulte.data.length;i++)
            {
                child.push(resulte.data[i])

                if(i%8==7)
                {
                    list.push(child)
                    child=[]
                }
                
            }
            if(child.length)
            {
              list.push(child)
            }
            
            console.log(list)

            this.setState({
                voteList:list
            })
        }
      
    }
    //开启投票pannel
    onOpenTick=(id,teamName)=>{
    
        this.setState({
            openTick:true,
            currentTeamId:id,
            currentTeamName:teamName
        })
        if(!this.swiper)
        {
            this.swiper= new Swiper('.swiper-container', {
                // autoplay: {
                //     delay: 3000,
                //     stopOnLastSlide: false,
                //     disableOnInteraction: false,
                // },
                loop : false,
                pagination: {
                    el:'.swiper-pagination'
                },
              });
              this.swiper.pagination.$el.addClass('my-pagination-total');
        }
       
    }
    onVote=(tid,isFree,ticket_num,currentTeamId)=>{
        
        if(isFree)
        {
            
            if(!ticket_num)
            {
                $.toast("免费票已用完", "text")
            }
            else
            { 
                $.confirm("确认投票？", ()=> {
                    //点击确认后的回调函数
                    this.freeVote(tid,currentTeamId)
                    }, ()=> {
                    //点击取消后的回调函数
                });

               
            }
           
            
        }
        else
        {
           
            $.confirm("确认购买后投票？", ()=> {
                //点击确认后的回调函数
                this.buyTicket(tid,currentTeamId)
                }, ()=> {
                //点击取消后的回调函数
            });
           
        }
        
    }
    //免费投票
    async freeVote(tid,currentTeamId){
        let { cfg:{interface:{freeVote}},voteList}=this.state;

        let result=await Tool.Post(freeVote,{
            id:currentTeamId,
            ticket_id:tid//投票id
        })
        if(result.errcode==0)
        {
           
            let currentTicket=0
            voteList.forEach(item=>{
                item.forEach(child=>{
                    if(tid==child.id)
                    {
                        this.updateTicket(child.ticket_num)
                        currentTicket=1;
                        child.ticket_num=0;
                    }
                })
              
            })
            this.setState({
                voteList,
                voteTip:true,
                currentTicket
            },)
        }
        
    }
    //购买投票
    async buyTicket(tid,currentTeamId){
        let { cfg:{interface:{buyTicket}},voteList}=this.state;
   
        let result=await Tool.Post(buyTicket,{
            id:currentTeamId,
            ticket_id:tid//投票id
            
        })
        if(result.errcode==0)
        {
            Tool.WeiXinPay(result.data,()=>{
                let currentTicket=0
                voteList.forEach(item=>{
                    item.forEach(child=>{
                        if(tid==child.id)
                        {
                            console.log(child.ticket_num)
                            this.updateTicket(child.ticket_num)
                            // child.ticket_num=0;
                            currentTicket=child.ticket_num
                        }
                    })
                  
                })
                this.setState({
                    voteList,
                    voteTip:true,
                    currentTicket
                })
            },(res)=>{
                $.toast(res,'text')
            })
        
          
        }
    }
    //修改投票数量
    updateTicket=(ticket)=>{
        let {joinLTeamList,currentTeamId}=this.state;
       
        joinLTeamList.forEach(item=>{
            if(item.id==currentTeamId)
            {
                item.vote_num+=ticket;//修改票数
                item.has_vote=true;//设置已经点赞
               // item.activity_member_number+=1;//人数加一
            }
        })
        this.setState({
            joinLTeamList
        })
    }

    render(){
        let {tabIndex}=this.props;
        let {openTick,voteList,joinLTeamList,currentTeamName,currentTeamId,currentTicket}=this.state;
       
        if(joinLTeamList.length==0 && tabIndex==1) return <p className="no_data" style={{background:'#f2f2f2'}}>暂数数据</p>
        return <div id="vote_box" style={{display:tabIndex==1?'block':'none'}}>
     
                    <ul className="team_box">
                        {
                            joinLTeamList.map((item,index)=>{
                                return <li key={'_'+index} className="team_item flex_between">
                                <div className="flex_start">
                                    <div className="tickets_num">{item.vote_num}</div>
                                    <div className="team_info">
                                        <p className="one_line">{item.team_name}</p>
                                        <p>{item.leader_name}等{item.activity_member_number}人</p>
                                    </div>
                                </div>
                                {/* vote_btn activ */}
                                <div className={item.has_vote?'vote_btn active':'vote_btn'} onClick={e=>{
                                    e.stopPropagation();
                                    this.onOpenTick(item.id,item.team_name)
                                    if(!item.has_vote)
                                    {

                                       
                                        
                                    }
                                   
                                }}>
                                       
                                </div>
                            </li>
                            })
                        }
                        
                    </ul>
                    <div className="vote_ticke_box" style={
                        {
                            opacity:!openTick?'0':'1',
                            pointerEvents:openTick?'all':'none',

                        }
                    }>
                     
                        <div className="swiper_box" style={
                        
                        {
                            pointerEvents:'all',
                            bottom:openTick ? '0rem':(-1000/75+'rem')
                        }
                    }>

                        <p className="title_tp flex_between">
                            <span>为“{currentTeamName}”投票</span>
                            <span className="close" onClick={e=>{
                                e.stopPropagation();
                                this.setState({
                                    openTick:false
                                })
                            }}></span>
                        </p>
                        <div className="gift_content_box">
                            <SelectCom  voteList={voteList} currentTeamId={currentTeamId} onVote={this.onVote}/>
                        </div> 
        
                        </div>
                    </div>

                    <Suport currentTicket={currentTicket} CloseCallBack={(flag)=>{
                        //true 
                        this.setState({
                            voteTip:false,
                            openTick:false
                        })
                    }} showPanel={this.state.voteTip}/>
             </div>
    }
}
//点赞选择
class SelectCom extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            voteList:[]
            
        }
    }
    static getDerivedStateFromProps(prop,state){
        console.log(prop)
   
        return {
            voteList:prop.voteList
        }
    }
    
    render(){
        
        let {onVote,currentTeamId}=this.props;
        let {voteList}=this.state;
        
        return <div className="swiper-container">
                <div className="swiper-wrapper">
                    {
                        
                        voteList.map((item,index)=>{
                            return   <div className="swiper-slide"  key={index}>
                                <div className="gift_box flex_start">
                                {
                                    item.map((child,_index)=>{
                                        return  <div key={_index} className="gift_item" onClick={e=>{
                                            e.stopPropagation();
                                            onVote(child.id,child.price==0,child.ticket_num,currentTeamId);
                                        }}>
                                        <div className="flex_center img_content">
                                            <img src={child.icon}/>
                                        </div>
                                        <p className="ticket_num">{child.ticket_num}票</p>
                                        {/* {child.price?<p className="ticket_num">{child.ticket_num}票</p>:<p className="ticket_num">0票</p>} */}
                                        {
                                            child.price?<p className="ticket_money">¥{child.price}</p>
                                                        :<p className="ticket_money">剩余{child.ticket_num}张</p>
                                            
                                        }
                                        
                                    </div>
                                    })
                                }
                                </div>
                            
                        
                            </div>
                        })
                    }
                  
                    
                </div>
                <div className="swiper-pagination"></div>
        </div>
    }
}



