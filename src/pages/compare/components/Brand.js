import React from 'react';
import styled from 'styled-components';

const Place = styled.div`
  position: relative;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  height: 20px;
  width: 192px;
  font-weight: 700;

  .logoContainer {
    position: relative;

    .placeLogo {
      border-radius: 14px;
      justify-content: center;
      width: 40px;
      height: 40px;
      margin: 20px 0 0;
    }

    .background {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.6);
      width: 20px;
      height: 20px;
      border-radius: 100%;

      .fa-times {
        color: #fff;
        font-weight: 600;
        margin-top: 3px;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  .placetype {
    font-size: 12px;
    font-weight: 500;
    margin-top: 10px;
    height: 18px;
    text-align: center;
  }

  .brand {
    height: 20px;
  }

  .container {
    text-align: right;
    margin-top: 14px;
    font-weight: 500;

    .info {
      border-bottom: 1px solid #eeeeee;
      padding: 6.5px 50px 6.5px 30px;
      font-weight: 600;
      color: #212121;
    }

    #cost {
      color: ${(props) => (props.min ? '#005cff' : '#212121')};
    }

    #profit {
      color: ${(props) => (props.max ? '#005cf이런거f' : '#212121')};
    }
  }
`;

const Brand = ({ data, minEstimatedInitialInvestmentCost, maxExpectationProfit, removeItem }) => {
  const formatMoneyNumber = (number) => {
    if (!number) return '없음';
    return (number / 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 만원';
  };

  return (
    <Place
      min={minEstimatedInitialInvestmentCost === data.estimatedInitialInvestmentCost}
      max={maxExpectationProfit === data.expectationProfit}
    >
      <div className='logoContainer'>
        <img className='placeLogo' src={data.logo} alt='logo'></img>
        <div className='background'>
          <i className='fas fa-times' onClick={() => removeItem(data.id)}></i>
        </div>
      </div>
      <div className='placetype'>{data.typeBusiness}</div>
      <div className='brand'>{data.franchiseBrandName}</div>
      <div className='container'>
        <div className='info' id='cost'>
          {formatMoneyNumber(data.estimatedInitialInvestmentCost)}
        </div>
        <div className='info' id='profit'>
          {formatMoneyNumber(data.expectationProfit)}
        </div>
      </div>
    </Place>
  );
};

export default Brand;
