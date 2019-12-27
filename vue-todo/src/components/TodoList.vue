<template>
  <div>
    <ul>
      <li v-for="todoItem in todoItems" v-bind:key="todoItem">{{todoItem}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      todoItems: []
    };
  },
  //인스턴스가 생성되자마자 호출되는 라이프사이클
  created: function() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          this.todoItems.push(localStorage.key(i));
        }
      }
    }
  }
};
</script>

<style>
</style>