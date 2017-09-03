<template> 
     <div class="retrievalmian"> 
     <div class="retrievaltitle"> 
     <a class="btn-default tabbtn" @click="seniorsearch('')" :class="[tabbtn==''?'checked':'']" >高级搜索</a> 
     <a class="btn-default tabbtn" @click="seniorsearch('author')" :class="[tabbtn=='author'?'checked':'']" >作者搜索</a> 
     </div> 
     <div class="retrievalbar"> 
     <div class="formbody"> 
     <div class="formoperate"> 
      <span class="tipsicon addplus" @click="addplus" v-show="formtips.length<12"></span> 
      <span class="tipsicon removeminus" @click="removeminus" v-show="formtips.length>=4"></span> 
     </div> 
     <div class="formline"> 
      <div class="formtips" v-for="(item,index) in formtips"> 
      <div class="formgroup"> 
      <select class="formcontrol" v-model="item.titletype"> 
      <option v-for="typeselect in titletype" v-if="tabbtn==''" :value="typeselect.value">{{typeselect.text}}</option> 
      <option v-for="typeselect in titletypeAuthor" v-if="tabbtn=='author'&&!(index%2)" :value="typeselect.value">{{typeselect.text}}</option> 
      <option v-for="typeselect in titletypeAuthor2" v-if="tabbtn=='author'&&(index%2)" :value="typeselect.value">{{typeselect.text}}</option> 
      </select> 
      </div> 
      <div class="formgroup"> 
      <input type="text" class="forminp" v-model="item.typeinp"> 
      </div> 
      <div class="formgroup"> 
      <select class="formcontrol" > 
      <option v-for="accuracy in accuracys" :value="accuracy.value">{{accuracy.text}}</option> 
      </select> 
      </div> 
      <div class="formgroup"> 
      <select class="formcontrol" v-model="item.containlist"> 
      <option v-for="containlist in containlists" :value="containlist.value">{{containlist.text}}</option> 
      
      </select> 
      </div> 
      </div> 
     </div> 
     <div class="formline"> 
      <div class="formgroup"> 
      <div class="catalog" @click="catalogshow" >文献分类目录</div> 
      <div class="cataloghint"> 
      <ul class="cataloglist" v-show="iscataloglist"> 
      <li> 
       <div class="checkbox"> 
       <label> 
       <input type="checkbox" v-model="cataloglist" value="核工业">核工业 
       </label> 
       </div> 
      </li> 
      <li> 
       <div class="checkbox"> 
       <label> 
       <input type="checkbox" v-model="cataloglist" value="航天工业">航天工业 
       </label> 
       </div> 
      </li> 
      <li> 
       <div class="checkbox"> 
       <label> 
       <input type="checkbox" v-model="cataloglist" value="航空工业">航空工业 
       </label> 
       </div> 
      </li> 
      <li> 
       <div class="checkbox"> 
       <label> 
       <input type="checkbox" v-model="cataloglist" value="船舶工业">船舶工业 
       </label> 
       </div> 
      </li> 
      <li> 
       <div class="checkbox"> 
       <label> 
       <input type="checkbox" v-model="cataloglist" value="兵器工业">兵器工业 
       </label> 
       </div> 
      </li> 
      <li> 
       <div class="checkbox"> 
       <label> 
       <input type="checkbox" v-model="cataloglist" value="军工电子">军工电子 
       </label> 
       </div> 
      </li> 
      <li> 
       <div class="checkbox"> 
       <label> 
       <input type="checkbox" v-model="cataloglist" value="国防综合">国防综合 
       </label> 
       </div> 
      </li> 
      <li> 
       <div class="checkbox"> 
       <label> 
       <input type="checkbox" v-model="cataloglist" value="其他">其他 
       </label> 
       </div> 
      </li> 
      
      </ul> 
      </div> 
      </div> 
     </div> 
     <div class="formline"> 
      <div class="formgroup"> 
      <select class="formcontrollarg" v-model="timestart"> 
      <option v-for="startlist in timestarts" :value="startlist.value">{{startlist.text}}</option> 
      </select> 
      <span>——</span> 
      <select class="formcontrollarg" v-model="timeend"> 
      <option v-for="endlist in timeends" :value="endlist.value">{{endlist.text}}</option> 
      </select> 
      </div> 
     </div> 
     <div class="formsearch"> 
      <button type="button" class="retrievalsearch btn btn-primary" @click="retrievalsearch">检索</button> 
     </div> 
     </div> 
     </div> 
     </div> 
