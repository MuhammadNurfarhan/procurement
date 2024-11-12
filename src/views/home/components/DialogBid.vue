<script setup lang="ts">
import { createBidAPI, updateBidAPI } from '@/api/procurement/bid';

const props = defineProps({
  showBidDialog: Boolean,
  action: Object,
});

const emit = defineEmits(['close']);

const dialogState = computed({
  get: () => props.showBidDialog,
  set: () => {
    emit('close');
  },
});

const dialogTitle = computed(() => {
  return props.action.type === 'create' ? 'Create Bid' : 'Update Bid';
});

// State untuk menyimpan data form bid
const state = reactive({
  formData: {
    items: [] as Array<{ itemName: string; unitPrice: number; notes: string }>,
  },
});

const handleCancelClick = () => {
  emit('close');
};

const handleSaveClick = () => {
  const request = props.action.type === 'create' ? createBidAPI : updateBidAPI;

  // Kirimkan data bid dengan item detail
  request({
    procurementId: props.action.data.id,
    items: state.formData.items,
  }).then(() => {
    emit('close');
  });
};

onBeforeMount(() => {
  if (props.action.type === 'create' && props.action.data?.items) {
    // Inisialisasi formData items dengan item dari procurement
    state.formData.items = props.action.data.items.map((item: any) => ({
      itemName: item.name,
      unitPrice: 0,
      notes: '',
    }));
  }
});
</script>

<template>
  <v-dialog v-model="dialogState" max-width="600px">
    <v-card>
      <v-card-title>{{ dialogTitle }}</v-card-title>
      <v-divider />
      <v-card-text>
        <v-form>
          <div v-for="(item, index) in state.formData.items" :key="index" class="mb-4">
            <v-text-field
              v-model="item.unitPrice"
              :label="`Harga per satuan untuk ${item.itemName}`"
              type="number"
              variant="outlined"
              color="primary"
              required
            />
            <v-textarea
              v-model="item.notes"
              :label="`Catatan untuk ${item.itemName}`"
              variant="outlined"
              rows="2"
              color="primary"
            />
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn class="bg-primary" @click="handleSaveClick">Save</v-btn>
        <v-btn class="bg-error" @click="handleCancelClick">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss"></style>
