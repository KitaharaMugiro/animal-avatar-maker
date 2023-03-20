type PlanType = {
    name: string
    quantity: string
    quality: string
    waitTime: string
    price: number
    freeStyePromptNum: number
    description: string
}

//　PlanConstの型
export type PlanConstType = {
    [key: string]: PlanType
}

export const PlanConst: PlanConstType = {
    free: {
        name: "フリープラン",
        quantity: "2種類x2枚",
        quality: "少し低い",
        waitTime: "あり",
        price: 0,
        description: "フリープラン (0円)",
        freeStyePromptNum: 2,
    },
    standard: {
        name: "スタンダードプラン",
        quantity: "5種類x2枚",
        quality: "高品質",
        waitTime: "優先",
        price: 980,
        description: "スタンダードプラン (980円)",
        freeStyePromptNum: 5,
    },
    miniPack: {
        name: "ミニパックプラン",
        quantity: "30枚",
        quality: "高品質",
        waitTime: "優先",
        price: 1280,
        description: "ミニパックプラン (0円)",
        freeStyePromptNum: 0,
    },
    standardPack: {
        name: "スタンダードパックプラン",
        quantity: "100枚",
        quality: "高品質",
        waitTime: "優先",
        price: 2980,
        description: "スタンダードパックプラン (2980円)",
        freeStyePromptNum: 0,
    },

    none: {
        name: "なし",
        quantity: "",
        quality: "",
        waitTime: "",
        price: 0,
        description: "プランを選んでね",
        freeStyePromptNum: 0,
    },
}
