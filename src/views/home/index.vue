<script lang="ts" setup>
import { useAuthStore } from '@/stores/modules/authStore';
import { useProcurementStore } from '@/stores/modules/procurementStore';
import Navbar from '@/components/Navbar.vue';

// Inisialisasi store
const authStore = useAuthStore();
const procurementStore = useProcurementStore();

// Akses state dan aksi dari store
const isLoggedIn = computed(() => authStore.login);
const procurements = computed(() => procurementStore.procurements);

// Mengatur tab aktif
const tab = ref(0);

const headers = [
  { title: 'Request Name', key: 'name' },
  { title: 'Date', key: 'date' },
  { title: 'Action', key: 'actions', sortable: false },
];

// Fungsi untuk menawarkan bid
const offerBid = (id: number, bids: any) => {
  if (isLoggedIn.value) {
    procurementStore.offerBid(id, bids);
  }
};

onMounted(() => {
  procurementStore.fetchProcurements();
});
</script>

<template>
  <v-container>
    <Navbar />
    <v-card class="top">
      <v-tabs v-model="tab" align-tabs="center" color="deep-purple-accent-4">
        <v-tab>Pengadaan (Invitation for Bid)</v-tab>
        <v-tab>Pengumuman Pengadaan (Announcement of Successful Bid)</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <!-- Tab Pengadaan -->
        <v-tabs-window-item>
          <v-data-table :items="procurements" :headers="headers">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="success" v-if="isLoggedIn" @click="offerBid(item.id, item.bids)">Tawar</v-btn>
              <span v-else>Login untuk menawar</span>
            </template>
          </v-data-table>
        </v-tabs-window-item>

        <!-- Tab Pengumuman Pengadaan -->
        <v-tabs-window-item>
          <!-- Daftar pengumuman pengadaan di sini -->
          <p>Belum ada pengumuman saat ini.</p>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
  </v-container>
</template>

<style scoped>
.top {
  margin-top: 70px;
}
</style>
