<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/modules/authStore';
import { useProcurementStore } from '@/stores/modules/procurementStore';
import Navbar from '@/components/Navbar.vue';

// Inisialisasi store
const authStore = useAuthStore();
const procurementStore = useProcurementStore();

// Akses state dan aksi dari store
const isLoggedIn = computed(() => authStore.login);
const procurements = computed(() => procurementStore.procurements);

onMounted(() => {
  procurementStore.fetchProcurements();
});

const headers = [
  { text: 'Nama Request', value: 'name' },
  { text: 'Tanggal', value: 'date' },
  { text: 'Aksi', value: 'actions', sortable: false },
];

// Fungsi untuk menawarkan bid
const offerBid = (id: number) => {
  if (isLoggedIn.value) {
    procurementStore.offerBid(id);
  }
};
</script>

<template>
  <v-container>
    <Navbar />
    <h1>Pengadaan</h1>
    <v-data-table :items="procurements" :headers="headers">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn v-if="isLoggedIn" @click="offerBid(item.id)">Tawar</v-btn>
        <span v-else>Login untuk menawar</span>
      </template>
    </v-data-table>
  </v-container>
</template>
