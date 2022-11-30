import { useState } from "react";
import { Link as NavLink } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

import { styled } from "@mui/material/styles";

const drawerWidth = 240;
const navItems = [
  <NavLink to="/" style={{ textDecoration: "none" }}>
    <Typography sx={{ color: { xs: "violet", md: "#fff" } }}>
      Ninja Reviews
    </Typography>
  </NavLink>,
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const SiteHeader = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { loading, error, data } = useQuery(CATEGORIES);
 
  if (error)
    return (
      <Typography sx={{ p: 10, color: "red" }}>
        Error: {error?.message}
      </Typography>
    );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        React Strapi App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar component="nav" position="sticky">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              React Strapi App
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item, index) => (
                <Button key={index} sx={{ color: "#8e2ad6" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <Container sx={{ mt: 5, mb: 5 }}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h2" sx={{ color: "#8E2AD6", fontSize: "3em" }}>
            Ninja Reviews
          </Typography>
        </NavLink>
        <Divider variant="fullWidth" sx={{ color: "#8E2AD6" }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={3}
            mt={2}
          >
            <Typography>Filter reviews by category:</Typography>
            {data?.categories?.data.map((category) => (
              <NavLink
                key={category.id}
                to={`/category/${category.id}`}
                style={{ textDecorationColor: "purple", textDecorationThickness: "3px" }}
              >
                {category?.attributes?.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
};

SiteHeader.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SiteHeader;
