import React from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";

import useFetch from "../hooks/useFetch";

const Homepage = () => {
  const url = "http://localhost:1337/api/reviews";

  const { loading, error, data: reviews } = useFetch(url);
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
    <Container sx={{ pt: 10, pb: 10, pl: 5, pr: 5 }}>
      {reviews?.data?.map((review) => (
        <Card
          key={review.id}
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
              {review?.attributes?.rating}
            </Typography>
            <Typography variant="h2">{review?.attributes?.title}</Typography>
            <Typography>console.list</Typography>
            <Typography>
              {review?.attributes?.body.substring(0, 200)}...
            </Typography>
          </CardContent>
          <CardActions sx={{ pl: 12 }}>
            <Button>
              <Link to={`details/${review.id}`}>Read More</Link>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default Homepage;
