<template>
  <div>
    <!--v-model : input에 입력된 텍스트값을 동적으로 인스턴스에 맵핑  -->
    <input type="text" v-model="newTodoItem" />
    <button v-on:click="addTodo">add</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      newTodoItem: ''
    };
  },
  methods: {
    addTodo: function() {
      // this는 data랑 methods가 들어간 인스턴스(TodoInput.vue)를 가리킴
      localStorage.setItem(this.newTodoItem, this.newTodoItem);
      // https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
      this.newTodoItem = '';
    }
  }
};
</script>

<style>
</style>