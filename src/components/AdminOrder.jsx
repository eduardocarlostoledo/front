import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Tag } from "antd";
import { AiFillSetting } from "react-icons/ai";
import { addAllOrders } from "../redux/actions/OrderActions";
import { NavAdmin } from './navAdmin';


export const AdminOrder = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addAllOrders());
  }, [dispatch]);

  const orders = useSelector((state) => state.order || []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: 'descend',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Buyer email',
      dataIndex: 'buyer_email',
      render: (text) => <p>{text}</p>
    },
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Status ID',
      dataIndex: 'statusId',
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Failure', value: 'failure' },
        { text: 'Approved', value: 'approved' },
      ],
      onFilter: (value, record) => record.statusId.indexOf(value) === 0,
      render: (statusId) => (
        <>
          {statusId === "approved" ? (
            <Tag color="green">Approved</Tag>
          ) : statusId === "failure" ? (
            <Tag color="red">Failure</Tag>
          ) : (
            <Tag color="yellow">Pending</Tag>
          )}
        </>
      ),
    },
    {
      title: 'Order ID',
      dataIndex: 'merchantOrderId',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Product Description',
      dataIndex: 'product_description',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Total Order Id',
      dataIndex: 'total_order_price',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Prod ID',
      dataIndex: 'prodId',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      render: (text) => <p>{text}</p>,
    },
    // {
    //   title: 'Product Image',
    //   dataIndex: 'product_image',
    //   render: (text) => <p>{text}</p>,
    // },
    {
      title: 'Product Amount',
      dataIndex: 'product_amount',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Product Unit Price',
      dataIndex: 'product_unit_price',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Acciones',
      dataIndex: '',
      render: (value) => (
        <button onClick={() => console.log(value.password)}>
          <AiFillSetting />
        </button>
      ),
    },
  ];

  return (
    <div>
      <NavAdmin />
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Table style={{ backgroundColor: "rgb(245, 245, 235)" }} columns={columns} dataSource={orders} />
      </div>
    </div>
  )
}