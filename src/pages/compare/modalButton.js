import React, { Fragment, useState } from 'react';
import styled, { css } from 'styled-components';
import BrandBuilding from './components/BrandBuilding';
import NothingPage from './components/NothingPage';
import { compareState } from '../compare/CompareButton';
import { useRecoilState } from 'recoil';
import Building from './components/Building';
import Brand from './components/Brand';

const Toggle = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
`;

const Compare = styled.button`
    position: relative;
    justify-content: center;
    box-sizing: border-box;
    width: 200px;
    height: 44px;
    outline-style: none;
    margin: 0 0 -1px 208px;
    border-radius: 8px;
    background-color: #212121;
    color: #ffffff;
    font-weight: 500;
    padding: 10px 48px 10px 24px;
    span {
        color: ${(props) => (props.isModalProduct ? '#ffffff' : 'ff5b29')};
        font-size: 14px;
        text-align: center;
        font-family: NotoSansKR;
        margin: 0 0 7px;
        width: 128px;
        height: 24px;
        line-height: normal;
    }
    &:hover {
        cursor: pointer;
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

const Up = css`
    content: '';
    width: 7px;
    height: 7px;
    border-top: 3px solid #fff;
    border-right: 3px solid #fff;
    display: inline-block;
    transform: rotate(315deg);
    position: absolute;
    top: 17px;
    right: 35px;
`;

const Down = css`
    content: '';
    width: 7px;
    height: 7px;
    border-top: 3px solid #fff;
    border-right: 3px solid #fff;
    display: inline-block;
    transform: rotate(135deg);
    position: absolute;
    top: 12px;
    right: 35px;
`;

const Arrow = styled.div`
    display: ${(props) => (props.isModalOpen ? `${Down}` : `${Up}`)};
`;

const ModalButton = ({ id, removeItem, isModalOpen }) => {
    const [isModalProduct, setIsModalProduct] = useState(false);
    const [data, setData] = useRecoilState(compareState);

    const handleModalProduct = () => {
        setIsModalProduct(!isModalProduct);
    };

    return (
        <Fragment>
            <Toggle isModalOpen={isModalOpen}>
                <Compare onClick={() => handleModalProduct()}>
                    <span>견적 비교하기</span>
                    <PlaceNumber data={data}>({!data ? 0 : data?.length}/5)</PlaceNumber>
                    <Arrow />
                </Compare>
                <Line />
                {data ? (
                    // <BrandBuilding isModalProduct={isModalProduct} id={id} removeItem={removeItem} />
                    // <Building isModalProduct={isModalProduct} id={id} removeItem={removeItem} />
                    <Brand isModalProduct={isModalProduct} id={id} removeItem={removeItem} />
                ) : (
                    <NothingPage isModalProduct={isModalProduct} id={id} />
                )}
            </Toggle>
        </Fragment>
    );
};

export default ModalButton;
