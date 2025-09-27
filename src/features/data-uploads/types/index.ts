export type EntityUpload = {
  state: "updated" | "created" | "deleted";
  entity: string;
  entityId: string;
  data: {
    uuid: string;
    is_synced: boolean;
    relations?: {
      [key: string]: EntityRelation | EntityRelation[] | undefined | null;
    };
    updated_at?: string;
    updatedAt: string;
    created_at: string;
    deleted_at?: string;
  };
};

export type EntityRelation = {
  entity: string;
  uuid: string;
  is_synced: boolean;
  parent_uuid?: string;
};
