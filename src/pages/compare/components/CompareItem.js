import React from 'react';
import BrandStore from './BrandStore';
import Store from './Store';
import Brand from './Brand';

function CompareItem({ data, ...rest }) {
  return (
    <>
      {/* {data.estimateType === 'BRAND' && <Brand data={data} {...rest} />} */}
      {/* {data.estimateType === 'STORE' && <Store data={data} {...rest} />} */}

      {data.estimateType === 'BRAND_AND_STORE' && <BrandStore data={data} {...rest} />}
    </>
  );
}

export default CompareItem;
