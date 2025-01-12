<script lang="ts" setup>
import { useAuthStore } from '@/stores/modules/authStore';
import { useProcurementStore } from '@/stores/modules/procurementStore';
import DialogProcurement from './components/DialogProcurement.vue';
import DialogBid from './components/DialogBid.vue';

// Inisialisasi store
const authStore = useAuthStore();
const procurementStore = useProcurementStore();

// Akses state dan aksi dari store
const isLoggedIn = computed(() => !!authStore.token);
const isUserRole = computed(() => authStore.role === 'User');
const procurements = computed(() => procurementStore.procurements);

const state = reactive({
  tab: 0,
  showDialog: false,
  showBidDialog: false,
  dialogAction: {
    type: "create",
    data: {},
  },
  bidDialogData: {
    id: null,
    items: [],
  },
})

const tableHeaders: any = [
  { title: 'Request Name', key: 'ProcurementName' },
  { title: 'Expired Date', key: 'ExpirationDate' },
  { title: 'Action', key: 'actions', sortable: false },
];

const openBidDialog = (procurementId: any) => {
  if (isLoggedIn.value && isUserRole.value) {
    // Ambil data procurement berdasarkan ID
    const procurement = procurementStore.getProcurementById(procurementId);

    if (procurement) {
      state.bidDialogData.id = procurementId;
      state.bidDialogData.items = procurement.Items; // Tambahkan items ke bidDialogData
      state.showBidDialog = true;
    }
  }
};

const handleCreateClick = () => {
  state.dialogAction.type = "create";
  state.dialogAction.data = null;
  state.showDialog = true;
};

// Filter pengadaan yang sudah expired
const expiredProcurements = computed(() => {
  const currentDate = new Date().toISOString().split('T')[0];
  return procurements.value.filter(item => item.ExpirationDate < currentDate);
});

const activeProcurements = computed(() => {
  const currentDate = new Date().toISOString().split('T')[0];
  return procurements.value.filter(item => item.ExpirationDate >= currentDate);
})

const handleDialogClose = () => {
  state.showDialog = false;
  procurementStore.getProcurementList();
}

const handleBidDialogClose = () => {
  state.showBidDialog = false;
}

onBeforeMount(() => {
  procurementStore.getProcurementList();
});

</script>

<template>
  <v-container>
    <Navbar />
    <v-card class="top">
      <v-tabs v-model="state.tab" align-tabs="center" color="deep-purple-accent-4">
        <v-tab>Pengadaan (Invitation for Bid)</v-tab>
        <v-tab>Pengumuman Pengadaan (Announcement of Successful Bid)</v-tab>
      </v-tabs>

      <v-tabs-window v-model="state.tab">
        <!-- Tab Pengadaan -->
        <v-tabs-window-item>
          <v-btn v-if="!isUserRole && isLoggedIn" color="primary" @click="handleCreateClick" class="btn-create">Create</v-btn>
          <v-data-table :items="activeProcurements" :headers="tableHeaders">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn class="mr-2" color="success" v-if="isUserRole && isLoggedIn" @click="openBidDialog(item.id)">Bid</v-btn>
              <span class="text-disabled mr-2" v-else-if="!isLoggedIn || isUserRole">Login to Bid</span>
              <v-btn color="primary" :to="`/procurement/${item.id}`">Detail</v-btn>
            </template>
          </v-data-table>
        </v-tabs-window-item>

        <!-- Tab Pengumuman Pengadaan -->
        <v-tabs-window-item>
          <!-- Daftar pengumuman pengadaan di sini -->
          <v-data-table :items="expiredProcurements" :headers="tableHeaders">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="primary" :to="`/procurement/${item.id}`">Detail</v-btn>
            </template>
          </v-data-table>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
    <Footer />

    <DialogProcurement
      v-if="state.showDialog"
      :showDialog="state.showDialog"
      :action="state.dialogAction"
      @close="handleDialogClose"
    />

    <DialogBid
      v-if="state.showBidDialog"
      :showBidDialog="state.showBidDialog"
      :action="{ type: 'create', data: { id: state.bidDialogData.id, items: state.bidDialogData.items } }"
      @close="handleBidDialogClose"
    />
  </v-container>
</template>

<style scoped>
.top {
  margin-top: 70px;
}
.btn-create {
  float: right;
  margin: 10px;
}
</style>
