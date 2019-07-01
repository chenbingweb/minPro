import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,NavLink,Redirect  } from "react-router-dom";
import './nav-bar.css';
import {Config} from "../../config/config";


export default class NavBar extends Component
{
    constructor(props){
        super(props);
        
        this.state={
            navBar:Config.navBar
        }
    }
    componentDidMount(){
        
    }
    onSelectNav=(index)=>{
      this.setState({
        navBar:this.state.navBar.map((item,child)=>{
          if(index==child)
          {
            item.selected=true;
            document.title=item.title
          }
          else
          {
            item.selected=false
          }
          return item
        })
      })
      console.log(index)
    }
    render(){
        let {navBar}=this.state;
        let {currentIndex}=this.props;
        let barList=navBar.map((item,index)=>{
            // 设置默认标题
            if(index==currentIndex)
            {
                item.selected =true;
                document.title=item.title
            }
            return <Link replace exact="true" to={item.path} key={'_'+index} onClick={()=>{
               
                this.onSelectNav(index,item.path)
               
            }} className="nav_item" style={
                                                    item.selected?
                                                    {
                                                        ...item.fontStyle.select_color,
                                                        width:`${100/navBar.length}%`
                                                    }:
                                                    {
                                                        ...item.fontStyle.color,
                                                        width:`${100/navBar.length}%`
                                                    }
                                                }>
                        <div className="item_box">
                          <img style={item.imgStyle} src={item.selected?item.icon_s:item.icon}/>                          
                        </div>
                        
                        <p>{item.name}</p>
                 </Link >
        })
        return (
            <div className='fixed_bar'>
                <div className="nav_box">
                    {
                        barList
                    }
                </div>
            </div>
        )
    }
}