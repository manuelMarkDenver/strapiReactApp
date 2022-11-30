import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

// import useFetch from "../hooks/useFetch";

import {
  Typography,
  Container,
  CircularProgress,
  Card,
  CardContent,
  Stack
} from "@mui/material";

const REVIEW = gql`
query GetReview($id: ID!) {
  review(id: $id) {
    data {
      id,
      attributes {
        title,
        rating,
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
`

const ReviewDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(REVIEW, {
    variables: {
      id: id
    }
  })

  // const {
  //   loading,
  //   error,
  //   data: review,
  // } = useFetch(`http://localhost:1337/api/reviews/${id}`);

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
    <Container>
      <Card
        key={data?.review?.data?.id}
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
            {data?.review?.data?.attributes?.rating}
          </Typography>
          <Typography variant="h2">{data?.review?.data?.attributes?.title}</Typography>
          <Stack direction="row" spacing={1} mb={2.5} mt={1}>
              {data?.review?.data?.attributes?.categories?.data?.map((c) => (
                <Typography key={c.id} variant="caption">
                  {c?.attributes?.name}
                </Typography>
              ))}
            </Stack>
          <ReactMarkdown>{data?.review?.data?.attributes?.body}</ReactMarkdown>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ReviewDetails;
