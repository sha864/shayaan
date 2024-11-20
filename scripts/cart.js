// Define the Singleton class
class CartSingleton {
    constructor() {
        if (!CartSingleton.instance) {
            // Initialize properties and call any necessary setup functions
            this.totalSelected = 0;
            this.selectedItems = new Set();
            this.sum = 0;
            this.noselected = 0;
            this.contentDiv = document.getElementById('content');
            this.footerDiv = document.getElementById('footer');
            this.suggestedDiv = document.getElementById('suggestions');

            CartSingleton.instance = this;
        }
        return CartSingleton.instance;
    }

    // Initialize cart when the window loads
    init() {
        window.onload = () => {
            loadPage('../html_files/footer-template.html', this.footerDiv);
            loadPagep('../html_files/template.html', this.contentDiv);

            if (this.getCookie('jwtToken')) {
                this.loadCartDataC();
                this.loadSuggestions(this.suggestedDiv);
                setTimeout(() => {
                    document.getElementById("checkform").reset();
                }, 500);
            } else {
                this.showEmptyCartMessage();
            }
        };
    }

    // Show empty cart message when not signed in
    showEmptyCartMessage() {
        document.querySelector('cartleftbottom').innerHTML = "";
        document.querySelector('cartrighttop').style.display = "none";
        document.querySelector('cartlefttop').innerHTML = `
            <div class="aline-div-cartTop">
                <img src="../background_images/kettle-desaturated.svg" alt=":)" style="width:275px;">
                <div class="faint-top">
                    <h2>Your Amazon Cart is empty</h2>
                    <a href="../html_files/slider-page.html?text=deals" style="margin-top:5px;">Shop today's deals</a>
                    <div class="faint-div">
                        <input type="button" value="Sign in to your account" class="btn" style="font-size: 15px; padding: 6px 12px;" onclick="window.location.href='signin_page.html';">
                        <input type="button" value="Sign up now" class="wish_list_btn" style="font-size: 15px; height:30px; width:100px; margin-top: 20px;" onclick="window.location.href='signup.html';">
                    </div>
                </div>
            </div>
        `;
    }

    async loadCartDataC() {
        // Your existing loadCartDataC function logic goes here
    }

    renderCartDataC(data) {
        // Your existing renderCartDataC function logic goes here
    }

    updateTotal(self, price, title, id) {
        this.showLoader();
        let quantity = parseInt(self.getAttribute('quantity'));
        if (self.checked) {
            this.totalSelected++;
            this.sum += quantity * parseFloat(price);
            this.noselected++;
            document.getElementById("result").innerHTML += `<tr id="${id}">
                <td class="titleSum"> # ${title}</td>
                <td id=${id}+quant>${quantity}</td>    
            </tr>`;
            this.selectedItems.add(id);
        } else {
            this.totalSelected--;
            this.sum -= quantity * parseFloat(price);
            this.noselected--;
            const row = document.getElementById(id);
            if (row) {
                row.remove();
                if (this.selectedItems.has(id)) {
                    this.selectedItems.delete(id);
                }
            }
        }
        document.getElementById("valuetocart").textContent = `Subtotal (${this.totalSelected} item): ${this.sum.toFixed(2)}`;    
        setTimeout(() => {
            this.hideLoader();
        }, 500);
    }

    // Other methods, such as redirectPayment, handleChange, etc., follow similar structure
    // You would adapt each function you want to include in this singleton class
}

// Use the Singleton instance
const cartInstance = new CartSingleton();
cartInstance.init();
Object.freeze(cartInstance);  // To prevent any modifications to the Singleton instance
