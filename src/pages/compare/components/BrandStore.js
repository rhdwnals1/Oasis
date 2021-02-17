import React from 'react';
import styled from 'styled-components';

const Place = styled.div`
    justify-content: center;
    text-align: center;
    font-size: 14px;
    height: 20px;
    font-weight: 700;

    .placeimage {
        position: relative;
        margin: 2px 2px 0;
        margin-bottom: 30px;

        img {
            width: 188px;
            height: 76px;
            border-radius: 8px;
        }

        .placeLogo {
            border-radius: 14px;
            position: absolute;
            top: 55px;
            left: 75px;
            width: 40px;
            height: 40px;
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
        height: 18px;
    }

    .address {
        margin-top: 2px;
    }

    .container {
        text-align: right;
        margin-top: 20px;
        font-weight: 500;

        .info {
            border-bottom: 1px solid #eeeeee;
            padding: 6.5px 50px 6.5px 30px;
            font-weight: 600;
        }

        .cost {
            color: ${(props) => (props.min ? '#005cff' : '#212121')};
        }

        .profit {
            color: ${(props) => (props.max ? '#005cff' : '#212121')};
        }
    }
`;

const BrandStore = ({ data, minEstimatedInitialInvestmentCost, maxExpectationProfit, removeItem }) => {
    const formatMoneyNumber = (number) => {
        if (!number) return '없음';
        return (number / 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 만원';
    };

    return (
        <Place
            min={minEstimatedInitialInvestmentCost === data.estimatedInitialInvestmentCost}
            max={maxExpectationProfit === data.expectationProfit}
        >
            <div className='placeimage'>
                <img src={data.src} alt='store'></img>
                <img className='placeLogo' src={data.logo} alt='logo'></img>
                <div className='background'>
                    <i className='fas fa-times' onClick={() => removeItem(data.id)}></i>
                </div>
            </div>
            <div className='placetype'>{data.typeBusiness}</div>
            <div className='brand'>{data.franchiseBrandName}</div>
            <div className='address'>{data.brokerageStoreAddress}</div>
            <div className='container'>
                <div className='info cost'>{formatMoneyNumber(data.estimatedInitialInvestmentCost)}</div>
                <div className='info profit'>{formatMoneyNumber(data.expectationProfit)}</div>
                <div className='info'>{formatMoneyNumber(data.deposit)}</div>
                <div className='info' id='premium'>
                    {formatMoneyNumber(data.premium)}
                </div>
                <div className='info'>
                    {Math.floor(data.exclusiveAreaPy * 0.3025)}평 ({data.exclusiveAreaPy}
                    ㎡)
                </div>
                <div className='info'>
                    {data.floor}/{data.wholeOfFloor}층
                </div>
            </div>
        </Place>
    );
};

export default BrandStore;
