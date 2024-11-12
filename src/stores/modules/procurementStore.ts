import { defineStore } from 'pinia';
import { getProcurementAPI } from '@/api/procurement/procurement';

interface Item {
  name: string;
  specification: string;
  quantity: number;
  unit: string;
  notes?: string;
  attachment?: string;
}

interface Bid {
  price: number;
  notes: string;
}

interface Procurement {
  id: string;
  procurementName: string;
  expirationDate: string;
  description?: string;
  items: Item[];
  bids?: Bid[];
  status: boolean;
}

export const useProcurementStore = defineStore('procurement', () => {
  // State
  const procurements = ref<Procurement[]>([]);

  // Getter
  const openProcurements = computed(() =>
    procurements.value.filter(procurement => !procurement.status)
  );

  const getProcurementList = async () => {
    try {
      const response = await getProcurementAPI();
      if (response.data) {
        procurements.value = response.data.map((item: any) => ({
          id: item.ID,
          procurementName: item.ProcurementName,
          expirationDate: item.ExpirationDate,
          status: item.status !== 'ACTIVE', // Adjust isClosed based on status
          items: item.ProcDetail.map((detail: any) => ({
            name: detail.Name,
            specification: detail.Specification,
            quantity: detail.Quantity,
            unit: detail.Unit,
            notes: detail.Notes,
            attachment: detail.Attachment || null,
          })),
        }));
      }
    } catch (error: any) {
      console.error('Error fetching procurements:', error);
    }
  };

  // Action untuk menutup pengadaan berdasarkan ID
  const closeProcurement = (id: any) => {
    const procurement = procurements.value.find(p => p.id === id);
    if (procurement) procurement.status = true;
  };

  const getProcurementById = (id: any): Procurement | undefined => {
    return procurements.value.find(procurement => procurement.id === id);
  };

  const getBidsByProcurementId = (id: any): Bid[] | undefined => {
    return procurements.value.find(procurement => procurement.id === id)?.bids;
  };

  return {
    procurements,
    openProcurements,
    getProcurementList,
    closeProcurement,
    getProcurementById,
    getBidsByProcurementId
  };
});
