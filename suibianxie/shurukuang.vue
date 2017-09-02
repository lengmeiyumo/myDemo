<template>
    <div>
          <input type="text" v-model="name" placeholder="点击搜索按钮筛选" />
          <input type="button" @click="search" />
    </div>
    <table>
          <tbody>
            <tr v-for="item in listt0">
              <td>
                  <a v-text="item.sort"></a>
              </td>
              <td>
                  <a v-text="item.City"></a>
              </td>
              <td>
                  <a :style="{'color':item.sort<=10?'#f2972e':''}" v-cloak>{{item.Data | two}}</a>
              </td>
              <td><span v-text="item.Good"></span></td>
            </tr>
          </tbody>
     </table>
</template>
<script>
import axios from 'axios';
   export default{
        name:"Select",
        data(){
           list0:[],//原始
           listt0:[],//处理过的
           name:'',//搜索框内容
        },
        created:function(){
                    //这获取数据且list0以及listt0都为获取到的数据
        },
        methods:{
                     search:function(){//搜索
                         var _this=this;
                         var tab=this['list0'];
                         if(this.name){                                     
                            _this['listt0']=[];                     
                             if(!isNaN(parseInt(_this.name))) {
                                for(i in tab) {
                                    if(tab[i].sort == parseInt(_this.name)) {
                                        _this['listt0'].push(tab[i]);
                                    };
                                };
                            } else {
                                for(i in tab) {
                                    if(tab[i].City.indexOf(_this.name) >= 0) {
                                        _this['listt0'].push(tab[i]);
                                    };
                                };
                            };
                         }else{
                             alert('请输入筛选条件!')
                         };
                     }
        }, 
        filters: {//保留两位小数点
                    two : function(value){
                        if (!value) { return ''};
                        return value.toFixed(2);
                    }
                }   
   }

</script>  