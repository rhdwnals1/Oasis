import React from 'react';
import styled from 'styled-components';

const EmptyContainer = styled.div`
    display: ${(props) => (props.setContent !== undefined ? 'none' : 'flex')};
    display: ${(props) => (props.isModalProduct ? 'flex' : 'none')};
    max-height: 228px;
`;

const Empty = styled.div``;

const Icon = styled.img`
    height: 100px;
    width: 100px;
    margin: 37px 669px 0 671px;
`;

const Text = styled.div`
    font-size: 14px;
    color: #212121;
    text-align: center;
    font-weight: 600;
    margin: 14px 0;
    line-height: 1.4;
`;

const NothingPage = ({ isModalProduct }) => {
    return (
        <EmptyContainer isModalProduct={isModalProduct}>
            <Empty>
                <Icon src='https://i.esdrop.com/d/7IxZWuVOo0.png' alt='empty' />
                <Text>
                    비교하고 싶은 견적 내역을 추가해주세요.
                    <br />
                    최대 5개까지 비교할 수 있습니다.
                </Text>
            </Empty>
        </EmptyContainer>
    );
};

export default NothingPage;
