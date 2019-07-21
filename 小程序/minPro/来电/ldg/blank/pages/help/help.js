Page({
  data: {
    tabs:[
      {
        id:1,
        name:"如何提现",
        select:true
      },
      {
        id: 2,
        name: "订单问题"
      },
      {
        id: 3,
        name: "使用指南"
      }
    ],
    question:[
      {
        id:1,
        q:"1、提现需要多久到账？",
        jieda:'提现成功后钱会原路返回到您的充值账户。提现成功后钱会原路返回到您的充值账户',
        select:true
      },
      {
        id:2,
        q: "2、提现需要多久到账？",
        jieda: '提现成功后钱会原路返回到您的充值账户提现成功后钱会原路返回到您的充值账户。'
      },
      {
        id: 3,
        q: "3、押金如何提现？",
        jieda: '提现成功后钱会原路返回到您的充值账户提现成功后钱会原路返回到您的充值账户提现成功后钱会原路返回到您的充值账户。'
      },
      {
        id: 4,
        q: "4、提现需要多久到账？",
        jieda: '提现成功后钱会原路返回到您的充值账户。'
      },
    ]
  },
  onLoad() {},
   onSelect({currentTarget:{dataset:{sid}}}){
    let { tabs } = this.data;
    tabs.forEach(item=>{
      if(item.id==sid)
      {
        item.select = true
      }
      else
      {
        item.select=false
      }
    })
    this.setData({
      tabs
    })
  },
  onSelectQ({ currentTarget: { dataset: { qid } } }){
    console.log(qid)
    let { question } =this.data;
    question.forEach(item=>{
      if (item.id==qid)
      {
        item.select = true
      }
      else
      {
        item.select = false
      }
    })
    this.setData({
      question
    })
  },
});
