
<script setup>
const props = defineProps({
  ordinateur: Object
})

const emit = defineEmits(['modifier', 'supprimer'])

// Récupération des images
const images = import.meta.glob('../assets/images/*', {
  eager: true,
  query: '?url',
  import: 'default'
})

function getImage(photo) {
  if (photo && photo.startsWith('data:image/')) {
    return photo
  }

  return images['../assets/images/' + photo]
}
</script>

<template>
  <div class="card">

    <img
      :src="getImage(props.ordinateur.photo)"
      alt="Photo ordinateur"
    >

    <h3>{{ props.ordinateur.modele }}</h3>

    <p>Processeur : {{ props.ordinateur.processeur }}</p>
    <p>Mémoire : {{ props.ordinateur.memoire }} Go</p>
    <p>Disque : {{ props.ordinateur.disque }} Go</p>
    <p>Carte graphique : {{ props.ordinateur.carteGraphique }}</p>

    <div class="actions">
      <button
        class="btn-modifier"
        @click="emit('modifier', props.ordinateur.id)"
      >
        Modifier
      </button>

      <button
        class="btn-supprimer"
        @click="emit('supprimer', props.ordinateur.id)"
      >
        Supprimer
      </button>
    </div>

  </div>
</template>

<style scoped>
.card {
  width: 310px;
  padding: 20px;
  margin: 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.card img {
  width: 100%;
  height: 175px;
  object-fit: contain;
}

.card h3 {
  color: #172554;
  font-size: 19px;
  margin: 15px 0;
}

.card p {
  color: #475569;
  font-size: 14px;
  margin: 10px 0;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.actions button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.btn-modifier {
  background: #2563eb;
}

.btn-supprimer {
  background: #dc2626;
}
</style>
