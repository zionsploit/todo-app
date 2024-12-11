import { Button, Card, Input, Spinner, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Controller, useForm } from 'react-hook-form'
import useMutationLoginAccount from "@/hooks/mutation/useMutationLoginAccount";
import { accountInfoAtom, atomProvider } from "@/provider/jotaiProvider";
import { useEffect } from "react";
import useMutationSaveLocalStorageAccount from "@/hooks/mutation/useMutationSaveLocalStorageAccount";
import useQueryGetLocalStorageAccount from "@/hooks/query/useQueryGetLocalStorageAccount";

export default function Login() {
    const getAccountInfo = atomProvider.get(accountInfoAtom)
    const router = useRouter()
    const { control, handleSubmit, formState: { defaultValues } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const getSaveLoginLocalStorageMutation = useQueryGetLocalStorageAccount()

    const onLoginMutation = useMutationLoginAccount()
    const onSaveLoginLocalStorageMutation = useMutationSaveLocalStorageAccount()
    
    useEffect(() => {
        if (getAccountInfo !== null) {
            if (getAccountInfo.access_token) {
                router.push('/(main)')
            }
        }
    }, [getAccountInfo])

    useEffect(() => {
        if (getSaveLoginLocalStorageMutation.data) {
            atomProvider.set(accountInfoAtom, getSaveLoginLocalStorageMutation.data)

        }
    }, [getSaveLoginLocalStorageMutation.data])

    const OnSubmitDataHandler = async (data: typeof defaultValues) => {
        const response = await onLoginMutation.mutateAsync({
            username: data?.username ?? '',
            password: data?.password ?? '',
        })

        if (response._id) {
            onSaveLoginLocalStorageMutation.mutateAsync(response).finally(() => atomProvider.set(accountInfoAtom, response))
        }
    }

    return <>
        <View style={{ width: '100%', height: '100%' }}>
            <View style={{ padding: 10, marginTop: 100 }}>
                <Text category="h1" status="basic" style={{ textAlign: 'center' }}>TODO APP</Text>
                <Card>
                    <View style={{ gap: 10 }}>
                        <Controller
                            control={control}
                            name="username"
                            rules={{
                                required: true
                            }}
                            render={({ field: {onChange, onBlur, value} }) => (
                                <Input
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    label="Username"
                                    placeholder="Enter username"
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: true
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    secureTextEntry
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    label="Password"
                                    placeholder="Enter password"
                                />
                            )}
                        />
                        <Button accessoryLeft={() => onLoginMutation.isPending ? <Spinner size="small" status="warning" /> : <></>} onPress={handleSubmit(OnSubmitDataHandler)}>Login</Button>
                        <Button appearance="ghost" onPress={() => router.push('/register')}>Register</Button>
                    </View>
                </Card>
            </View>
        </View>
    </>
}