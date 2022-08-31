const initialPrice = document.querySelector(".initial-price");
const unitsOwned = document.querySelector(".units");
const currentPrice = document.querySelector(".current-price");
const tellBtn = document.querySelector(".btn-tell");
const outputResult = document.querySelector(".result");
const profitImg = document.querySelector(".img-profit");
const noProfitNoLossImg = document.querySelector(".img-balance");
const lossImg = document.querySelector(".img-loss");
const headingColor = document.querySelector(".heading");
const footerColor = document.querySelector(".footer");

tellBtn.addEventListener("click", clickHandler);
const defaultColor = "#2563eb";
const footerDefaultColor = "#1d4ed8";
const profitColor = "#16a34a";
const lossColor = "#e11d48";


function clickHandler() {
    const initialCost = Number(initialPrice.value);
    const unitsPresent = Number(unitsOwned.value);
    const currentCost = Number(currentPrice.value);

    if (checkValues(initialCost, unitsPresent, currentCost)) {
        const result = profitandLoss(initialCost, unitsPresent, currentCost);

        if (result[0] === "profit") {
            showMessage(`Congratulations! you are in Profit. Your profit margin is ₹ ${result[3]} & Profit percentage is ${result[2]} %`);
            adjustImagesDisplay("profit", result[2]);
        } else if (result[0] === "No Profit or loss") {
            showMessage("Your portfolio is balanced");
            adjustImagesDisplay("balanced");
        } else {
            showMessage(`Sorry! you are in loss. Your loss amounts to ₹ ${result[3]} & loss percentage is ${result[2]} %`);
            adjustImagesDisplay("loss", result[2]);
        }
    } else {
        showMessage("Enter Valid Values");
        adjustImagesDisplay("none");
    }
}

function checkValues(initial, units, current) {
    if (initial > 0 && units > 0 && current > -1) {
        return true;
    }
    return false;

}

function showMessage(message) {
    outputResult.innerHTML = message;
}

function profitandLoss(initial, units, current) {
    if (initial < current) {
        const profit = current - initial;
        const profitPercentage = (profit / initial) * 100;
        const profitMargin = profit * units;

        const resultArray = ["profit", profit.toFixed(2), profitPercentage.toFixed(2), profitMargin.toFixed(2)];
        return resultArray;
    } else if (initial === current) {
        return ["No Profit or loss"];
    } else {
        const loss = initial - current;
        const lossPercentage = (loss / initial) * 100;
        const lossMargin = loss * units;

        const resultArray = ["loss", loss.toFixed(2), lossPercentage.toFixed(2), lossMargin.toFixed(2)];
        return resultArray;
    }
}

function adjustImagesDisplay(position, percentageValue) {
    if (position === "loss") {
        lossImg.style.display = "inline";
        noProfitNoLossImg.style.display = "none";
        profitImg.style.display = "none";
        outputResult.style.color = "red";
        headingColor.style.color = defaultColor;
        footerColor.style.backgroundColor = footerDefaultColor;
        if(percentageValue > 50) {
            headingColor.style.color = lossColor;
            footerColor.style.backgroundColor = lossColor;
        }
    } else if (position === "balanced") {
        lossImg.style.display = "none";
        noProfitNoLossImg.style.display = "inline";
        profitImg.style.display = "none";
        outputResult.style.color = "white";
        headingColor.style.color = defaultColor;
        footerColor.style.backgroundColor = footerDefaultColor;
    } else if(position === "profit") {
        lossImg.style.display = "none";
        noProfitNoLossImg.style.display = "none";
        profitImg.style.display = "inline";
        outputResult.style.color = "green";
        headingColor.style.color = defaultColor;
        footerColor.style.backgroundColor = footerDefaultColor;
        if(percentageValue > 50) {
            headingColor.style.color = profitColor;
            footerColor.style.backgroundColor = profitColor;
        }
    } else {
        lossImg.style.display = "none";
        noProfitNoLossImg.style.display = "none";
        profitImg.style.display = "none";
        outputResult.style.color = "red";
        headingColor.style.color = defaultColor;
        footerColor.style.backgroundColor = footerDefaultColor;
    }
}