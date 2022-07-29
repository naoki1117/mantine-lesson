import { ShieldCheckIcon } from "@heroicons/react/solid"
import { LogoutIcon } from "@heroicons/react/outline"
import { ActionIcon,Center,Menu } from "@mantine/core"
import { Settings } from "tabler-icons-react"
import { supabase } from "../utills/supabase"
import { Layout } from "./Layout"
import { NextLink } from "@mantine/next"

export const DashBord = () => {
    const signOut = () => {
        supabase.auth.signOut()
    }
    return (
        <Layout title="DashBoard">
            <Center>
                <ShieldCheckIcon className="mb-4 h-14 w-14 text-teal-500" />
            </Center>
            <Center>
                <Menu trigger="hover" size="xl">
                    <Menu.Label>UI Components</Menu.Label>
                    
                    <Menu.Item
                        icon={<Settings size={16} />}
                        component={NextLink}
                        href="/card"
                    >
                        PictureCard
                    </Menu.Item>
                    <Menu.Item
                        icon={<Settings size={16} />}
                        component={NextLink}
                        href="/performance"
                    >
                        Performance Indicator
                    </Menu.Item>
                    <Menu.Item
                        icon={<Settings size={16} />}
                        component={NextLink}
                        href="/table"
                    >
                        TaskTable
                    </Menu.Item>
                    <Menu.Item
                        icon={<Settings size={16} />}
                        component={NextLink}
                        href="/crypto"
                    >
                        Crypto
                    </Menu.Item>
                    <Menu.Item
                        icon={<Settings size={16} />}
                        component={NextLink}
                        href="/hooks"
                    >
                        Hooks
                    </Menu.Item>
                </Menu>
            </Center>

            <Center>
                <ActionIcon my="md" size="lg" onClick={signOut}>
                    <LogoutIcon />
                </ActionIcon>
            </Center>
        </Layout>
    )
}