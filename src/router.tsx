import { createBrowserRouter } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import ErrorRoute from "./routes/error";
import InvoicesRoute from "./routes/invoices";
import NewInvoiceRoute from "./routes/new-invoice";
import NewInvoicePreviewRoute, {
  loader as previewLoader,
} from "./routes/new-invoice-preview";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/invoices",
        element: <InvoicesRoute />,
        children: [
          {
            path: "/invoices/new",
            element: <NewInvoiceRoute />,
          },
          {
            path: "/invoices/new/preview",
            loader: previewLoader,
            element: <NewInvoicePreviewRoute />,
          },
        ],
      },
    ],
  },
]);
