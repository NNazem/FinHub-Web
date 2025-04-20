"use client"
import { useEffect, useState } from "react"
import { styled } from "styled-components"
import GlassPanel from "./GlassPanel"
import GlassShine from "../ui/GlassShine"
import GlassReflection from "../ui/GlassReflection"
import { addCoinToPortfolio, getAllCoins } from "../../api/api"
import Select from 'react-select';

// Colorful glow effects
const NeonAccent = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${(props) => props.color};
  filter: blur(80px);
  opacity: 0.3;
  z-index: 1;
`

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
  z-index: 20;
`

const TableTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0;
`

const SearchInput = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 8px 12px;
  font-size: 14px;
  outline: none;
  width: 200px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`

const AddButton = styled.button`
  background: #30D158;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #28BD4D;
  }
`

// SVG Plus Icon component
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  position: relative;
  z-index: 20;
`

const TableHead = styled.thead`
  & th {
    text-align: left;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      color: rgba(255, 255, 255, 0.9);
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0)
      );
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    
    &:hover::after {
      opacity: 1;
    }
  }
`

const TableBody = styled.tbody`
  & tr {
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
  
  & td {
    padding: 16px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
`

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 8px;
  position: relative;
  z-index: 20;
`

const PaginationButton = styled.button`
  background: ${(props) => (props.active ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)")};
  color: ${(props) => (props.active ? "white" : "rgba(255, 255, 255, 0.7)")};
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: ${(props) => (props.$visible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: rgba(28, 28, 30, 0.8);
  backdrop-filter: blur(40px);
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.1) 30%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.1) 70%,
      rgba(255, 255, 255, 0.5)
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-top: 0;
  margin-bottom: 24px;
`

const FormGroup = styled.div`
  margin-bottom: 16px;
`

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 8px;
`

const FormInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
`

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`

const Button = styled.button`
  background: ${(props) => (props.$primary ? "#30D158" : "rgba(255, 255, 255, 0.1)")};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${(props) => (props.$primary ? "#28BD4D" : "rgba(255, 255, 255, 0.15)")};
  }
`

const defaultColor = "#30D158"

/*
Todo: Please reformat this mess
*/

export default function ProductsTable({
  products = defaultProducts,
  color = defaultColor,
  loading = false,
  initialTheme = "dark", 
  selectedPortfolio,
  onAddCoin
}) {
  const [theme, setTheme] = useState(initialTheme)
  const [searchValue, setSearchValue] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [coins, setCoins] = useState([]);
  const [formData, setFormData] = useState({
    coinId: "",
    amount: "",
    purchaseDate: "",
    price: ""
  })
  const limit = 100
  
  const options = coins.map(coin => ({
    value: coin.id,
    label: coin.name
  }))

  const itemsPerPage = 5

  const filteredProducts = products.filter((product) =>
    product.Coin.name.toLowerCase().includes(searchValue.toLowerCase()),
  )

  const filteredOptions = options.filter((product) =>
    product.label.toLowerCase().includes(searchValue.toLowerCase()),
  ).slice(0, limit)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  }

  function handleChange(e){
    const {name, value} = e.target
    setFormData((prev) => ({...prev, [name] : value}))
  }

  async function fetchAllCoins(){
    const res = await getAllCoins();
    setCoins(res);
  }

  useEffect(() => {
    fetchAllCoins()
  }, [])

  function resetFormData(){
    setFormData({
      coinId: "",
      amount: "",
      purchaseDate: "",
      price: ""
    })
  }

  async function handleAddCoinToPortfolio(){
    try{
      setModalVisible(false);
      const req = {
        portfolio_id : Number(selectedPortfolio),
        coin_id : Number(formData.coinId),
        amount : Number(formData.amount),
      }

      await onAddCoin(req)

      resetFormData()
    }catch (err) {
      setModalVisible(true)
    }

  }

  return (
    <>
      <GlassPanel theme={theme} style={{
      marginTop: "15px",
    }} >
        <GlassShine />
        <GlassReflection />

        <NeonAccent $color={color} style={{ top: "30px", left: "30px" }} />
        <NeonAccent $color={color} style={{ bottom: "50px", right: "40px" }} />

        <TableHeader>
          <TableTitle>Holdings</TableTitle>
          <HeaderActions>
            <AddButton onClick={() => setModalVisible(true)}>
              <PlusIcon /> Add
            </AddButton>
            <SearchInput placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </HeaderActions>
        </TableHeader>

        <Table>
          <TableHead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Holdings</th>
              <th>Value</th>
              <th>Cost</th>
              <th>Profit</th>
            </tr>
          </TableHead>
          <TableBody>
            {currentProducts.map((product) => (
              <tr key={`product-${product.id}-${product.Coin.id}`}>
                <td>
                  <Avatar>
                    <img
                      src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${product.Coin.id}.png`}
                      alt={product.Coin.name}
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E"
                      }}
                    />
                  </Avatar>
                </td>
                <td>{product.Coin.name}</td>
                <td>{product.Amount}</td>
                <td>{formatCurrency(product.Coin.quote.USD.price * product.Amount)}</td>
                <td>{formatCurrency(product.price)}</td>
                <td style={{ color: product.current_profit > 0 ? "#30D158" : "#FF453A", fontWeight: "bold" }}>
                  {formatCurrency(product.current_profit)}
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px 0" }}>
                  Loading...
                </td>
              </tr>
            )}
            {!loading && currentProducts.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px 0" }}>
                  No results found
                </td>
              </tr>
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationButton key={page} active={page === currentPage} onClick={() => setCurrentPage(page)}>
                {page}
              </PaginationButton>
            ))}
          </Pagination>
        )}
      </GlassPanel>

      <Modal $visible={modalVisible}>
        <ModalContent>
          <ModalTitle>Add Cryptocurrency</ModalTitle>
          <FormGroup>
            <FormLabel>Cryptocurrency</FormLabel>
            <Select 
              onInputChange={(term) => setSearchValue(term)}
              className="basic-single"
              classNamePrefix="select"
              options={filteredOptions}
              styles={{
                control: (base) => ({
                  ...base,
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'white'
                }),
                singleValue: (base) => ({
                  ...base,
                  color: 'white'
                }),
                menu: (base) => ({
                  ...base,
                  background: 'rgba(28, 28, 30, 0.9)',
                }),
                option: (base) => ({
                  ...base,
                  background: 'rgba(28, 28, 30, 0.9)',
                  color: 'white',
                }),
              }}
              onChange={opt => setFormData(prev => ({...prev, coinId : opt.value}))}
              value={filteredOptions.find(opt => opt.value === formData.coinId) || null}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>Amount</FormLabel>
            <FormInput name="amount" type="number" placeholder="Enter amount" value={formData.amount} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <FormLabel>Purchase Date</FormLabel>
            <FormInput name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <FormLabel>Price</FormLabel>
            <FormInput name="price" type="number" placeholder="Enter purchase price" value={formData.price} onChange={handleChange} />
          </FormGroup>

          <ModalActions>
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            <Button $primary onClick={handleAddCoinToPortfolio}>
              Add
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </>
  )
}

