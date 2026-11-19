import { ref } from 'vue'
export const listo=ref([
{
  id:1,
  modele:'Dell Latitude 5540',
  processeur:'intel core i5',
  photo:'dell-latitude-5540.jpg',
  memoire:16,
  disque:512,
  carteGraphique:'Intel Iris Xe'
},
{
  id:2,
  modele:'HP ProBook 450 G10',
  processeur:'Intel core i7',
  photo:'hp.png',
  memoire:32,
  disque:1000,
  carteGraphique:'NVIDIA GeForce MX'
},
{
  id:3,
  modele:'Lenovo ThinkPad E14',
  processeur:'AMD Ryzen 5',
  photo:'lenovo.jpg',
  memoire:16,
  disque:512,
  carteGraphique:'Radeon graphique'
},
{
  id:4,
  modele:'Asus TUF Gaming F15',
  processeur:'Intel core i7',
  photo:'asus.jpg',
  memoire:32,
  disque:1000,
  carteGraphique:'NVIDIA GeForce RTX'
},
{
  id:5,
  modele:'Acer Aspier 5',
  processeur:'Intel core i5',
  photo:'acer.jpg',
  memoire:8,
  disque:256,
  carteGraphique:'Intel UHD graphics'
}

])