import React from "react";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from "react-markdown";

import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";

// graphql query

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
        id
        attributes {
          title
          rating
          body
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const Homepage = () => {
  // const url = "http://localhost:1337/api/reviews";

  // const { loading, error, data: reviews } = useFetch(url);

  // graphql
  const { loading, error, data } = useQuery(REVIEWS);
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
    <Container sx={{ pb: 10, pl: 5, pr: 5 }}>
      {data?.reviews?.data?.map((review) => (
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
            <Stack direction="row" spacing={1} mb={2.5}>
              {review?.attributes?.categories?.data?.map((c) => (
                <Typography key={c.id} variant="caption">
                  {c?.attributes?.name}
                </Typography>
              ))}
            </Stack>
            <ReactMarkdown children={review?.attributes?.body.substring(0, 200)}/>
              
          </CardContent>
          <CardActions sx={{ pl: 8 }}>
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
