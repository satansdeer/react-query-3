import { Flex } from "rebass/styled-components";
import { Container } from "../shared";
import { useQuery } from "react-query";
import { getAllBooks } from "../api";
import { BookItem } from "./BookItem";
import Loader from "react-loader-spinner";

export const BooksList = () => {
  const { data, error, isLoading, isError } = useQuery("books", getAllBooks);

  if (isLoading) {
    return (
      <Container>
        <Flex py="5" justifyContent="center">
          <Loader type="ThreeDots" color="#cccccc" height={30} />;
        </Flex>
      </Container>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Container>
      <Flex flexDirection="column" alignItems="center">
        {data.map(({ author, title, id }) => (
          <BookItem author={author} title={title} key={id} id={id} />
        ))}
      </Flex>
    </Container>
  );
};
