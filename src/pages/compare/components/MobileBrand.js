import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { compareState } from '../MobileMatchingCompare';

const BrandContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Title = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    margin-top: 18px;
    justify-content: center;
    height: 40px;
    text-align: center;
    border-bottom: 1px solid #eeeeee;

    .delete {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 10px;
        right: 24px;
    }
`;

const Compare = styled.div`
    font-size: 14px;
    color: #424242;
    font-weight: 600;
    text-align: center;
    margin: 10px auto;
`;

const Wrapper = styled.div``;

const Place = styled.div`
    margin: 20px 0 0;

    .logo {
        border-radius: 14px;
        justify-content: center;
        width: 40px;
        height: 40px;
        margin-right: 14px;
    }
`;

const NameContainer = styled.div`
    position: relative;
    display: flex;
    margin: 0 20px;
    width: 320px;
    height: 40px;
`;

const Info = styled.div`
    .brand {
        font-size: 12px;
        font-weight: bold;
        height: 18px;
    }

    .placetype {
        font-size: 10px;
        color: #9e9e9e;
    }

    .background {
        position: absolute;
        top: 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, 0.6);
        width: 16px;
        height: 16px;
        border-radius: 100%;

        .fa-times {
            color: #fff;
            font-weight: 600;
            font-size: 13px;
            padding-left: 3px;
            margin-bottom: 2px;
        }

        &:hover {
            cursor: pointer;
        }
    }
`;

const Detail = styled.div`
    display: flex;
    flex-direction: column;
`;

const CostContainer = styled.div`
    display: flex;
    margin-left: 74px;
    margin-top: 4px;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 10px;

    .category {
        font-size: 10px;
        color: #9e9e9e;
        font-weight: 500;
    }
`;

const Cost = styled.div`
    width: 133px;
    height: 35px;

    .info {
        color: #212121;
        font-size: 12px;
        font-weight: 500;
        height: 18px;
        margin-top: 2px;
    }

    #cost {
        color: ${(props) => (props.min ? '#005cff' : '#212121')};
    }
`;

const Profit = styled.div`
    width: 133px;
    height: 35px;

    .info {
        font-size: 12px;
        font-weight: 500;
        height: 18px;
        margin-top: 2px;
    }

    #profit {
        color: ${(props) => (props.min ? '#005cff' : '#212121')};
    }
`;

const MobileBrand = ({ removeItem }) => {
    const [data, setData] = useRecoilState(compareState);

    const cost = data?.map((x) => x.estimatedInitialInvestmentCost);
    const min = Math.min.apply(null, cost);

    const profit = data?.map((x) => x.expectationProfit);
    const max = Math.max.apply(null, profit);

    const countNumber = (number) => {
        var inputNumber = number < 0 ? false : number;
        var unitWords = ['', ' 만원'];
        var splitUnit = 10000;
        var splitCount = unitWords.length;
        var resultArray = [];
        var resultString = '';

        for (var i = 0; i < splitCount; i++) {
            var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
            unitResult = Math.floor(unitResult);
            if (unitResult > 0) {
                resultArray[i] = unitResult;
            }
        }

        for (var i = 0; i < resultArray.length; i++) {
            if (!resultArray[i]) continue;
            resultString = String(resultArray[i]) + unitWords[i] + resultString;
        }

        return resultString;
    };

    return (
        <BrandContainer>
            <Title>
                <Compare>견적 비교하기</Compare>
                <img className='delete' src='https://i.esdrop.com/d/FtJcG4gqX6.png' alt='delete'></img>
            </Title>
            <Wrapper>
                {data?.map((data, idx) => {
                    console.log(data.expectationProfit);
                    return (
                        <Place
                            key={idx}
                            max={max === data.expectationProfit}
                            min={min === data.estimatedInitialInvestmentCost}
                        >
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
                                    <Cost>
                                        <div className='category'>예상 창업비용</div>
                                        <div className='info' id='cost'>
                                            {countNumber(data.estimatedInitialInvestmentCost)
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </div>
                                    </Cost>
                                    <Profit>
                                        <div className='category'>예상 월 수익</div>
                                        <div className='info' id='profit'>
                                            {countNumber(data.expectationProfit)
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </div>
                                    </Profit>
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
