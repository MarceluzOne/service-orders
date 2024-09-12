export interface serviceOrders  {
  photo?: String,
  productName: String,
  refCode: String,
  priority?: String,
  description: String,
  entryDate: String,
  stats?: string,
  equipment?: {
    serialNumber: string,
    power: string,
    voltage: string,
    lastOS: string,
    brand: string,
    stats: string
  }
}
