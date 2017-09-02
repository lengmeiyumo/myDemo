<template>
<div class="choose-slidedown" @click.stop="showItem">
<p :class="{choosed: bChoosed}" :style="pStyle">
<span>{{choosedLabel}}</span>
</p>
<ul class="list" v-if="bVisible">

<li v-for="item in useroptions" :class="{active: item.bActive}" @click="chooseItem(item)" >{{item.label}}</li>
</ul>
</div>
</template>

export default {
name: 'slidedown',
props:
{

pStyle: {
  type: Object
},
arrowStyle: {
  type: Object
},
useroptions: {
  type: Array,
  default () {
    return [{
      value: '100',
      label: '100万',
      bActive: false
    }, {
      value: '200',
      label: '200万',
      bActive: false
    }, {
      value: '300',
      label: '300万',
      bActive: false
    }, {
      value: '500',
      label: '500万',
      bActive: false
    }, {
      value: '1000',
      label: '1000万',
      bActive: false
    }]
  }
}
},
data () {

return {
  value: '',
  label: '请选择',
  bVisible: false,
  bChoosed: false
}
},
computed: {

choosedLabel () {
  var temp = this.useroptions.filter(item => { return item.bActive === true })
  if (temp[0]) {
    return temp[0]['label']
  } else {
    return '请选择'
  }
}
},
methods: {

chooseItem: function (item) {
  this.useroptions.map(item => { item.bActive = false })
  item.bActive = true
  this.value = item.value
  this.label = item.label
  this.bChoosed = true
  this.$emit('receiveData', this.label, this.value)
},
showItem () {
  this.bVisible = !this.bVisible
}
},
created () {

// 现在还在测试中
document.onclick = () => {
  this.$set(this.$data, 'bVisible', false)
  console.log(this.$data.bVisible)
}
}
}
</script>

但是现在底部的document.onclick = () => {
this.bVisible = false
}