// Facade class to simplify user profile management
class UserProfileFacade {
    constructor() {
        this.contentDiv = document.getElementById('content');
        this.footerDiv = document.getElementById('footer');
    }

    // Initialize the profile page based on URL parameters
    async initProfilePage() {
        try {
            await loadPage('../html_files/footer-template.html', this.footerDiv);
            await loadPageh('../html_files/template.html', this.contentDiv);
            const urlParams = new URLSearchParams(window.location.search);
            const param = urlParams.get('parms');
            const displayName = param === "UserName" ? "name" : param === "PhoneNumber" ? "number" : param;

            document.getElementById("parm").innerHTML = "Your " + param;
            document.title = "Your " + param;
            document.getElementById("MainHeading").textContent = `Your ${displayName}`;

            if (param === "Addresses") {
                this.loadAddressUpdate();
            } else if (["Email", "PhoneNumber", "Password", "UserName"].includes(param)) {
                this.loadUserUpdate(param);
            }
        } catch (e) {
            alert(e);
        }
    }

    // Simplify loading user updates based on parameter
    loadUserUpdate(type) {
        const actions = {
            "Email": editEmail,
            "PhoneNumber": editPhoneNumber,
            "Password": editPassword,
            "UserName": editUserName
        };
        actions[type]?.();
    }

    // Simplified function to load and display address information
    loadAddressUpdate() {
        loadAdressUpdate();
    }

    // Simplified function to update user's name
    async updateUserName(newName) {
        if (!newName.trim()) {
            alert("Please enter a name");
            return;
        }
        try {
            await UpdateNameDatabase({ name: newName.trim() });
            alert("Name Updated Successfully");
            window.location.href = "./profile.html?successCodes=SUCCESS_CHANGE_NAME";
        } catch (error) {
            console.error("Error updating name:", error);
        }
    }

    // Simplified function to update user's phone
}