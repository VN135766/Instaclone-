import React from "react";
import '../User-List.css';

function userList({ username }) {
    return (
        <div className='userList'>
            <h3 className="user_name">{username}</h3>
        </div>
    )
}

export default userList

// Dont need, ended up refactoring the code given by Gary. Unless needed
// elsewhere, this can be deleted.