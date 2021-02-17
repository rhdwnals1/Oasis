import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../config';
import { atom, useRecoilState } from 'recoil';
import Index from './index';

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
export const compareState = atom({
    key: 'CompareButton',
    default: [],
});

function Main() {
    const [data, setData] = useRecoilState(compareState);
    const [newData, setNewData] = useState();

    useEffect(() => {
        fetch(API)
            .then((res) => res.json())
            .then((res) => {
                setData(res.data.content);
                setNewData(res.data.new_content);
            });
    }, []);

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
            <h2>견적내역 페이지</h2>
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
            <Index data={data} removeItem={removeItem} />
        </>
    );
}

export default Main;
