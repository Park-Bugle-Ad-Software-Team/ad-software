import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



export default function PricingPage() {
    const store = useSelector(store => store);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({
            type: 'FETCH_RATES_TO_EDIT'
        })
    }, [])

    return (
        <h1>Pricing</h1>
    )
}