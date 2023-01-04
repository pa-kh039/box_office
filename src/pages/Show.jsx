import React , {useEffect, useReducer} from 'react';
import {useParams} from 'react-router-dom';
import { apiGet } from '../misc/config';

const reducer = (prevstate,action)=>{
    switch(action.type)
    {
        case 'FETCH_SUCCESS':{return {...prevstate,isLoading:false, show: action.show,error:null}}
        // things written after ...prevstate will be overwritten in the prevstate because key names are same
        case 'FETCH_FAILED':{return {...prevstate, isLoading:false, error: action.error}}
        default: return prevstate
    }
}

const initialState = {
    show:null,
    isLoading: true,
    error: null
}



const Show = () => {
    const {id} = useParams();
    const [{show,isLoading,error},dispatch]=useReducer(reducer, initialState);
    // console.log('state',state);
    // const [{show,isLoading,error},dispatch]=useReducer(reducer, initialState);
    // const [show, setShow]=useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError]=useState(null);

    useEffect(()=>{
        let isMounted =true;

        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results=>{
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
    },[id]);
    console.log("show",show);
    if (isLoading){
        return (<div>Data is being loaded.</div>);
    }
    if (error){
        return (<div>Error occurred: {error}</div>)
    }
    return (<div>Show page</div>);
};

export default Show;