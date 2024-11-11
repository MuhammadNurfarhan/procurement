<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useProcurementStore } from '@/stores/modules/procurementStore';
import { useAuthStore } from '@/stores/modules/authStore';
import Navbar from '@/components/Navbar.vue';
import { ref, onMounted } from 'vue';

const route = useRoute();
const procurementStore = useProcurementStore();
const authStore = useAuthStore();

const procurement = ref(null);
const isAdmin = ref(authStore.role === 'admin'); // Cek apakah user adalah admin

// Ambil ID dari route parameter dan fetch detail
onMounted(() => {
  const id = parseInt(route.params.id as string, 10);
  procurement.value = procurementStore.getProcurementById(id);
  // Fetch bidding data only if the user is an admin
  if (isAdmin.value) {
    procurementStore.getBidsByProcurementId(id).then((bids) => {
      procurement.value.bids = bids;
    });
  }
});
</script>

<template>
  <v-container>
    <Navbar />
    <v-card class="top">
      <v-card-title>Detail Pengadaan</v-card-title>
      <v-divider />
      <v-card-text v-if="procurement" class="pl-0">
        <p><strong>Nama Pengadaan :</strong> {{ procurement.procurementName }}</p>
        <p><strong>Tanggal Expired :</strong> {{ procurement.expirationDate }}</p>

        <!-- Daftar Item Pengadaan -->
        <div v-if="procurement.items && procurement.items.length > 0">
          <v-divider class="my-4" />
          <h3>Daftar Item</h3>
          <div v-for="(item, index) in procurement.items" :key="index">
            <v-card class="mb-4" outlined>
              <v-card-title>Item {{ index + 1 }}</v-card-title>
              <v-card-text>
                <p><strong>Name:</strong> {{ item.name }}</p>
                <p><strong>Specification:</strong> {{ item.specification }}</p>
                <p><strong>Quantity:</strong> {{ item.quantity }}</p>
                <p><strong>Unit:</strong> {{ item.unit }}</p>
                <p><strong>Notes:</strong> {{ item.notes }}</p>
                <p v-if="item.attachment">
                  <strong>Attachment:</strong>
                  <a :href="item.attachment" target="_blank">View Attachment</a>
                </p>
              </v-card-text>
            </v-card>
          </div>
        </div>
        <div v-else>
          <p>No items found.</p>
        </div>

        <!-- Tampilkan bidding hanya untuk admin -->
        <div v-if="isAdmin && procurement.bids && procurement.bids.length > 0">
          <v-divider class="my-4" />
          <h3>Detail Bidding</h3>
          <v-data-table :items="procurement.bids">
            <v-data-table-column :key="'price'" label="Bid Amount">
              <template #default="{ item }">
                {{ item.price }}
              </template>
            </v-data-table-column>
            <v-data-table-column :key="'notes'" label="Notes">
              <template #default="{ item }">
                {{ item.notes }}
              </template>
            </v-data-table-column>
            <v-data-table-column :key="'user'" label="User">
              <template #default="{ item }">
                {{ item.user.name }}
              </template>
            </v-data-table-column>
          </v-data-table>
        </div>
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
