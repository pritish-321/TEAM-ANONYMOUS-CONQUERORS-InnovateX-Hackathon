// types/index.d.ts
export type Product = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    gst: number;
  };
  
  export type ScannedProduct = {
    name: string;
    price: number;
    quantity: number;
    gst?: number;
  };
  