import { mount } from 'marketing/MarketingApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//comments
export default () => {
    const ref = useRef(null);
    const history = useHistory();

    //Runs anytime this component is updated or changed, we can limit how many
    //times this is called by passing in a dependency array, empty array is only when its
    //first rendered on the screen
    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            //This gets called from the child app when the history/navigation changes
            onNavigate: ({ pathname: nextPathname }) => {
                // we don't want an infinite loop so check to make sure its changed
                const { pathname } = history.location;
                if (pathname !== nextPathname) {
                    //now update the browserhistory for the container so the url changes
                    history.push(nextPathname);
                    // console.log(nextPathname)
                }
            },
        });

        history.listen(onParentNavigate);
    }, []);

return <div ref={ref} />;
};