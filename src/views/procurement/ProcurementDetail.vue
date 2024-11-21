<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useProcurementStore } from '@/stores/modules/procurementStore';
import { useAuthStore } from '@/stores/modules/authStore';

const route = useRoute();
const procurementStore = useProcurementStore();
const authStore = useAuthStore();

const procurement = ref(null);
const isAdmin = ref(authStore.role === 'Admin');

const bidHeaders: any = [
  { title: 'Bid Amount', key: 'price' },
  { title: 'Notes', key: 'notes' },
  { title: 'User', key: 'user' },
]

const selectBid = (bid: any) => {
  // Implement logic to select the bid (e.g., update the procurement status or mark the bid as accepted).
  procurementStore.acceptBid(procurement.value.id, bid.id).then(() => {
    console.log("Bid selected successfully");
    procurement.value.bids.forEach((b: any) => {
      b.selected = b.id === bid.id; // Mark only the selected bid
    });
  });
};

// Ambil ID dari route parameter dan fetch detail
onMounted(async () => {
  const id = route.params.id;
  await procurementStore.getProcurementList();
  procurement.value = procurementStore.getProcurementById(id);
  // Fetch bidding data only if the user is an admin
  if (isAdmin.value && procurement.value) {
    procurement.value.bids = procurementStore.getBidsByProcurementId(id);
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
        <p><strong>Nama Pengadaan :</strong> {{ procurement.ProcurementName }}</p>
        <p><strong>Tanggal Expired :</strong> {{ procurement.ExpirationDate }}</p>

        <!-- Daftar Item Pengadaan -->
        <div v-if="procurement.Items && procurement.Items.length > 0">
          <h3>Daftar Item</h3>
          <div v-for="(item, index) in procurement.Items" :key="index">
            <v-card class="mb-4" outlined>
              <v-card-title>Item {{ index + 1 }}</v-card-title>
              <v-card-text>
                <p><strong>Name:</strong> {{ item.Name }}</p>
                <p><strong>Specification:</strong> {{ item.Specification }}</p>
                <p><strong>Quantity:</strong> {{ item.Quantity }}</p>
                <p><strong>Unit:</strong> {{ item.Unit }}</p>
                <p><strong>Notes:</strong> {{ item.Notes }}</p>
                <p v-if="item.Attachment">
                  <strong>Attachment:</strong>
                  <a :href="item.Attachment" target="_blank">View Attachment</a>
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
          <v-data-table
            :items="procurement.bids"
            :headers="bidHeaders"
          >
            <template v-slot:[`item.selectBid`]="{ item }">
              <v-btn class="bg-success" @click="selectBid(item)">Pilih</v-btn>
            </template>
          </v-data-table>
        </div>
      </v-card-text>
      <v-card-text v-else>
        <p>Data tidak ditemukan.</p>
      </v-card-text>
      <v-btn to="/" color="primary">Back</v-btn>
    </v-card>
    <Footer />
  </v-container>
</template>

<style scoped>
.top {
  margin-top: 70px;
  padding: 20px;
}
</style>
