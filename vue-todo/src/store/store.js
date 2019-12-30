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
  mutations: {
    addOneItem(state, todoItem) {
      const obj = { completed: false, item: todoItem };
      localStorage.setItem(todoItem, JSON.stringify(obj));
      state.todoItems.push(obj);
    }
  }
});
// state : 여러 컴포넌트에 공유되는 데이터 data
// getters : 연산된 state값을 접근하는 속성 computed
// mutations : state값을 변경하는 이벤트 로직 메서드 :methods
// actions : 비동기 처리 로직을 선언하는 메서드 aysnc methods
