import { useState,useEffect } from "react"
import Link from "next/link"
import {
  Center,
  Container,
  Grid,
  RingProgress,
  Text,
  Slider,
  Space,
  Timeline,
}
from "@mantine/core"
import { ReplyIcon } from "@heroicons/react/outline"
import {
  GitBranch,
  GitPullRequest,
  GitCommit,
  MessageDots
}
from "tabler-icons-react"
import { supabase } from "../utills/supabase"
import { useQueryPerformance } from "../hooks/useQueryPerformance"
import { Layout } from "../components/Layout"

const Performance = () => {
  const {data} = useQueryPerformance()
  const [efficiency,setEfficiency] =useState<number | undefined >(0)
  const [level,setLevel] =useState<number | undefined >(0)
  const [durability,setDurability] =useState<number | undefined >(0)
  const [comfort,setComfort] =useState<number | undefined >(0)
  const [luck,setLuck] =useState<number | undefined >(0)
  useEffect(() => {
    setEfficiency(data?.efficiency)
    setLevel(data?.level)
    setDurability(data?.durability)
    setComfort(data?.comfort)
    setLuck(data?.luck)
  },[data])
  const updateHandler = async (value:number,key:string) => {
    await supabase
      .from("performances")
      .update({[key]:value})
      .eq("user_id",supabase.auth.user()?.id)
  }
  
  
  return (
    <Layout title="Performance">
      <Container>
       {data && (
        <Timeline
          active={data.level -1 }
          bulletSize={24}
          lineWidth={2}
        >
          <Timeline.Item title="level 1" bullet={<GitBranch size={12} />}>
            <Text color="dimmed" size="sm" >
              <Text 
                variant="link"
                size="sm"
                component="a"
                target="_brank"
                href="https://reactjs.org/docs/hooks-intro.html"
              >
                React Hooks
              </Text>{" "}
              understand the basic usage of React Hooks
            </Text>
          </Timeline.Item>
          <Timeline.Item bullet={<GitBranch size={12} />} title="level 2">
            <Text color="dimmed" size="sm" >
              <Text 
                variant="link"
                size="sm"
                component="a"
                target="_brank"
                href="https://redux-toolkit.org/"
              >
                Redux Toolkit
              </Text>{" "}
              understand the client state management with RTk
            </Text>
          </Timeline.Item>
          <Timeline.Item bullet={<GitPullRequest size={12} />} title="level 3" lineVariant="dashed">
            <Text color="dimmed" size="sm" >
              <Text 
                variant="link"
                size="sm"
                component="a"
                target="_brank"
                href="https://react-query.tanstack.com/"
              >
                React-Query
              </Text>{" "}
              understand the server data state management with react-query
            </Text>
          </Timeline.Item>
          <Timeline.Item bullet={<GitPullRequest size={12} />} title="level 4">
            <Text color="dimmed" size="sm" >
              <Text 
                variant="link"
                size="sm"
                component="a"
                target="_brank"
                href="https://testing-library.com/docs/react-tasting-library/intro/"
              >
                Integration + E2E test
              </Text>{" "}
              able to write the test code
            </Text>
          </Timeline.Item>
        </Timeline>
       )} 
      </Container>
      <Space h="xl"/>
      {data && (
        <Grid>
          <Grid.Col md={6} lg={3}>
            <Center>
              <Text color="gray">Efficiency</Text>
            </Center>
            <Center>
              <RingProgress 
                size={140}
                thickness={14}
                sections={[{value:data.efficiency,color:"indigo"}]}
                label={
                  <Text color="blue" weight="bold" align="center" size="xl">
                    {data.efficiency}%
                  </Text>
                }
              />
            </Center>
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
            <Center>
              <Text color="gray">Comfort</Text>
            </Center>
            <Center>
              <RingProgress 
                size={140}
                thickness={14}
                sections={[{value:data.comfort,color:"pink"}]}
                label={
                  <Text color="blue" weight={700} align="center" size="xl">
                    {data.comfort}%
                  </Text>
                }
              />
            </Center>
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
            <Center>
              <Text color="gray">Durability</Text>
            </Center>
            <Center>
              <RingProgress 
                size={140}
                thickness={14}
                sections={[{value:data.durability,color:"cyan"}]}
                label={
                  <Text color="blue" weight={700} align="center" size="xl">
                    {data.durability}%
                  </Text>
                }
              />
            </Center>
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
            <Center>
              <Text color="gray">Luck</Text>
            </Center>
            <Center>
              <RingProgress 
                size={140}
                thickness={14}
                sections={[{value:data.luck,color:"orange"}]}
                label={
                  <Text color="blue" weight={700} align="center" size="xl">
                    {data.luck}%
                  </Text>
                }
              />
            </Center>
          </Grid.Col>
        
        </Grid>)}
        {data && (
          <Container>
            <Slider
              className={"my-10 w-96"}
              value={level}
              onChange={setLevel}
              onChangeEnd={(value) => {
                updateHandler(value,"level")
              }}
              color="blue"
              min={1}
              max={4}
              step={1}
              marks={[
                {value: 1, label:"1"},
                {value: 2, label:"2"},
                {value: 3, label:"3"},
                {value: 4, label:"4"},

              ]}
            />
            <Slider
              className={"my-10 w-96"}
              value={efficiency}
              onChange={setEfficiency}
              onChangeEnd={(value) => {
                updateHandler(value,"efficiency")
              }}
              color="indigo"
              step={1}
              marks={[
                {value: 20, label:"20%"},
                {value: 50, label:"50%"},
                {value: 80, label:"80%"},
               

              ]}
            />
            <Slider
              className={"my-10 w-96"}
              value={comfort}
              onChange={setComfort}
              onChangeEnd={(value) => {
                updateHandler(value,"comfort")
              }}
              color="indigo"
              step={1}
              marks={[
                {value: 20, label:"20%"},
                {value: 50, label:"50%"},
                {value: 80, label:"80%"},
               

              ]}
            />
            <Slider
              className={"my-10 w-96"}
              value={durability}
              onChange={setDurability}
              onChangeEnd={(value) => {
                updateHandler(value,"durability")
              }}
              color="indigo"
              step={1}
              marks={[
                {value: 20, label:"20%"},
                {value: 50, label:"50%"},
                {value: 80, label:"80%"},
               

              ]}
            />
            <Slider
              className={"my-10 w-96"}
              value={luck}
              onChange={setLuck}
              onChangeEnd={(value) => {
                updateHandler(value,"luck")
              }}
              color="indigo"
              step={1}
              marks={[
                {value: 20, label:"20%"},
                {value: 50, label:"50%"},
                {value: 80, label:"80%"},
               

              ]}
            />
          </Container>
        )}
        <Space h="md" />
        <Center>
            <Link href="/">
                <ReplyIcon className='mt-4 h-6 cursor-pointer text-gray-300' />
            </Link>
        </Center>
        
    </Layout>
  )
}

export default Performance
