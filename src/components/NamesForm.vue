<template>
    <form @submit.prevent="addName">
      <br>
      <input type="text" name="name" v-model="nameTyped">
      <br><br>
      <button type="submit"  >Add</button>
    </form>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, ctx){
    let nameTyped = ref("");

    const addName = function () {
      console.log("Form -> ", nameTyped.value);
      ctx.emit("add", nameTyped.value);
      nameTyped.value = "";
    }

    return {
      nameTyped, addName, 
    }
  }
}
</script>

<style>
button {
  background-color: rgb(237, 255, 209);
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 4px 20px;
}
</style>