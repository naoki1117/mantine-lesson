import Link from "next/link"
import { Group,Avatar,Button } from "@mantine/core"
import {
    showNotification,
    cleanNotificationsQueue,
    cleanNotifications,
    updateNotification
}
from "@mantine/notifications"
import { ReplyIcon } from "@heroicons/react/solid"
import { Check,X } from "tabler-icons-react"
import { supabase } from "../utills/supabase"
import { delay } from "../utills/delay"
import { Layout } from "../components/Layout"
import { setTimeout } from "timers"

const NotificationDemo = () => {
  return (
    <Layout title="Notification">
        <Group direction="column" position="center">
            <Button
                onClick={() =>
                    showNotification({
                        title: "Default notification",
                        message:"Hey there!",
                        autoClose:false,
                    }) 
                
                }
                >
                    show notification 1
            </Button>
            <Button
                onClick={() =>
                    showNotification({
                        title: "PR approved",
                        message:"Your PR approved and merged",
                        icon:<Check size={18} />,
                        color:"teal",
                        autoClose:false,
                    }) 
                
                }
                >
                    show notification 2
            </Button>
            <Button
                onClick={() =>
                    showNotification({
                        title: "Automatic test failed",
                        message:"Test failed...",
                        icon:<X size={18} />,
                        color:"red",
                        autoClose:false,
                    }) 
                
                }
                >
                    show notification 3
            </Button>
            <Button
                onClick={() =>{
                    showNotification({
                        id: "load-data",
                        loading:true,
                        title:"roading your data",
                        message:"Data will be loaded in 3 seconds,you can close this yet",
                        autoClose:false,
                    })
                    
                    setTimeout(() => {
                        updateNotification({
                            id:"load-data",
                            color:"teal",
                            title:"data was loaded",
                            message:
                            "Notification will close in 2seconds, you can close this notification now.",
                            icon:<Check />,
                            autoClose:2000,
                        })
                
                    },3000)
                }}
                >
                    show notification 4
            </Button>
            <Button
                onClick={async() =>{
                    showNotification({
                        id: "load-profile",
                        loading:true,
                        title:"roading your profile",
                        message:"Please wait for a while",
                        autoClose:false,
                        disallowClose:true,
                    })
                    const {data,error,status} = await supabase
                        .from("profiles")
                        .select("avatar_url")
                        .eq("id",supabase.auth.user()?.id)
                        .single()
                    await delay(2000)
                    if (error && status !== 406) {
                        throw new Error(error.message)
                    }
                    if (data) {
                        updateNotification({
                            id:"load-profile",
                            color:"teal",
                            title:"Your profile was loaded",
                            message:
                                "Notification will close in 2 seconds, you can close this notification now",
                            icon: (
                                <Avatar 
                                    src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/${data.avatar_url}`}
                                />
                            )
                        })
                    }
                    
                    
                    }}
                >
                    show notification 5
            </Button>
            <Button color="gray" onClick={cleanNotificationsQueue}>
                Clean queue
            </Button>
            <Button color="yellow" onClick = {cleanNotifications} >
                Clean all
            </Button>
            <Link href="/">
                <ReplyIcon className='mt-4 h-6 cursor-pointer text-gray-300' />
            </Link>
            
        </Group>     
    </Layout>
  )
}

export default NotificationDemo