type Order = {
    id: number;
    link: string;
    income: number;
};

type Orders = Order[];


type ownerOrderType = 'myOrders' | 'myCompletedOrders';

type ownerOrder = {
    "id": number;
    "link": string;
    "amount": number;
    "remains": number;
    "subscribers_type": string;
};
