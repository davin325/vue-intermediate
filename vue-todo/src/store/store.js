import Vue from "vue";
import Vuex from "vuex";

// use:vue를 사용할때 전역으로 사용 할때
Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          //JSON.parse() String을 객체로
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  }
};

export const store = new Vuex.Store({
  state: {
    todoItems: storage.fetch()
  },
  getters: {
    storedTodoItems(state) {
      return state.todoItems;
    }
  },
  mutations: {
    addOneItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    },
    removeOneItem(state, payload) {
      localStorage.removeItem(payload.todoItem.item);
      state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload) {
      state.todoItems[payload.index].completed = !state.todoItems[payload.index]
        .completed;
      localStorage.removeItem(payload.todoItem.item);
      localStorage.setItem(
        payload.todoItem.item,
        JSON.stringify(payload.todoItem)
      );
    },
    clearAllItems(state) {
      console.log("clearAllItems");
      localStorage.clear();
      state.todoItems.splice(0);
    }
  }
});
// state : 여러 컴포넌트에 공유되는 데이터 data
// getters : 연산된 state값을 접근하는 속성 computed
// mutations : state값을 변경하는 이벤트 로직 메서드 :methods
// actions : 비동기 처리 로직을 선언하는 메서드 aysnc methods
