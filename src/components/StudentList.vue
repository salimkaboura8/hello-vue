<template>
  <h3>Liste des étudiants ({{ students.length }})</h3>
  <ul>
    <li v-for="student in students" v-bind:key="student.id">
      <div class="info">
        <span> {{ student.id }} </span> <span> {{ student.name }} </span>
      </div>
      <i class="fas fa-trash trash-icon" @click="deleteStudent(student.id)"></i>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    students: {
      type: Array,
      required: true,
    },
  },

  setup(props, { emit }) {
    let deleteStudent = function (id) {
      emit("delete", id);
    };
    return {
      deleteStudent,
    };
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

li {
  width: 80%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 12px 0;
  border-bottom: 1px solid lightgray;
}

button {
  padding: 2px 20px;
  color: white;
  background-color: rgb(255, 179, 179);
}

.trash-icon {
  color: gray;
  transition: color 0.1s ease;
  cursor: pointer;
}

.trash-icon:hover {
  color: rgb(255, 113, 113);
}
</style>
