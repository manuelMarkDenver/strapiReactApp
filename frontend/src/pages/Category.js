import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Divider
} from "@mui/material";

const CATEGORY = gql`
  query GetCategories($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          reviews {
            data {
              id
              attributes {
                title
                body
                rating
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
      }
    }
  }
`;

const Category = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id },
  });
  if (error)
    return (
      <Typography sx={{ p: 10, color: "red" }}>
        Error: {error?.message}
      </Typography>
    );

  return (
    <Container sx={{ pb: 10, pl: 5, pr: 5 }}>
      <Typography variant="h2" sx={{ mb: 8 }}>
        {data?.category?.data?.attributes?.name}
      </Typography>
      {data?.category?.data?.attributes?.reviews?.data?.map((review) => (
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
            <Stack
              direction="row"
              spacing={1}
              mb={2.5}
            >
              {review?.attributes?.categories?.data?.map((c) => (
                <Typography key={c.id} variant="caption">
                  {c?.attributes?.name}
                </Typography>
              ))}
            </Stack>
            <Typography>
              {review?.attributes?.body.substring(0, 200)}...
            </Typography>
          </CardContent>
          <CardActions sx={{ pl: 12 }}>
            <Button>
              <Link to={`/details/${review.id}`}>Read More</Link>
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default Category;
