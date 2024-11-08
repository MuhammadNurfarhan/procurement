<script lang="ts" setup>
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
      <v-card-text v-if="procurement" class="pl-0">
        <p><strong>Nama Pengadaan:</strong> {{ procurement.name }}</p>
        <p><strong>Tanggal Expired:</strong> {{ procurement.expirationDate }}</p>

        <!-- Loop through items and display their details -->
        <div v-if="procurement.items && procurement.items.length > 0">
          <v-divider class="my-4" />
          <h3>Items</h3>
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
