<template>
  <v-app>
    <v-main>
      <v-container>
        <AddLocationForm @submit="submitLocation" />
        <GoogleMap v-if="locations.length > 0" :locations="locations" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import AddLocationForm from './components/AddLocationForm.vue';
import GoogleMap from './components/GoogleMap.vue';
import locationsApi from '@/apiServices/locationsApi';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { ref, onMounted } from 'vue';

const locations = ref([]);
const getLocations = () => {

  locationsApi.getLocations().then(response => {
    locations.value = []
    if (response) {
      locations.value = response.data
      toast.success("got All Articles ", {
        position: toast.POSITION.TOP_CENTER,
      })
    } else {
      toast.error("Some Thing is wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  })
}



onMounted(() => {
  getLocations()
})


const submitLocation = (locationData) => {
  locations.value.push(locationData);
};
</script>
