import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { compareState } from '../MobileMatchingCompare';
import Building from './Building';
import CompareItem from './CompareItem';

const WrapModal = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 auto;
  max-height: 457px;
  overflow: hidden;
  background-color: skyblue;
`;

const Categories = styled.div`
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 60px;
  text-align: left;
  padding-top: 123px;
  color: #929292;

  .category {
    padding: 8.5px 0;
    border-bottom: 1px solid #eeeeee;
  }

  #last {
    margin-bottom: 40px;
  }
`;

const PlaceData = styled.div`
  display: flex;
`;

function ItemWrapper({ removeItem }) {
  const data = useRecoilValue(compareState);

  const estimatedInitialInvestmentCosts = data.map((x) => x.estimatedInitialInvestmentCost);
  const minEstimatedInitialInvestmentCost = Math.min(...estimatedInitialInvestmentCosts);

  return (
    <>
      <WrapModal>
        <Categories>
          <div className='category'>예상 창업비용</div>
          <div className='category'>보증금</div>
          <div className='category'>권리금</div>
          <div className='category'>면적</div>
          <div className='category' id='last'>
            층
          </div>
        </Categories>
        <PlaceData>
          {data.map((item, index) => (
            <CompareItem
              data={item}
              key={index}
              removeItem={removeItem}
              minEstimatedInitialInvestmentCost={minEstimatedInitialInvestmentCost}
            />
          ))}
        </PlaceData>
      </WrapModal>
    </>
  );
}

export default ItemWrapper;
