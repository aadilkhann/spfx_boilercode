import * as React from "react";
import { sp } from "@pnp/sp/presets/all";
// import { SPHttpClient } from "@microsoft/sp-http";

function TestComponent() {
  const getDataFromList = async () => {
    let res = await sp.web.lists.getByTitle("TestList").items.get();
    console.log("ResponseData", res);
  };

  const insertDataIntoList = async () => {
    let res = await sp.web.lists.getByTitle("TestList").items.add({
      Title: "Mr.",
      Name: "Babu",
    });
    console.log("ResponseData", res);
  };

  React.useEffect(() => {
    void getDataFromList();
    void insertDataIntoList();
  }, []);

  return <div>TestComponent</div>;
}

export default TestComponent;
