export interface ScannedProduct {
    name: string
    price: number
    gst: number
    quantity: number
  }
  
  export function parseScannedProduct(data: string): ScannedProduct | null {
    try {
      const keyValuePairs = data.split(";").map((pair) => pair.split("="));
      const product: any = {};
  
      keyValuePairs.forEach(([key, value]) => {
        if (!key || !value) return;
        if (["price", "gst", "quantity"].includes(key)) {
          product[key] = parseFloat(value);
        } else {
          product[key] = value;
        }
      });
  
      // Validate required fields
      if (
        typeof product.name === "string" &&
        typeof product.price === "number" &&
        typeof product.gst === "number" &&
        typeof product.quantity === "number"
      ) {
        return product as ScannedProduct;
      }
  
      return null;
    } catch (err) {
      console.error("Failed to parse scanned product:", err);
      return null;
    }
  }
  