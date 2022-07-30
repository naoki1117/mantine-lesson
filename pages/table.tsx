import Link from "next/link"
import { Table,Container,Loader,Center,TextInput } from "@mantine/core"
import { PencilAltIcon, ReplyIcon } from "@heroicons/react/solid"
import { Layout } from "../components/Layout"
import { useQueryTodos } from "../hooks/useQueryTodos"
import useStore from "../store"
import { useMutateTodo } from "../hooks/useMutateTodo"
import { FormEvent } from "react"
import { supabase } from "../utills/supabase"

const TableDemo = () => {
    const {deleteTodoMutation} = useMutateTodo()
    const {editedTodo} =useStore()
    const update = useStore((state) => state.updateEditedTodo)
    const {createTodoMutation,updateTodoMutation} =useMutateTodo()
    const submitHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(editedTodo.id === 0)
            createTodoMutation.mutate({
                title:editedTodo.title,
                user_id:supabase.auth.user()?.id,
            })
        else {
            updateTodoMutation.mutate({
                id:editedTodo.id,
                title:editedTodo.title,
            })
        }
        
    }
    const {data,status} = useQueryTodos()
    const rows =data?.map((element) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.title}</td>
            <td>{element.created_at}</td>
        </tr>
    ))
    if (status === "loading")
        return (
            <Layout title="table">
                <Center>
                    <Loader color="blue" size="lg" />
                </Center>
            </Layout>
        )
  return (
    <Layout title="Table">
        <Center>
            <form onSubmit={submitHandler} >
                <input
                    type="text"
                    className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500"
                    placeholder="New Task"
                    value={editedTodo.title}
                    onChange={(e) => update({...editedTodo,title:e.target.value})}
                />
                <button className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                    {editedTodo.id ? "update" : "create"}
                </button>
            </form>
        </Center>
        <Container>
            <Table
                striped
                highlightOnHover
                horizontalSpacing="lg"
                verticalSpacing="sm"
                captionSide="bottom"
            >
                <caption>Todo Items from Supabase</caption>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>

            </Table>
        </Container>
        <Center>
            <Link href="/">
                <ReplyIcon className='mt-4 h-6 cursor-pointer text-gray-300' />
            </Link>
        </Center>
    </Layout>
  )
}

export default TableDemo
