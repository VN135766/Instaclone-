import React from "react";
import '../User-List.css';

function userList({ username }) {
    return (
        <div className='userList'>
            <h3 className="user_namer">{username}</h3>
        </div>
    )
}

export default userList