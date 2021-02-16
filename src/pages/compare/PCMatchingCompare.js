import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../config';
import BrandBuilding from './components/BrandBuilding';
import NothingPage from './components/NothingPage';
import { atom, useRecoilState } from 'recoil';
import Building from './components/Building';
import Brand from './components/Brand';

const Wrapper = styled.div`
    margin: 10px;
    font-size: 15px;
`;

const Container = styled.div`
    display: flex;
    input {
        width: 15px;
        height: 15px;
        margin-top: 10px;
    }
`;

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

export const compareState = atom({
    key: 'CompareButton',
    default: [],
});

const PCMatchingCompare = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalProduct, setIsModalProduct] = useState(false);
    const [data, setData] = useRecoilState(compareState);
    const [newData, setNewData] = useState();

    const handleModalProduct = () => {
        setIsModalProduct(!isModalProduct);
    };

    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((res) => {
                setData(res.data.content);
                setNewData(res.data.new_content);
            });
    }, []);

    const handleShowModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCheck = (e) => {
        const item = newData[0];
        const { checked } = e.target;
        if (checked) {
            addItem(new Date().getMilliseconds(), item);
        } else {
            console.log(item);
            removeItem(item.id);
        }
    };

    const addItem = (id, item) => {
        if (data?.length >= 5) return;
        setData((data) => [...data, { ...item, id }]);
    };

    const removeItem = (el) => {
        setData(data.filter((data) => data.id !== el));
    };

    return (
        <>
            <Container>
                <input type='checkbox' onChange={handleCheck} />
                <Wrapper>비교</Wrapper>
                <input type='checkbox' onChange={handleCheck} />
                <Wrapper>비교</Wrapper>
                <input type='checkbox' onChange={handleCheck} />
                <Wrapper>비교</Wrapper>
                <input type='checkbox' onChange={handleCheck} />
                <Wrapper>비교</Wrapper>
            </Container>
            <Toggle isModalOpen={isModalOpen}>
                <Compare onClick={() => handleModalProduct()}>
                    <span>견적 비교하기</span>
                    <PlaceNumber data={data}>({!data ? 0 : data?.length}/5)</PlaceNumber>
                    {isModalProduct ? (
                        <i className='fa fa-angle-down' aria-hidden='true'></i>
                    ) : (
                        <i className='fa fa-angle-up' aria-hidden='true'></i>
                    )}
                </Compare>
                <Line />
                {data.length !== 0 ? (
                    // <BrandBuilding isModalProduct={isModalProduct} removeItem={removeItem} />
                    // <Brand isModalProduct={isModalProduct} removeItem={removeItem} />
                    <Building isModalProduct={isModalProduct} removeItem={removeItem} />
                ) : (
                    <NothingPage isModalProduct={isModalProduct} />
                )}
            </Toggle>
        </>
    );
};

export default PCMatchingCompare;
