import React from 'react';
import styled from 'styled-components';
import { compareState } from '../CompareButton';
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
    padding-top: 133px;
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
    }
`;

const Brand = ({ id, isModalProduct, removeItem }) => {
    const [content, setContent] = useRecoilState(compareState);

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
        <>
            <WrapModal isModalProduct={isModalProduct}>
                <Categories>
                    <div className='category'>예상 창업비용</div>
                    <div className='category' id='last'>
                        예상 월 수익
                    </div>
                </Categories>
                <PlaceData>
                    {content?.map((content, idx) => {
                        return (
                            <Place key={idx} onClick={() => removeItem(id)}>
                                <div className='logoContainer'>
                                    <img className='placeLogo' src={content.logo} alt='logo'></img>
                                    <div className='delete'>
                                        <span id='cross'>X</span>
                                    </div>
                                </div>
                                <div className='placetype'>{content.typeBusiness}</div>
                                <div className='brand'>{content.franchiseBrandName}</div>
                                <div className='container'>
                                    <div className='info'>
                                        {countNumber(content.estimatedInitialInvestmentCost)
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div>
                                    <div className='info'>
                                        {countNumber(content.expectationProfit)
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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

export default Brand;
