import {Box, Button, Select, Option} from "@mui/joy";

const Pagination = ({currentPage, totalPages, handleChangePage, handleChangeCount, count}) => {
    return (
        <Box>
            <Button onClick={() => handleChangePage(currentPage-1)}>Previous</Button>
            {currentPage}/{totalPages}
            <Button onClick={() => handleChangePage(currentPage+1)}>Next</Button>
            <Select value={count} onChange={handleChangeCount}>
                <Option value={10}>10 per page</Option>
                <Option value={25}>25 per page</Option>
                <Option value={50}>50 per page</Option>
            </Select>
        </Box>
    )
}

export {Pagination}