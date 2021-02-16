import React from 'react';
import styled from 'styled-components';
import { compareState } from '../PCMatchingCompare';
import { useRecoilState } from 'recoil';

const WrapModal = styled.div`
    display: ${(props) => (props.isModalProduct ? 'flex' : 'none')};
    justify-content: flex-start;
    margin: 0 210px;
    max-height: 228px;
    overflow: hidden;
`;

const Categories = styled.div`
    display: flex;
    font-size: 10px;
    flex-direction: column;
    justify-content: flex-end;
    width: 60px;
    text-align: left;
    padding-top: 125px;
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
            color: ${(props) => (props.max ? '#005cff' : '#212121')};
        }
    }
`;

const Brand = ({ isModalProduct, removeItem }) => {
    const [data, setData] = useRecoilState(compareState);

    const cost = data?.map((x) => x.estimatedInitialInvestmentCost);
    const min = Math.min.apply(null, cost);

    const profit = data?.map((x) => x.expectationProfit);
    const max = Math.max.apply(null, profit);

    const countNumber = (number) => {
        var inputNumber = number < 0 ? false : number;
        var unitWords = ['', '만원'];
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
        <WrapModal isModalProduct={isModalProduct}>
            <Categories>
                <div className='category'>예상 창업비용</div>
                <div className='category' id='last'>
                    예상 월 수익
                </div>
            </Categories>
            <PlaceData>
                {data?.map((data, idx) => {
                    return (
                        <Place
                            key={idx}
                            min={min === data.estimatedInitialInvestmentCost}
                            max={max === data.expectationProfit}
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
                                    {countNumber(data.estimatedInitialInvestmentCost)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </div>
                                <div className='info' id='profit'>
                                    {countNumber(data.expectationProfit)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </div>
                            </div>
                        </Place>
                    );
                })}
            </PlaceData>
        </WrapModal>
    );
};

export default Brand;
