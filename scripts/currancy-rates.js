document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".currency-rates__buttons button");
    let ratesData = {};

    async function fetchRates() {
        try {
            const response = await fetch("https://tri-prep-shadow-tomatoes.trycloudflare.com/api/v1/rates/");
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            ratesData = await response.json();
            console.log("Данные получены:", ratesData);

            const initialCity = document.querySelector('.currency-rates__button--active')?.dataset.city || "istanbul";
            updateRates(initialCity);
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    }

    function updateRates(city) {
        if (!ratesData || Object.keys(ratesData).length === 0) {
            console.error("Данные ещё не загружены!");
            return;
        }

        const processedRates = {
            istanbul: [
                ratesData["usdt_usd_three"],
                ratesData["rub_try_two"],
                ratesData["usd_to_usdt_three"],
                ratesData["usdt_lira_two"],
                ratesData["usdt_euro_three"],
                ratesData["rub_usd"],
                ratesData["uah_try_two"],
                ratesData["eur_usdt_three"],
            ],
            alanya: [
                ratesData["usdt_usd_one"],
                ratesData["rub_try_one"],
                ratesData["usd_to_usdt_one"],
                ratesData["usdt_lira_one"],
                ratesData["usdt_euro_one"],
                ratesData["rub_usd"],
                ratesData["uah_try_one"],
                ratesData["eur_usdt_one"],
            ],
        };

        const rates = processedRates[city];

        if (!rates) {
            console.error(`Нет данных для города: ${city}`);
            return;
        }
        document.querySelectorAll('.currency-rates__images, .currency-rates__images-mobile').forEach(container => {
            const rateElements = container.querySelectorAll('.currency-rates__text');

            if (rates.length !== rateElements.length) {
                console.error("Несовпадение количества курсов и элементов:", rates.length, rateElements.length);
                return;
            }

            rateElements.forEach((el, index) => {
                el.textContent = rates[index];
            });
        });
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("currency-rates__button--active"));
            this.classList.add("currency-rates__button--active");
            updateRates(this.dataset.city);
        });
    });

    fetchRates();
});