import { useStateMachine } from "little-state-machine";

export function loader() {
  return null;
}

export default function NewInvoicePreviewRoute() {
  const { state } = useStateMachine();
  return <>{JSON.stringify(state)}</>;
}
