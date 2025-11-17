<template>
  <div>
    <h1>{{ title }}</h1>

    <div class="add">
      <input v-model="newStudent" placeholder="Ajouter un étudiant" />
      <button @click="addStudent">Ajouter</button>
    </div>

    <ul>
      <li v-for="student in students" :key="student.id">
        {{ student.name }}
        <i
          class="fas fa-trash trash-icon"
          @click="removeStudent(student.id)"
        ></i>
      </li>
    </ul>

    <p v-if="students.length === 0">Aucun étudiant</p>
    <p>Nombre d'étudiants : {{ studentCount }}</p>
    <AnimatedCounter :count="counter.count" />
    <button class="increment" @click="counter.count++">Clique ici</button>
    <br />
    <a :href="externalUrl" target="_blank">Lien Vue JS</a>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
} from "vue";
import axios from "axios";
import AnimatedCounter from "./components/AnimatedCounter.vue";

// 🎯 Composition API
const title = ref("Liste des étudiants");
const newStudent = ref("");
const students = reactive([]);

import { useCounterStore } from "./stores/counter";
const counter = useCounterStore();

// 🧮 Computed
const studentCount = computed(() => students.length);

// 👀 Watch
watch(studentCount, (newVal) => {
  console.log(`Nombre d'étudiants : ${newVal}`);
});

// 🔄 Cycle de vie
onBeforeMount(() => console.log("Avant le montage"));
onMounted(() => fetchStudents());
onUpdated(() => console.log("Composant mis à jour"));
onUnmounted(() => console.log("Composant démonté"));

// 🌐 Appel API
async function fetchStudents() {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const data = res.data.map((user) => ({ id: user.id, name: user.name }));
    students.push(...data);
  } catch (err) {
    console.error("Erreur API", err);
  }
}

// ➕ Ajouter un étudiant
function addStudent() {
  if (newStudent.value.trim()) {
    students.push({ id: Date.now(), name: newStudent.value });
    newStudent.value = "";
  }
}

// ❌ Supprimer un étudiant
function removeStudent(id) {
  const index = students.findIndex((s) => s.id === id);
  if (index !== -1) students.splice(index, 1);
}

// 🔗 Lien dynamique
const externalUrl = ref("https://vuejs.org");
</script>

<style scoped>
/* Conteneur principal */
div {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: "Segoe UI", sans-serif;
}

.add {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  box-shadow: none;
  padding: 0;
}

/* Titre */
h1 {
  font-size: 1.8rem;
  color: #111827;
  margin-bottom: 20px;
  text-align: center;
}

/* Champ de saisie */
input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
}

/* Bouton Ajouter */
button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2563eb;
}

/* Liste des étudiants */
ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  padding: 10px 14px;
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* Icône poubelle */
.trash-icon {
  font-size: 1.2rem;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.2s ease;
}

.trash-icon:hover {
  color: #ef4444;
  transform: scale(1.2);
}

/* Texte "Aucun étudiant" */
p {
  text-align: center;
  color: #6b7280;
  margin-top: 20px;
}

/* Lien externe et router-link */
a,
router-link {
  display: inline-block;
  margin-top: 20px;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

a:hover,
router-link:hover {
  color: #2563eb;
}
</style>
