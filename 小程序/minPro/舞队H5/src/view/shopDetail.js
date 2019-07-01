import React, { Component } from 'react';
import "../css/shopDetail.css";
import  {Tool} from "../libs/Tool";
import cfg from "../config/config.json";
export default class ShopDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            shopDetail:null,
            cfg,
            showList:[]
        };
        console.log(this.props);

    }
    async componentDidMount(){
        let { getResDetailInfo}=this.state.cfg.interface;
        // let rankList= await Tool.Post('/api/getSlider',{});
         let shopDetail= await Tool.Post(getResDetailInfo,{id:31});
         if(shopDetail.errcode==0)
         {
            
             shopDetail.data.food_category.unshift({id:'all',name:'全部'})
             shopDetail.data.food_category.forEach((item,index)=>{
                 if(index==0)
                 {
                    item.select=true;
                   
                 }
                 else
                 {
                    item.select=false;
                 }
             })
             this.setState({
                shopDetail:shopDetail.data,
                showList:this.getList('all',shopDetail.data.food)
             })
         }
       
        
    }
    getList(id,food){
        let list=[];
        if(id=='all')
        {
            return food
        }
        food.forEach(item=>{
            console.log(item)
            if(item.category_id==id)
            {
                list.push(item)
            }
        })
        console.log(list)
        return list;
    }
    onNav=(id)=>{
        let {food_category,food}=this.state.shopDetail;
        food_category.forEach(item=>{
            if(item.id==id)
            {
                item.select=true;
            }
            else
            {
                item.select=false;
            }
            
        })
        this.setState({
            ['shopDetail.food_category']:food_category,
            showList:this.getList(id,food)
        })

    }
    render(){
        if(!this.state.shopDetail) return null
        let {name,address,summary,food_category,food}=this.state.shopDetail;
        
       
        let navList=food_category.map((item,index)=>{
          
            return <li key={item.id} className={(item.select?'select ':'')+'left_item'} onClick={(e)=>{ 
                
                e.stopPropagation();
                e.preventDefault();

                this.onNav(item.id);
               
            }} >{item.name}</li>
        })

        let rightList=this.state.showList.map((item,index)=>{
      
            return  <div key={index} className="flex_between cai_item">
                        <div className="flex_center left_img">
                            <img src="http://ft.jeemoo.com/uploads/images/restaurant/15482088935955.png"></img>
                        </div>
                        <div className="right_info">
                            <p className="title">番茄蛋套餐（凤厨套餐）</p>
                            <p className="sy">剩余：0</p>
                            <div className="flex_between money">
                                <p>￥33</p>
                                <p className="flex_start">
                                    <span>-</span>
                                    <span>0</span>
                                    <span>+</span>
                                </p>
                            </div>
                        </div> 
                    </div>
        })
        return <div>
                <header className="header_box_1">
                    <img className="img_bg" src="http://ft.jeemoo.com/uploads/images/restaurant/15482088935955.png"></img>
                </header>
                <section className="shop_js">
                    <p>{name}</p>
                    <p className="address">{address}</p>
                    <p className="dis">{summary}</p>
                </section>               
                <div className="scroll_box">
                    <ul className="left_box">
                       {navList}
                    </ul>
                    <div className="right_box">
                       {rightList}
                    </div>
                </div>
        </div>
    }
}