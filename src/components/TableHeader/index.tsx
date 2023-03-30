import { IUser } from "../TableRow/types";
import arrowAsc from "../../img/arrow_asc.png";
import arrowDesc from "../../img/arrow_desc.png";
import { SortingIcon, StyledTh } from "./styles";
import { ITableHeader } from "./types";

export const TableHeader = ({changeSortHandler, isSortedAsc, sortingKey}: ITableHeader) => {
    const renderSortingIcon = (key: keyof IUser) => {
        return sortingKey === key && <SortingIcon src={!isSortedAsc ? arrowAsc : arrowDesc} alt="sorting" />
    }
    return (
        <thead>
            <tr>
                <StyledTh onClick={() => changeSortHandler('id')}>Id {renderSortingIcon('id')}</StyledTh>
                <StyledTh onClick={() => changeSortHandler('name')}>Name {renderSortingIcon('name')}</StyledTh>
                <StyledTh onClick={() => changeSortHandler('age')}>Age {renderSortingIcon('age')}</StyledTh>
                <StyledTh onClick={() => changeSortHandler('about_person')}>About {renderSortingIcon('about_person')}</StyledTh>
                <StyledTh/>
                <StyledTh/>
            </tr>
        </thead>
    );
}