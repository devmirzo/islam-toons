import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { supabase } from "../supabaseClient";

const PlaylistPage = () => {
  const { id } = useParams(); // ← /playlist/:id dan keladi
  const [video, setVideo] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      console.log("Received ID:", id);

      const { data: videoData, error: videoError } = await supabase
        .from("videos")
        .select("*")
        .eq("id", id)
        .single();

      if (videoError) {
        console.error("Error fetching video:", videoError.message);
        setLoading(false);
        return;
      }

      console.log("Video data:", videoData);

      const { data: episodesData, error: episodesError } = await supabase
        .from("episodes")
        .select("*")
        .eq("video_id", id)
        .order("order", { ascending: true });

      if (episodesError) {
        console.error("Error fetching episodes:", episodesError.message);
        setLoading(false);
        return;
      }

      console.log("Episodes data:", episodesData);

      setVideo(videoData);
      setEpisodes(episodesData);
      setLoading(false);
    };

    if (id) {
      fetchPlaylist();
    }
  }, [id]);

  if (loading) return <CircularProgress />;

  if (!video) return <Typography>Video topilmadi</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {video.title}
      </Typography>

      {episodes.length === 0 ? (
        <Typography>Hech qanday epizod topilmadi</Typography>
      ) : (
        episodes.map((ep) => (
          <Box key={ep.id} sx={{ mb: 4 }}>
            <Typography variant="h6">{ep.title}</Typography>
            <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={ep.url}
                title={ep.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default PlaylistPage;
