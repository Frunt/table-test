import styled from "styled-components"

export const StyledTh = styled.th`
padding: 20px 15px;
text-align: left;
font-weight: 500;
color: #fff;
text-transform: uppercase;
cursor: pointer;
position: relative;

&:nth-child(1), &:nth-child(3), &:nth-child(5), &:nth-child(6) {
    width 20px;
}

@media (max-width: 850px) {
    &:nth-child(4) {
        width: 100px;
    }
}
`

export const SortingIcon = styled.img`
width: 15px;
height: 15px;
position: absolute;
bottom: -5px;
left: 15px;
`