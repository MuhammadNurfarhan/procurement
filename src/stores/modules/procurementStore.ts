import { defineStore } from 'pinia';
import { getProcurementAPI, acceptBidAPI } from '@/api/procurement/procurement';

interface Item {
  Name: string;
  Specification: string;
  Quantity: string;
  Unit: string;
  Notes?: string;
  Attachment?: string;
}

interface Bid {
  id: string;
  price: number;
  notes: string;
  selected?: boolean;
}

interface Procurement {
  id: string;
  ProcurementName: string;
  ExpirationDate: string;
  Description?: string;
  Items: Item[];
  bids?: Bid[];
  status: string;
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
      if (response.data && response.data.length > 0) {
        procurements.value = response.data.map((item: any) => ({
          id: item.ID,
          ProcurementName: item.ProcurementName || "",
          ExpirationDate: item.ExpirationDate || "",
          Items: item.Items.map((detail: any) => ({
            Name: detail.Name || "",
            Specification: detail.Specification || "",
            Quantity: detail.Quantity || "",
            Unit: detail.Unit || "",
            Notes: detail.Notes || "",
            Attachment: detail.Attachment || null,
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
    if (procurement) procurement.status = "INACTIVE";
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
          procurement.status = "INACTIVE"; // Close the procurement if desired
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
