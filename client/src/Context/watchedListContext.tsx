import axios from "axios";
import { createContext,useEffect,useReducer } from "react";
import { useCookies } from "react-cookie";



const initialState : {
  watchedList : any
} = {
    watchedList : []
};
  
export const WatchedListContext = createContext(initialState);

const WatchedListReducer = (state : any, action: { type: string; payload: any; }) => {
    switch (action.type) {
      case "FETCH_WATCHEDLIST":
        console.log(action.payload);
           return {
                watchedList : action.payload
            }
      case "ADD_TO_WATCHEDLIST":
        return {
          watchedList : []
        };
      case "REMOVE_FROM_WATCHEDLIST":
        return {
            watchedList : []
        };
      default:
        return state;
    }
  };

export const WatchedListContextProvider = ({children } : any) => {
 const [cookie , setCookie , removeCookie] = useCookies(['accestoken']);
 const [state , dispatch] = useReducer(WatchedListReducer,initialState);
 useEffect(() => {
    axios.get('http://localhost:8888/movie' , 
     {headers: { token : cookie?.accestoken }}
   ).then(res => {
     dispatch({type:'FETCH_WATCHEDLIST' , payload:res.data});
    }).catch(err => {
     console.log(err)
    });
 },[]);
    const value= {
        watchedList : state.watchedList,
        dispatch
    }  

    return  <WatchedListContext.Provider value={value}>
              {children}
            </WatchedListContext.Provider>
}