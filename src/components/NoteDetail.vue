<template>
  <div id="note" class="detail">
    <NoteSidebar></NoteSidebar>
    <div class="note-detail">
      <div class="note-bar">
        <span>创建日期：{{curNote.createdAtFriendly}}</span>
        <span>更新日期：{{curNote.updatedAtFriendly}}</span>
        <span>{{curNote.statusText}}</span>
        <span class="iconfont icon-delete"></span>
        <span class="iconfont icon-fullscreen"></span>
      </div>
      <div class="note-title">
        <input type="text" :value="curNote.title" placeholder="输入标题">
      </div>
      <div class="editor">
        <textarea v-show="true" :value="curNote.content" placeholder="输入内容，支持Markdown语法"></textarea>
        <div class="preview markdown-body" v-html="" v-show="false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import NoteSidebar from "./NoteSidebar";

export default {
  components:{NoteSidebar},
  name: 'Login',
  data () {
    return {
      curNote:{
        title:'my note',
        content:'note content',
        createdAtFriendly:'one day ago',
        updatedAtFriendly:'just moment',
        statusText:'no update'
      }
    }
  },
  created() {
    Auth.getInfo().then(res=>{
      if(!res.isLogin){
        this.$router.push({path:'/login'})
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail.less);

#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>
