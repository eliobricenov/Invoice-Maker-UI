import "little-state-machine";
import { NewInvoiceFormValues } from "./interfaces/new-invoice-form";

declare module "little-state-machine" {
  interface GlobalState extends NewInvoiceFormValues {}
}
