import { BookForm, Container } from "../shared";
import { Box, Heading } from "rebass/styled-components";
import { createBook } from "../api"
import { useMutation } from "react-query"
import { useHistory } from "react-router-dom"

export const CreateBook = () => {
  const history = useHistory()
  const { mutateAsync, isLoading } = useMutation(createBook)

  const onFormSubmit = async (data) => {
    await mutateAsync({...data})
    history.push("/")
  }
  return (
    <Container>
      <Box
        sx={{
          py: 3,
        }}
      >
        <Heading sx={{ marginBottom: 3 }}>Create New Book</Heading>
        <BookForm onFormSubmit={onFormSubmit} isLoading={isLoading}/>
      </Box>
    </Container>
  );
};
