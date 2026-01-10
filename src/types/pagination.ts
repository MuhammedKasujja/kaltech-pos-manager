export interface PaginationParams {
  page?: number; // 1-based, default 1
  pageSize?: number; // default 20, max 100
}

export interface SortParams {
  sortBy?: string; // e.g. "createdAt", "price", "name"
  sortOrder?: "asc" | "desc";
}

export interface SearchParams {
  search?: string; // free text search
}

// export interface PaginatedResponse<T> {
//   items: T[];
//   pagination: {
//     currentPage: number;
//     pageSize: number;
//     totalItems: number;
//     totalPages: number;
//     hasNextPage: boolean;
//     hasPreviousPage: boolean;
//   };
// }

// export type Data = PaginatedResponse<String>['items']
