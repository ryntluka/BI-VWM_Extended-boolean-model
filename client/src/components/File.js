import React from 'react';
import { Link } from 'react-router-dom';


const File = ( {text, data} ) => {
    return (
        <div className="file">
            <h3>{text.split(' ').slice(0, 90).join(' ')} ...</h3>
            <Link className="link" to={{pathname: '/about', text:{text}, data:{data}}} >
                <li className="link">Read more...</li>
            </Link>
        </div>
    );
};

export default File;