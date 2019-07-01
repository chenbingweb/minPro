import {UIEvent} from "../libs/UIEvent"
class Team{
    constructor(){
        this.teamList=[]
        this.NavHomeEvent=new UIEvent()
    }
    //储存舞队列表
    saveTeamList(data){
        sessionStorage.setItem('teamList',JSON.stringify(data));
    }
    //添加舞队
    addTeam(data){
        let teamList=sessionStorage.getItem('teamList')
        if(teamList)
        {
            try{
                teamList=JSON.parse(teamList);
                teamList.push(data);
            }catch(e){
                teamList=[]
            }
           
        }
        else
        {
            teamList=[]
        }
        this.saveTeamList(teamList)
       
    }
    //获取所有舞队列表
    getAllTeamList(){
        let teamList=sessionStorage.getItem('teamList')
        if(teamList)
        {
            try{
                teamList=JSON.parse(teamList)
            }catch(e){
                teamList=[]
            }
           
        }
        else
        {
            teamList=[]
        }
        return teamList
    }
    //获取当前舞队信息
    getCurrentTeam(mid){
       return this.getAllTeamList().filter(item=>{
    
               return item.id==mid
              })[0]
    }
    //修改舞队队员数据
    setTeamData(id,newTeam){
       // debugger
        let data=this.getAllTeamList()
        data.forEach(item=>{
            if(item.id==id)
            {
                
                item.team_member=newTeam.team_member
            }
        })
        this.saveTeamList(data)

    }
    //获取当前舞队的成员
    getTeamMember(mid){
        
        let member=[]
        this.getAllTeamList().forEach(item=>{
            if(item.id==mid)
            {
                member=item.team_member
            }
        })
        return member
    }
   
    //转移舞队 cid当前舞队id tid 要转移到的舞队id mt舞队成员
    moveTeam(cid,tid,mt){
        let list=this.getAllTeamList()
        mt.forEach(_item=>{
            _item.ty='zy';
            _item.attrId=cid;
            _item.checked=false;
        })
        list.forEach(item=>{
            if(item.id==tid)
            {
               
                item.team_member.push(...mt);
            }
            if(item.id==cid)
            {
                    mt.forEach(_child=>{
                        item.team_member.forEach((child,index)=>{
                            if(child.id==_child.id)
                            {
                                //moveTeam.push(...item.team_member.splice(index,1))
                                item.team_member.splice(index,1)
                            }
                        })
                       
                    })
               
            }
        })
        this.saveTeamList(list)

        
    }
    //创建新组队  cid当前舞队id tid 要转移到的舞队id mt舞队成员
    createNewTeam(cid,teamName,mt,teamInfo){
        mt.forEach(_item=>{
            _item.ty='new';
            _item.checked=false;   
            _item.attrId=cid;
         
        })
        let list=this.getAllTeamList();
        let obj={
            ty:'new',
            id:Math.random(),
            cid:cid,
            team_name:teamName,
            team_member:mt,
            type: "no_change",
            sign_person_num_min:teamInfo.sign_person_num_min,
            sign_person_num_max:teamInfo.sign_person_num_max
        }
      
        list.forEach(item=>{
            
            if(item.id==cid)
            {
               // item.type="no_change"
                    mt.forEach(_child=>{
                        item.team_member.forEach((child,index)=>{
                            if(child.id==_child.id)
                            {
                               
                                item.team_member.splice(index,1)
                            }
                        })
                       
                    })
               
            }
        })
        list.unshift(obj)
        this.saveTeamList(list)
    }
    //删除拆分后的舞队
    removeSplitTeam(newteam){
        let list=this.getAllTeamList();
        let {id}=newteam
        debugger
        list.forEach((item,index)=>{
            //找到要移除的舞队
            if(id==item.id)
            {
                list.splice(index,1)
               // this.saveTeamList(list)
               // this.resetTeam(newteam,item)
               this.resetTeam_2(newteam.team_member,list)
            }

            //this.resetTeam(newteam,item)
           
           
          
            
            // if(item.id==newteam.cid)
            // {
            //     item.team_member.push(...newteam.team_member)
               
            // }
        })
        // list.forEach((item,index)=>{
        //     debugger
        //     if(item.join_team_num==item.team_member.length)
        //     {
        //         item.type="split"
        //     }
        // })

         this.saveTeamList(list)
    }
    resetTeam_2(member,list){
        list.forEach(item=>{
            
            member.forEach(child=>{
                child.is_leader=0;
                if(item.id==child.attrId)
                {
                    item.team_member.push(child)
                }
            })
            
        })

        
    }
    resetTeam(newteam,child){
      
        newteam.team_member.forEach(_item=>{
            _item.is_leader=0;
           
           
            if(_item.attrId==child.id)
            {
               
                child.team_member.push(_item)
       
                _item.attrId=''
                _item.ty='';
            }
          
            
        })
    }


}
let team = new Team();
export { team as Team }