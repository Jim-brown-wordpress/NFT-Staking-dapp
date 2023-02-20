import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks"
import Footer from "components/Footer"
import Dashboard from "components/Staking/Dashboard"
import StakingAboutComponent from "components/Staking/StakingAbout"

const StakingPage = () => {
  const { address } = useGetAccountInfo()
  const isConnected = Boolean(address)

  return (
    <>
      {!isConnected ? <StakingAboutComponent /> : <Dashboard />}
      <Footer />
    </>
  )
}

export default StakingPage