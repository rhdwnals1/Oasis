import React from 'react';
import BrandBuilding from './BrandBuilding';
import Building from './Building';

function CompareItem({ data, ...rest }) {
  console.log(data);
  return (
    <>
      {/* {data.estimateType==='BRAND_AND_STORE' && <BrandBuilding data={data}/>} */}
      {data.estimateType === 'BRAND_AND_STORE' && <Building data={data} {...rest} />}
    </>
  );
}

export default CompareItem;
