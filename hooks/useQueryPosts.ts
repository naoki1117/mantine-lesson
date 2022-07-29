import { useQuery } from "react-query"
import { supabase } from "../utills/supabase"
import { Post } from "../types"

export const useQueryPosts = () => {
    const getPosts = async () => {
        const {data,error} = await supabase
            .from("posts")
            .select("*")
            .order("created_at",{ascending:true})
        if (error) {
            throw new Error(error.message)
        }
        return data
    }

    return useQuery<Post[]>({
        queryKey:["posts"],
        queryFn: getPosts

    })
}

