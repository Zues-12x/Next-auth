import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function UserInfo({ user, label }) {
  return (
    <Card>
      <CardHeader className="">
        <p className="text-2xl text-center font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row  items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm  font-medium">Name</p>
          <p className="text-sm  font-medium truncate bg-slate-200 rounded-md p-1">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row  items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm  font-medium">Email</p>
          <p className="text-sm  font-medium truncate bg-slate-200 rounded-md p-1">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row  items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm  font-medium">ID</p>
          <p className="text-sm  font-medium truncate bg-slate-200 rounded-md p-1">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row  items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm  font-medium">isTwoFactorEnabled</p>
          <p className="text-sm  font-medium truncate bg-slate-200 rounded-md p-1">
            {user?.isTwoFactorEnabled == false ? "OFF" : "ON"}
          </p>
        </div>
        <div className="flex flex-row  items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm  font-medium">Role</p>
          <p className="text-sm  font-medium truncate bg-slate-200 rounded-md p-1">
            {user?.role}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
