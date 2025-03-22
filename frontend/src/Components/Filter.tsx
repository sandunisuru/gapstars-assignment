import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";
import React from "react";

type FilterProps = {
    direction: string | "asc" | "desc";
    sortBy: string | "status" | "priority";
    setSortBy: (sortBy: string) => void;
    setDirection: (direction: string) => void;
}

const Filter: React.FC<FilterProps> = ({ direction, sortBy, setSortBy, setDirection }: FilterProps) => {

    const onChangeSortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortBy(event.target.value);
    }

    const onChangeDirection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDirection(event.target.value);
    }

    return (
        <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
            <Stack direction="row" spacing={2}>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Sort by</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={onChangeSortBy}
                        value={sortBy}
                    >
                        <FormControlLabel value="status" control={<Radio />} label="Status" />
                        <FormControlLabel value="priority" control={<Radio />} label="Priority" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Direction</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={onChangeDirection}
                        value={direction}
                    >
                        <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
                        <FormControlLabel value="desc" control={<Radio />} label="Descending" />
                    </RadioGroup>
                </FormControl>
            </Stack>
        </Box>
    );
}

export default Filter;