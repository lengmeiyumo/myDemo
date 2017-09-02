<template>
    <div >
        <input type="text" v-model="name">
        <ul>
            <li v-for="user in newUsers" >
                {{ user.name }}
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios';
export default{
        name:"Select",
        data() {
            return {
              name: '',
              users:[
                        { name: 'Bruce' },
                        { name: 'Chuck' },
                        { name: 'Jackie' },
                        { name: 'lili' }
              ] 
            }
           
        },
        computed: {
                newUsers:function () {
                    var that = this;
                    return that.users.filter((user)=>{
                        return user.name.toLowerCase().indexOf(that.name.toLowerCase()) !== -1;
                    })
                }

            }
        }
</script>  