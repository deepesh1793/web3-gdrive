// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Upload{
    struct Access{
        address user;
        bool access;
    }  //Defines if each user has access to the files of msg.sender
    mapping(address=>string[]) value; //Mapping named value to store url stored by each user in the application
    mapping(address=>mapping(address=>bool)) ownership; //Mapping of one user to another and specifing access
    mapping(address=>Access[]) accessList; //Specifing what all are accessible to a user
    mapping(address=>mapping(address=>bool)) previousData; 

    function add(address _user,string memory url) external{
        value[_user].push(url);
    }

    function allow(address user) external{
        ownership[msg.sender][user]=true;
        if (previousData[msg.sender][user]){
            for (uint256 i=0;i<accessList[user].length;i++){
                if (accessList[msg.sender][i].user==user){
                    accessList[msg.sender][i].access=true;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(user,true));
            previousData[msg.sender][user]=true;
        }
    }

    function disallow(address user) public{
        ownership[msg.sender][user]=false;
        for (uint256 i=0;i<accessList[msg.sender].length;i++){
            if (accessList[msg.sender][i].user==user){
                accessList[msg.sender][i].access=false;
            }
        }
    }

    function display(address _user) external view returns(string[] memory){
        require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
        return value[_user];
    }

    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }

}
