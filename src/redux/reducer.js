const initialState = {
  categories: [],
  products: [],
  sales: [],
  stores: [],
  supplies: [],
  users: [],
  loading: false,
  isLoaded: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // ALL PRODUCTS
    case 'LOAD_PRODUCTS':
      return { ...state, products: action.payload, isLoading: true };
    case 'LOAD_CATEGORIES':
      return { ...state, categories: action.payload, isLoading: true };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        ),
      };
    case 'UPDATE_PRODUCT':
      let updatedProducts = state.products.map(product => {
        if (product._id === action.payload._id) {
          product = action.payload;
        }
        return product;
      });
      return { ...state, products: updatedProducts, isLoading: true };

    // ALL STORES
    case 'LOAD_STORES':
      return { ...state, stores: action.payload, isLoading: true };
    // ALL USERS
    case 'LOAD_USERS':
      return { ...state, users: action.payload, loading: true };

    case 'ADD_USERS':
      return { ...state, users: [...state.users, action.payload] };
    case 'DELETE_USERS':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
        loading: true,
      };

    // ALL CATEGORY

    case 'ADD_CATEGORY':
      return { ...state, categories: [...state.categories, action.payload] };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        ),
        loading: true,
      };
    // ALL SUPPLIES
    case 'LOAD_SUPPLIES':
      return { ...state, supplies: action.payload, loading: true };

    //ALL SALES
    case 'LOAD_SALES':
      return { ...state, sales: action.payload, loading: true };

    case 'ADD_SALES':
      return { ...state, sales: [...state.sales, action.payload] };

    default:
      return state;
  }
};

export default reducer;
