import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { Button, Table } from "semantic-ui-react";

export default function Home() {
  const [details, setdetails] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    setapidata();
  }, []);

  const setapidata = () => {
    axios.get("https://randomuser.me/api/0.8/?results=20").then((data) => {
      console.log(data.data.results.user);
      addlocalstorage(data.data.results);
    });
  };

  const addlocalstorage = (data) => {
    localStorage.setItem("MyData", JSON.stringify(data));
    getlocaldata();
  };

  const getlocaldata = () => {
    let data = localStorage.getItem("MyData");
    data = JSON.parse(data);
    setdetails(data);
    console.log(details);
  };
  const filterByName = (name) => {
    setSearchInput(name);
    if (searchInput !== "") {
      const filteredData = details.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(details);
    }
  };
  if (!details) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        <div className="searchWrapper">
          <input
            type="text"
            placeholder="Search username..."
            className="search"
            onKeyUp={(e) => filterByName(e.target.value)}
          ></input>
        </div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>gender</Table.HeaderCell>
              <Table.HeaderCell>email</Table.HeaderCell>
              <Table.HeaderCell>username</Table.HeaderCell>
              <Table.HeaderCell>password</Table.HeaderCell>
              <Table.HeaderCell>dob</Table.HeaderCell>
              <Table.HeaderCell>phone</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {searchInput.length > 1 ? (
            <Table.Body>
              {filteredResults.map((x, i) => {
                return (
                  <Table.Row>
                    <Table.Cell>{i + 1}</Table.Cell>
                    <Table.Cell>{x.user.name.first}</Table.Cell>
                    <Table.Cell>{x.user.name.last}</Table.Cell>
                    <Table.Cell>{x.user.gender}</Table.Cell>
                    <Table.Cell>{x.user.email}</Table.Cell>
                    <Table.Cell>{x.user.username}</Table.Cell>
                    <Table.Cell>{x.user.password}</Table.Cell>
                    <Table.Cell>{x.user.dob}</Table.Cell>
                    <Table.Cell>{x.user.phone}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          ) : (
            <Table.Body>
              {details.map((x, i) => {
                return (
                  <Table.Row>
                    <Table.Cell>{i + 1}</Table.Cell>
                    <Table.Cell>{x.user.name.first}</Table.Cell>
                    <Table.Cell>{x.user.name.last}</Table.Cell>
                    <Table.Cell>{x.user.gender}</Table.Cell>
                    <Table.Cell>{x.user.email}</Table.Cell>
                    <Table.Cell>{x.user.username}</Table.Cell>
                    <Table.Cell>{x.user.password}</Table.Cell>
                    <Table.Cell>{x.user.dob}</Table.Cell>
                    <Table.Cell>{x.user.phone}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          )}
        </Table>
      </div>
    );
  }
}
