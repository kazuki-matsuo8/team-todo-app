import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../../api/axios";
import { Box, Button, Input, Text, VStack, Heading } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirmation) {
      setError("パスワードが一致しません");
      return;
    }

    try {
      await apiClient.post("/users", {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      navigate("/login");
    } catch (err) {
      setError(
        "登録に失敗しました。メールアドレスが既に使用されている可能性があります。"
      );
      console.error(err);
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
    >
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        アカウント新規登録
      </Heading>

      <VStack as="form" onSubmit={handleSubmit} gap={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>名前</FormLabel>
          <Input
            value={name}
            type="text"
            border="1px"
            borderStyle="solid"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            type="email"
            value={email}
            border="1px"
            borderStyle="solid"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>パスワード</FormLabel>
          <Input
            type="password"
            value={password}
            border="1px"
            borderStyle="solid"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>パスワード（確認）</FormLabel>
          <Input
            type="password"
            value={passwordConfirmation}
            border="1px"
            borderStyle="solid"
            borderColor="gray.300"
            _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          width="full"
        >
          登録
        </Button>

        <Text>
          アカウントを既にお持ちですか？{" "}
          <Link
            to="/login"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            ログイン
          </Link>
        </Text>

        {error && (
          <Text color="red.500" textAlign="center">
            {error}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default Signup;
