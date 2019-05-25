import React, { Component } from "react";
import { PublicAddress, Blockie } from 'rimble-ui';
import styles from './KittyContainer.module.scss';
import Axios from "axios";

export default class KittyContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      openSea: "https://api.opensea.io/api/v1/assets?",
      cats: []
  }
}
  componentDidMount = async () => {
    const { networkId, accounts, balance, isMetaMask } = this.props;
    const {openSea} = this.state;
    const asset_contract_address = "0x06012c8cf97bead5deae237070f9587f8e7a266d";
    console.log("The props: ", this.props);

    if(networkId && accounts && isMetaMask){
      console.log("ready to go");

      const queryAddress = `${openSea}owner=${accounts[0]}&asset_contract_address=${asset_contract_address}`;

      const res = await Axios.get(queryAddress);
      console.log(res.data.assets);
      this.setState({...this.state, cats: res.data.assets});
    } else (
      console.log("Not this render")
    )


  }

  renderNetworkName(networkId) {
    switch (networkId) {
      case 3:
        return 'Ropsten';
      case 4:
        return 'Rinkeby';
      case 1:
        return 'Main';
      case 42:
        return 'Kovan';
      default:
        return 'Private';
    }
  }

  render()  {
    const { networkId, accounts, balance, isMetaMask } = this.props;
    const {cats} = this.state;
    const allCats = cats.map((cat)=> <div><img src={`${cat.image_preview_url}`} alt="boohoo" className="img-responsive"/> </div>)
    return (
      <div className={styles.web3}>
        <h3> Your Web3 Info </h3>
        Number of Cats: {cats.length}
        <div>{allCats}</div>
        
        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Network:
          </div>
          <div className={styles.value}>
            {networkId} - {this.renderNetworkName(networkId)}
          </div>
        </div>
        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Your address:
          </div>
          <div className={styles.value}>
            <PublicAddress address={accounts[0]}/>
            <Blockie
              opts={{seed: accounts[0], size: 15, scale: 3}} />
          </div>
        </div>
        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Your ETH balance:
          </div>
          <div className={styles.value}>
            {balance}
          </div>
        </div>
        <div className={styles.dataPoint}>
          <div className={styles.label}>
            Using Metamask:
          </div>
          <div className={styles.value}>
            {isMetaMask ? 'YES' : 'NO'}
          </div>
        </div>
      </div>
    );
  }
}
