<template>
  <div id="app">
    <!-- v-bind:내려보낼 프롭스 속성이름 = "현재 위치의 컴포넌트 데이터 속성" -->
    <!-- v-on:하위 컴포넌트에서 발생시킨 이벤트 이름 ="현재 컴포넌트의 메서드 명" -->
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList
      v-bind:propsdata="todoItems"
      v-on:removeItem="removeOne"
      v-on:toggleItem="toggleOneItem"
    ></TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
//components 폴더 아래의 vue파일들을 변수에 담음
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data: function() {
    return {
      todoItems: []
    };
  },
  methods: {
    addOneItem: function(todoItem) {
      // this는 data랑 methods가 들어간 인스턴스(TodoInput.vue)를 가리킴
      // https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
      // JSON.stringify(obj) : obj의 값을 String으로 변환시킴

      var obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOne: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
      //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    },
    toggleOneItem: function(todoItem, index) {
      // props로 내렸다가 올라온 값을 변경하는것은 좋지않음
      // todoItem.completed = !todoItem.completed;
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    }
  },

  //인스턴스가 생성되자마자 호출되는 라이프사이클
  created: function() {
    if (localStorage.length > 0) {
      for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          //JSON.parse() String을 객체로
          this.todoItems.push(
            JSON.parse(localStorage.getItem(localStorage.key(i)))
          );
        }
      }
    }
  },
  components: {
    //컴포넌트 태그명 : 컴포넌트 내용
    TodoHeader: TodoHeader,
    TodoInput: TodoInput,
    TodoList: TodoList,
    TodoFooter: TodoFooter
  }
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>
