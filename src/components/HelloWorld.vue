<template>
  <div class="hello">
    <h1>{{ msg }}{{name}}</h1>
    <h2>Like:</h2>
    <div v-for="item in like" :key="item">{{item}}</div>
    <h2>My Full Name is {{fullName}}</h2>
    <button @click="clickMe">演示一下方法：methods</button>
    <h2>子组件改变后传回父组件的值：{{num}}</h2>
    <Project @add-one="someMethod"></Project>
    
  </div>
</template>

// 为了支持 TS，需要设置 script 标签 中 lang="ts"
<script lang="ts">
// vue-property-decorator 是一个第三方包，它使用了 Vue 类组件包，并在此基础上添加了更多的装饰器
// 注意：后面会有多次运用到它
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
// 引入一个组件
import Project from '@/components/Project.vue'
// 使用 Vuex
import { namespace } from 'vuex-class'
const user = namespace('user')

@Component({
  name: 'HelloWorld',
  components: {
    Project
  }
})
export default class HelloWorld extends Vue {
  // 使用 Vuex
  @user.State
  public myName!: string
  @user.Getter
  public nameUpperCase!: string

  @user.Action
  public updateName!: (newName: string) => void
  // props 的书
  @Prop() private msg!: string;
  @Prop({
    default: 'Gopal',
    required: false,
    type: String
  }) readonly name!: string;
  // data 的书写
  private like: Array<string> = [
    "coffee",
    "FE"
  ]
  private firstName: string = ''
  private lastName: string = 'Feng'
  private num: number = 0
  // computed 的书写
  get fullName(): string {
    console.log('Get fullName')
    return this.firstName+ ' '+ this.lastName
  }
  set fullName(newValue: string) {
    console.log('Set fullName')
    let names = newValue.split(' ')
    this.firstName = names[0]
    this.lastName = names[1]
  }
  // methods
  public clickMe():void {
    console.log('方法的使用');
    console.log(this.addNum(4, 2))
    alert('感谢你的点赞和关注');
  }
  public addNum(num1: number, num2: number) {
    return num1 + num2;
  }
  // 验证组件通信
  someMethod(n: number) {
    this.num = n
  }
  // Watch 的使用
  @Watch('fullName', {
    immediate: true,
    deep: true
  })
  nameChanged(newVal: string, oldVal: string) {
    console.log('watch----', newVal, oldVal);
  }
  // 生命周期书写
  created() {
    this.fullName = 'Gopal Feng'
  }
  mounted() {
    console.log('mounted')
    this.updateName('Hello TS')
  }
  beforeUpdate() {
    console.log('beforeUpdate')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
