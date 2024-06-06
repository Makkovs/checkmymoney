export type CategoryType =
    | "FOOD"
    | "HOUSING"
    | "TRANSPORT"
    | "MEDICINE"
    | "ENTERTAINMENT"
    | "CLOTHING"
    | "TRAVEL"
    | "UTILITIES"
    | "DEBT PAYMENTS"
    | "HOUSEHOD APPLIANCES"
    | "SALARY"
    | "RENT"
    | "BONUSES"
    | "PROPERTY SALES"
    | "OTHER";

export const imgCategories: Record<CategoryType, string> = {
    "FOOD": "/food-icon.png",
    "HOUSING": "/home-icon.png",
    "TRANSPORT": "/transport-icon.png",
    "MEDICINE": "/medicine-icon.png",
    "ENTERTAINMENT": "/entertainment-icon.png",
    "CLOTHING": "/clothing-icon.png",
    "TRAVEL": "/travel-icon.png",
    "UTILITIES": "/utilities-icon.png",
    "DEBT PAYMENTS": "/debt-payments-icon.png",
    "HOUSEHOD APPLIANCES": "/househod-appliances-icon.png",
    "SALARY": "/salary-icon.png",
    "RENT": "/rent-icon.png",
    "BONUSES": "/bonuses-icon.png",
    "PROPERTY SALES": "/property-sales-icon.png",
    "OTHER": "/other-icon.png"
}

export const colorCategories: Record<CategoryType, string> = {
    "FOOD": "rgb(229,99,83)",
    "HOUSING": "rgb(47,128,237)",
    "TRANSPORT": "rgb(247,187,56)",
    "MEDICINE": "rgb(254,224,18)",
    "ENTERTAINMENT": "rgb(33,150,243)",
    "CLOTHING": "rgb(2,145,247)",
    "TRAVEL": "rgb(68,196,161)",
    "UTILITIES": "rgb(255,205,0)",
    "DEBT PAYMENTS": "rgb(0,0,0)",
    "HOUSEHOD APPLIANCES": "rgb(172,38,20)",
    "SALARY": "rgb(140,76,209)",
    "RENT": "rgb(101,177,252)",
    "BONUSES": "rgb(250,169,64)",
    "PROPERTY SALES": "rgb(45,137,189)",
    "OTHER": "rgb(149,165,165)"
}