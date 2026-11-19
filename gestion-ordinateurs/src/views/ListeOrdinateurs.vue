
<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { listo } from '../data/ordinateur.js'
import OrdinateurCard from '../components/OrdinateurCard.vue'

export default {
  components: {
    OrdinateurCard
  },

  setup() {
    const router = useRouter()

    const recherche = ref('')
    const tri = ref('')

    // Nombre total des ordinateurs
    const nombreOrdinateurs = computed(() => {
      return listo.value.length
    })

    // Recherche et tri
    const ordinateursFiltres = computed(() => {

      let resultat = listo.value.filter(o => {
        return (
          o.modele.toLowerCase().includes(recherche.value.toLowerCase()) ||
          o.processeur.toLowerCase().includes(recherche.value.toLowerCase())
        )
      })

      if (tri.value === 'asc') {
        resultat.sort((a, b) => a.memoire - b.memoire)
      }

      if (tri.value === 'desc') {
        resultat.sort((a, b) => b.memoire - a.memoire)
      }

      return resultat
    })

    // Ajouter
    function ajouter() {
      router.push('/ordinateurs/ajouter')
    }

    // Modifier
    function modifier(id) {
      router.push('/ordinateurs/modifier/' + id)
    }

    // Supprimer
    function supprimer(id) {

      if (confirm('Voulez-vous vraiment supprimer cet ordinateur ?')) {

        const index = listo.value.findIndex(o => o.id === id)

        if (index !== -1) {
          listo.value.splice(index, 1)
        }

      }
    }

    return {
      listo,
      recherche,
      tri,
      nombreOrdinateurs,
      ordinateursFiltres,
      ajouter,
      modifier,
      supprimer
    }
  }
}
</script>

<template>
  <div class="page">

    <h1>Parc Informatique</h1>

    <p class="description">
      Gestion des ordinateurs
    </p>

    <p class="compteur">
      Nombre d'ordinateurs : {{ nombreOrdinateurs }}
    </p>

    <button class="btn-ajouter" @click="ajouter">
      + Ajouter un ordinateur
    </button>

    <div class="filtres">

      <input
        type="text"
        v-model="recherche"
        placeholder="Rechercher par modèle ou processeur"
      >

      <select v-model="tri">
        <option value="">Sans tri</option>
        <option value="asc">Mémoire croissante</option>
        <option value="desc">Mémoire décroissante</option>
      </select>

    </div>

    <div class="liste">

      <OrdinateurCard
        v-for="o in ordinateursFiltres"
        :key="o.id"
        :ordinateur="o"
        @modifier="modifier"
        @supprimer="supprimer"
      />

    </div>

    <p v-if="ordinateursFiltres.length === 0" class="vide">
      Aucun ordinateur trouvé.
    </p>

  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 35px;
  background: #f1f5ff;
}

h1 {
  color: #172554;
  font-size: 30px;
  text-align: center;
}

.description {
  text-align: center;
  color: #64748b;
  margin-bottom: 20px;
}

.compteur {
  text-align: center;
  color: #2563eb;
  font-weight: bold;
}

.btn-ajouter {
  display: block;
  margin: 20px auto 30px;
  padding: 12px 22px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

.filtres {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filtres input,
.filtres select {
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

.liste {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  justify-items: center;
}

.vide {
  text-align: center;
  color: #64748b;
}
</style>
