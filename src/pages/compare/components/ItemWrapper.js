import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { compareState } from '../Main';
import CompareItem from '../components/CompareItem';

const WrapModal = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0 auto 0 208px;
  overflow: hidden;
  background-color: ffffff;
`;

const Categories = styled.div`
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 60px;
  text-align: left;
  color: #929292;

  .category {
    padding: 8.5px 0;
    border-bottom: 1px solid #eeeeee;
  }

  .last {
    margin-bottom: 40px;
  }

  .brandStore {
    padding-top: 179px;
    max-height: 457px;
  }

  .brand {
    padding-top: 125px;
    max-height: 228px;
  }

  .store {
    padding-top: 123px;
    max-height: 333px;
  }
`;

const PlaceData = styled.div`
  display: flex;
`;

function ItemWrapper({ removeItem }) {
  const data = useRecoilValue(compareState);

  const estimatedInitialInvestmentCosts = data.map((x) => x.estimatedInitialInvestmentCost);
  const minEstimatedInitialInvestmentCost = Math.min(...estimatedInitialInvestmentCosts);

  const expectationProfits = data.map((x) => x.expectationProfit);
  const maxExpectationProfit = Math.max.apply(null, expectationProfits);

  return (
    <>
      <WrapModal>
        <PlaceData>
          <Categories data={data}>
            {data?.[0].estimateType === 'BRAND_AND_STORE' && (
              <div className='brandStore'>
                <div className='category'>예상 창업비용</div>
                <div className='category'>예상 월 수익</div>
                <div className='category'>보증금</div>
                <div className='category'>권리금</div>
                <div className='category'>면적</div>
                <div className='category last'>층</div>
              </div>
            )}
            {data?.[0].estimateType === 'BRAND' && (
              <div className='brand'>
                <div className='category'>예상 창업비용</div>
                <div className='category last'>예상 월 수익</div>
              </div>
            )}
            {data?.[0].estimateType === 'STORE' && (
              <div className='store'>
                <div className='category'>예상 창업비용</div>
                <div className='category'>보증금</div>
                <div className='category'>권리금</div>
                <div className='category'>면적</div>
                <div className='category last'>층</div>
              </div>
            )}
          </Categories>
          {data.map((item, index) => (
            <CompareItem
              data={item}
              key={index}
              removeItem={removeItem}
              minEstimatedInitialInvestmentCost={minEstimatedInitialInvestmentCost}
              maxExpectationProfit={maxExpectationProfit}
            />
          ))}
        </PlaceData>
      </WrapModal>
    </>
  );
}

export default ItemWrapper;
