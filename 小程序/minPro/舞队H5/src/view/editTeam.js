import React, { Component } from 'react';
import { Link } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import  {Tool,History} from "../libs/Tool";
import { Team } from "../model/teamSet"
import cfg from "../config/config.json";
import "../css/editTeam.css"
import SelectOK from "../images/select_ok.png"
import SelectNO from "../images/select_no.png";
const $=window.$;
export default class EditTeam extends Component
{
    constructor(props){
        super(props)
        this.state={
            showSplitPanel:false,
            showMovePanel:false,
            splitTeamName:'',
            moveToTeamId:'',
            memberList:[],
            teamInfo:{},
            selectAll:false,
            allTeamList:Team.getAllTeamList(),
            cfg
        }
        // let { cfg:{interface:{getActiveList}}}=this.state;
    }
    componentDidMount(){
        //获取舞队下的成员
        let mid=Tool.GetUrlPara('child');
        if(mid)
        {
            this.setState({
                showMovePanel:false,
                showSplitPanel:false,
                teamInfo: Team.getCurrentTeam(mid)
            })
           
        }
    }
    //确认拆分
    onSure=()=>{
        let {splitTeamName,teamInfo,allTeamList}=this.state;
        let nameIsOk=false
        // allTeamList.forEach(item=>{
        //     if(item.team_name.trim()==splitTeamName.trim())
        //     {
        //         nameIsOk=true
        //     }
        // })
        if(splitTeamName.trim()=='')
        {
            $.toptip('请输入分队名称', 'warning');
        }
        else  if(nameIsOk){
            $.toptip('分队名称已存在', 'warning');
        }
        else
        {
            // let selectNum=teamInfo.team_member.filter(item=>item.checked==true).length;
            // //如果超出参赛舞队，提示用户
            // if(teamInfo.sign_person_num_max<selectNum)
            // {
                
            //     $.toptip('已超出报名人数，请重新选择', 'warning');
            // }
            // else
            // {

            // }
                
                let mid=Tool.GetUrlPara('child');
                let mt=teamInfo.team_member.filter(item=>{
                   // item.is_leader=0;
                   return item.checked==true
                })
                
                Team.createNewTeam(mid,splitTeamName,mt,teamInfo)//createNewTeam(splitTeamName,mt)
                this.componentDidMount();
                $.alert("拆分成功", "提示", function() {
                    History.goBack()
                });
               
             

        
        }

    }
    //关闭拆分分队输入面板
    onCancel=()=>{
        this.setState({
            showSplitPanel:false
        })
    }
    //输入拆分后舞队名称
    onInputTeamName=(e)=>{
        this.setState({
            splitTeamName:e.target.value
        })
    }
    //选择要转移的舞队
    onSelectTeamName=(e)=>{
        this.setState({
            moveToTeamId:e.target.value
        })
       
    }
    //确认转移
    onMoveSure=()=>{
        let {moveToTeamId,teamInfo}=this.state;
        if(moveToTeamId=='')
        {
            $.toptip('请选择要转移的舞队', 'warning');
        }
        else
        {
            
            let mid=Tool.GetUrlPara('child');
            let mt=teamInfo.team_member.filter(item=>{
                item.is_leader=0;
               return item.checked==true
            })
            Team.moveTeam(mid,moveToTeamId,mt);
            this.componentDidMount()
            $.alert("转移成功", "提示", function() {
                History.goBack()
            });
           
        }
    }
    //勾选舞队
    onSelect(id){
        let {teamInfo}=this.state;
        teamInfo.team_member.forEach(item => {
            if(item.id==id)
            {

                if(item.checked)
                {
                    item.checked=false
                }
                else
                {
                    item.checked=true
                   
                }
            }
        });
        this.setState({
            teamInfo
        },()=>{
            this.isCheckAll()
        }) 
      
       
       
    }
    //选择所有
    onSelectAll=()=>{
        let {teamInfo,selectAll}=this.state;
        
        teamInfo.team_member.forEach(item => {
            if(!item.is_captain)
            {
                if(selectAll)
                {
                    item.checked=false;
                }
                else
                {
                    item.checked=true;
                }
            }
           
            
        });
        this.setState({
            teamInfo,
            selectAll:teamInfo.team_member.length==1?false : !selectAll 
        })
    }
    //检测是否全选
    isCheckAll(){
        let {teamInfo}=this.state;
        let list=[]
       teamInfo.team_member.map(item=>{
            if( item.is_captain==false)
            {
                list.push(item)
            }
        })
        console.log(list)
       this.setState({
            selectAll:list.every(item=>item.checked==true)
       })
    }
    //设置领队
    setLeader=(id)=>{
        let {teamInfo}=this.state;
        teamInfo.team_member.forEach(item=>{
            if(id==item.id)
            {
                item.is_leader=1
            }
            else
            {
                item.is_leader=0
            }
        })
        this.setState({
            teamInfo
        })
        Team.setTeamData(Tool.GetUrlPara('child'),teamInfo)
    }
    //获取已选择舞队人员信息
    getSelectedTeam=()=>{
        let {teamInfo:{team_member}}=this.state;
        return team_member.filter(item=>item.checked==true)
    }

