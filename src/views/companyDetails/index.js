import React from 'react'
import { Grid, Image, Table, Header } from 'semantic-ui-react'
import firebase from '../../config/Firebase'

function companyDetails() {

    const result = JSON.parse(localStorage.getItem('companyData'))
    console.log('result at details *****', result)
    const getIds = JSON.parse(localStorage.getItem('userIds'))
    const tokenId = localStorage.getItem('tokenIndex')
    console.log(getIds)

    return (
        <div>
            <Header as='h1' block style={{ margin: '5%' }} >Company Details</Header>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5%',
                }}>
                <Grid>
                    <Grid.Column width={4}>
                        <Image src={result.image} style={{ marginTop: '25%' }} />
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Table definition>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell width={5}>Company Name</Table.Cell>
                                    <Table.Cell>{result.companyName}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Date Started</Table.Cell>
                                    <Table.Cell>{result.date}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Token</Table.Cell>
                                    <Table.Cell>{result.token}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Time For Each Token</Table.Cell>
                                    <Table.Cell>{result.time}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Location</Table.Cell>
                                    <Table.Cell>{result.address}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    )
}

export default companyDetails