<template>
  <div class="inputBox shadow">
    <!--v-model : input에 입력된 텍스트값을 동적으로 인스턴스에 맵핑  -->
    <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo" />
    <span class="addContainer" v-on:click="addTodo">
      <i class="fas fa-plus-circle addBtn"></i>
    </span>
    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">경고오</h3>
    </Modal>
  </div>
</template>

<script>
import Modal from './common/Modal.vue';

export default {
  data: function() {
    return {
      newTodoItem: '',
      showModal: false
    };
  },

  methods: {
    addTodo: function() {
      if (this.newTodoItem !== '') {
        //이벤트 발생시키면서 App.vue로 this.newTodoItem인자값 전달
        this.$emit('addTodoItem', this.newTodoItem);
        this.clearInput();
      } else {
        this.showModal = true;
      }
    },
    clearInput: function() {
      this.newTodoItem = '';
    }
  },
  components: {
    Modal: Modal
  }
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478fb, #8763fb);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
</style>