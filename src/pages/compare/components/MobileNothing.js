import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { compareState } from '../MobileMatchingCompare';

const NothingContainer = styled.div`
  width: 100%;
  height: 100%;
  font-family: NotoSansKR;
`;

const Content = styled.div`
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    margin: 20px auto 14px;
  }

  .text {
    font-size: 14px;
    line-height: 1.43;
    font-weight: 500;
    color: #212121;
    text-align: center;
  }
`;

const MobileNothing = () => {
  const history = useHistory();

  const goToMain = () => {
    history.push('/');
  };

  return (
    <>
      <NothingContainer>
        <Content>
          <img src='https://i.esdrop.com/d/7IxZWuVOo0.png' alt='nothing' />
          <div className='text'>
            비교하고 싶은 견적 내역을 추가해주세요. <br /> 최대 5개까지 비교할 수 있습니다.
          </div>
        </Content>
      </NothingContainer>
    </>
  );
};

export default MobileNothing;
