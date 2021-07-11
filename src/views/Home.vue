<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="9" xl="6">
        <v-sheet class="pa-8">
          <h1 class="text-center">Generični Blog Sistem</h1>
          Ovo je generični blog sistem. Namjenjen je ispitima, nije spreman za
          komercijalno korišćenje. Glavni sistemi su Django i Vue. Responzivan
          je (tj prilagodljiv različitim veličinama ekrana), koristi pretragu i
          paginaciju. Korisnici mogu postavljati objave i pisati komentare. Sve
          je tu, i ovo je otprilike jedan kratak i prost opis na landing
          stranici jer je to jedan od zahtjeva.
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>
