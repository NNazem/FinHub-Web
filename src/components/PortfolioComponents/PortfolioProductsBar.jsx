import { DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";

import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import { AddCrypto, getCoins, getUserCoins } from "../../api/api";

function PortfolioProductsBar({ searchValue, setSearchValue }) {
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

  const options = [
    { value: "crypto", label: <span>Crypto</span> },
    { value: "stock", label: <span>Stock</span> },
    { value: "etf", label: <span>ETF</span> },
    { value: "mutual_fund", label: <span>Mutual Fund</span> },
  ];

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    async function fetchCoins() {
      const response = await getCoins();
      setCoins(response);
    }
    fetchCoins();
  }, []);

  const handleFormSubmit = () => {
    const values = form.getFieldsValue();
    console.log("Form Values:", values);

    if (type === "crypto") {
      const coin = coins.find((coin) => coin.name === values.Crypto);
      const amount = values.Amount;
      const purchaseDate = values["Purchase Date"];
      const price = values.Price;

      setNewProduct({
        coin,
        amount,
        purchaseDate,
        price,
      });
      console.log("New Product:", newProduct);

      AddCrypto(1, newProduct);
    }
    // You can now use these values as needed, e.g., send them to an API
    setModalVisible(false);
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
            alignItems: "center",
          }}
          onClick={() => setModalVisible(true)}
        >
          <FaPlus size={20} />
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
