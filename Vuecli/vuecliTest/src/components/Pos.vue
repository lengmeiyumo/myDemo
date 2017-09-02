<template>
  <div class="pos">
      <div>
          <el-row >
              <el-col :span='7' id="order-list" class="order-pos">
                  <el-tabs>
                        <el-tab-pane label="点餐">
                           <el-table border width="100% " :data="tableData">
                               <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                               <el-table-column prop="count" label="量"  width="50"></el-table-column>
                               <el-table-column prop="price" label="金额" width="70"></el-table-column>
                               <el-table-column  label="操作" width="100" fixed="right">
                                      <template scope="scope">
                                          <el-button type="text" size="small">删除</el-button>
                                          <el-button type="text" size="small">增加</el-button>
                                      </template>
                               </el-table-column>
                           </el-table> 
                           <div class="btn">
                               <el-button type="warning">挂单 </el-button>
                               <el-button type="danger">删除</el-button>
                               <el-button type="success">结账</el-button> 
                           </div> 
                        </el-tab-pane>
                        <el-tab-pane label="挂单">
                        挂单
                        </el-tab-pane>
                        <el-tab-pane label="外卖">
                        外卖
                       </el-tab-pane>
                  </el-tabs>
              </el-col>
              <!--商品展示-->
              <el-col class="order-pos" :span='17'>
                    <div class="often-goods">
                       <div class="title">常用商品</div>
                       <div class="often-goods-list">
                           <ul>
                             <li v-for="goods in oftenGoods">
                               <span>{{goods.goodsName}}</span>
                               <span class="o-price">￥{{goods.price}}元</span>
                             </li>
                             
                           </ul>
                       </div>
                    </div>

                    <div class="goods-type">
                       <el-tabs>
                            <el-tab-pane label="汉堡">

                               <div>
                                  <ul class='cookList'>
                                      <li v-for="goods in type0Goods">
                                          <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                          <span class="foodName">{{goods.goodsName}}</span>
                                          <span class="foodPrice">￥{{goods.price}}元</span>
                                      </li>
                                  </ul>
                               </div>


                            </el-tab-pane>
                            <el-tab-pane label="小食">
                                  <div>
                                  <ul class='cookList'>
                                      <li v-for="goods in type1Goods">
                                          <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                          <span class="foodName">{{goods.goodsName}}</span>
                                          <span class="foodPrice">￥{{goods.price}}元</span>
                                      </li>
                                  </ul>
                               </div>
                            </el-tab-pane>
                            <el-tab-pane label="饮料">
                                 <div>
                                  <ul class='cookList'>
                                      <li v-for="goods in type2Goods">
                                          <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                          <span class="foodName">{{goods.goodsName}}</span>
                                          <span class="foodPrice">￥{{goods.price}}元</span>
                                      </li>
                                  </ul>
                               </div>
                            </el-tab-pane>
                            <el-tab-pane label="套餐">
                               <div>
                                  <ul class='cookList'>
                                      <li v-for="goods in type3Goods">
                                          <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                          <span class="foodName">{{goods.goodsName}}</span>
                                          <span class="foodPrice">￥{{goods.price}}元</span>
                                      </li>
                                  </ul>
                               </div>

                            </el-tab-pane>
                       </el-tabs>
                    </div>
              </el-col>
          </el-row>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Pos',
  data(){
      return {
        tableData: [{
          
          goodsName: '可口可乐',
          price: 8,
          count:1
        }, {
          
          goodsName: '香辣鸡腿堡',
          price: 15,
          count:1
        }, {
         
          goodsName: '爱心薯条',
          price: 8,
          count:1
        }, {
         
          goodsName: '甜筒',
          price: 8,
          count:1
        }],
         oftenGoods:[],
         type0Goods:[],
         type1Goods:[],
         type2Goods:[],
         type3Goods:[],
      }
    },
    created:function(){
       axios.get('http://jspang.com/DemoApi/oftenGoods.php')
       .then(responds=>{
         
         this.oftenGoods=responds.data
       })
       .catch(err=>{
         console.log(err);
         alert("网络错误，不能访问");
       })  

       axios.get('http://jspang.com/DemoApi/typeGoods.php')
       .then(responds=>{
         this.type0Goods=responds.data[0];
         this.type1Goods=responds.data[1];
         this.type2Goods=responds.data[2];
         this.type3Goods=responds.data[3];
       })
       .catch(err=>{
         console.log(err);
         alert("网络错误，不能访问");
       })        
    },
    mounted:function(){
        var orderHeight=document.body.clientHeight;
        document.getElementById("order-list").style.height=orderHeight+'px';
    },
}
</script>


<style scoped>
    .order-pos{
       background-color:#F9FAFC;
       border-right:1px solid #CBCCDA;
    }
    div.btn{
        margin-top:10px;
    }
    div.title{
       height:20px;
       border-bottom:1px solid #d3dce6;
       background-color:#F9FAFC;s
       padding:10px;
       text-align:left;
    }
    div.often-goods-list ul li{
        list-style:none;
        float:left;
        border:1px solid #E5E9F2;
        padding:10px;
        margin:5px;
        background-color:#fff;
        width:156px;
    }
    span.o-price{
        color:#58B7FF;
    }
    .goods-type{
        clear:both;
    }
    .cookList li{
       list-style: none;
       width:27%;
       border:1px solid #E5E9F2;
       height: auot;
       overflow: hidden;
       background-color:#fff;
       padding: 2px;
       float:left;
       margin: 2px;
 
   }
   .cookList li span{
       
        display: block;
        float:left;
   }
   .foodImg{
       width: 40%;
   }
   .foodName{
       font-size: 18px;
       padding-left: 10px;
       color:brown;
 
   }
   .foodPrice{
       font-size: 14px;
       padding-left: 10px;
       padding-top:10px;
   }
</style>
