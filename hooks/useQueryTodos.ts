import { useQuery } from "react-query";
import { supabase } from "../utills/supabase";
import { delay } from "../utills/delay";
import { Todo } from "../types";

export const useQueryTodos = () => {
    const getTodos = async () => {
        const {data,error} = await supabase
        .from("todos")
        .select("*")
        .order("created_at",{ascending:true})
    await delay(2000)
    if (error) {
        throw new Error(error.message)
    }
    return data

    }

    return useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: getTodos,
        staleTime:Infinity
    })
}