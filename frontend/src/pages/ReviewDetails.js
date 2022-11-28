import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";

import {
  Typography,
  Container,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

const ReviewDetails = () => {
  const { id } = useParams();
  const {
    loading,
    error,
    data: review,
  } = useFetch(`http://localhost:1337/api/reviews/${id}`);
  console.log(
    "🚀 ~ file: ReviewDetails.js ~ line 11 ~ ReviewDetails ~ review",
    review
  );
  if (loading)
    return (
      <Typography>
        <CircularProgress />
      </Typography>
    );

  if (error)
    return (
      <Typography sx={{ p: 10, color: "red" }}>
        Error: {error?.message}
      </Typography>
    );

  return (
    <Container sx={{ pt: 15 }}>
      <Card
        key={review?.id}
        variant="outlined"
        sx={{ mb: 10, padding: "10px 30px", overflow: "visible" }}
      >
        <CardContent sx={{ position: "relative", pl: 8 }}>
          <Typography
            sx={{
              position: "absolute",
              top: "-50px",
              left: "-50px",
              fontSize: "3em",
              width: "90px",
              height: "90px",
              textAlign: "center",
              background: "#8e2ad6",
              color: "white",
            }}
          >
            {review?.data?.attributes?.rating}
          </Typography>
          <Typography variant="h2">{review?.data?.attributes?.title}</Typography>
          <Typography sx={{ mb: 2, mt: 2, color: "gray" }}>console.list</Typography>
          <Typography>{review?.data?.attributes?.body}...</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ReviewDetails;
