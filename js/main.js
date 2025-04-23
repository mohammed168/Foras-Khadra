const oportunity = {
    ps: {
        local: {
            scolarship: ["منح الجامعات الفلسطينية"],
            training: ["تدريب في شركة جوال", "تدريب في مؤسسة فلسطينية"],
            tatawoa: ["تطوع في فرق فرص خضراء", "تطوع في مستشفى الشفاء", "تطوع في رام الله"]
        },
        global: {
            scolarship: ["منح دراسية في رومانيا", "منح دراسية في الهند", "منح دراسية في الصين", "منح دراسية في تركيا"],
            training: ["تدريب في شركة ميتا", "تدريب في سويسرا", "تدريب في منظمة الصحة العالمية"],
            tatawoa: ["تطوع في فرق فرص خضراء", "تطوع في رومانيا", "تطوع في إسبانيا"]
        }
    },
    eg: {
        local: {
            scolarship: ["منح دراسية في جامعات المصرية"],
            training: ["تدريب في شركة الاتصالات المصرية", "تدريب في القاهرة"],
            tatawoa: ["تطوع في فرق فرص خضراء", "تطوع في المستشفى العسكري"]
        },
        global: {
            scolarship: ["منح دراسية في رومانيا", "منح دراسية في الهند"],
            training: ["تدريب في شركة ميتا", "تدريب في سويسرا"],
            tatawoa: ["تطوع في فرق فرص خضراء", "تطوع في رومانيا"]
        }
    },
    jo: {
        local: {
            scolarship: ["منح دراسية في جامعات الأردنية"],
            training: [],
            tatawoa: ["تطوع في فرق فرص خضراء"]
        },
        global: {
            scolarship: ["منح دراسية في رومانيا"],
            training: ["تدريب في شركة ميتا"],
            tatawoa: ["تطوع في فرق فرص خضراء"]
        }
    },
    mo: {
        local: {
            scolarship: ["منح دراسية في الجامعات المغربية"],
            training: [],
            tatawoa: ["تطوع في فرق فرص خضراء"]
        },
        global: {
            scolarship: ["منح دراسية في رومانيا"],
            training: ["تدريب في شركة ميتا"],
            tatawoa: ["تطوع في فرق فرص خضراء"]
        }
    },
    to: {
        local: {
            scolarship: ["منح دراسية في الجامعات التونسية"],
            training: [],
            tatawoa: ["تطوع في فرق فرص خضراء"]
        },
        global: {
            scolarship: ["منح دراسية في رومانيا"],
            training: ["تدريب في شركة ميتا"],
            tatawoa: ["تطوع في فرق فرص خضراء"]
        }
    }
};

const countries = ["فلسطين", "تونس", "مصر", "المغرب", "الأردن"];
const localglobal = ["محلية", "عالمية"];
const chose = ["منح", "تدريب", "تطوع"];

function populateSelect(selectId, options) {
    const select = document.getElementById(selectId);
    if (select) {
        select.innerHTML = "<option value=''>اختر...</option>";
        options.forEach(option => {
            select.innerHTML += `<option value="${option}">${option}</option>`;
        });
    }
}

populateSelect("countrySellect", countries);
populateSelect("lgSellect", localglobal);
populateSelect("choses", chose);

function displayOpportunities() {
    const countrySelect = document.getElementById("countrySellect");
    const lgSelect = document.getElementById("lgSellect");
    const chosesSelect = document.getElementById("choses");
    const cards = document.getElementById("cards");

    if (!countrySelect || !lgSelect || !chosesSelect || !cards) return;

    const country = countrySelect.value;
    const lg = lgSelect.value === "محلية" ? "local" : "global";
    const type = chosesSelect.value === "منح" ? "scolarship" : chosesSelect.value === "تدريب" ? "training" : "tatawoa";

    if (!country || !lg || !type) {
        cards.innerHTML = "<p>يرجى اختيار كل الخيارات</p>";
        return;
    }

    cards.innerHTML = "";
    const countryCode = { "فلسطين": "ps", "مصر": "eg", "الأردن": "jo", "المغرب": "mo", "تونس": "to" }[country];
    const data = oportunity[countryCode][lg][type];

    if (data.length === 0) {
        cards.innerHTML = "<p>لا توجد فرص متاحة</p>";
    } else {
        data.forEach(item => {
            cards.innerHTML += `
                <div class="card ${lg}">
                    <b>${lg === "local" ? "محلية" : "عالمية"}</b>
                    <h2>${item}</h2>
                    <p>تفاصيل الفرصة: تواصلوا معنا للمزيد</p>
                    <a href="#">المزيد</a>
                </div>
            `;
        });
    }
}

const countrySelect = document.getElementById("countrySellect");
const lgSelect = document.getElementById("lgSellect");
const chosesSelect = document.getElementById("choses");

if (countrySelect) countrySelect.addEventListener("change", displayOpportunities);
if (lgSelect) lgSelect.addEventListener("change", displayOpportunities);
if (chosesSelect) chosesSelect.addEventListener("change", displayOpportunities);

function searchData(value) {
    const cards = document.getElementById("cards");
    if (!cards) return;

    cards.innerHTML = "";
    let found = false;
    const countryCodes = { "فلسطين": "ps", "مصر": "eg", "الأردن": "jo", "المغرب": "mo", "تونس": "to" };

    Object.keys(oportunity).forEach(country => {
        ["local", "global"].forEach(lg => {
            ["scolarship", "training", "tatawoa"].forEach(type => {
                oportunity[country][lg][type].forEach(item => {
                    if (item.includes(value)) {
                        found = true;
                        const countryName = Object.keys(countryCodes).find(key => countryCodes[key] === country);
                        cards.innerHTML += `
                            <div class="card ${lg}">
                                <b>${lg === "local" ? "محلية" : "عالمية"} - ${countryName}</b>
                                <h2>${item}</h2>
                                <p>تفاصيل الفرصة: تواصلوا معنا للمزيد</p>
                                <a href="#">المزيد</a>
                            </div>
                        `;
                    }
                });
            });
        });
    });

    if (!found) {
        cards.innerHTML = "<p>لا توجد نتائج مطابقة</p>";
    }
}

const mapElement = document.getElementById("map");
if (mapElement) {
    let map = L.map('map').setView([31.9, 35.2], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const organizations = [
        { name: "منظمة فرص خضراء - فلسطين", lat: 31.9, lng: 35.2, contact: "info@foraskhadra.ps", type: "وظائف وتطوع" },
        { name: "منظمة مصر الخضراء", lat: 30.0, lng: 31.2, contact: "info@egyptgreen.eg", type: "تدريب" },
        { name: "منظمة الأردن المستدام", lat: 31.95, lng: 35.91, contact: "info@jordan.jo", type: "منح" }
    ];

    organizations.forEach(org => {
        L.marker([org.lat, org.lng]).addTo(map)
            .bindPopup(`
                <b>${org.name}</b><br>
                النوع: ${org.type}<br>
                التواصل: ${org.contact}
            `);
    });
}

const counselingForm = document.getElementById("counseling-form");
if (counselingForm) {
    counselingForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("تم حجز الجلسة بنجاح!");
        counselingForm.reset();
    });
}