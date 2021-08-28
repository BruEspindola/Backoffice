import React, {useState, useEffect} from 'react';
import api from './api';
import { logout, getToken } from './auth';
import { Route, Redirect } from 'react-router-dom';

export default function WAuth ({ component: Component, ...rest }){
    const [ redirect, setRedirect ] = useState(false);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function verify(){
            var res = await api.get('/api/user/checktoken', {params:{token:getToken()}});

            if(res.data.status === 200){
                setLoading(false);
                setRedirect(false);
            }else{
                logout();
                setLoading(false);
                setRedirect(true);
            }
        }
        verify();
    },[]);

    return(
        loading?'Carregando...' : <Route { ...rest} 
            render={props => !redirect?(
                <Component { ...props} />
            ): <Redirect to={{pathname: "/", state:{from: props.location}}}/>
            }/>
            )

}