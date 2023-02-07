import { Link, Outlet } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";

export default function InvoicesRoute() {
  return (
    <div className="grid grid-cols-2 rounded-lg border border-gray-200">
      <div className="border-gray-200">
        <div className="border-b-3 border-r border-b     bg-gray-100 p-4">
          <Link to="/invoices/new">
            <div className="flex items-center gap-2">
              <AddIcon />
              <span>Create new invoice</span>
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
