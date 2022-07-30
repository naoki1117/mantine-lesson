import create from "zustand"
import { EditedTodo } from "./types/index"


type State= {
    editedTodo:EditedTodo
    updateEditedTodo:(Payload:EditedTodo) => void
    resetEditedTodo:() => void
}

const useStore = create<State>((set) => ({
    editedTodo:{id:0,title:""},
    updateEditedTodo:(Payload) => 
        set({
            editedTodo:{
                id:Payload.id,
                title:Payload.title,
            },
        }),
    resetEditedTodo:() => set({ editedTodo: {id:0,title:""}}),
    

}))

export default useStore
