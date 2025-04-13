"use client"
import { useState } from "react"
import { styled } from "styled-components"
import GlassPanel from "./GlassPanel"
import GlassShine from "../ui/GlassShine"
import GlassReflection from "../ui/GlassReflection"


const DemoContainer = styled.div`
  background: linear-gradient(135deg, #000000 0%, #1A1A1A 100%);
  padding: 24px;
  min-height: 600px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro', 'SF Pro Text', 'Helvetica Neue', sans-serif;
  position: relative;
  overflow: hidden;
`

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

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 8px;
  position: relative;
  z-index: 20;
`

const PaginationButton = styled.button`
  background: ${(props) => (props.$active ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.05)")};
  color: ${(props) => (props.$active ? "white" : "rgba(255, 255, 255, 0.7)")};
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

const FormSelect = styled.select`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  appearance: none;
  
  &:focus {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
  }
  
  option {
    background: rgba(28, 28, 30, 0.9);
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

// Sample data for transactions
const defaultTransactions = [
  {
    id: 1,
    coin: "Bitcoin",
    amount: 0.5,
    price: 45000,
    total: 22500,
    date: "2023-01-15",
  },
  {
    id: 2,
    coin: "Ethereum",
    amount: 2.5,
    price: 2800,
    total: 7000,
    date: "2023-02-20",
  },
  {
    id: 3,
    coin: "XRP",
    amount: 5000,
    price: 0.45,
    total: 2250,
    date: "2023-03-10",
  },
  {
    id: 4,
    coin: "Cardano",
    amount: 1000,
    price: 1.1,
    total: 1100,
    date: "2023-04-05",
  },
  {
    id: 5,
    coin: "Polkadot",
    amount: 50,
    price: 14,
    total: 700,
    date: "2023-05-12",
  },
  {
    id: 6,
    coin: "Solana",
    amount: 20,
    price: 100,
    total: 2000,
    date: "2023-06-18",
  },
  {
    id: 7,
    coin: "Avalanche",
    amount: 30,
    price: 80,
    total: 2400,
    date: "2023-07-22",
  },
]

const defaultColor = "#30D158" // iOS green

export default function TransactionsTable({
  transactions = defaultTransactions,
  color = defaultColor,
  loading = false,
  initialTheme = "dark", // Default theme is dark
}) {
  const [theme, setTheme] = useState(initialTheme)
  const [searchValue, setSearchValue] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter transactions based on search
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.coin.toLowerCase().includes(searchValue.toLowerCase()),
  )

  // Paginate transactions
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  return (
    <>
      <GlassPanel theme={theme} style={{
      marginTop: "15px",
    }} >
        <GlassShine />
        <GlassReflection />

        <NeonAccent color={color} style={{ top: "30px", left: "30px" }} />
        <NeonAccent color={color} style={{ bottom: "50px", right: "40px" }} />

        <TableHeader>
          <TableTitle>Transactions</TableTitle>
          <HeaderActions>
            <AddButton onClick={() => setModalVisible(true)}>
              <PlusIcon /> Add Transaction
            </AddButton>
            <SearchInput placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          </HeaderActions>
        </TableHeader>

        <Table>
          <TableHead>
            <tr>
              <th>Coin</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </TableHead>
          <TableBody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.coin}</td>
                <td>{transaction.amount}</td>
                <td>{formatCurrency(transaction.price)}</td>
                <td>{formatCurrency(transaction.total)}</td>
                <td>{formatDate(transaction.date)}</td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "40px 0" }}>
                  Loading...
                </td>
              </tr>
            )}
            {!loading && currentTransactions.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "40px 0" }}>
                  No transactions found
                </td>
              </tr>
            )}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationButton key={page} $active={page === currentPage} onClick={() => setCurrentPage(page)}>
                {page}
              </PaginationButton>
            ))}
          </Pagination>
        )}
      </GlassPanel>

      <Modal $visible={modalVisible}>
        <ModalContent>
          <ModalTitle>Add Transaction</ModalTitle>

          <FormGroup>
            <FormLabel>Cryptocurrency</FormLabel>
            <FormSelect>
              <option value="">Select a cryptocurrency</option>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="xrp">XRP</option>
              <option value="cardano">Cardano</option>
              <option value="polkadot">Polkadot</option>
            </FormSelect>
          </FormGroup>

          <FormGroup>
            <FormLabel>Amount</FormLabel>
            <FormInput type="number" placeholder="Enter amount" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Price</FormLabel>
            <FormInput type="number" placeholder="Enter price" />
          </FormGroup>

          <FormGroup>
            <FormLabel>Date</FormLabel>
            <FormInput type="date" />
          </FormGroup>

          <ModalActions>
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            <Button $primary onClick={() => setModalVisible(false)}>
              Add
            </Button>
          </ModalActions>
        </ModalContent>
      </Modal>
    </>
  )
}

