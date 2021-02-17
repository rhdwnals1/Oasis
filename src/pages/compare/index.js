import React from 'react';
import MobileMatchingCompare from './MobileMatchingCompare';
import PCMatchingCompare from './PCMatchingCompare';
import { isMobile } from 'react-device-detect';

function Matching({ data, removeItem }) {
    switch (isMobile) {
        case true:
            return <MobileMatchingCompare data={data} removeItem={removeItem} />;
        case false:
            return <PCMatchingCompare data={data} removeItem={removeItem} />;
        default:
            return <></>;
    }
}

export default Matching;
