import { Box, Button, Select, Option, Stack, Typography } from "@mui/joy";

const Pagination = ({
                        currentPage,
                        totalPages,
                        handleChangePage,
                        handleChangeCount,
                        count,
                    }) => {
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                flexWrap: "wrap",
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <Button
                    size="sm"
                    variant="soft"
                    disabled={!canGoPrev}
                    onClick={() => handleChangePage(currentPage - 1)}
                >
                    Previous
                </Button>

                <Typography level="body-sm">
                    Page {currentPage} / {totalPages}
                </Typography>

                <Button
                    size="sm"
                    variant="soft"
                    disabled={!canGoNext}
                    onClick={() => handleChangePage(currentPage + 1)}
                >
                    Next
                </Button>
            </Stack>

            <Select
                size="sm"
                value={count}
                onChange={(_, value) => handleChangeCount(value)}
            >
                <Option value={10}>10 / page</Option>
                <Option value={25}>25 / page</Option>
                <Option value={50}>50 / page</Option>
            </Select>
        </Box>
    );
};

export { Pagination };