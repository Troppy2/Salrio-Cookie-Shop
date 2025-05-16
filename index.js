//To Do
//When user clicks one how many to purhchase---add up the number of items on an icon in the shopping cart icon.
//Send a receipt to the users email when the have pressed the pre order form and send how many they have ordered to their email.

//Display each section of the menu on click
function displaySection(section) {
    const allSections = document.querySelectorAll('.product-section');
    allSections.forEach(sec => sec.style.display = 'none');

    const sectionMap = {
        deals: '.meal-section',
        cookies: '.cookie-section',
        drinks: '.drink-section',
        preorder: '.preorder-section'
    };

    const selector = sectionMap[section];
    if (selector) {
        document.querySelector(selector).style.display = 'flex';
    }
}

// Default view
document.addEventListener("DOMContentLoaded", () => {
    displaySection('deals');
});

function track_of_items() {
    // Object to hold the quantities of selected items
    // Initialize item quantities
    const items = {
        choco_cookie: 0,
        mnm_cookie: 0,
        lemonade: 0,
        water: 0,
        sparkling_water: 0,
        cookie_bundle: 0,
    };

    // Update hidden inputs in the form with current item counts
    function updateHiddenInputs() {
        document.getElementById('choco_cookie_qty').value = items.choco_cookie;
        document.getElementById('mnm_cookie_qty').value = items.mnm_cookie;
        document.getElementById('lemonade_qty').value = items.lemonade;
        document.getElementById('water_qty').value = items.water;
        document.getElementById('sparkling_water_qty').value = items.sparkling_water;
        document.getElementById('cookie_bundle_qty').value = items.cookie_bundle;
    }

    // Map product titles to items keys
    const productMap = {
        'chocolate chip cookie': 'choco_cookie',
        'm&m cookie': 'mnm_cookie',
        'lemonade': 'lemonade',
        'water': 'water',
        'sparkling water': 'sparkling_water',
        'cookie bundle': 'cookie_bundle',
        'lemonade + cookie': 'lemonade',
        'water + cookie': 'water',
        'sparkling water + cookie': 'sparkling_water',
    };

    // Add click listeners to all product buttons
    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.product-card');
            const productTitle = card.querySelector('h2').textContent.toLowerCase().trim();

            const key = productMap[productTitle];
            if (key) {
                items[key]++;
                updateHiddenInputs();
                alert(`Added one ${productTitle}. Total: ${items[key]}`);
            } else {
                alert('Product not recognized.');
            }
        });
    });

    ///Prob doesn't work---

    // Hook up form submit to send email with the order details
    const form = document.getElementById('cart-form');
    form.onsubmit = function (event) {
        event.preventDefault(); // Prevent form submission

        // Prepare the email content with selected items
        const emailContent = prepareEmailData();
        const mailtoLink = `mailto:your-email@example.com?subject=Order%20Details&body=${encodeURIComponent(emailContent)}`;

        // Redirect to the mailto link to open the user's email client
        window.location.href = mailtoLink;
    };

    // Event listeners for quantity change and add to cart
    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('input', updateQuantities);
    });

    return {
        getItemsForSubmission: () => items,
        addToCart: addToCart
    };
}

