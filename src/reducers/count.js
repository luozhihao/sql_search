import {
    GETPRODUCTS,
    GETSERVERS,
    GETTABLES,
    GETLOADING,
    GETROWKEYS,
    GETCURPRODUCT,
    GETSEARCH,
    GETACTIVE,
    SETEAI,
    SETPOWER,
    SETCONFIG
} from '../constants'

// 初始化state数据
const initialState = {
    products: [],
    curProduct: '请选择',
    serverNames: [],
    tableData: [],
    loading: false,
    keys: [],
    search: '',
    active: null,
    groups: [],
    netTypes: [],
    useCDN: false,
    config: false
}

export default function serverLeft(state = initialState, action) {
    switch (action.type) {
        case GETPRODUCTS:
            return Object.assign({}, state, { products: action.products })
            break
        case GETCURPRODUCT:
            return Object.assign({}, state, { curProduct: action.cur, tableData: [], keys: [], loading: false })
            break
        case GETSERVERS:
            return Object.assign({}, state, { serverNames: action.servers })
            break
        case GETTABLES:
            return Object.assign({}, state, { tableData: action.tables })
            break
        case GETLOADING:
            return Object.assign({}, state, { loading: action.loading })
            break
        case GETROWKEYS:
            return Object.assign({}, state, { keys: action.keys })
            break
        case GETSEARCH:
            return Object.assign({}, state, { search: action.search })
            break
        case GETACTIVE:
            return Object.assign({}, state, { active: action.active })
            break
        case SETEAI:
            return Object.assign({}, state, { groups: action.groups, netTypes: action.netTypes })
            break
        case SETPOWER:
            return Object.assign({}, state, { useCDN: action.useCDN })
            break
        case SETCONFIG:
            return Object.assign({}, state, { config: action.config })
            break
        default:
            return state
    }
}
