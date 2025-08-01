import { SyncDeviceList } from "./_components/sync-device-list";

export default function Page() {
  return (
    <div className="space-y-4 md:gap-6 md:p-6">
      <div>Sync Devices</div>
      <SyncDeviceList />
    </div>
  );
}
