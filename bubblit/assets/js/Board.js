import React from 'react'
import { Button, Grid, Divider } from 'semantic-ui-react'
class Board extends React.Component {

    render() {
        return (
            <div>
                <h1>BubbLIT Prototype😊</h1>
                <Button>Test</Button>
                <Grid columns={2} divided={true}>
                    <Grid.Column>
                        <p>
                            asdfasdfasdf
                        </p>
                        <p>
                            asdfasdfasdf
                        </p>
                        <p>
                            asdfasdfasdf
                        </p>
                        <p>
                            asdfasdfasdf
                        </p>
                        <p>
                            asdfasdfasdf
                        </p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>
                            dfasfdasfd
                        </p>
                        <p>
                            dfasfdasfd
                        </p>
                        <p>
                            dfasfdasfd
                        </p>
                        <p>
                            dfasfdasfd
                        </p>
                        <p>
                            dfasfdasfd
                        </p>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Board