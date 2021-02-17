import React, { useState } from 'react';
import styled from 'styled-components';
import NothingPage from './components/NothingPage';
import ItemWrapper from './components/ItemWrapper';

const Toggle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
`;

const Compare = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 200px;
    height: 44px;
    outline-style: none;
    margin: 0 0 -1px 208px;
    border-radius: 8px 8px 0 0;
    background-color: #212121;
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

    .fa-angle-up {
        font-size: 22px;
        margin-left: 6px;
    }

    .fa-angle-down {
        font-size: 22px;
        margin-left: 6px;
    }
`;

const PlaceNumber = styled.span`
    color: ${(props) => (!props.data ? 'white' : '#ff5b29')};
`;

const Line = styled.div`
    width: 100%;
    height: 2px;
    background-color: #212121;
`;

const PCMatchingCompare = ({ data, removeItem }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Toggle>
                <Compare onClick={() => setIsModalOpen(!isModalOpen)}>
                    <span>견적 비교하기</span>
                    <PlaceNumber data={data}>({!data ? 0 : data?.length}/5)</PlaceNumber>
                    {isModalOpen ? (
                        <i className='fa fa-angle-down' aria-hidden='true'></i>
                    ) : (
                        <i className='fa fa-angle-up' aria-hidden='true'></i>
                    )}
                </Compare>
                {isModalOpen && (
                    <>
                        <Line />
                        {data.length !== 0 ? (
                            <ItemWrapper removeItem={removeItem} />
                        ) : (
                            <NothingPage isModalProduct={isModalOpen} />
                        )}
                    </>
                )}
            </Toggle>
        </>
    );
};

export default PCMatchingCompare;
