import photo from "../../assets/chikpea logo.png";

// CV.js
import React, { useState,useEffect } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import PropTypes from "prop-types";
import axios from "axios";

// Define styles for the CV
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
    textTransform: "uppercase",
    borderBottom: "2px solid #333333",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555555",
    textTransform: "uppercase",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#666666",
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    border: "4px solid #ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
});

// CV component
const CV = () => {
  const [ Data,setData] = useState({})
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    // console.log("The token data is = " + token);

    // console.log("The token data is = " + JSON.stringify(headers));
    
    axios
      .get("http://localhost:5000/api/auth/user", { headers })
      .then((response) => {
        setData(response.data.msg);
        console.log("The return data is = " + JSON.stringify(Data));
      })
      .catch((error) => {
        console.log("The error is = " + JSON.stringify(error));
        toast.error("Something went wrong.");
      });
      console.log("The data of props is = " + JSON.stringify(Data));
  }, []);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          {/* Profile Image */}
          <Image src={Data.image} style={styles.image} />

          {/* Personal Information */}
          <Text style={styles.heading}>
            {Data.firstName} {Data.lastName}
          </Text>
          <Text style={styles.text}>Date of Birth: January 1, 1990</Text>
          <Text style={styles.text}>Nationality: American</Text>
          <Text style={styles.text}>
            Address: {Data.streetAddress}, {Data.city},{" "}
            {Data.state}, {Data.ZIPCode}, {Data.country}
          </Text>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Contact</Text>
          <Text style={styles.text}>Email: {Data.email}</Text>
          <Text style={styles.text}>
            Phone: +{Data.countryCode}-{Data.phone}
          </Text>
          <Text style={styles.text}>LinkedIn: {Data.linkdInLink}</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Skills</Text>
          {Data.skills?Data.skills.map((item, i) => (
            <dev key={i} className="flex">
              <Text style={styles.text} >{item.name}, </Text>
            </dev>
          )):(<></>)}
         
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Education</Text>
          <Text style={styles.text}>Degree: Bachelor of Science</Text>
          <Text style={styles.text}>University: XYZ University</Text>
          <Text style={styles.text}>Year: 2020</Text>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Experience</Text>
          {Data.workHistory?(Data.workHistory.map((element,i)=>(
            <div key={i}>
          <Text style={styles.text}>Company: {element.company}</Text>
          <Text style={styles.text}>Position: {element.designation}</Text>
          <Text style={styles.text}>Duration: {element.from} - {element.to}</Text>
            </div>
          ))):(<></>)}
          
          
        </View>
      </Page>
    </Document>
  );
};


export default CV;
