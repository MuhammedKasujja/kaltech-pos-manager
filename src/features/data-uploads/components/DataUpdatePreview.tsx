import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataUploadDetail } from "../actions";
import { JsonPreview } from "./json-preview";
import { formatDateTime } from "@/lib/utils";
import { useState } from "react";
import { FileJson2Icon, Table2Icon } from "lucide-react";
import { EntityUpload } from "../schemas";

type DataViewMode = "table" | "json";

export function DataUploadListPreview({
  upload,
}: {
  upload: DataUploadDetail;
}) {
  const [viewMode, setDataViewMode] = useState<DataViewMode>("table");
  return (
    <div className="space-y-2">
      {viewMode == "json" ? (
        <Table2Icon onClick={() => setDataViewMode("table")} />
      ) : (
        <FileJson2Icon onClick={() => setDataViewMode("json")} />
      )}
      {viewMode == "table" ? (
        // <div className="bg-sidebar rounded-md p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Model</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Updated At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(upload.data as Array<EntityUpload>).map((row) => (
              <TableRow key={row.entityId}>
                <TableCell>{row.entity}</TableCell>
                <TableCell>{row.state}</TableCell>
                <TableCell>
                  {formatDateTime(row.data.updated_at ?? row.data.updatedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        // </div>
        <JsonPreview key={upload.id.toString()} data={upload.data} />
      )}
    </div>
  );
}
