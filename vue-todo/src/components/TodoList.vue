<template>
  <div>
    <transition-group name="list" tag="ul">
      <li
        v-for="(todoItem, index) in this.storedTodoItems"
        v-bind:key="todoItem.item"
        class="shadow"
      >
        <i
          class="checkBtn fas fa-check"
          v-bind:class="{checkBtnCompleted : todoItem.completed }"
          v-on:click="toggleComplete({todoItem,index})"
        ></i>
        <!-- 태그명 v-bind:class="{클래스명: boolean값}"> =>클래스 명을 불리언 값으로 정의 -->
        <span v-bind:class="{textCompleted : todoItem.completed}">{{todoItem.item}}</span>
        <span class="removeBtn" v-on:click="removeTodo({todoItem, index})">
          <i class="fas fa-trash-alt"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    //매개변수 선언안해도 호출단에 있으면 암묵적으로 넘어감
    //호출시 매개변수를 객체로 선언해서 객체 1개만 넘기도록
    ...mapMutations({
      removeTodo: 'removeOneItem'
    }),
    ...mapMutations({
      toggleComplete: 'toggleOneItem'
    })
  },
  computed: {
    ...mapGetters(['storedTodoItems'])
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

/* 리스트 아이템 트랜지션 효과 */
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>