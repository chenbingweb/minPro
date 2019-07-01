import React, { Component } from 'react';
import { Link } from "react-router-dom";//HashRouter  BrowserRouter public/index.html
import  {Tool,History} from "../libs/Tool";
import "../css/personInfo.css"
import cfg from "../config/config.json";
const $ =window.$;
export default class PersonInfo extends Component
{
    constructor(props){
        super(props)
        this.state={
           
            address:'',
            province:'',
            city:'',
            county:'',
            pcc:'',
        
            cfg
        }
       
        // let { cfg:{interface:{getActiveList}}}=this.state;
    }
    //详细地址
    onAddressInfo=(val)=>{
        this.setState({
            address:val
        })
    }
    
   async componentDidMount(){
    console.log(this.props.userInfo)
    let { cfg:{interface:{getMemberInfo}}}=this.state;
        let that=this;
        $("#city-picker").cityPicker({
            title: "请选择地址"
          }).change(function(){
            let arr=$(this).val().split(' ');
           
            that.setState({
                pcc:$(this).val(),
                province:arr[0],
                city:arr[1],
                county:arr[2]
            },()=>{
                
            })
        })
            // this.setState({
            //     ...this.props.userInfo,
            //     province:this.props.userInfo.data.province,
            //     city:this.props.userInfo.data.city,
            //     county:this.props.userInfo.data.county,
            //     pcc:this.props.userInfo.province+' '+this.props.userInfo.data.city+' '+this.props.userInfo.data.county,
            // })

       let result = await Tool.Post(getMemberInfo,{});
       if(result.errcode==0)
       {
            this.setState({
                ...result.data,
                province:result.data.province,
                city:result.data.city,
                county:result.data.county,
                pcc:result.data.province+' '+result.data.city+' '+result.data.county,
            })
       }
      
    }
    //保存个人信息
    async submit(){
        $.showLoading('保存中...')
        let { address,province,city,county,cfg:{interface:{saveInfo}}} = this.state;
        if(address=='')
        {
            $.toptip('详细地址不能为空', 'warning');
            return
        }
        
       let result = await Tool.Post(saveInfo,{address,province,city,county});
       if(result.errcode==0)
       {
         $.hideLoading()
         $.toast("保存成功");
         setTimeout(()=>{
            History.goBack()
         },2000)
         
       }
       else
       {
        $.toptip(result.msg, 'warning');
       }

    }
    render(){
        let {address}=this.state;
        return <div className="person_center fixed">
                    <ul className="ul_box">
                        <li className="flex_between">
                            <span className="label_title flex_between"><span>姓</span><span>名</span></span>
                            <span className="fill_info" value="张三" readOnly>{this.state.realname}</span>
                        </li>
                        <li className="flex_between">
                            <span className="label_title flex_between"><span>性</span><span>别</span></span>
                            <span className="fill_info" value="男" readOnly>{this.state.sex==1?'男':'女'}</span>
                        </li>
                        <li className="flex_between">
                            <span className="label_title flex_between">身份证号</span>
                            <span className="fill_info" value="2323311998250000" readOnly>{this.state.idCard}</span>
                        </li>
                        <li className="flex_between">
                            <span className="label_title flex_between">手机号码</span>
                            <span className="fill_info">{this.state.mobile}</span>
                        </li>
                        <li className="flex_between">
                            <span className="label_title flex_between">地理位置</span>
                            <input type="text" className="fill_info" placeholder="选择地理位置" readOnly value={this.state.pcc} id='city-picker'/>
                        </li>
                        
                        <li className="flex_between address_box">
                            <span className="label_title flex_between address">详细地址</span>
                            <textarea className="fill_info address_detail" onChange={e=>{
                                e.stopPropagation()
                                this.onAddressInfo(e.target.value)
                            }} value={address}></textarea>
                        </li>
                    </ul>
                    <div className="sba save_btn" onClick={e=>{
                        e.stopPropagation();
                        this.submit()
                    }}>
                        保存信息
                    </div>
                </div>
    }
}