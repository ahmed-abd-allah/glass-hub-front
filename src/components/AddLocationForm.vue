<template>
  <v-card>
    <v-card-title>Add Location</v-card-title>
    <v-card-text>
      <v-form v-model="form" @submit.prevent="uploadImage">
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="title" label="Title" :rules="[rules.required]"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-file-input clearable v-model="image" label="File input" :rules="[rules.required]"
                variant="outlined"></v-file-input>
            </v-col>
          </v-row>
          <GoogleMap api-key="AIzaSyDQkJx2VA2LJWrMsvDH29K0yN9WiPIOGWc" style="width: 100%; height: 500px" :center="center"
            :zoom="15" @click="handleMapClick">
            <Marker :options="{ position: selectedLocation }" />
          </GoogleMap>
        </v-container>
        <v-btn :disabled="!form" type="submit">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>
  
<script setup>
import { ref } from 'vue';
import { GoogleMap, Marker } from 'vue3-google-map';
// eslint-disable-next-line no-unused-vars
import imagesApi from '@/apiServices/imagesApi';
import locationsApi from '@/apiServices/locationsApi';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
const center = ref({ lat: 40.689247, lng: -74.044502 });
const title = ref('');
const form = ref(false);
const image = ref(null);
const selectedLocation = ref(null);

const rules = {
  required: value => !!value || 'Field is required',
};
const createlocation = imageUrl => {
  const locationData = {
    title: title.value,
    fileUrl: imageUrl,
    lat: (selectedLocation.value.lat).toString(),
    lng: (selectedLocation.value.lng).toString()
  };
  locationsApi.createLocation(locationData).then(response => {

    if (response) {

      toast.success("location created ", {
        position: toast.POSITION.TOP_CENTER,
      })

    } else {
      toast.error("Some Thing is wrong!", {
        position: toast.POSITION.TOP_RIGHT,
      })
    }
  })
}
// eslint-disable-next-line no-unused-vars
const uploadImage = () => {

  if (form.value) {
    const imageFormData = new FormData()
    imageFormData.append("image", image.value[0])
    imagesApi.uploadImage(imageFormData).then(response => {
      console.log(response)
      // eslint-disable-next-line no-unused-vars
      let imageUrl = response
      createlocation(imageUrl)
    })
  }

}


const handleMapClick = (event) => {
  selectedLocation.value = { lat: event.latLng.lat(), lng: event.latLng.lng() };
};
</script>
  