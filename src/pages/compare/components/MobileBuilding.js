import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { compareState } from '../MobileMatchingCompare';
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
    font-family: NotoSansKR;
    padding-top: 2px;
`;

const Wrapper = styled.div``;

const Place = styled.div`
    position: relative;
    margin: 14px 0 0;

    .store {
        justify-content: center;
        width: 80px;
        height: 79px;
        margin-right: 14px;
    }
`;

const NameContainer = styled.div`
    display: flex;
    width: 320px;
    height: 40px;
`;

const Info = styled.div`
    .brand {
        margin-top: 4px;
        font-size: 12px;
        font-weight: bold;
        height: 14px;
    }

    .placetype {
        font-size: 10px;
        color: #212121;
        font-weight: 500;
        height: 15px;
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
    justify-content: space-start;
    margin-left: 94px;
    margin-top: 4px;
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 14px;
    font-family: NotoSansKR;

    .category {
        font-size: 10px;
        height: 15px;
        color: #9e9e9e;
        font-weight: 500;
    }
`;

const DetailInfo = styled.div`
    width: 82px;
    height: 35px;

    .info {
        font-size: 12px;
        font-weight: 500;
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
        history.push('/mobilematching');
    };

    const [data, setData] = useRecoilState(compareState);

    const cost = data?.map((x) => x.estimatedInitialInvestmentCost);
    const min = Math.min.apply(null, cost);

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

    const removeItem = (el) => {
        setData(data.filter((data) => data.id !== el));
    };

    console.log(data.length);
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
                                    <img className='store' src={data.src} alt='logo'></img>
                                    <Info>
                                        <div className='brand'>{data.brokerageStoreAddress}</div>
                                        <div className='placetype'>
                                            {Math.floor(data.exclusiveAreaPy * 0.3025)}평 ({data.exclusiveAreaPy}
                                            ㎡) | {data.floor}/{data.wholeOfFloor}층
                                        </div>
                                        <div className='background'>
                                            <i className='fas fa-times' onClick={() => removeItem(data.id)}></i>
                                        </div>
                                    </Info>
                                </NameContainer>
                                <CostContainer>
                                    <DetailInfo>
                                        <div className='category'>보증금</div>
                                        <div className='info' id='profit'>
                                            {countNumber(data.deposit)
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </div>
                                    </DetailInfo>
                                    <DetailInfo>
                                        <div className='category'>권리금</div>
                                        <div className='info' id='profit'>
                                            {data.premium === '없음'
                                                ? '없음'
                                                : countNumber(data.premium)
                                                      .toString()
                                                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </div>
                                    </DetailInfo>
                                    <DetailInfo min={min === data.estimatedInitialInvestmentCost}>
                                        <div className='category'>예상 창업비용</div>
                                        <div className='info' id='cost'>
                                            {countNumber(data.estimatedInitialInvestmentCost)
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
