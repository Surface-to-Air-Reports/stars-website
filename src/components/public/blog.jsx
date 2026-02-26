import React, {useEffect, useState} from 'react';
import {Box, Card, Stack, Typography} from "@mui/joy";

async function loadData() {
    const response = await fetch("/cdn/blog.json");
    const data = await response.json();
    console.log(data);
    return data;
}

const Page = () => {
    const [blogData, setBlogData] = useState({});
    // loadData().then(data => setBlogData(data));

    useEffect(() => {
        loadData().then(setBlogData);
    }, [])

    return (
        <Box>
            <Typography level={"h1"}>Blog</Typography>
            <Box sx={{padding: "2rem", display: "flex", flexDirection: 'column', alignItems: 'center'}}>
                <Stack direction="column" spacing={2} sx={{maxWidth: "1000px"}}>
                    {blogData && blogData["posts"] && blogData["posts"].length > 0 && blogData["posts"].map((post) => (
                        <Card>
                            <Typography level="h1">{post["title"]}</Typography>
                            <Typography level="h2">{post["subtitle"]}</Typography>
                            <Typography level="body-lg">By: Viki, and Henwy ⚪️{post["date"]}</Typography>
                            <Stack spacing={1}>
                                {post["copy"].map((line) => (
                                    <Typography level="body-md">{line}</Typography>
                                ))}
                            </Stack>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Box>
    )
}

export default Page;