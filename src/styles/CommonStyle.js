import { css } from 'styled-components';
import { generateMedia } from 'styled-media-query';

export const commonContainer = css``;

export const media = generateMedia({
    mobile: '360px',
    tablet: '768px',
    pc: '1024px',
});
