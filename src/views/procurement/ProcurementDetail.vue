<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProcurementStore } from '@/stores/modules/procurementStore';
import Navbar from '@/components/Navbar.vue';

const route = useRoute();
const procurementStore = useProcurementStore();
const procurement = ref(null);

// Ambil ID dari route parameter dan fetch detail
onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  procurement.value = procurementStore.getProcurementById(id);
});
</script>

<template>
  <v-container>
    <Navbar />
    <v-card class="top">
      <v-card-title>Detail Pengadaan</v-card-title>
      <v-divider />
      <v-card-text v-if="procurement">
        <p><strong>Nama Pengadaan:</strong> {{ procurement.name }}</p>
        <p><strong>Tanggal:</strong> {{ procurement.date }}</p>
        <p><strong>Deskripsi:</strong> {{ procurement.description }}</p>
      </v-card-text>
      <v-card-text v-else>
        <p>Data tidak ditemukan.</p>
      </v-card-text>
      <v-btn to="/" color="primary">Back</v-btn>
    </v-card>
  </v-container>
</template>

<style scoped>
.top {
  margin-top: 70px;
  padding: 20px;
}
</style>
