import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const MatchingContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Compare = styled.button`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  width: 153px;
  height: 44px;
  bottom: 0;
  outline-style: none;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.1);
  margin: 4px 104px 40px;
  border-radius: 26px;
  background-color: #424242;
  color: #ffffff;
  font-weight: 500;
  border: 0;
  outline: 0;

  span {
    color: ${(props) => (props.isModalProduct ? '#ffffff' : 'ff5b29')};
    font-size: 14px;
    text-align: center;
    font-family: NotoSansKR;
    line-height: normal;
    margin-right: 2px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const PlaceNumber = styled.span`
  color: ${(props) => (!props.data ? 'white' : '#ff5b29')};
`;

const MobileMatchingCompare = ({ data, removeItem }) => {
  const history = useHistory();

  const estimatedInitialInvestmentCosts = data.map((x) => x.estimatedInitialInvestmentCost);
  const minEstimatedInitialInvestmentCost = Math.min(...estimatedInitialInvestmentCosts);

  const expectationProfits = data.map((x) => x.expectationProfit);
  const maxExpectationProfit = Math.max.apply(null, expectationProfits);

  const goToDetail = () => {
    history.push('/mobilebrand');
    // history.push('/mobilebuilding');
    // history.push('/mobilebrandbuilding');
  };

  return (
    <MatchingContainer>
      <Compare
        onClick={goToDetail}
        removeItem={removeItem}
        minEstimatedInitialInvestmentCost={minEstimatedInitialInvestmentCost}
        maxExpectationProfit={maxExpectationProfit}
      >
        <span>견적 비교하기</span>
        <PlaceNumber data={data}>({!data ? 0 : data?.length}/5)</PlaceNumber>
      </Compare>
    </MatchingContainer>
  );
};

export default MobileMatchingCompare;
