import { useReducer,useEffect ,useState} from "react";
import { apiGet } from "./config";

function  showsReducer(prevstate,action)
{
    switch(action.type)
    {
        case 'ADD':
            {
                return [...prevstate,action.showId];
            }
        case 'REMOVE':
            {
                return prevstate.filter(showId=>showId!==action.showId)
            }
        default:
            return prevstate;
    }
}
function usePersistedReducer(reducer,initialState,key) {
    const [state,dispatch]=useReducer(reducer,initialState,(initial)=>{
        const persisted = localStorage.getItem(key);
        return persisted?JSON.parse(persisted):initial;
        // we use this call back function as initialiser instead of simply initialising the state before the use os usereducer, because then state would be re-initialised evrytime the component is re-rendered
        // using the initialiser call back function (called doing lazy evaluation) helps avoid re-initialisations
        // parse converts string to object , localstorage has all strings
    });

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(state));
    },[state,key]);

    return [state,dispatch];
}

// usePersistedReducer(reducer,it)
export function useShows(key='shows')
{
    return usePersistedReducer(showsReducer,[],key);
}

export function useLastQuery(key='lastQuery'){
    const [input, setInput]=useState(()=>{
        const persisted = sessionStorage.getItem(key);
        return persisted?JSON.parse(persisted):"";
    });
    const setPersistedInput= (newState)=>{
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));

    }
    return [input, setPersistedInput];
}


const reducer = (prevstate,action)=>{
    switch(action.type)
    {
        case 'FETCH_SUCCESS':{return {...prevstate,isLoading:false, show: action.show,error:null}}
        // things written after ...prevstate will be overwritten in the prevstate because key names are same
        case 'FETCH_FAILED':{return {...prevstate, isLoading:false, error: action.error}}
        default: return prevstate
    }
}


export function useShow(showId)
{
       const [state,dispatch]=useReducer(reducer, {
        show:null,
        isLoading: true,
        error: null
    });


    useEffect(()=>{
        let isMounted =true;

        apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`).then(results=>{
            // setTimeout(() => {
                if (isMounted)
                {
                    dispatch({type:'FETCH_SUCCESS',show:results})
                    // setShow(results);
                    // setIsLoading(false);
                }
                
            // }, 2000);
        }).catch((err)=>{
            if (isMounted)
            {
                dispatch({type:'FETCH_FAILED',show:err.message})
                // setError(err.message);
                // setIsLoading(false);
            }
            
        });
        return (()=>{isMounted=false;});
    },[showId]); 
    return state;
}

