This focuses on the document database format with order containing information 
about customer and order containing multiple product items. 
Essentially a snapshot of the purchase time information.

{
    order: {
        oid: UUID,
        o_date: Date,
        o_total: number,
        customer: {
            cid: UUID,
            name: string,
            address: {
                street: string,
                city: string,
                state: string,
                country: string
            },
            phones[string]
        },
        items: [{
            line_id: UUID,
            qty: number,
            product: {
                pid: UUID,
                p_name: string,
                price: number
            }],
        },
    }
}

