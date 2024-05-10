import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Paper, Box, Text, Avatar, Group } from "@mantine/core";
import { useAppStore } from "../store/app.store";
import { useQuery } from "@tanstack/react-query";

interface Resource {
  name: string;
  height: number | string; // Assuming height could be represented as a number or a string
  mass: number | string; // Assuming mass could be represented as a number or a string
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: number; // Assuming birth year is always a number
  gender: "male" | "female" | "other"; // Assuming gender can only be one of these options
  homeworld: string;
  results: any; // Type not specified
}

function PersonDetail() {
  const { person, setPerson, homeWorld, setHomeWorld }: any = useAppStore();
  const { id }: any = useParams();
  // Fetch person data using useQuery hook
  const { error, isFetching }: any = useQuery({
    queryKey: ["people", id],
    queryFn: () =>
      axios.get(`https://swapi.dev/api/people/${id}`).then((res: any) => {
        setPerson(res?.data || {});
        return res?.data;
      }),
  });
 
  // Use useQuery hook to fetch homeworld data
  const {
    error: errorHomeWorld, // Error state for homeworld data
    isFetching: isFetchingHomeWorld, // Loading state for homeworld data
    refetch, // Function to refetch homeworld data
  }: any = useQuery({
    queryKey: ["homeworld", person],
    enabled: false,
    queryFn: () =>
      // Fetch homeworld data using Axios
      axios.get(person?.homeworld).then((res: any) => {
        setHomeWorld(res?.data || {});
        return res?.data;
      }),
  });

  // useEffect hook to refetch data when the person's homeworld changes
  useEffect(() => {
    if (person?.homeworld) {
      refetch();
    }
  }, [person]); // Run the effect whenever the person object changes

  return (
    <Box p={"xl"}>
      <Box
        w={"50%"}
        style={{
          margin: "0 auto",
        }}
      >
        {(isFetching || isFetchingHomeWorld) && "Loading..."}
        {error && `Error: ${error?.message}`}
        {errorHomeWorld && `Error: ${errorHomeWorld?.message}`}

        {person?.name && (
          <>
            <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
              <Group>
                <Avatar
                  src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                  size={94}
                  radius="md"
                />
                <div>
                  <Text fz="lg" fw={500}>
                    {person?.name}
                  </Text>

                  <Group mt={3}>
                    Gender
                    <Text fz="xs" c="dimmed">
                      {person?.gender}
                    </Text>
                  </Group>

                  <Group mt={5}>
                    Hair Color
                    <Text fz="xs" c="dimmed">
                      {person?.hair_color}
                    </Text>
                  </Group>

                  <Group mt={3}>
                    Skin Color
                    <Text fz="xs" c="dimmed">
                      {person?.skin_color}
                    </Text>
                  </Group>

                  <Group mt={3}>
                    Eye Color
                    <Text fz="xs" c="dimmed">
                      {person?.eye_color}
                    </Text>
                  </Group>
                </div>
              </Group>
              <br />
            </Paper>
            {homeWorld?.name && (
              <Paper
                radius="md"
                withBorder
                p="lg"
                mt={"xl"}
                bg="var(--mantine-color-body)"
              >
                <Text fz="lg" fw={500}>
                  Home World Detail
                </Text>
                <Group mt={3}>
                  Name
                  <Text fz="xs" c="dimmed">
                    {homeWorld?.name}
                  </Text>
                </Group>
                <Group mt={3}>
                  Climate
                  <Text fz="xs" c="dimmed">
                    {homeWorld?.climate}
                  </Text>
                </Group>
                <Group mt={3}>
                  Diameter
                  <Text fz="xs" c="dimmed">
                    {homeWorld?.diameter}
                  </Text>
                </Group>
                <Group mt={3}>
                  Rotation Period
                  <Text fz="xs" c="dimmed">
                    {homeWorld?.rotation_period}
                  </Text>
                </Group>
                <Group mt={3}>
                  Terrain
                  <Text fz="xs" c="dimmed">
                    {homeWorld?.terrain}
                  </Text>
                </Group>
              </Paper>
            )}
            <Link to="/">Go back to listing</Link>
          </>
        )}
      </Box>
    </Box>
  );
}

export default PersonDetail;
