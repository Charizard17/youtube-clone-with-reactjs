import {useState, useEffect} from "react"
import {Box, Stack, Typography} from "@mui/material"
import {Sidebar, Videos} from "./"

import {fetchFromAPI} from "../utils/fetchFromAPI.js"

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New")
  const [videos, setVideos] = useState([])

  useEffect(() => {
    setVideos([])
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
      setVideos(data.items)
    )
  }, [selectedCategory])

  return (
    <Stack sx={{flexDirection: {sx: "column", md: "row"}}}>
      <Box
        sx={{
          height: {sx: "auto", md: "92vh"},
          borderRight: "1px solid #3d3d3d",
          px: {sx: 0, md: 2},
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{mt: 1.5, color: "#F7F7F8"}}
        >
          Copyright 2023 YouTubeV2
        </Typography>
      </Box>
      <Box p={2} sx={{overflowY: "auto", height: "90vh", flex: 2}}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{color: "#F7F7F8"}}
        >
          {selectedCategory} <span style={{color: "#C82586"}}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  )
}

export default Feed
