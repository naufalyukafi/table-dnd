import { Box, Button, ButtonGroup } from "@chakra-ui/react";

function Pagination({ totalPages, currentPage, onPageChange }) {
    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            onPageChange(pageNumber);
        }
    };

    const pageNumbers = getPageNumbers();

    return (
        <Box mt={4} display="flex" justifyContent="center">
            <ButtonGroup>
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                >
                    Previous
                </Button>
                {pageNumbers.map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        colorScheme={pageNumber === currentPage ? "teal" : "gray"}
                    >
                        {pageNumber}
                    </Button>
                ))}
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </ButtonGroup>
        </Box>
    );
}

export default Pagination;
