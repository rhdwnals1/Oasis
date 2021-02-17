// import React, { Fragment, useState, useEffect } from 'react';
// import styled from 'styled-components';
// import ModalButton from '../compare/modalButton';
// import { API } from '../config';
// import { atom, useRecoilState } from 'recoil';

// const Wrapper = styled.div`
//     margin: 10px;
//     font-size: 15px;
// `;

// const Container = styled.div`
//     display: flex;
//     input {
//         width: 15px;
//         height: 15px;
//         margin-top: 10px;
//     }
// `;

// export const compareState = atom({
//     key: 'CompareButton',
//     default: [],
// });

// const CompareButton = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isModalProduct, setIsModalProduct] = useState(false);
//     const [data, setData] = useRecoilState(compareState);

//     useEffect(() => {
//         fetch(API)
//             .then((res) => res.json())
//             .then((res) => setData(res.data.content));
//     }, []);

//     const handleShowModal = () => {
//         setIsModalOpen(!isModalOpen);
//     };

//     const handleModalProduct = () => {
//         setIsModalProduct(!isModalProduct);
//     };

//     const handleCheck = (e) => {
//         const item = data[0];
//         const { checked } = e.target;
//         if (checked) {
//             addItem(new Date().getMilliseconds(), item);
//         } else {
//             console.log(item);
//             removeItem(item.id);
//         }
//     };

//     const addItem = (id, item) => {
//         setData((data) => [...data, { ...item, id }]);
//     };

//     const removeItem = (el) => {
//         setData(data.filter((data) => data.id !== el));
//     };

//     return (
//         <Fragment>
//             <Container>
//                 <input type='checkbox' onChange={handleCheck} />
//                 <Wrapper>비교</Wrapper>
//                 <input type='checkbox' onChange={handleCheck} />
//                 <Wrapper>비교</Wrapper>
//             </Container>
//             <ModalButton
//                 handleCheck={handleCheck}
//                 handleAddItem={addItem}
//                 isModalProduct={isModalProduct}
//                 removeItem={removeItem}
//                 data={data}
//                 isModalOpen={isModalOpen}
//                 handleshowModal={handleShowModal}
//                 handleModalProduct={handleModalProduct}
//             />
//         </Fragment>
//     );
// };

// export default CompareButton;
