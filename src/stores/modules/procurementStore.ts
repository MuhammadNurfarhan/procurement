import { defineStore } from 'pinia';

// Definisikan tipe untuk procurement dan bid agar tipe data lebih ketat
interface Procurement {
  id: number;
  name: string;
  date: string;
  isClosed: boolean;
  description?: string;
  bids?: Array<Bid>;
}

interface Bid {
  vendorName: string;
  item: string;
  price: number;
}

export const useProcurementStore = defineStore('procurement', () => {
  // State
  const procurements = ref<Procurement[]>([]);

  // Getter
  const openProcurements = computed(() =>
    procurements.value.filter(procurement => !procurement.isClosed)
  );

  // Action untuk memuat data pengadaan
  const fetchProcurements = () => {
    // Contoh data mock untuk simulasi fetch data
    procurements.value = [
      { id: 1, name: 'Pengadaan Komputer', date: '2023-10-01', isClosed: false },
      { id: 2, name: 'Pengadaan Meja Kantor', date: '2023-10-02', isClosed: true },
    ];
  };

  // Action untuk menutup pengadaan berdasarkan ID
  const closeProcurement = (id: number) => {
    const procurement = procurements.value.find(p => p.id === id);
    if (procurement) procurement.isClosed = true;
  };

  // Action untuk menambahkan penawaran pada pengadaan tertentu
  const offerBid = (id: number, vendorBid: Bid) => {
    const procurement = procurements.value.find(p => p.id === id);
    if (procurement) {
      procurement.bids = procurement.bids || []; // Jika bids belum ada, inisialisasi dengan array kosong
      procurement.bids.push(vendorBid);
      console.log(`Penawaran dari ${vendorBid.vendorName} untuk ${vendorBid.item} sebesar ${vendorBid.price} berhasil ditambahkan.`);
    }
  };

  const getProcurementById = (id: number): Procurement | undefined => {
    return procurements.value.find(procurement => procurement.id === id);
  };

  return {
    procurements,
    openProcurements,
    fetchProcurements,
    closeProcurement,
    offerBid,
    getProcurementById,
  };
});
