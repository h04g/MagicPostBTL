// role user
const ROLE_ADMIN = 5;
const ROLE_TRANSACTION_POINT_MANAGER = 1;
const ROLE_TRANSACTION_POINT_STAFF = 2;
const ROLE_TRANSIT_POINT_MANAGER = 3;
const ROLE_TRANSIT_POINT_STAFF = 4;

// role branch
const ROLE_CUSTOMER = 0;
const ROLE_TRANSACTION_POINT = 1;
const ROLE_TRANSIT_POINT = 2;
const ROLE_HEADQUARTERS = 3

//Chuyển hoàn ngay
const IWGCNBA_1 = 1;
//Gọi cho chười gửi
const IWGCNBA_2 = 2;
//Hủy
const IWGCNBA_3 = 3;
//Chuyển hoàn trước ngày
const IWGCNBA_4 = 4;
//Chuyển hoàn khi hết thời gian lưu trữ
const IWGCNBA_5 = 5;

const VAT = 0.1;

//status Shipping Orders
// const SHIPPING_ORDERS_NEW = 1;
const SHIPPING_ORDERS_TRANSPORTING = 2;
const SHIPPING_ORDERS_DELIVERED = 3;
// const SHIPPING_ORDERS_CANCELLED = 4;
const SHIPPING_ORDERS_REFUNDING = 5;
const SHIPPING_ORDERS_REFUNDED = 6;
//product_type
const PRODUCT_TYPE_DOCUMENT = 1;
const PRODUCT_TYPE_COMMODITY = 2;
module.exports = {
    ROLE_ADMIN,
    ROLE_TRANSACTION_POINT_MANAGER,
    ROLE_TRANSACTION_POINT_STAFF,
    ROLE_TRANSIT_POINT_MANAGER,
    ROLE_TRANSIT_POINT_STAFF,
    ROLE_CUSTOMER,
    ROLE_TRANSIT_POINT,
    ROLE_TRANSACTION_POINT,
    ROLE_HEADQUARTERS,
    IWGCNBA_1,
    IWGCNBA_2,
    IWGCNBA_3,
    IWGCNBA_4,
    IWGCNBA_5,
    VAT,
    // SHIPPING_ORDERS_NEW,
    SHIPPING_ORDERS_TRANSPORTING,
    SHIPPING_ORDERS_DELIVERED,
    // SHIPPING_ORDERS_CANCELLED,
    SHIPPING_ORDERS_REFUNDING,
    SHIPPING_ORDERS_REFUNDED,
    ROLE_HEADQUARTERS,
    PRODUCT_TYPE_DOCUMENT,
    PRODUCT_TYPE_COMMODITY,
}
