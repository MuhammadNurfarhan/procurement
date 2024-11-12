<script setup lang="ts">
import { createProcurementAPI, updateProcurementAPI } from "@/api/procurement/procurement";

const props = defineProps({
  showDialog: Boolean,
  action: Object,
});

const emit = defineEmits(['close']);

const dialogState = computed({
  get: () => props.showDialog,
  set: () => {
    emit('close');
  },
});

const state = reactive({
  formData: {
    procurementName: '',
    expirationDate: null,
    items: [
      {
        name: '',
        specification: '',
        quantity: 0,
        unit: '',
        notes: '',
        attachment: null,
      },
    ],
  },
});

// Menghitung tanggal minimum sebagai 1 minggu dari hari ini
const minDate = new Date();
minDate.setDate(minDate.getDate() + 7);
const formattedMinDate = minDate.toISOString().split('T')[0];

const dialogTitle = computed(() => {
  return props.action.type === 'create' ? 'Create Procurement' : 'Update Procurement';
});

const handleCancelClick = () => {
  emit('close');
};

const handleSaveClick = () => {
  const request = props.action.type === 'create'
    ? createProcurementAPI
    : updateProcurementAPI;

  request(state.formData).then(() => {
    emit('close');
  })
};

const handleFileUpload = (e: Event, index: number) => {
  const files = (e.target as HTMLInputElement).files;
  if (files && files[0]) {
    state.formData.items[index].attachment = files[0];
  }
};

// Fungsi untuk menambahkan item baru
const addItem = () => {
  state.formData.items.push({
    name: '',
    specification: '',
    quantity: 0,
    unit: '',
    notes: '',
    attachment: null,
  });
};

// Fungsi untuk menghapus item tertentu berdasarkan indeks
const removeItem = (index: number) => {
  state.formData.items.splice(index, 1);
};

onBeforeMount(() => {
  if (props.action.type === 'create') {
    state.formData = {
      procurementName: '',
      expirationDate: null,
      items: [
        {
          name: '',
          specification: '',
          quantity: 0,
          unit: '',
          notes: '',
          attachment: null,
        },
      ],
    };
  }
});

</script>

<template>
  <v-dialog v-model="dialogState" >
    <v-card>
      <v-card-title>{{ dialogTitle }}</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="state.formData.procurementName"
            label="Procurement Name"
            variant="outlined"
            color="primary"
            required
          />
          <v-date-input
            v-model="state.formData.expirationDate"
            label="Expiration Date"
            color="primary"
            variant="outlined"
            required
            :min="formattedMinDate"
          />

          <template v-for="(item, index) in state.formData.items" :key="index">
            <v-divider class="my-4" />
            <v-card-subtitle>Item {{ index + 1 }}</v-card-subtitle>

            <v-row>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model="item.name"
                  label="Item Name"
                  variant="outlined"
                  color="primary"
                  required
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model="item.specification"
                  label="Specification"
                  variant="outlined"
                  color="primary"
                  required
                />
              </v-col>
              <v-col cols="6" md="1">
                <v-text-field
                  v-model="item.quantity"
                  label="Quantity"
                  type="number"
                  variant="outlined"
                  color="primary"
                  required
                />
              </v-col>
              <v-col cols="6" md="1">
                <v-text-field
                  v-model="item.unit"
                  label="Unit"
                  variant="outlined"
                  color="primary"
                  required
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model="item.notes"
                  label="Notes"
                  variant="outlined"
                  color="primary"
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-file-input
                  v-model="item.attachment"
                  label="Attachment (Images)"
                  @change="handleFileUpload"
                  accept="image/*"
                />
              </v-col>
              <v-col cols="12" md="2">
                <v-btn
                  v-if="state.formData.items.length > 1"
                  color="error"
                  class="mt-4"
                  @click="removeItem(index)"
                >
                  Remove Item
                </v-btn>
              </v-col>
            </v-row>
          </template>

          <!-- Tombol tambah item baru -->
          <v-btn color="success" class="mt-4" @click="addItem">
            Add New Item
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn class="bg-primary" @click="handleSaveClick">Save</v-btn>
        <v-btn class="bg-error" @click="handleCancelClick">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>
