import React, { createRef } from 'react'
import 'semantic-ui-css/semantic.min.css'
import {
  Container,
  Dimmer,
  Grid,
  Loader,
  Message,
  Sticky
} from 'semantic-ui-react'

import {
  SubstrateContextProvider,
  useSubstrateState
} from '../../substrate-lib'
import { DeveloperConsole } from '../../substrate-lib/components'

import AccountSelector from '../../components/AccountSelector'
import Balances from '../../components/Balances'
import BlockNumber from '../../components/BlockNumber'
import { ContactInfo } from '../../components/ContactInfo'
import Events from '../../components/Events'
import Metadata from '../../components/Metadata'
import NodeInfo from '../../components/NodeInfo'
import Transfer from '../../components/Transfer'

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()

  return (
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector />
      </Sticky>
      <Container>
        <Grid stackable columns="equal">
          <Grid.Row stretched>
            <NodeInfo />
            <Metadata />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row>
            <Transfer />
            <Events />
          </Grid.Row>
        </Grid>
      </Container>
      <ContactInfo />
      <DeveloperConsole />
    </div>
  )
}

export default function HomeScreen() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
