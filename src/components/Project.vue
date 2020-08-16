<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <button @click="addOne">累增加一：改变父组件</button>
    <h2>Mixins 的实现</h2>
    {{projectDetail}}
  </div>
</template>

// 为了支持 TS，需要设置 script 标签 中 lang="ts"
<script lang="ts">
// vue-property-decorator 是一个第三方包，它使用了 Vue 类组件包，并在此基础上添加了更多的装饰器
// 注意：会有多次运用到它
import { Component, Vue, Emit, Mixins } from 'vue-property-decorator';
import ProjectMixin from '@/mixins/ProjectMixin'

@Component({
  name: 'Project'
})
export default class Project extends Mixins(ProjectMixin) {
  private name: string = '我是一个子组件'
  private num: number = 1
  get projectDetail(): string {
    return this.projName + ' ' + '我很强大'
  }
  // 验证组件之间通信
  @Emit()
  public addOne():number {
    this.num++
    return this.num
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
