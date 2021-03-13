import React from 'react';
import data from '../test_data/data'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import ReplayIcon from '@material-ui/icons/Replay';


const Content = ( {match} ) => {
    return (
        <div className="content">
            <h3 >{data[match.params.id].content}</h3>
            <Link className="link" to="/" >
                <Button variant="contained" size="large" startIcon={<ReplayIcon/>}>Back
                    <li className="link"></li>
                </Button>
            </Link>
        </div>
    );
};

export default Content;