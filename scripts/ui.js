let profileSidebar = document.getElementById('profile-sidebar');

function openProfileSideBar() {
    if(profileSidebar.hidden === true) {
        profileSidebar.hidden = false;
    } 
    else profileSidebar.hidden = true;
}