import styled from "styled-components"

export const StyledTd = styled.td`
padding: 15px;
text-align: left;
vertical-align:middle;
color: #fff;
border-bottom: solid 1px rgba(255,255,255,0.5);

&:nth-child(1), &:nth-child(3), &:nth-child(5), &:nth-child(6) {
    width 20px;
}

@media (max-width: 850px) {
    &:nth-child(4) {
        width: 100px;
    }
}
`
export const Icon = styled.img`
width: 15px;
height: 15px;
cursor: pointer;
`

export const TextInput = styled.input`
width: 100%;
height: 33px;
border: 0;
border-radius: 0;
padding: 5px 15px;

&.invalid {
    border: 1px solid purple;
}

&::placeholder {
    font-size: 16px
}
`

export const AgeInput = styled.input`
width: 60px;
height: 33px;
border: 0;
border-radius: 0;
padding: 3px;

&.invalid {
    border: 1px solid purple;
}

&::placeholder {
    font-size: 16px
}
`