import useMutationAddTodo from "@/hooks/mutation/useMutationAddTodo"
import useMutationDeleteTodo from "@/hooks/mutation/useMutationDeleteTodo"
import useMutationLogout from "@/hooks/mutation/useMutationLogout"
import useMutationUpdateTodoStatus from "@/hooks/mutation/useMutationUpdateTodoStatus"
import useMutationUpdateTodoTitle from "@/hooks/mutation/useMutationUpdateTodoTitle"
import useQueryGetTodoList from "@/hooks/query/useQueryGetTodoList"
import { accountInfoAtom, atomProvider } from "@/provider/jotaiProvider"
import { DeleteTodoDto, UpdateTodoStatusDto } from "@/server/dto/todoDto"
import { TodoDocument } from "@/server/schema/todo.schema"
import { Button, Card, CheckBox, Input, List, ListItem, Modal, Spinner, Text } from "@ui-kitten/components"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import Toast from "react-native-toast-message"

export default function Main() {
    const [modalOpened, setModalOpened] = useState<boolean>(false)
    const [updateTodo, setUpdateTodo] = useState<{
        _id: any,
        todoTitle: string
    } | any >()
    const getUserInfo = atomProvider.get(accountInfoAtom)
    const router = useRouter()
    const [todoList, setTodoList] = useState<TodoDocument[]>([])
    const { control, handleSubmit, formState: { defaultValues }, setValue } = useForm({
        defaultValues: {
            todoTitle: ''
        }
    })

    const getTodoList = useQueryGetTodoList({userId: getUserInfo?._id})

    const onAddTodoMutate = useMutationAddTodo()
    const updateTodoStatusMutate = useMutationUpdateTodoStatus()
    const deleteTodoMutate = useMutationDeleteTodo()
    const updateTodoTitleMutate = useMutationUpdateTodoTitle()

    const logoutAppMutate = useMutationLogout()

    useEffect(() => {
        if (getTodoList.data) {
            setTodoList(getTodoList.data)
        }
    }, [getTodoList.data])

    const OnHandlerClickAddTodo = async (data: typeof defaultValues) => {
       if (getUserInfo !== null) {
        onAddTodoMutate.mutateAsync({
            isComplete: false,
            todoTitle: data?.todoTitle ?? '',
            userId: getUserInfo._id
        }).finally(() => {
            Toast.show({
                type: 'success',
                text1: 'New Todo Add!',
                text2: data?.todoTitle
            })
        })
        setValue("todoTitle", "")
       }
    }

    const OnHandlerUpdateTodoStatus = async (data: UpdateTodoStatusDto) => {
        updateTodoStatusMutate.mutateAsync(data).finally(() => {
            Toast.show({
                type: 'success',
                text1: 'Status Update',
                text2: `ID ${data._id} is updated to ${data.isComplete}`
            })
        })
    }

    const OnHandlerUpdateTodoTitle = async () => {
        updateTodoTitleMutate.mutateAsync({
            _id: updateTodo._id,
            todoTitle: updateTodo.todoTitle
        }).finally(() => {
            Toast.show({
                type: 'success',
                text1: 'Update Todo',
                text2: `Update Todo Succesfully`
            })
        })
        setUpdateTodo({})
        setModalOpened(false)
    }

    const OnHandlerDeleteTodo = async (data: DeleteTodoDto) => {
        deleteTodoMutate.mutateAsync(data).finally(() => {
            Toast.show({
                type: 'success',
                text1: 'Delete Toto',
                text2: `ID ${data._id} is Delete`
            })
        })
    }

    const OnLogoutApp = async () => {
        await logoutAppMutate.mutateAsync()
        atomProvider.set(accountInfoAtom, null)
        router.back()
    }

    return <>
        <View style={{ padding: 5 }}>
            <Card appearance="outline" status="primary">
                <Text category="h6">{`Welcome!, ${getUserInfo?.firstName} ${getUserInfo?.lastName}`}</Text>
                <Button status="danger" style={{ width: 75 }} size="small" onPress={OnLogoutApp}>Logout</Button>
            </Card>
        </View>
        <View style={{ width: '100%', height: '100%', padding: 10 }}>
            <View style={{ marginBottom: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text category="h3" style={{ width: '40%' }}>TODO APP</Text>
            </View>
            <View style={{ gap: 20 }}>
                <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Controller
                        control={control}
                        name="todoTitle"
                        rules={{
                            required: true
                        }}
                        render={({ field: { onBlur, onChange, value } }) => 
                            <Input 
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                style={{ width: '80%' }} 
                                placeholder="Add Todo"
                            />
                        }
                    />
                    <Button size="small" onPress={handleSubmit(OnHandlerClickAddTodo)}>
                        {onAddTodoMutate.isPending ? '.....' : 'Add'}
                    </Button>
                </View>
                <View>
                    {getTodoList.isLoading ? 
                        <View style={{ marginTop: 100 ,display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Spinner />
                        </View> 
                        :
                        <List
                            data={todoList}
                            renderItem={(data) => 
                                <ListItem 
                                    key={data.index} 
                                    title={data.item.todoTitle} 
                                    description={data.item.isComplete ? 'Complete' : 'Not-Complete'}
                                    accessoryRight={() => <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                                        <Button status="warning" size="tiny" onPress={() => {
                                            setModalOpened(true)
                                            // setUpdateTodo(data.item)
                                            setUpdateTodo({
                                                _id: data.item._id,
                                                todoTitle: data.item.todoTitle
                                            })
                                        }}>Edit</Button>
                                        <Button status="danger" size="tiny" onPress={() => OnHandlerDeleteTodo({
                                            _id: data.item._id
                                        })}>
                                            Delete
                                        </Button>
                                    </View>}
                                    accessoryLeft={() => <CheckBox onChange={() => OnHandlerUpdateTodoStatus({
                                        _id: data.item._id,
                                        isComplete: !data.item.isComplete
                                    })} checked={data.item.isComplete} />}

                                />
                            }
                        />
                    }
                </View>
            </View>
        </View>


        <Modal 
            style={{ width: '80%' }}
            visible={modalOpened}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setModalOpened(false)}
            animationType="fade"
        >
            <Card>
                <View style={{ gap: 5 }}>
                    <Input
                        value={updateTodo?.todoTitle}
                        onChangeText={(event) => setUpdateTodo({...updateTodo, todoTitle: event})}
                    />
                    <Button size="small" onPress={OnHandlerUpdateTodoTitle}>
                        {updateTodoTitleMutate.isPending ? '.....' : 'Update Todo'}
                    </Button>
                </View>
            </Card>
        </Modal>
    </>
}

const styles = StyleSheet.create({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  });