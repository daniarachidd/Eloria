import { Suspense } from "react";
import AccountPage from "./AccountPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountPage />
    </Suspense>
  );
}