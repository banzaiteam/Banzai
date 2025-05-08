import React, {type ComponentPropsWithoutRef} from 'react';

type Props = ComponentPropsWithoutRef<'input'>

export const Input = (props:Props) => {
    return (
        <input>
            input
        </input>
    );
};

