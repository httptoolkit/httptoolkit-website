import React from 'react';
import styled from 'styled-components';

export default styled.section`
  display: flex;

  height: 360px;
  width: 100%;
  padding: 60px;
  margin: 60px 0;

  background-color: ${p => p.theme.popColor};
  color: ${p => p.theme.popColor};
  font-size: ${p => p.theme.textSize};
  
  border-radius: 4px;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2);
`;