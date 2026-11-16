
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const nom = ref('')
const prenom = ref('')

// Charger les informations
async function chargerUtilisateur() {
  const reponse = await fetch('http://localhost:3000/utilisateurs/' + route.params.id)
  const utilisateur = await reponse.json()

  nom.value = utilisateur.nom
  prenom.value = utilisateur.prenom
}

// Modifier l'utilisateur
async function modifierUtilisateur() {
  await fetch('http://localhost:3000/utilisateurs/' + route.params.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nom: nom.value,
      prenom: prenom.value
    })
  })

  alert('Utilisateur modifié')
}

onMounted(() => {
  chargerUtilisateurs()
})
</script>

<template>
  <div class="container">
    <h1>Modifier un utilisateur</h1>

    <form @submit.prevent="modifierUtilisateur">
      <label>Nom :</label>
      <input v-model="nom" required>

      <br><br>

      <label>Prénom :</label>
      <input v-model="prenom" required>

      <br><br>

      <button>Modifier</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  width: 80%;
  margin: 40px auto;
  text-align: center;
}

h1 {
  margin-bottom: 25px;
}

form {
  width: 350px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 8px;
  text-align: left;
}

input {
  width: 100%;
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  padding: 9px 18px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2176ad;
}
</style>