</template>
<script> 
     import $ from 'jquery'
     import conf from './../Conf'; 
      
     export default{ 
     data(){ 
     return { 
     formtips:[ 
      
     ], 
     tabbtn: '',//搜索切换 
     cataloglist:[],//文献分类选中目录 
     iscataloglist:false, 
      
      
     titletype:[ 
      { text: '标题', value: 'title' }, 
      { text: '正文', value: 'text' }, 
      { text: '项目', value: 'project' }, 
      { text: '人员', value: 'person' }, 
      { text: '机构', value: 'organization' }, 
      { text: '技术', value: 'tech' }, 
      { text: '地区', value: 'locaton' }, 
      { text: '国家', value: 'country' } 
     ], 
     titletypeAuthor:[{ text: '作者', value: 'author' }], 
     titletypeAuthor2:[{ text: '作者机构', value: 'authoruint' }], 
     accuracys: [ 
      {text:'精确',value:'accurate'}, 
      {text:'模糊',value:'blur'} 
     ], 
     containlists:[ 
      {text:'并含',value:'andwidth'}, 
      {text:'或含',value:'orwidth'}, 
      {text:'不含',value:'nowidth'}, 
     ], 
      
     timestart:'nolimit',//检索起始时间 
     timeend:'2017',//检索结束时间 
     timestarts:[],//开始时间选择数组 
     timeends:[],//结束时间选择数组 
     } 
     }, 
     watch:{ 
      
     }, 
     created: function () { 
     this.init(); 
     }, 
     methods: { 
     init: function(){ 
     this.formtips=[ 
      { 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }, 
      { 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }, 
      { 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }, 
      { 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      } 
     ]; 
     this.timestarts = [ 
      {text:'不限',value:'nolimit'}, 
      {text:'2016',value:'2016'}, 
      {text:'2015',value:'2015'}, 
      {text:'2014',value:'2014'}, 
      {text:'2013',value:'2013'}, 
      {text:'2012',value:'2012'}, 
      {text:'2011',value:'2011'}, 
     ]; 
     this.timeends = [ 
      {text:'2017',value:'2017'}, 
      {text:'2016',value:'2016'}, 
      {text:'2015',value:'2015'}, 
      {text:'2014',value:'2014'}, 
      {text:'2013',value:'2013'}, 
      {text:'2012',value:'2012'}, 
      {text:'2011',value:'2011'}, 
     ] 
     }, 
     addplus:function () { 
     if(this.tabbtn==''){ 
      this.formtips.push({ 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }); 
      this.formtips.push({ 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }); 
     }else{ 
      this.formtips.push({ 
      titletype:'author', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }); 
      this.formtips.push({ 
      titletype:'authoruint', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }); 
     } 
      
     }, 
     removeminus:function () { 
     this.formtips.splice(-2); 
     }, 
     seniorsearch:function (str) { 
     if(this.tabbtn!=str){ 
      this.tabbtn = str; 
      if(this.tabbtn==''){ 
      this.formtips=[ 
      { 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }, 
      { 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }, 
      { 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }, 
      { 
      titletype:'title', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      } 
      ]; 
      }else{ 
      this.formtips=[ 
      { 
      titletype:'author', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }, 
      { 
      titletype:'authoruint', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }, 
      { 
      titletype:'author', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      }, 
      { 
      titletype:'authoruint', 
      typeinp:'', 
      accuracy:'accurate', 
      containlist:'andwidth', 
      } 
      ] 
      } 
     } 
     }, 
      
     catalogshow:function () { 
     this.iscataloglist = !this.iscataloglist; 
     console.log(this.cataloglist); 
     }, 
      
     retrievalsearch:function(){ 
     let body={ 
      formtips:this.formtips, 
      cataloglist:this.cataloglist, 
      timestart:this.timestart, 
      timeend:this.timeend 
     }//点击检索传的数据 
     console.log(body); 
     } 
      
     }, 
      
     } 
      
