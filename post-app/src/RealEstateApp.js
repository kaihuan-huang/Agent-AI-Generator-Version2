import React, { useState } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Property Name",
    dataIndex: "propertyName",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "City",
    dataIndex: "city",
  },
  {
    title: "State",
    dataIndex: "state",
  },
  {
    title: "ZIP Code",
    dataIndex: "zipCode",
  },
];

function RealEstateApp() {
  const [listingId, setListingId] = useState("");
  const [propertyData, setPropertyData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleListingIdChange = (event) => {
    setListingId(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchPropertyData();
  };

  const fetchPropertyData = async () => {
    const response = await fetch(`/property?listing_id=${listingId}`);
    const data = await response.json();
    const propertyData = formatPropertyData(data);
    setPropertyData(propertyData);
  };

  const formatPropertyData = (data) => {
    // format the data as needed
    return data;
  };

  const handlePostContentSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input_text: inputText }),
    });
    const data = await response.json();
    setPostContent(data);
  };
}




export default RealEstateApp;
