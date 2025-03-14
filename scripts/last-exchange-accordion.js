document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".last-exchange__toggle");
    let hiddenItems = [];
    let isOpen = false;
    

    async function fetchExchangeData() {
        try {
            const response = await fetch('https://tri-prep-shadow-tomatoes.trycloudflare.com/api/v1/centrobm/reviews/');
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.status);
            }
            const data = await response.json(); // Парсим JSON-ответ
            updateExchangeRates(data); // Обновляем данные
        } catch (error) {
            console.error("Ошибка", error);
        }
    }

    function updateExchangeRates(data) {
        const items = document.querySelectorAll(".last-exchange__item");
        data.forEach((exchange, index) => {
            if (items[index]) {
                items[index].querySelector(".last-exchange__date").textContent = exchange.date;
                items[index].querySelector(".last-exchange__rate").textContent = `${exchange.amount} ${exchange.currencyFrom} → ${exchange.converted} ${exchange.currencyTo}`;
                items[index].querySelector(".last-exchange__course").textContent = `1 ${exchange.currencyFrom} = ${exchange.rate} ${exchange.currencyTo}`;
    
                const rateElement = items[index].querySelector(".last-exchange__rate");
                if (rateElement) {
                    rateElement.innerHTML = rateElement.innerHTML.replace(
                        "→",
                        `<span class="arrow" style="color: rgb(148, 163, 184);">→</span>`
                    );
                }
            }
        });
    }
    
    function init() {
        const items = document.querySelectorAll(".last-exchange__item");
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        
        items.forEach((item, index) => {
            if (isDesktop && index >= 4) {
                item.classList.add("last-exchange__item--hidden");
                hiddenItems.push(item);
            } else if (!isDesktop && index >= 2) {
                item.classList.add("last-exchange__item--hidden");
                hiddenItems.push(item);
            }
        });
    }
    
    init();
    fetchExchangeData(); 
    
    toggleButton.addEventListener("click", function () {
        isOpen = !isOpen;
        const showItems = window.matchMedia("(min-width: 768px)").matches ? 4 : 6;
        
        hiddenItems.slice(0, showItems).forEach(item => {
            item.classList.toggle("last-exchange__item--hidden", !isOpen);
        });
        
        this.classList.toggle("last-exchange__toggle--open", isOpen);
    });
    
    setInterval(fetchExchangeData, 10000); 
});