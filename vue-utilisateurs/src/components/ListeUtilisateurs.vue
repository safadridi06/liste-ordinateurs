
<script setup>
import { ref, onMounted, computed } from 'vue'

const utilisateurs = ref([])
const recherche = ref('')
const filtreEtat = ref('tous')
// Récupérer les utilisateurs
async function chargerUtilisateurs() {
  const reponse = await fetch('http://localhost:3000/utilisateurs')
  utilisateurs.value = await reponse.json()
}


// Changer l'état de l'utilisateur
async function changerEtat(utilisateur) {
  await fetch('http://localhost:3000/utilisateurs/' + utilisateur.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      actif: !utilisateur.actif
    })
  })

  utilisateur.actif = !utilisateur.actif
}

const utilisateursFiltres = computed(() => {
  return utilisateurs.value.filter(utilisateur => {
    const texte = recherche.value.toLowerCase()

    const correspondRecherche =
      utilisateur.nom.toLowerCase().includes(texte) ||
      utilisateur.prenom.toLowerCase().includes(texte)

    const correspondEtat =
      filtreEtat.value === 'tous' ||
      (filtreEtat.value === 'actifs' && utilisateur.actif) ||
      (filtreEtat.value === 'inactifs' && !utilisateur.actif)

    return correspondRecherche && correspondEtat
  })
})

onMounted(() => {
  chargerUtilisateurs()
})
</script>

<template>
  <div class="container">
    <h1>Liste des utilisateurs</h1>

    <router-link to="/ajouter">Ajouter un utilisateur</router-link>
    <br><br>
    <input type="text" v-model="recherche" placeholder="Rechercher un utilisateur..." class="recherche">
    <br><br>

<label>Filtrer par état :</label>

<select v-model="filtreEtat">
  <option value="tous">Tous les utilisateurs</option>
  <option value="actifs">Utilisateurs actifs</option>
  <option value="inactifs">Utilisateurs inactifs</option>
</select>
    <table>
        <tr>
          <th>Identifiant</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>État</th>
          <th>Action</th>
        </tr>

        <tr v-for="utilisateur in utilisateursFiltres" :key="utilisateur.id">
            <td>{{ utilisateur.id }}</td>
            <td>{{ utilisateur.nom }}</td>
            <td>{{ utilisateur.prenom }}</td>
            <td>
                <span :class="utilisateur.actif ? 'actif' : 'inactif'">
                {{ utilisateur.actif ? 'Actif' : 'Inactif' }}
                </span>
            </td>
            <td>
                <button class="btnetat" @click="changerEtat(utilisateur)">{{ utilisateur.actif ? 'Désactiver' : 'Activer' }}</button>
                <router-link class="modifier" :to="'/modifier/' + utilisateur.id">Modifier</router-link>
                <router-link class="supprimer" :to="'/supprimer/' + utilisateur.id">Supprimer</router-link>
            </td>
        </tr>
    </table>
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
}

th {
  background-color: #eee;
}

.modifier, .supprimer,.btnetat {
  display: inline-block;
  padding: 7px 12px;
  margin: 3px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
.btnetat{
    background-color: orange;
}

.modifier {
  background-color: #3498db;
}

.supprimer {
  background-color: #e88aa8;
}

.modifier:hover {
  background-color: #2176ad;
}

.supprimer:hover {
  background-color: #d66b91;
}
.recherche {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 15px;
}
.actif {
  background-color: green;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.inactif {
  background-color: gray;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