    render(){
        let {showSplitPanel,splitTeamName,showMovePanel,teamInfo,selectAll,allTeamList,moveToTeamId}=this.state;
        if(!teamInfo.team_member || teamInfo.team_member.length==0) return <div className="no_data">暂无可选队员</div>
        return <div className="edit_team">
                   <p className="title_box flex_between">
                        <span>{teamInfo.team_name}</span>
                        <span>共{teamInfo.team_member.length}人</span>
                    </p>
                    
                    <ul className="teams">
                       
                            {
                                   teamInfo.team_member.map((item,index)=>{
                                    return  !item.is_captain ? <li className="flex_between" key={index}>
                                    <div onClick={e=>{
                                        e.stopPropagation();
                                        this.onSelect(item.id)
                                    }} className={item.checked?'flex_start select_label select_active':'flex_start select_label'}>
                                        <div className="photo_img_1">
                                            <img src={item.avatar}></img>
                                        </div>
                                        <p>{item.nickname}</p>
                                    </div> 
                                    <div className="set_team" onClick={e=>{
                                        e.stopPropagation();
                                        this.setLeader(item.id)
                                    }}>
                                       {
                                           item.is_leader?' 取消领队' :'设为领队'
                                       }
                                    </div>
        
                                </li> :<li key={index} className="flex_between">
                                        <label className="flex_start select_label select_label_no">
                                            <div className="photo_img_1">
                                                <img src={item.avatar}></img>
                                            </div>
                                            <p>{item.nickname}</p>
                                        </label> 
                                        <div className="dz_label">队长</div>

                                    </li>
                                 })
                            }
                       
                    </ul>
                    <div className="control_box_team flex_between"> 
                         <div className="select_all flex_start" onClick={e=>{
                             e.stopPropagation()
                            this.onSelectAll()
                         }}>
                            <img src={selectAll? SelectOK : SelectNO}></img>
                            全部
                         </div>
                         <div className="flex_start control_btns">
                            <span onClick={e=>{
                                e.stopPropagation();
                                if(this.getSelectedTeam().length==0)
                                {
                                    $.toptip('请选择舞队人员', 'warning');
                                }
                                else
                                {
                                    this.setState({
                                        showMovePanel:true
                                    })
                                }
                               
                            }}>转移人员</span>
                            <span onClick={e=>{
                                e.stopPropagation();
                                if(this.getSelectedTeam().length==0)
                                {
                                    $.toptip('请选择舞队人员', 'warning');
                                }
                                else
                                {
                                    this.setState({
                                        showSplitPanel:true
                                    })
                                }
                                
                            }}>拆成分队</span>
                         </div>
                    </div>
                    {
                        showSplitPanel?<SplitTeam 
                                        onSure={this.onSure}
                                        onCancel={this.onCancel}
                                        onInputTeamName={this.onInputTeamName}
                                        splitTeamName={splitTeamName}
                                        />:''
                      
                    }
                    {
                        showMovePanel? <MoveTeam 
                                        moveToTeamId={moveToTeamId}
                                        allTeamList={allTeamList}
                                        onSelectTeamName={this.onSelectTeamName}
                                        onCancel={()=>{
                                            
                                            this.setState({
                                                showMovePanel:false
                                            })
                                        }}
                                        onSure={this.onMoveSure}
                                    />:''
                    }
                    
                </div>
    }
}

//拆分队员
function SplitTeam(props){
    let {onCancel,onSure,onInputTeamName,splitTeamName}=props;
    return <div className="split_mark">
                <div className="split_panel">
                    <p className="panel_title_1">输入名称</p>
                    <div className="flex_center input_fill">
                        <input placeholder="请输入分队名称" value={splitTeamName} onChange={e=>{
                            e.stopPropagation();
                            onInputTeamName(e)
                        }}></input>
                    </div>
                    <div className="bottom_btns flex_between">
                        <span className="cancel_btn" onClick={e=>{
                            e.stopPropagation()
                            onCancel()
                        }}>取消</span>
                        <span className="sure_btn" onClick={e=>{
                            e.stopPropagation();
                            onSure()
                        }}>确认</span>
                    </div>
                </div>
            </div>
}
//转移人员
function MoveTeam(props){
    let {onCancel,onSure,onSelectTeamName,splitTeamName,allTeamList,moveToTeamId}=props;
    return <div className="split_mark">
                <div className="split_panel">
                    <p className="panel_title_1">请选择</p>
                    <div className="flex_center input_fill select_fill">
                        <select value={moveToTeamId} className="select_dance_team" onChange={
                            e=>{
                                e.stopPropagation()
                                onSelectTeamName(e)
                            }
                        }>
                            <option  value="">请选择转移的舞队</option>
                            {
                                allTeamList.map(item=>{
                                   
                                    if(!item.is_sign && parseInt(Tool.GetUrlPara('child'))==item.cid && !item.qrcode_img )
                                    {
                                        return <option  key={item.id} value={item.id}>{item.team_name}</option>
                                    }
                                   
                                })
                            }
                        </select>
                    </div>
                    <div className="bottom_btns flex_between">
                        <span className="cancel_btn" onClick={e=>{
                            e.stopPropagation()
                            onCancel()
                        }}>取消</span>
                        <span className="sure_btn" onClick={e=>{
                            e.stopPropagation();
                            onSure()
                        }}>确认</span>
                    </div>
                </div>
            </div>
}