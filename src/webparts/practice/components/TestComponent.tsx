import * as React from "react";
import { sp } from "@pnp/sp/presets/all";
import { DetailsList, DetailsListLayoutMode, IconButton, Panel, PrimaryButton, TextField, PanelType } from "@fluentui/react";

function TestComponent() {
  const [listData, setListData] = React.useState<any>([])
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)
  const [isUpdateOpen, setIsUpdateOpen] = React.useState(false)
  const [StudentId, setStudentId] = React.useState(0)



  function toCreateStudent(): void {
    setIsCreateOpen(true)
  }

  //Get Data From List & Render it
  const getDataFromList = async () => {
    let res = await sp.web.lists.getByTitle("TestList").items.select("*,People/Title").expand("People").get();
    console.log("ResponseData of Get Element", res);
    try {
      if (res.length) {
        console.log("Extracting Data from API")
        let extractedData = res.map(item => ({
          ID: item?.ID,
          Title: item?.Title,
          Name: item?.Name,
          People: item?.People ? item.People.Title : null,

        }));
        console.log("Data with PP", extractedData)
        console.log("Data Extracted From API")

        setListData(extractedData);

        console.log(extractedData);
      }
    } catch (error) {
      console.log("Error Occured in setting Response Data to Set State")
    }
  };

  //Insert Data into List
  const [inputData, setInputData] = React.useState<any>({
    Title: "",
    Name: ""
  })
  console.log("Input Data", inputData)
  const insertDataIntoList = async (data: any) => {
    let res = await sp.web.lists.getByTitle("TestList").items.add(data);
    console.log("ResponseData of Push Element", res);
    if (res.data) {
      setTimeout(() => {
        setInputData({})
        setIsCreateOpen(false);
        alert('Data inserted')
      }, 1000)

    }
    else {
      console.log('error')
    }
  };
  // const handleInputChange = (event: any) => {
  //   let { name, value } = event.target;
  //   setInputData((prevValues) => ({
  //     ...prevValues,
  //     [name]: value,
  //   }));
  //   // insertDataIntoList(inputData)
  // }
  const saveStudent = () => {
    void insertDataIntoList(inputData)

  }

  //Update data from List
  const list = sp.web.lists.getByTitle("TestList");
  const updateDataList = async (id: number, data: any) => {
    let res = await list.items.getById(id).update(data);
    console.log("ResponseData of Update Element", res);
    setInputData({})
    void getDataFromList()
    setIsUpdateOpen(false)
  };

  const handleUpdate = (id: number) => {
    setIsUpdateOpen(true)
    setStudentId(id)
  }

  //Delete Data from List
  const deleteDataList = async (Id: any) => {

    let res = await list.items.getById(Id).delete();
    // await getDataFromList();
    setListData(listData.filter((f: any) => f.ID !== Id));
    alert("Deleted Sucessfully")
    console.log("ResponseData of Delete Element", res);
  };
  const handleDelete = async (ID: number) => {
    console.log("Delete Id is", ID)
    try {
      await deleteDataList(ID);
      console.log("Item deleted successfully:");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  React.useEffect(() => {
    void getDataFromList();
  }, []);
  return (<div>
    <PrimaryButton text="Add Data" onClick={toCreateStudent} />
    <DetailsList
      items={listData}
      columns={[
        { key: 'ID', name: 'Sl.No', fieldName: 'ID', minWidth: 100 },
        { key: 'reg', name: 'Title', fieldName: 'Title', minWidth: 100 },
        { key: 'name', name: 'Name', fieldName: 'Name', minWidth: 100 },
        { key: 'people', name: 'People', fieldName: 'People', minWidth: 100 },
        {
          key: 'action', name: 'Actions', fieldName: 'action', minWidth: 100, onRender: (item) => (
            <div>
              <IconButton iconProps={{ iconName: 'Edit' }} onClick={() => handleUpdate(item.ID)} />
              <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => handleDelete(item.ID)} />
            </div>
          )
        },
      ]}
      setKey='set'
      layoutMode={DetailsListLayoutMode.fixedColumns}
    />

    {/* Add Data  */}
    {isCreateOpen &&
      <div className="panel-container">
        <Panel
          headerText={'Add Details'}
          isOpen={isCreateOpen}
          type={PanelType.custom}
          customWidth='40%'
          onDismiss={() => (setIsCreateOpen(false))}
        >
          <TextField
            className='input'
            placeholder='Title'
            label='Title'
            required
            name='Title'
            onChange={(_ev, newVal) => { setInputData((c: any) => ({ ...c, Title: newVal })) }}
          />

          <TextField
            className='input'
            placeholder='Name'
            label='Name'
            required
            name='Name'
            onChange={(_ev, newVal) => { setInputData((c: any) => ({ ...c, Name: newVal })) }}

          />

          <PrimaryButton className='btn' iconProps={undefined} onClick={saveStudent}>Save</PrimaryButton>
        </Panel>
      </div>
    }

    {/* Update Data  */}
    {
      isUpdateOpen &&
      <div className="panel-container">
        <Panel
          headerText={'Update Details'}
          isOpen={isUpdateOpen}
          type={PanelType.custom}
          customWidth='40%'
          onDismiss={() => setIsUpdateOpen(false)}
        >

          <TextField
            className='input'
            placeholder='Enter Title'
            label='Title'
            required
            value={inputData.Title}
            name='Title'
            onChange={(_ev, newVal) => { setInputData((c: any) => ({ ...c, Title: newVal })) }}
          />

          <TextField
            className='input'
            placeholder='Enter Name'
            label='Name'
            required
            name='Name'
            value={inputData.Name}
            onChange={(_ev, newVal) => { setInputData((c: any) => ({ ...c, Name: newVal })) }}
          />
          <PrimaryButton className='btn' iconProps={undefined} onClick={() => updateDataList(StudentId, inputData)}>Update</PrimaryButton>
        </Panel>
      </div>
    }
  </div>)
}

export default TestComponent;
