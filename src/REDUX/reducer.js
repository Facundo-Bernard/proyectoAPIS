const initialState = {
    // aca guardamos las variables globales
    isLoggedIn: false,
    user: {
      name: '',
      tipoUsuario: 1, // 1: Cliente, 2: Secretaria, 3: Abogado
      id:""
    },
  };
  
  function counterReducer(state = initialState, action) {
    //funciones para cammbiar y actualizar variables globales
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          user: {
            name: action.payload.name,
            tipoUsuario: action.payload.tipoUsuario,
            id: action.payload.id
          },
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          user: {
            name: '',
            tipoUsuario: 1,
          },
        };
        case 'LOAD_PROGRESO':
          return{
            ...state,
            progreso: action.payload,
          };
          case 'ADD_PROGRESO':
            return {
              ...state,
              progreso: [...state.progreso, action.payload],
            };
          case 'UPDATE_PROGRESO':
            return {
              ...state,
              progreso: state.progreso.map((p) =>
                p.cursoId === action.payload.cursoId
                  ? { ...p, progreso: action.payload.progreso }
                  : p
              ),
            };
      default:
        return state;
    }
  }
  
  export default counterReducer;
  