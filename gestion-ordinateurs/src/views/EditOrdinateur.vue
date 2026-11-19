
<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { listo } from '../data/ordinateur.js'

export default {
  setup() {

    const router = useRouter()
    const route = useRoute()

    // Déterminer le mode
    const modeModification = computed(() => {
      return route.params.id !== undefined
    })

    // Récupérer l'ordinateur
    const ordinateurAModifier = ref(null)

    if (modeModification.value) {
      ordinateurAModifier.value = listo.value.find(
        o => o.id == route.params.id
      )
    }

    // Variables du formulaire
    const modele = ref('')
    const processeur = ref('')
    const memoire = ref('')
    const disque = ref('')
    const carteGraphique = ref('')
    const photo = ref('')

    // Remplir les champs en mode modification
    if (ordinateurAModifier.value) {
      modele.value = ordinateurAModifier.value.modele
      processeur.value = ordinateurAModifier.value.processeur
      memoire.value = ordinateurAModifier.value.memoire
      disque.value = ordinateurAModifier.value.disque
      carteGraphique.value = ordinateurAModifier.value.carteGraphique
      photo.value = ordinateurAModifier.value.photo
    }

    // Enregistrer
    function enregistrer() {

      // Vérifier les champs obligatoires
      if (
        modele.value.trim() === '' ||
        processeur.value.trim() === '' ||
        memoire.value === '' ||
        disque.value === ''
      ) {
        alert('Veuillez remplir les champs obligatoires')
        return
      }

      // Vérifier mémoire et disque
      if (
        !Number.isFinite(Number(memoire.value)) ||
        !Number.isFinite(Number(disque.value)) ||
        Number(memoire.value) <= 0 ||
        Number(disque.value) <= 0
      ) {
        alert('La mémoire et le disque doivent être strictement positifs')
        return
      }

      if (modeModification.value) {

        // Modifier un ordinateur
        if (!ordinateurAModifier.value) {
          alert('Ordinateur introuvable')
          return
        }

        Object.assign(ordinateurAModifier.value, {
          modele: modele.value,
          processeur: processeur.value,
          memoire: Number(memoire.value),
          disque: Number(disque.value),
          carteGraphique: carteGraphique.value,
          photo: photo.value
        })

      } else {

        // Ajouter un ordinateur
        const nouvelOrdinateur = {
          id: Math.max(0, ...listo.value.map(o => Number(o.id))) + 1,
          modele: modele.value,
          processeur: processeur.value,
          memoire: Number(memoire.value),
          disque: Number(disque.value),
          carteGraphique: carteGraphique.value,
          photo: photo.value
        }

        listo.value.push(nouvelOrdinateur)

      }
      console.log(photo.value)
      router.push('/ordinateurs')
    }

    // Annuler
    function annuler() {
      router.push('/ordinateurs')
    }

    function choisirPhoto(event) {
  const fichier = event.target.files[0]

  if (fichier) {
    const lecteur = new FileReader()

    lecteur.onload = () => {
      photo.value = lecteur.result
    }

    lecteur.readAsDataURL(fichier)
  }
}

    return {
      modeModification,
      modele,
      processeur,
      memoire,
      disque,
      carteGraphique,
      photo,
      choisirPhoto,
      enregistrer,
      annuler
    }
  }
}
</script>

<template>
  <div class="formulaire">

    <h1>
      {{ modeModification ? 'Modifier un ordinateur' : 'Ajouter un ordinateur' }}
    </h1>

    <form @submit.prevent="enregistrer">

      <label>Modèle :</label>
      <input type="text" v-model="modele" required>

      <label>Processeur :</label>
      <input type="text" v-model="processeur" required>

      <label>Mémoire (Go) :</label>
      <input
        type="number"
        v-model.number="memoire"
        min="0.01"
        step="any"
        required
      >

      <label>Disque (Go) :</label>
      <input
        type="number"
        v-model.number="disque"
        min="0.01"
        step="any"
        required
      >

      <label>Carte graphique :</label>
      <input type="text" v-model="carteGraphique">

      <label>Photo :</label>
      <input
  type="file"
  accept="image/*"
  @change="choisirPhoto"
>

      <div class="boutons">

        <button type="submit">
          Enregistrer
        </button>

        <button type="button" @click="annuler">
          Annuler
        </button>

      </div>

    </form>
  </div>
</template>

<style scoped>
.formulaire {
  max-width: 550px;
  margin: 40px auto;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  color: #172554;
  margin-bottom: 25px;
}

label {
  display: block;
  margin-top: 15px;
  margin-bottom: 6px;
  color: #334155;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
}

.boutons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 11px 18px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
}

button[type="submit"] {
  background: #2563eb;
  color: white;
}

button[type="button"] {
  background: #64748b;
  color: white;
}
</style>
