import { DatePicker, Form, Input, Modal, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";

import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { addCoinToPortfolio, getAllCoins } from "../../api/api";

function PortfolioProductsBar({ searchValue, setSearchValue, selectedPortfolio }) {
  const [type, setType] = useState("");
  const [coins, setCoins] = useState([]);
  const [newProduct, setNewProduct] = useState([]);
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);

  const [modalVisible, setModalVisible] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    async function fetchCoins() {
      const response = await getAllCoins();
      setCoins(response);
    }
    fetchCoins();
  }, []);

  const handleFormSubmit = async () => {
    const values = form.getFieldsValue();
    const coin = coins.find((coin) => coin.name === values.Crypto);

    const newCoin = {
      id: coin.id,
      rank: coin.rank,
      name: coin.name,
    };

    const newProductData = {
      coin_id: parseInt(newCoin.id),
      portfolio_id: parseInt(selectedPortfolio),
      //purchase_date: values["Purchase Date"].format("YYYY-MM-DD"),
      amount: parseFloat(values.Amount)
    };

    console.log(newProductData);
    console.log(newCoin);

    await addCoinToPortfolio(newProductData)

    setModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
          <h1
            style={{
              fontFamily: "Geist Sans, sans-serif",
              fontSize: "20px",
              fontWeight: "bold",
              paddingBottom: "10px",
            }}
          >
            Holdings
          </h1>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Button
          type="primary"
          style={{
            backgroundColor: "green",
            display: "flex",
            alignItems: "center"          
          }}
          onClick={() => setModalVisible(true)}
        >
          <>
          <PlusOutlined />
          </>
        </Button>
        <Modal
          title="Add Product"
          centered
          open={modalVisible}
          onOk={handleFormSubmit}
          onCancel={() => setModalVisible(false)}
        >
          <Form
            {...formItemLayout}
            form={form}
            variant={variant || "filled"}
            style={{ maxWidth: 600 }}
            initialValues={{ variant: "filled" }}
          >
            <Form.Item
              label="Crypto"
              name="Crypto"
              rules={[{ required: true, message: "Please select a crypto!" }]}
            >
              <Select
                showSearch
                options={coins.map((coin) => ({
                  value: coin.name,
                  label: coin.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Amount"
              name="Amount"
              rules={[{ required: true, message: "Please input amount!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Purchase Date"
              name="Purchase Date"
              rules={[
                { required: true, message: "Please input purchase date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Price"
              name="Price"
              rules={[{ required: true, message: "Please input price!" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Input
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
}

export default PortfolioProductsBar;
