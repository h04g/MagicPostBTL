const USER_ROLES = {
    DIRECTOR_COMPANY: 0, // admin, lãnh  đạo cty

    DIRECTOR_TRANSACTION_POINT: 1, // trưởng điểm tại giao dịch
    COUNTER_TRANSACTION_POINT: 2, // giao dịch viên tại điểm giao dịch

    DIRECTOR_CONSOLIDATION_POINT: 3, // trưởng điểm tại điểm tập kết
    COUNTER_CONSOLIDATION_POINT: 4, // nhân viên tại điểm tập kết
}

const BRANCH_ROLES = {
    TRANSACTION_POINT: 0, // điểm giao dịch
    CONSOLIDATION_POINT: 1 // điểm tập kết
}

const PRODUCT_TYPE = {
    DOCUMENT: 0,
    GOODS: 1,
}

module.exports = {
    USER_ROLES,
    BRANCH_ROLES,
    PRODUCT_TYPE,
}