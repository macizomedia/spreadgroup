import {
    Stack,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Input,
    Button,
    Text,
} from '@chakra-ui/react';
import { AiFillUnlock, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import React, { ReactElement, useState } from 'react';
import { Dispatcher } from '../auth-types';

export type PasswordInputProps = {
    value: string;
    placeholder: string;
    setValue: Dispatcher<string>;
    error: string;
};
export function PasswordInput({
    value,
    setValue,
    placeholder,
    error,
}: PasswordInputProps): ReactElement {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <Stack>
            <InputGroup>
                <InputLeftElement color="gray.400">
                    <AiFillUnlock />
                </InputLeftElement>
                <Input
                    pr="4.5rem"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    isInvalid={!!error}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Text color="red.500" fontSize="sm">
                {error}
            </Text>
        </Stack>
    );
}
