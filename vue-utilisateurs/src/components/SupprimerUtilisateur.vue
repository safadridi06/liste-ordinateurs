
<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Supprimer l'utilisateur
async function supprimerUtilisateur() {
  await fetch('http://localhost:3000/utilisateurs/' + route.params.id, {
    method: 'DELETE'
  })

  alert('Utilisateur supprimé')
  router.push('/')
}
</script>

<template>
  <div class="container">
    <h1>Supprimer un utilisateur</h1>

    <p>Voulez-vous vraiment supprimer cet utilisateur ?</p>
    <button class="confirmer" @click="supprimerUtilisateur">Confirmer</button>
    <button class="annuler" @click="router.push('/')">Annuler</button>
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

p {
  margin-bottom: 25px;
}

button {
  padding: 9px 18px;
  margin: 5px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.confirmer {
  background-color: #e88aa8;
}

.annuler {
  background-color: #3498db;
}

.confirmer:hover {
  background-color: #d66b91;
}

.annuler:hover {
  background-color: #2176ad;
}
</style>
