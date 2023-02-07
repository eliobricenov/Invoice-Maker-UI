import { tokens } from "../system/tokens";

export interface NewInvoiceFormValues {
  name: string;
  paymentMethod: (typeof tokens)[number];
  listItems: {
    quantity?: number;
    price?: number;
    description?: string;
  }[];
}