</script>
<style scoped> 
 /*临时样式*/
 .retrievalmian{ 
 margin: 20px; 
 width:75%; 
 } 
 /**/
 /*.retrievaltitle{*/
 /*background: #FCFCFC;*/
 /*}*/
 .retrievaltitle .tabbtn:first-child{ 
 margin-right: -5px; 
 } 
 .retrievaltitle .tabbtn:hover{ 
 text-decoration: none; 
 } 
 .retrievaltitle .tabbtn{ 
 padding: 2px 8px; 
 background: #FBFBFB; 
 border: 1px solid #DFDFDF; 
 margin-bottom: -1px; 
 } 
 .retrievaltitle .tabbtn.checked{ 
 color: #E50F10; 
 padding-top: 8px; 
 border-bottom: 1px solid #FBFBFB; 
 } 
 .retrievalbar{ 
 border: 1px solid #E5E5E5; 
 background: #FCFCFC; 
 } 
 .formbody{ 
 position: relative; 
 margin: 10px 0px; 
 } 
 .formoperate{ 
 position: absolute; 
 top:10px; 
 right: 20px; 
 } 
  
 .formoperate .tipsicon{ 
 color: #59A4D2; 
 display: inline-block; 
 line-height: 15px; 
 cursor: pointer; 
 margin-left: 15px; 
 width: 20px; 
 height: 20px; 
 } 
 .formoperate .addplus{ 
 background: url(../static/img/addplusicon.png) no-repeat center; 
 } 
 .formoperate .removeminus{ 
 background: url(../static/img/removeicon.png) no-repeat center; 
 } 
 .formline{ 
 padding: 5px 30px; 
 } 
 .formtips{ 
 display: inline-block; 
 margin-bottom: 10px; 
 margin-right: 10px; 
 } 
 .formgroup{ 
 display: inline-block; 
 } 
 .formcontrol{ 
 border: 1px solid #999; 
 width: 80px; 
 height: 22px; 
 } 
 .forminp{ 
 border: 1px solid #146AC4; 
 width: 120px; 
 height: 22px; 
 } 
 .formcontrollarg{ 
 width:120px; 
 height: 25px; 
 } 
 .formsearch{ 
 position: absolute; 
 bottom:10px; 
 right: 20px; 
 } 
 .retrievalsearch{ 
 padding: 5px 20px; 
 } 
 .formgroup .catalog{ 
 border: 1px solid #999; 
 width:120px; 
 height: 22px; 
 cursor: pointer; 
 background: url(../static/img/dropdown.png) no-repeat; 
 background-position: 95% 45%; 
 } 
 .cataloghint{ 
 position: relative; 
 } 
 .cataloglist{ 
 position: absolute; 
 top: -1px; 
 left: 0; 
 padding: 0; 
 border: 1px solid #999; 
 background: #fff; 
 z-index: 10; 
 width: 120px; 
 } 
 .cataloglist li{ 
 padding:2px 5px; 
 } 
 .cataloglist li:hover{ 
 background: #1e90ff; 
 } 
 .checkbox { 
 margin:0px; 
 } 
</style>
//1、为保证点击加号出来的select标签的v-model不一样，讲v-model与v-for的item绑定；<divclass="formtips" v-for="

 //(item,index) in formtips">
//<selectclass="formcontrol" v-model="item.titletype" >
//2、当点击减号使搜索条件只剩下一列时，减号消失 <spanclass="tipsicon removeminus" @click="removeminus"   v-
//show="formtips.length>=4" ></span>同理给加号增加条件，通过长度判断，限制增加的检索条件最多为6列，加号消失
//3、点击检索后，使选中的检索条件通过
//let body={
 //formtips:this.formtips,
 //cataloglist:this.cataloglist,
 //timestart:this.timestart,
// timeend:this.timeend
//}