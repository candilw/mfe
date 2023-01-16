import { mount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

//comments
export default () => {
    const ref = useRef(null);

    //Runs anytime this component is updated or changed, we can limit how many
    //times this is called by passing in a dependency array, empty array is only when its
    //first rendered on the screen
    useEffect(() => {
        mount(ref.current);
    }, []);

return <div ref={ref}/>
};