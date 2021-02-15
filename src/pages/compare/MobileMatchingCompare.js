import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../config';
import NothingPage from './components/NothingPage';
import { atom, useRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import MobileBrand from './components/MobileBrand';

//체크박스
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

const Compare = styled.button`
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 153px;
    height: 44px;
    bottom: 0;
    outline-style: none;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.1);
    margin: 4px 104px 40px;
    border-radius: 26px;
    background-color: #424242;
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
`;

const PlaceNumber = styled.span`
    color: ${(props) => (!props.data ? 'white' : '#ff5b29')};
`;

export const compareState = atom({
    key: 'CompareButton',
    default: [],
});

const MobileMatchingCompare = () => {
    const history = useHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalProduct, setIsModalProduct] = useState(false);
    const [data, setData] = useRecoilState(compareState);
    const [newData, setNewData] = useState();

    console.log(data);
    const goToDetail = () => {
        history.push('/MobileBrand');
    };

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
            </Container>
            <Compare onClick={goToDetail}>
                <span>견적 비교하기</span>
                <PlaceNumber data={data}>({!data ? 0 : data?.length}/5)</PlaceNumber>
            </Compare>
        </>
    );
};

export default MobileMatchingCompare;
