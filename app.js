document.getElementById("myForm").addEventListener("submit", addCandy);

function addCandy(e) {
    e.preventDefault();
    const candyName = e.target.candyname.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const quantity = e.target.Quantity.value;
    if (
        candyName !== "" &&
        description !== "" &&
        price !== "" &&
        quantity !== ""
    ) {
        let candies = {
            candyName,
            description,
            price,
            quantity,
        };
        axios
            .post(
                `https://crudcrud.com/api/b2e6a7246d174588a2ffaeb5835bd603/CandyStock`,
                candies
            )
            .then((response) => {
                document.getElementById("myForm").reset();
                showCandies(response);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        document.getElementById("myForm").reset();
    }
}
function showCandies() {
    const canndyList = document.getElementById("candyStockList");
    canndyList.innerHTML = "";
    axios
        .get(`https://crudcrud.com/api/b2e6a7246d174588a2ffaeb5835bd603/CandyStock`)
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                canndyList.innerHTML += `
            <li>
            <span> 
            ${response.data[i].candyName} :  ${response.data[i].description} : ${response.data[i].price} : ${response.data[i].quantity}
           </span>
            <span>
                <input type="button"value="BuyOne" class="btn" id="buyone" onclick="buyOne('${response.data[i]._id}','${response.data[i].candyName}','${response.data[i].description}','${response.data[i].price}','${response.data[i].quantity}')"  />
                <input type="button"value="BuyTwo" class="btn"  onclick="buyTwo('${response.data[i]._id}','${response.data[i].candyName}','${response.data[i].description}','${response.data[i].price}','${response.data[i].quantity}')" />
                <input type="button"value="BuyThree" class="btn"  onclick="buyThree('${response.data[i]._id}','${response.data[i].candyName}','${response.data[i].description}','${response.data[i].price}','${response.data[i].quantity}')" />            
            </span>
             </li>

            `;
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
const buyOne = async (id, candyName, description, price, quantity) => {
    if (quantity < 1) {
        alert(`You have only ${quantity} left, so, You cannot buy this item anymore`)
    }
    else {

        await axios
            .put(
                `https://crudcrud.com/api/b2e6a7246d174588a2ffaeb5835bd603/CandyStock/${id}`,

                {
                    candyName,
                    description,
                    price,
                    quantity: quantity - 1,
                }
            )
            .then((response) => {
                showCandies(response);
            })
            .catch((err) => console.log(err));
    }
};

const buyTwo = async (id, candyName, description, price, quantity) => {
    if (quantity < 2) {
        alert(`You have only ${quantity} left, so, You cannot buy this item anymore`)
    }

    else {
        await axios
            .put(
                `https://crudcrud.com/api/b2e6a7246d174588a2ffaeb5835bd603/CandyStock/${id}`,

                {
                    candyName,
                    description,
                    price,
                    quantity: quantity - 2,
                }
            )
            .then((response) => {
                showCandies(response);
            })
            .catch((err) => console.log(err));
    }

};
const buyThree = async (id, candyName, description, price, quantity) => {
    if (quantity < 3) {
        alert(`You have only ${quantity} left, so, You cannot buy this item anymore`)
    }
    else {
        await axios
            .put(
                `https://crudcrud.com/api/b2e6a7246d174588a2ffaeb5835bd603/CandyStock/${id}`,

                {
                    candyName,
                    description,
                    price,
                    quantity: quantity - 3,
                }
            )
            .then((response) => {
                showCandies(response);
            })
            .catch((err) => console.log(err));
    }
};
showCandies();