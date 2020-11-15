import styled from 'styled-components';

const Wrapper = styled('section')`
  position: relative;
`;

const Barcode = styled('div')`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: #ffffff;
  box-shadow: 0 0 10px 0px gainsboro;
  padding: 10px 20px;
`;

const Input = styled('input')`
  display: flex;
  justify-content: center;
  color: var(--gray-800-color);
  background: var(--gray-100-color);
  outline: none;
  outline-offset: none;
  flex: 1;
  font-size: 24px;
  line-height: 1.5;
  display: flex;
  overflow: hidden;
  padding: 12px;
  padding-bottom: 10px;
  -webkit-appearance: none;
  height: 48px;
  width: 100%;
  border-radius: 5px;
  border: none;

  &::-webkit-input-placeholder,
  &::placeholder {
    color: #d4d4d4;
    opacity: 1;
    -webkit-opacity: 1;
  }

  &:disabled {
    -webkit-opacity: 1;
    opacity: 1;
  }
`;

export { Wrapper, Barcode, Input };
