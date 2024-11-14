import { defineStore } from 'pinia';
import { getProcurementAPI, acceptBidAPI } from '@/api/procurement/procurement';

interface Item {
  name: string;
  specification: string;
  quantity: number;
  unit: string;
  notes?: string;
  attachment?: string;
}

interface Bid {
  id: string;
  price: number;
  notes: string;
  selected?: boolean;
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
  const procurements = ref<Procurement[] | null>([]);

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
          items: item.Items.map((detail: any) => ({
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

  const acceptBid = async (procurementId: string, bidId: string) => {
    try {
      const response = await acceptBidAPI(procurementId, bidId); // Call backend to accept bid
      if (response.data) {
        const procurement = procurements.value.find(p => p.id === procurementId);
        if (procurement && procurement.bids) {
          procurement.bids.forEach(bid => {
            bid.selected = bid.id === bidId; // Mark the selected bid
          });
          procurement.status = true; // Close the procurement if desired
        }
      }
    } catch (error) {
      console.error('Error accepting bid:', error);
    }
  };

  return {
    procurements,
    openProcurements,
    getProcurementList,
    closeProcurement,
    getProcurementById,
    getBidsByProcurementId,
    acceptBid,
  };
});
