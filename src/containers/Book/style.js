import styled from 'styled-components';

const Wrapper = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Block = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  border: 1px solid #d4d4d4;
  margin: 20px;
  padding: 10px;
`;

const Book = styled('img')`
  height: 85px;
`;

const Code = styled('div')``;

const Scan = styled('div')`
  margin-top: 10px;
  background: #728e7b;
  color: white;
  padding: 5px 10px;
`;

const Info = styled('div')`
  margin-top: 10px;
`;
export { Wrapper, Block, Book, Code, Scan, Info };
