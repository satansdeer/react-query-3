import {
  Flex,
  Text,
  Box,
  Link as StyledLink,
  Image,
} from "rebass/styled-components";
import { Link } from "react-router-dom";
import { Container } from "./Container"
import logo from "./logo.svg";

export const NavBar = () => {
  return (
    <Flex bg="black" color="white" justifyContent="center">
      <Container>
        <Flex px={2} width="100%" alignItems="center">
          <Image size={20} src={logo} />
          <Link component={StyledLink} variant="nav" to="/">
            React Query CRUD
          </Link>
          <Box mx="auto" />
          <Link component={StyledLink} variant="nav" to="/create-book">
            + Add new book
          </Link>
        </Flex>
      </Container>
    </Flex>
  );
};
