export interface ApiResponse<T> {
  data: T
  paging?: {
    page: number
    size: number
    total_item: number
    total_page: number
  }
}
