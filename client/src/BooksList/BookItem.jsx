import { Flex, Text, Button, Link as StyledLink } from "rebass/styled-components";
import { Link } from "react-router-dom"
import { useMutation, useQueryClient } from "react-query";
import { removeBook } from "../api";
import Loader from "react-loader-spinner"

export const BookItem = ({id, title, author }) => {
  const queryClient = useQueryClient()
  const { mutateAsync, isLoading } = useMutation(removeBook)

  const remove = async () => {
    await mutateAsync(id)
    queryClient.invalidateQueries('books')
  }

  return (
    <Flex key={id} p={3} width="100%" alignItems="center">
      <Link component={StyledLink} to={`/update-book/${id}`} mr="auto">{title}</Link>
      <Text>{author}</Text>
      <Button onClick={remove} ml="5">
        { isLoading ? <Loader type="ThreeDots" color="#fff" height={10} /> : "Remove" }
      </Button>
    </Flex>
  );
};
