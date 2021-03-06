import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { compareState } from '../Main';
import MobileNothing from './MobileNothing';

const BrandContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  margin-top: 19px;
  margin-bottom: 20px;
  justify-content: center;
  height: 40px;
  text-align: center;
  border-bottom: 1px solid #eeeeee;

  .delete {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 25px;
    right: 18px;
  }
`;

const Compare = styled.div`
  font-size: 14px;
  color: #424242;
  font-weight: 500;
  text-align: center;
  margin: 10px auto 9px;
  padding-top: 3px;
`;

const Wrapper = styled.div``;

const Place = styled.div`
  position: relative;
  margin: 14px 0 0;

  .logo {
    border-radius: 14px;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 14px;
  }
`;

const NameContainer = styled.div`
  display: flex;
  margin: 0 20px;
  width: 320px;
  height: 40px;
  padding-top: 2px;
`;

const Info = styled.div`
  .brand {
    font-size: 12px;
    font-weight: bold;
    height: 18px;
    padding-top: 2px;
  }

  .placetype {
    height: 15px;
    font-size: 10px;
    font-weight: 500;
    color: #9e9e9e;
  }

  .background {
    position: absolute;
    top: 0px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    width: 16px;
    height: 16px;
    border-radius: 100%;

    .fa-times {
      position: absolute;
      color: #fff;
      font-weight: 600;
      font-size: 12px;
      top: 2px;
      left: 3.75px;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CostContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 74px;
  margin-top: 4px;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 8px;
  font-family: NotoSansKR;

  .category {
    font-size: 10px;
    height: 15px;
    color: #9e9e9e;
    font-weight: 500;
  }
`;

const DetailInfo = styled.div`
  width: 133px;
  height: 35px;

  .info {
    font-size: 12px;
    font-weight: 600;
    height: 18px;
    margin-top: 2px;
  }

  #cost {
    color: ${(props) => (props.min ? '#005cff' : '#212121')};
  }

  #profit {
    color: ${(props) => (props.max ? '#005cff' : '#212121')};
  }
`;

const MobileBrand = () => {
  const history = useHistory();

  const goToMain = () => {
    history.push('/');
  };

  const [data, setData] = useRecoilState(compareState);

  const cost = data?.map((x) => x.estimatedInitialInvestmentCost);
  const min = Math.min.apply(null, cost);

  const profit = data?.map((x) => x.expectationProfit);
  const max = Math.max.apply(null, profit);

  const removeItem = (el) => {
    setData(data.filter((data) => data.id !== el));
  };

  const formatMoneyNumber = (number) => {
    if (!number) return '없음';
    return (number / 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 만원';
  };

  return (
    <BrandContainer>
      <Title>
        <Compare>견적 비교하기</Compare>
        <img
          className='delete'
          src='https://i.esdrop.com/d/FtJcG4gqX6.png'
          alt='delete'
          onClick={() => goToMain()}
        ></img>
      </Title>
      <Wrapper>
        {data?.length === 0 && <MobileNothing />}
        {data?.map((data, idx) => {
          return (
            <Place key={idx}>
              <Detail>
                <NameContainer>
                  <img className='logo' src={data.logo} alt='logo'></img>
                  <Info>
                    <div className='brand'>{data.franchiseBrandName}</div>
                    <div className='placetype'>{data.typeBusiness}</div>
                    <div className='background'>
                      <i className='fas fa-times' onClick={() => removeItem(data.id)}></i>
                    </div>
                  </Info>
                </NameContainer>
                <CostContainer>
                  <DetailInfo min={min === data.estimatedInitialInvestmentCost}>
                    <div className='category'>예상 창업비용</div>
                    <div className='info' id='cost'>
                      {formatMoneyNumber(data.estimatedInitialInvestmentCost)}
                    </div>
                  </DetailInfo>
                  <DetailInfo max={max === data.expectationProfit}>
                    <div className='category'>예상 월 수익</div>
                    <div className='info' id='profit'>
                      {formatMoneyNumber(data.expectationProfit)}
                    </div>
                  </DetailInfo>
                </CostContainer>
              </Detail>
            </Place>
          );
        })}
      </Wrapper>
    </BrandContainer>
  );
};

export default MobileBrand;
