<script setup lang="ts">
import { createBidAPI, updateBidAPI } from '@/api/procurement/bid';

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

const dialogTitle = computed(() => {
  return props.action.type === 'create' ? 'Create Bid' : 'Update Bid';
});

// State untuk menyimpan data form bid
const state = reactive({
  formData: {
    bidAmount: 0,
    bidNotes: '',
  },
});

const handleCancelClick = () => {
  emit('close');
};

const handleSaveClick = () => {
  const request = props.action.type === 'create' ? createBidAPI : updateBidAPI;

  request({ ...state.formData, procurementId: props.action.data.id }).then(() => {
    emit('close');
  });
};

onBeforeMount(() => {
  if (props.action.type === 'create') {
    state.formData = {
      bidAmount: 0,
      bidNotes: ''
    };
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
          <v-text-field
            v-model="state.formData.bidAmount"
            label="Bid Amount"
            type="number"
            variant="outlined"
            color="primary"
            required
          />
          <v-textarea
            v-model="state.formData.bidNotes"
            label="Notes"
            variant="outlined"
            rows="2"
            color="primary"
          />
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
