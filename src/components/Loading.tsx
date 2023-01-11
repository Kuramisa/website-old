import styled from "styled-components";

import { Spinner } from "@blueprintjs/core";

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Loading = () => {
    return (
        <StyledSpinner>
            <Spinner intent="warning" />
        </StyledSpinner>
    );
};

export default Loading;