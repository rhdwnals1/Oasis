import React from 'react';
import MobileMatchingCompare from './MobileMatchingCompare';
import PCMatchingCompare from './PCMatchingCompare';
import { isMobile } from 'react-device-detect';

function Matching() {
    switch (isMobile) {
        case true:
            return <MobileMatchingCompare />;
        case false:
            return <PCMatchingCompare />;
        default:
            return <></>;
    }
}

export default Matching;
