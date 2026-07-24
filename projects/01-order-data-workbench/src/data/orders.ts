export type OrderStatus = 'paid' | 'pending' | 'cancelled' | 'refunded'

export interface Customer {
  name: string
  email: string
}

export interface OrderItem {
  sku: string
  name: string
  quantity: number
  unitPriceInPaise: number
}

export interface Order {
  id: string
  customer: Customer
  status: OrderStatus
  placedAt: string
  items: OrderItem[]
}

export const orders: Order[] = [
  {
    id: 'ORD-1041',
    customer: {
      name: 'Aditi Mehta',
      email: 'aditi@example.com',
    },
    status: 'paid',
    placedAt: '2026-07-18T09:35:00.000Z',
    items: [
      {
        sku: 'KEY-75',
        name: 'Mechanical Keyboard',
        quantity: 1,
        unitPriceInPaise: 249900,
      },
      {
        sku: 'CAB-USBC',
        name: 'USB-C Cable',
        quantity: 2,
        unitPriceInPaise: 39900,
      },
    ],
  },
  {
    id: 'ORD-1042',
    customer: {
      name: 'Dev Kumar',
      email: 'dev.kumar@example.com',
    },
    status: 'pending',
    placedAt: '2026-07-19T12:10:00.000Z',
    items: [
      {
        sku: 'MON-27',
        name: '27-inch Monitor',
        quantity: 1,
        unitPriceInPaise: 1899900,
      },
    ],
  },
  {
    id: 'ORD-1043',
    customer: {
      name: 'Mira Shah',
      email: 'mira@example.com',
    },
    status: 'paid',
    placedAt: '2026-07-20T07:45:00.000Z',
    items: [
      {
        sku: 'NOTE-A5',
        name: 'A5 Notebook',
        quantity: 3,
        unitPriceInPaise: 24900,
      },
      {
        sku: 'PEN-SET',
        name: 'Pen Set',
        quantity: 1,
        unitPriceInPaise: 49900,
      },
    ],
  },
  {
    id: 'ORD-1044',
    customer: {
      name: 'Northwind Studio',
      email: 'orders@northwind.example',
    },
    status: 'cancelled',
    placedAt: '2026-07-20T15:20:00.000Z',
    items: [
      {
        sku: 'LAMP-DESK',
        name: 'Desk Lamp',
        quantity: 1,
        unitPriceInPaise: 349900,
      },
    ],
  },
  {
    id: 'ORD-1045',
    customer: {
      name: 'Ravi & Sons',
      email: 'purchases@ravi-and-sons.example',
    },
    status: 'refunded',
    placedAt: '2026-07-21T10:05:00.000Z',
    items: [
      {
        sku: 'STAND-LAP',
        name: 'Laptop Stand',
        quantity: 2,
        unitPriceInPaise: 179900,
      },
      {
        sku: 'CAM-1080',
        name: '1080p Webcam',
        quantity: 1,
        unitPriceInPaise: 449900,
      },
    ],
  },
]
