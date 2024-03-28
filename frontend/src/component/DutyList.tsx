import { Duty } from "../types/duties";
import { Table, Space, Divider } from "antd";
import DeleteDuty from "./DeleteDuty";
import UpdateDuty from "./UpdateDuty";
import AddDuty from "./AddDuty";

type Props = {
    dutyList: Duty[];
    refreshList: ()=>void;
};


const DutyList = (props:  Props) => {

  const {dutyList, refreshList} = props;

  const columns = [{
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (text:String, record: Duty) => (
        <span>
          <Space size={10}>
            <UpdateDuty duty={record} onSuccessCallback={refreshList}/>
            <DeleteDuty duty={record} onSuccessCallback={refreshList}/>
          </Space>
        </span>
      ),
  }];

    return (
      <>  
          <Divider orientation="right">
            <AddDuty onSuccessCallback={refreshList}/>
          </Divider>
          <Table dataSource={dutyList} columns={columns} />
      </>

    )
};



export default DutyList;