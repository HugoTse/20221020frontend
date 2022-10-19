// Deprecated: import '@aws-amplify/core/ui-react/styles.css';
import '@aws-amplify/ui-react/styles.css';

import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
  Grid,
  TextField,
  Alert,
  Flex,
  Badge,
  Text,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  ThemeProvider,
  Theme,
  SliderField,
  TextAreaField,
  SelectField,
  SwitchField,
  useTheme,
  Divider,
  ToggleButton,
  TabItem,
  Tabs
} from "@aws-amplify/ui-react";

import React, {
  useState,
  useEffect,
} from "react";
// import { isCompositeComponent } from "react-dom/test-utils";
// import { Auth, Hub } from "aws-amplify";
// import Amplify from "aws-amplify";

function App() {
 
  const [records, setRecords] = useState([]);

  // Fetch the records in the table
  async function fetchRecords(){
    const headers = {
      "Content-Type": "application/json",
    }
    const apiResponse = await fetch('https://guxr3spqrd.execute-api.us-west-1.amazonaws.com/v4/get', {headers} )
    // const apiResponse = await fetch('http://api.open-notify.org/astros.json', {headers} )
    const apiResponseJSON = await apiResponse.json()
    console.log(apiResponseJSON);
    // const rs = apiResponseJSON.body
    // console.log(rs)
    // setRecords([...rs])
    setRecords([...apiResponseJSON])
  }
  // fetchRecords();
  // Fetch the records in the table: UseEffect
  useEffect(() => { 
    async function fetchRecords(){
      const headers = {
        "Content-Type": "application/json",
      }
      const apiResponse = await fetch('https://guxr3spqrd.execute-api.us-west-1.amazonaws.com/v4/get', {headers} )
      // const apiResponse = await fetch('http://api.open-notify.org/astros.json', {headers} )
      const apiResponseJSON = await apiResponse.json()
      console.log(apiResponseJSON);
      // const rs = apiResponseJSON.body
      // console.log("This is rs: " + rs)
      // setRecords([...rs])
      setRecords([...apiResponseJSON])
    }
    fetchRecords()
  }, []);


  const theme: Theme = {
    name: 'table-theme',
    tokens: {
      components: {
        table: {
          row: {
            hover: {
              backgroundColor: { value: '{colors.blue.20}' },
            },
  
            striped: {
              backgroundColor: { value: '{colors.blue.10}' },
            },
          },
  
          header: {
            color: { value: '{colors.blue.80}' },
            fontSize: { value: '{fontSizes.xl}' },
          },
  
          data: {
            fontWeight: { value: '{fontWeights.semibold}' },
          },
        },
      },
    },
  };
  

  return (
    <div className="App">
      <Heading level={1}>Ransomware Defender</Heading>

      <h4><i>"Using processes, people, and technology to keep your files safe"</i></h4>

      <Tabs
        // currentIndex="1"
        justifyContent="flex-start">
        <TabItem title="Stored Files">
        
        <br/>
        <SliderField
        label="Use the slider below to adjust the oldest files you want to see."
        max={30}
        />
        <ThemeProvider theme={theme} colorMode="light">
          <Table highlightOnHover variation="striped">
            <TableHead>
              <TableRow>
                <TableCell as="th">FILE</TableCell>
                <TableCell as="th">TIMESTAMP</TableCell>
                <TableCell as="th">HASH</TableCell>
                <TableCell as="th">USER</TableCell>
                <TableCell as="th"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.length > 0 ? (
                records.map((file) => 
                <>
              <TableRow>
                <TableCell>
                  <a href={'https://20221004a.s3.us-west-1.amazonaws.com/'+file.s3Filename.S}>{file.file.S}</a>
                </TableCell>
                <TableCell>
                  {file.timestamp.S}
                </TableCell>
                <TableCell>
                  {file.hash.S}
                </TableCell>
                <TableCell>
                  {file.user.S}
                </TableCell>
                <TableCell>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
                </>)) : (<></>) }
            </TableBody>
          </Table>
        </ThemeProvider>

        </TabItem>
        <TabItem title="Profile">
          Profile
        </TabItem>
      </Tabs>

    


    </div>
  );
}

export default App;