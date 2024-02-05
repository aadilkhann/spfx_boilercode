import * as React from "react";
import { sp } from "@pnp/sp/presets/all";
// import { SPHttpClient } from "@microsoft/sp-http";

function TestComponent() {
  const getDataFromList = async () => {
    let res = await sp.web.lists.getByTitle("TestList").items.get();
    console.log("ResponseData of Get Element", res);
  };

  const insertDataIntoList = async () => {
    let res = await sp.web.lists.getByTitle("TestList").items.add({
      Title: "Mr.",
      Name: "Babu",
    });
    console.log("ResponseData of Push Element", res);
  };

  const list = sp.web.lists.getByTitle("TestList");
  const updateDataList = async () => {
    let res = await list.items.getById(3).update({
      Title: "New Title2",
      Name: "New Name2",
    });
    console.log("ResponseData of Update Element", res);
  };

  const deleteDataList = async () => {
    let res = await list.items.getById(3).delete();
    console.log("ResponseData of Delete Element", res);
  };
  React.useEffect(() => {
    void getDataFromList();
    void insertDataIntoList();
    void updateDataList();
    void deleteDataList();
  }, []);

  return <div>TestComponent</div>;
}

export default TestComponent;
