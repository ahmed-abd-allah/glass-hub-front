<template>
  <v-card>
    <v-card-title>Location Map</v-card-title>
    <v-card-text>
      <v-sheet height="100vh">
        <GoogleMap api-key="AIzaSyDQkJx2VA2LJWrMsvDH29K0yN9WiPIOGWc" style="width: 100%; height: 100vh" :center="center"
          :zoom="2">
          <CustomMarker v-for="(location, index) in locations" :key="index"
            :options="{ position: { lat: parseFloat(location.lat), lng: parseFloat(location.lng) }, anchorPoint: 'BOTTOM_CENTER' }">
            <div style="text-align: center">
              <div style="font-size: 1.125rem">{{ location.title }}</div>
              <img :src="location.file_url" width="20" height="20" style="margin-top: 8px" />
            </div>
          </CustomMarker>
        </GoogleMap>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>
  
<script>
import { defineComponent } from 'vue'
import { GoogleMap, CustomMarker } from 'vue3-google-map'

export default defineComponent({
  components: { GoogleMap, CustomMarker },
  props: ['locations'],
  setup() {
    const center = { lat: 52.36834, lng: 4.88635 }
    return { center }
  },
})
</script>
  
<style scoped>
/* Add necessary styles for map container */
</style>
  