Page({
  data: {
    rechange:[
      {
        fee:'10.00',
        id:10,
        select:true
      },
      {
        fee: '50.00',
        id: 50,
        select: false
      },
      {
        fee: '100.00',
        id: 100,
        select: false
      },
    ]
  },
  onLoad() {},
  onSelect({currentTarget:{dataset:{rid}}}){
    let { rechange } = this.data;
    rechange.forEach(item=>{
      if(item.id==rid)
      {
        item.select = true
      }
      else
      {
        item.select=false
      }
    })
    this.setData({
      rechange
    })
  },
});
