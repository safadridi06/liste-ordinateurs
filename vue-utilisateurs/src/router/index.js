
import { createRouter, createWebHistory } from 'vue-router'
import ListeUtilisateurs from '../components/ListeUtilisateurs.vue'
import AjouterUtilisateur from '../components/AjouterUtilisateur.vue'
import ModifierUtilisateur from '../components/ModifierUtilisateur.vue'
import SupprimerUtilisateur from '@/components/SupprimerUtilisateur.vue'
const routes = [
  {
    path: '/',
    component: ListeUtilisateurs
  },
  {
    path: '/ajouter',
    component: AjouterUtilisateur
  },
  {
  path: '/modifier/:id',
  component: ModifierUtilisateur
  },
  {
    path: '/supprimer/:id',
    component:SupprimerUtilisateur
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
