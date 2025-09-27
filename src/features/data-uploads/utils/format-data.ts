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

  const setRelations = new Set<string>();

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

  for (const relation of relations) {
    if (!relation.is_synced && !setRelations.has(relation.uuid)) {
      setRelations.add(relation.uuid);
    }
  }

  return combineDataUpload(setRelations, entities);
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

function combineDataUpload(
  relations: Set<string>,
  entities: Map<string, EntityUpload>
) {
  const result = new Map<string, EntityUpload>();
  const models = new Map<string, EntityUpload>();

  for (const value of relations) {
    const entity = entities.get(value);

    if (entity)
      result.set(value, {
        ...entity,
        data: { ...entity.data, relations: undefined },
      });
  }

  for (const [key, entity] of entities) {
    if (!result.has(key)) {
      models.set(key, entity);
    }
  }

  return {
    relations: Array.from(result.values()),
    entities: Array.from(models.values()),
  };
}
