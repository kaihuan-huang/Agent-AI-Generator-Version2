// import React, { useState } from "react";
// import { Table } from "antd";

// const columns = [
//   {
//     title: "Property Name",
//     dataIndex: "propertyName",
//   },
//   {
//     title: "Address",
//     dataIndex: "address",
//   },
//   {
//     title: "City",
//     dataIndex: "city",
//   },
//   {
//     title: "State",
//     dataIndex: "state",
//   },
//   {
//     title: "ZIP Code",
//     dataIndex: "zipCode",
//   },
// ];

// function RealEstateApp() {
//   const [listingId, setListingId] = useState("");
//   const [propertyData, setPropertyData] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const [postContent, setPostContent] = useState("");

//   const handleListingIdChange = (event) => {
//     setListingId(event.target.value);
//   };

//   const handleInputChange = (event) => {
//     setInputText(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetchPropertyData();
//   };

//   const fetchPropertyData = async () => {
//     const response = await fetch(`/property?listing_id=${listingId}`);
//     const data = await response.json();
//     const propertyData = formatPropertyData(data);
//     setPropertyData(propertyData);
//   };

//   const formatPropertyData = (data) => {
//     // format the data as needed
//     return data;
//   };

//   const handlePostContentSubmit = async (event) => {
//     event.preventDefault();
//     const response = await fetch("/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ input_text: inputText }),
//     });
//     const data = await response.json();
//     setPostContent(data);
//   };

//   const fetchBackendData = async () => {
//     let response;
//     let data = { key: "value" };
//     response = await fetch("http://http://127.0.0.1:5000/api/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data))
//       .catch((error) => console.error(error));
//   };
// }


import React, { useState } from "react";
import axios from "axios";

const RealEstateApp = () => {
  const [propertyData, setPropertyData] = useState({});
  const [postContent, setPostContent] = useState("");
  const [listingId, setListingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('e', e)
    setIsLoading(true);
    try {
      // Fetch property data
      const res = await axios.get(
        `https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/id`,
        {
          headers: {
            Accept: "application/json",
            apikey: "0fa3cb2b0e55a833c4f4fdb3154d51e8",
          },
          params: {
            listingid: listingId,
            geoid: "PL0820000",
            minBeds: 1,
            maxBeds: 2,
          },
        }
      );
      setPropertyData(res.data);
      console.log('res.data', res.data)

      // Generate post content
      const openai = require("openai");
      openai.apiKey = "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";
      const response = await openai.Completion.create({
        engine: "text-davinci-002",
        prompt: `${propertyData.address.line1} ${propertyData.address.line2} ${propertyData.address.city} ${propertyData.address.state} ${propertyData.address.postal1}`,
        temperature: 0.8,
      });
      setPostContent(response.choices[0].text);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

}

<div>
      
<form onSubmit={handleSubmit}>
  <label>
    Listing ID:
    <input
      type="text"
      value={listingId}
      onChange={(e)=>setListingId(e.target.value)}
    />
  </label>
  <button type="submit" disabled={isLoading}>
    {isLoading ? "Loading..." : "Submit"}
  </button>
</form>

  <div>
    <h2>Property Data</h2>
    <p>Address: {propertyData.address.line1}</p>
    <p>City: {propertyData.address.city}</p>
    <p>State: {propertyData.address.state}</p>
    <p>Postal Code: {propertyData.address.postal1}</p>
  </div>

<h2>Post Content</h2>
<p>{postContent}</p>

</div>



export default RealEstateApp;
