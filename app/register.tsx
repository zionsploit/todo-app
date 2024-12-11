import useMutationCreateAccount from "@/hooks/mutation/useMutationCreateAccount"
import { User } from "@/server/schema/user.schema"
import { Button, Card, Input, Spinner, Text } from "@ui-kitten/components"
import { useRouter } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import Toast from "react-native-toast-message"

export default () => {
    const router = useRouter()
    const { control, handleSubmit, } = useForm<User>({
        defaultValues: {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
        }
    })

    const onAddUserMutation = useMutationCreateAccount()

    const OnClickSubmit = async (data: User) => {
        const response = await onAddUserMutation.mutateAsync(data)

        if (response) {
            Toast.show({
                type: 'success',
                text1: 'Account Created!',
                text2: 'You can now login your account'
            })
        }
    }
    
    return <>
        <View style={{ padding: 10, marginTop: 100 }}>
            <Card>
                <View>
                    <Text category="h1" style={{ textAlign: 'center', marginVertical: 10 }}>CREATE ACCOUNT</Text>
                </View>
                <View style={{ gap: 10 }}>
                    <Controller
                        control={control}
                        name="firstName"
                        rules={{
                            required: true
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                size="small"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}  
                                placeholder="First Name"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="lastName"
                        rules={{
                            required: true
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                size="small"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}  
                                placeholder="Last Name"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="username"
                        rules={{
                            required: true
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                size="small"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}  
                                placeholder="Username"
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
                                size="small"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}  
                                secureTextEntry
                                placeholder="Password"
                            />
                        )}
                    />
                </View>
            </Card>
            <View style={{ marginVertical: 10, gap: 10 }}>
                <Button disabled={onAddUserMutation.isPending} accessoryLeft={() => onAddUserMutation.isPending ? <Spinner size="tiny" /> : <></>} appearance="outline" size="small" onPress={handleSubmit(OnClickSubmit)}>Register</Button>
                <Button status="danger" appearance="outline" size="small" onPress={() => router.back()}>Go Back</Button>
            </View>
        </View>
    </>
}