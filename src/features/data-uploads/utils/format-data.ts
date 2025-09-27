import { EntityRelation, EntityUpload } from "../types";

// TODO: use a map to avoid duplicates
// include only changed entities i.e [ is_synced == false ]
export function formatDataUpload(upload: EntityUpload) {
  const relations: EntityRelation[] = [];
  if (upload.data.relations)
    for (const value of Object.values(upload.data.relations)) {
      if (Array.isArray(value)) {
        relations.push(...value);
      } else {
        if (value) relations.push(value);
      }
    }

  return relations;
}

export function formatDataUploadList(uploads: EntityUpload[]) {
  const entities = new Map<string, EntityUpload>();

  const relations: EntityRelation[] = [];

  for (const data of uploads) {
    relations.push(...formatDataUpload(data));
    if (!entities.has(data.entityId)) {
      const entity = {
        ...data,
        data: {
          ...data.data,
          relations: filterMapNulls(data.data.relations),
        },
      };
      entities.set(data.entityId, entity);
    }
  }

  const pending = relations.filter((rel) => rel.is_synced === false);

  return { entities: entities.size };

  return {
    relations: relations.length,
    entities: entities.size,
    pending: pending.length,
  };
}

export function formatAccountDataUploadList(
  uploads: EntityUpload[]
): EntityUpload[] {
  return uploads.map((data) => ({
    ...data,
    data: {
      ...data.data,
      relations: filterMapNulls(data.data.relations),
    },
  }));
}

export function filterMapNulls<T>(
  obj?: Record<string, T | null | undefined>
): Record<string, T> | undefined {
  if (!obj) return undefined;

  const nonNullMap = Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null)
  ) as Record<string, T>;
  
  return Object.keys(nonNullMap).length === 0 ? undefined : nonNullMap;
}
