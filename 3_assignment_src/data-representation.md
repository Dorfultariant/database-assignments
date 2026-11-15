Document database format with each object separated, the order could contain either reference to the object or copy of it to get snapshots of the purchase state.

Written as typescipt-ish type notation.

Order: {
    oid: UUID,
    o_date: Date,
    o_total: number,
    customer: Customer,
    items: [OrderItem],
}

Customer: {
    cid: UUID,
    name: string,
    address: {
        street: string,
        city: string,
        state: string,
        country: string
    },
    phones: [string]
}

OrderItem: {
    line_id: UUID,
    qty: number,
    product: Product,
}

Product: {
    pid: UUID,
    p_name: string,
    price: number
}
