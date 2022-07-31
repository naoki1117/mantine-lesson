import { FC } from "react"
import {Card,Image,Text,Badge,Button,Group } from "@mantine/core"
import { supabase } from "../utills/supabase";
import { useHover } from "@mantine/hooks"


type Props = {
    title: string
    content:string
    status:string
    postUrl:string
}


export const CustomCard:FC<Props> = ({title,content,status,postUrl}) => {

  const pictureDelete = async (id:number) => {
    const { data,error } = await supabase.from("posts").delete().eq(id,"id")
    if(error) throw new Error(error.message)
    return data
  }
  const {hovered, ref:refHover} = useHover()


  return (

    <Card shadow="md" >
      <Card.Section>
        <Image 
            src={postUrl}
            height={160}
            alt="with default placeholder"
            withPlaceholder

        />            
      </Card.Section>
      <Group position="apart" my="md">
        <Text weight={800}>{title}</Text>
        <Badge color="pink" radius="lg" variant="filled">
            {status}
        </Badge>
      </Group>
      <Text size="sm">{content}</Text>
      <Button mt="md" size="xs" variant="light" color="indigo" fullWidth onClick={()=>pictureDelete} >
        subscribe
      </Button>
    </Card>
  )
}
