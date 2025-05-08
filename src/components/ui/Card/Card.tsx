import { IonCard } from "@ionic/react";
import styled from "styled-components";

export default function Card({ props, children }: any) {
  const StyledCard = styled(IonCard)`
    
  `;

  return <StyledCard className="!m-4 !flex !w-fit !border-1 !border-gray-200 !shadow-sm !rounded-sm"
  >{children}</StyledCard>;
}
