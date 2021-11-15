import axios from 'axios';

//ACTIONS
const FETCH_ALL = 'FETCH_ALL';
const FETCH_FAIL = 'FETCH_FAIL';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOADING = 'LOADING';
const WELCOME_MSG = 'WELCOME_MSG';
const USER_LIST = 'USER_LIST';
const LISTING_FAIl = 'LISTING_FAIl';
const USER_DELETED_SUCCESS = 'USER_DELETED_SUCCESS';
const USER_DELETED_FAIL = 'USER_DELETED_FAIL';
const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
const EDIT_USER_FAIL = 'EDIT_USER_FAIL';
const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

// initial state
const fetchState = {
  users: [],
  user_list: [],
  edit_user: [],
  error: '',
  loading: false,
  login: false
};

//action creator
const setLogin = () => {
  return (dispatch) => {
    dispatch({
      type: WELCOME_MSG,
      login: true
    })
  }
}


const setLoading = () => {
  return (dispatch) => {
    dispatch({ type: LOADING, loading: true });
  };
};

const fetchDataAsync = (input) => {
  
  return (dispatch) => {
    
    axios
      .post('https://reqres.in/api/register', input)
      .then(({ data }) => {
        dispatch({ type: FETCH_ALL, users: data })
        alert("Registeration Success....")
      })
      .catch((err) => dispatch({ type: FETCH_FAIL, error: err }));
  };
 
};

const loginUser = (input, history) => {
  
  return (dispatch) => {
    
    axios
      .post('https://reqres.in/api/login', input)
      .then(({ data }) => {
        dispatch({ type: LOGIN_SUCCESS, users: data })
        history.push('/')
      })
      .catch((err) => dispatch({ type: LOGIN_FAIL, error: err }));
  };
 
};

const listUser = () => {
  return (dispatch) => {
    axios.get('https://reqres.in/api/users').then(({data}) => {
      dispatch({ type: USER_LIST, user_list: data})
    })
    .catch((err) => dispatch({ type: LISTING_FAIl, error: err }))
  }
}

const deletedUser = (id) => {
  return (dispatch) => {
    axios.delete(`https://reqres.in/api/users/${id}`)
    .then((res) => {
      dispatch({type: USER_DELETED_SUCCESS});
     
      if(res.status === 204){

        alert("DELETED SUCCESSFULLY" +" "+id)
      }
    })
    .catch((err) => dispatch({type: USER_DELETED_FAIL, error: err}))
  }
}


const editUser = (item,history) => {
  return (dispatch) => {
    axios.get(`https://reqres.in/api/users/${item.id}`).then(({data}) => {

      dispatch({ type: EDIT_USER_SUCCESS, edit_user: data})
      history.push(`/edit/${item.id}`)
    })
    .catch((err) => dispatch({ type: EDIT_USER_FAIL, error: err }))
  }
}

const updateUser = (id) => {
  return (dispatch) => {
    axios.put(`https://reqres.in/api/users/${id}`).then(({data}) => {

      dispatch({ type: UPDATE_USER_SUCCESS, users: data})
      alert("DATA UPDATE SUCCESSFULLY.....")
    })
    .catch((err) => dispatch({ type: UPDATE_USER_FAIL, error: err }))
  }
}
// reducer

const fetchReducer = (state = fetchState, action) => {
  

  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        
      };
    case FETCH_ALL:
      return {
        ...state,
        users: action.users,
        loading: false,
      
      };
    case FETCH_FAIL:
      return { ...state, error: action.error, loading: false };

    case LOGIN_SUCCESS:
      return{
        ...state,
        users: action.users,
        loading: false,
      }
    case LOGIN_FAIL:
      return { ...state, error: action.error, loading: false };
    
    case USER_LIST:
      return {
        ...state,
        user_list: action.user_list,
        loading: false 
      }
    case EDIT_USER_SUCCESS:
      return{
        ...state,
        edit_user: action.edit_user,
        loading: false,
      }
    case EDIT_USER_FAIL:
      return { ...state, error: action.error, loading: false };
    
    case UPDATE_USER_SUCCESS:
      return{
        ...state,
        users: action.users,
        loading: false,
      }
    case UPDATE_USER_FAIL:
      return { ...state, error: action.error, loading: false };  
    default:
      return state;
  }
};

export { setLoading, fetchDataAsync, fetchReducer, loginUser, setLogin, listUser, deletedUser, editUser, updateUser};
