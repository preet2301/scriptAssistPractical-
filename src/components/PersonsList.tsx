// App.tsx
import React, { useEffect, useState } from "react";
import { TextInput, Button, Table, Box, Pagination } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAppStore } from "../store/app.store";
import { getIdFromUrl } from "../helper";

interface Resource {
  name: string;
  height: any;
  data: any;
  results: any;
}

const PersonsList: React.FC = () => {
  const { persons, setPerson, setPersons }: any = useAppStore();
  const [searchTerm, setSearchTerm] = useState<string>(""); // State variable for the search term, initialized as an empty string
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(""); // State variable for the debounced search term, initialized as an empty string
  const perPageItems = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1); // State variable for the current page number, initialized as 1
  const { error, data, isFetching }: any = useQuery({
    queryKey: ["people", currentPage, debouncedSearchTerm],
    queryFn: () =>
      axios
        .get(
          `https://swapi.dev/api/people?page=${currentPage}&search=${debouncedSearchTerm}`
        )
        .then((res: any) => {
          setPersons(res?.data?.results || []);
          return res?.data;
        }),
  });
  //  pagination logic
  const totalPage = Math.ceil(data?.count / perPageItems);
  // useEffect hook to debounce the search term input

  useEffect(() => {
    // Create a timeout to delay setting the debounced search term
    const delayInputTimeoutId = setTimeout(() => {
      // Set the debounced search term after the delay
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(delayInputTimeoutId);
  }, [searchTerm, 500]); //Run the effect whenever the search term changes

  return (
    <Box className="container">
      <h3>Person List</h3>
      <Box display={"flex"}>
        <TextInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search..."
          style={{ width: "500px" }}
        />
        {searchTerm && (
          <Button onClick={() => setSearchTerm("")} mx="sm">
            Reset
          </Button>
        )}
      </Box>
      <Box mt={"lg"}>
        {isFetching && "Loading..."}
        {error && `Error: ${error?.message}`}

        {persons?.length > 0 ? (
          <>
            <Table mt={"xs"}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Birth Year</th>
                  <th>Gender</th>
                  <th>Skin Color</th>
                  <th>Created On</th>
                  <th>Updated On</th>
                </tr>
              </thead>
              <tbody>
                {persons.map((item: any) => (
                  <tr key={item.name}>
                    <td>
                      <Link
                        to={`/person/${getIdFromUrl(item.url)}`}
                        onClick={() => setPerson({})}
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td>{item.birth_year}</td>
                    <td>{item.gender}</td>
                    <td>{item.skin_color}</td>
                    <td>
                      {new Date(item.created).toLocaleDateString()}{" "}
                      {new Date(item.created).toLocaleTimeString()}
                    </td>
                    <td>
                      {new Date(item.edited).toLocaleDateString()}{" "}
                      {new Date(item.edited).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              mt={"lg"}
              value={currentPage}
              onChange={(value) => {
                setCurrentPage(value);
              }}
              total={totalPage}
            />
          </>
        ) : (
          <>{!isFetching && "No data found"}</>
        )}
      </Box>
    </Box>
  );
};

export default PersonsList;
