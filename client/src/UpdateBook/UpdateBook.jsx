import { BookForm, Container } from "../shared";
import { useQuery, useMutation } from "react-query";
import { Box, Heading, Flex } from "rebass/styled-components";
import { getBook, updateBook } from "../api";
import { useParams, useHistory } from "react-router-dom"
import Loader from "react-loader-spinner"

export const UpdateBook = () => {
  const { id } = useParams()
  const history = useHistory()
  const { data, error, isLoading, isError } = useQuery(["book", { id }], getBook);
  const { mutateAsync, isLoading: isMutating } = useMutation(updateBook)

  const onFormSubmit = async (data) => {
    await mutateAsync({...data, id})
    history.push("/")
  }

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
    return (
      <Container>
        <Flex py="5" justifyContent="center">
          Error: {error.message}
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          py: 3,
        }}
      >
        <Heading sx={{ marginBottom: 3 }}>Update Book</Heading>
        <BookForm defaultValues={data} onFormSubmit={onFormSubmit} isLoading={isMutating}/>
      </Box>
    </Container>
  );
};
