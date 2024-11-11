import { defineStore } from 'pinia';

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
  id: number;
  procurementName: string;
  expirationDate: string;
  isClosed: boolean;
  items: Array<Item>;
  bids?: Array<Bid>;
}

export const useProcurementStore = defineStore('procurement', () => {
  // State
  const procurements = ref<Procurement[]>([]);

  // Getter
  const openProcurements = computed(() =>
    procurements.value.filter(procurement => !procurement.isClosed)
  );

  // Action untuk memuat data pengadaan
  const getProcurementList = () => {

    // getProcurementAPI()
    //  .then((res: any) => {
    //     procurements.value = res.data;
    //   })
    //  .catch((error: any) => {
    //     console.error('Error fetching procurements:', error);
    //   });

    // Contoh data mock untuk simulasi fetch data
    procurements.value = [
      {
        id: 1,
        procurementName: 'Pengadaan Komputer',
        expirationDate: '2024-12-01',
        isClosed: false,
        items: [
          {
            name: 'Laptop',
            specification: 'Laptop dengan RAM 8GB dan SSD 256GB',
            quantity: 10,
            unit: 'pcs',
            notes: 'Laptop harus memiliki garansi 2 tahun',
            attachment: 'https://example.com/attachment-laptop.pdf',
          },
          {
            name: 'Monitor',
            specification: 'Monitor LED 24 inci',
            quantity: 10,
            unit: 'pcs',
            notes: 'Resolusi minimal Full HD',
            attachment: 'https://example.com/attachment-monitor.pdf',
          },
        ],
      },
      {
        id: 2,
        procurementName: 'Pengadaan Meja Kantor',
        expirationDate: '2023-10-02',
        isClosed: true,
        items: [
          {
            name: 'Meja Kantor',
            specification: 'Meja kantor kayu dengan ukuran 120x60 cm',
            quantity: 20,
            unit: 'unit',
            notes: 'Memiliki laci di sisi kanan',
            attachment: 'https://example.com/attachment-meja.pdf',
          },
        ],
      },
    ];
  };

  // Action untuk menutup pengadaan berdasarkan ID
  const closeProcurement = (id: number) => {
    const procurement = procurements.value.find(p => p.id === id);
    if (procurement) procurement.isClosed = true;
  };

  const getProcurementById = (id: number): Procurement | undefined => {
    return procurements.value.find(procurement => procurement.id === id);
  };

  const getBidsByProcurementId = (id: number): Array<Bid> | undefined => {
    return procurements.value.find(procurement => procurement.id === id)?.bids;
  };

  return {
    procurements,
    openProcurements,
    getProcurementList,
    closeProcurement,
    // offerBid,
    getProcurementById,
  };
});
