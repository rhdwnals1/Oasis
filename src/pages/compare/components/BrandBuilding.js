import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { compareState } from '../CompareButton';

const WrapModal = styled.div`
    display: ${(props) => (props.isModalProduct ? 'flex' : 'none')};
    justify-content: flex-start;
    margin: 0 210px;
    max-height: 457px;
    overflow: hidden;
`;

const Categories = styled.div`
    font-size: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 60px;
    text-align: left;
    padding-top: 186px;
    color: #929292;
    .category {
        padding: 9px 0;
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
    }
    .delete {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 1em;
        font-weight: bold;
        text-align: center;
        width: 22px;
        height: 20px;
        border-radius: 100%;
        padding-top: 3px;
        &:hover {
            cursor: pointer;
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
        #cost {
            color: ${(props) => (props.min ? '#005cff' : '#212121')};
        }
        #profit {
            color: ${(props) => (props.max ? '#005cff' : '#212121')};
        }
    }
`;

const BrandBuilding = ({ id, isModalProduct, removeItem }) => {
    const [content, setContent] = useRecoilState(compareState);

    const cost = content?.map((x) => x.estimatedInitialInvestmentCost);
    const min = Math.min.apply(null, cost);

    const profit = content?.map((x) => x.expectationProfit);
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
        <>
            <WrapModal isModalProduct={isModalProduct}>
                <Categories>
                    <div className='category'>예상 창업비용</div>
                    <div className='category'>예상 월 수익</div>
                    <div className='category'>보증금</div>
                    <div className='category'>권리금</div>
                    <div className='category'>면적</div>
                    <div className='category' id='last'>
                        층
                    </div>
                </Categories>
                <PlaceData>
                    {content?.map((content, idx) => {
                        return (
                            <Place
                                key={idx}
                                onClick={() => removeItem(id)}
                                max={max === content.expectationProfit}
                                min={min === content.estimatedInitialInvestmentCost}
                            >
                                <div className='placeimage'>
                                    <img src={content.src} alt='store'></img>
                                    <img className='placeLogo' src={content.logo} alt='logo'></img>
                                    <div className='delete'>X</div>
                                </div>
                                <div className='placetype'>{content.typeBusiness}</div>
                                <div className='brand'>{content.franchiseBrandName}</div>
                                <div className='address'>{content.brokerageStoreAddress}</div>
                                <div className='container'>
                                    <div className='info' id='cost'>
                                        {countNumber(content.estimatedInitialInvestmentCost)
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div>
                                    <div className='info' id='profit'>
                                        {countNumber(content.expectationProfit)
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div>
                                    <div className='info'>
                                        {countNumber(content.deposit)
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div>
                                    <div className='info'>
                                        {countNumber(content.premium)
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div>
                                    <div className='info'>
                                        {Math.floor(content.exclusiveAreaPy * 0.3025)}평 ({content.exclusiveAreaPy}
                                        ㎡)
                                    </div>
                                    <div className='info'>
                                        {content.floor}/{content.wholeOfFloor}층
                                    </div>
                                </div>
                            </Place>
                        );
                    })}
                </PlaceData>
            </WrapModal>
        </>
    );
};

export default BrandBuilding;
