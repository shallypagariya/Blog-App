
// import { Button ,Table,TableBody,TableCell, TableHead, TableRow,styled} from "@mui/material";
// import { categories } from "../../constants/data";


// const styledTable=styled(Table)`
//     border:1px solid rbga(224 224 224 1);        
// `
// const styledButton=styled(Button)`
//         margin:20px;
//         width :85%;  
//         backgroud :#6495ED;  
//         color :#fff;    
// `
// const Categories =()=>{
//     return(
//         <>
//         <styledButton variant='contained'>Create Blog</styledButton>
//         <styledTable>
//             <TableHead>
//                 <TableRow>
//                     <TableCell>All Categoires</TableCell>
//                 </TableRow>
//             </TableHead>
//             <TableBody>
// {
//                 categories.map(category=>{
//                     <TableRow key={category.id}>
//                         <TableCell>
//                             {category.type}
//                         </TableCell>
//                     </TableRow>

//                 })
// }
//             </TableBody>
//         </styledTable>
//         </>
//     )
// }
// export default Categories;
import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material";
import { Link,useSearchParams } from "react-router-dom";
import { categories } from "../../constants/data";


const StyledTable = styled(Table)`
    border: 1px solid rgba(224, 224, 224, 1);        
`;

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;  
    background: #6495ED;  
    color: #fff;    
`;
const StyledLink=styled(Link)`
    text-decoration :none;
    color:inherit;
`

const Categories = () => {
    const[searchParams]=useSearchParams();
    const category=searchParams.get('category');


    return (
        <>
                <StyledLink to={`/create?category=${category || ''}`} >
            <StyledButton variant='contained'>Create Blog</StyledButton>
            </StyledLink>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <StyledLink to='/'>
                            All Categories
                            </StyledLink>
                            </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                    {category.type}
                                    </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    );
}

export default Categories;

