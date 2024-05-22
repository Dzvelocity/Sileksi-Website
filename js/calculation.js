document.addEventListener('DOMContentLoaded', () => {
    const addDeviceBtn = document.getElementById('addDevice');
    const deviceList = document.querySelector('.device-list');
    const totalUsageEl = document.getElementById('totalUsage');

    const deviceWattageMap = {
        'Fridge': 70,
        'Microwave': 1000,
        'Rice Cooker': 400,
        'Blender': 29,
        'Washing Machine': 170,
        'Vaccum Cleaner': 450,
        'Fan': 50,
        'TV': 100,
        'Iron': 300,
        'LED Lamp': 8,
        'AC': 1600
    };

    let totalUsage = 0;
    let selectedCapacity = null;

    addDeviceBtn.addEventListener('click', () => {
        const deviceType = document.getElementById('deviceType').value;
    
        if (deviceType) {
            const wattage = deviceWattageMap[deviceType];
            const deviceItem = document.createElement('tr');
            deviceItem.className = 'device-item';
            deviceItem.innerHTML = `
                <td>${deviceType}</td>
                <td class="wattage">${wattage} Watt</td>
                <td class="quantity-control">
                    <button class="qty-btn">-</button>
                    <input type="number" value="1" min="1" class="qty-input">
                    <button class="qty-btn">+</button>
                </td>
                <td class="total-wattage">${wattage} Watt</td>
                <td><button class="remove-btn">Hapus</button></td>
            `;
            deviceList.appendChild(deviceItem);
    
            totalUsage += wattage;
            updateTotalUsage();
            updateResult();
    
            // Update recommendations
            updateRecommendations();
            
            document.getElementById('deviceType').value = '';
        } else {
            alert('Please choose a device');
        }
    });

    function updateRecommendations() {
        const selectedDeviceTypes = Array.from(document.querySelectorAll('.device-item')).map(item => item.querySelector('td').textContent);
        let totalDeviceUsage = 0;
        let totalRecommendedUsage = 0;
    
        // Objek untuk menyimpan deviceType yang telah ditambahkan beserta jumlahnya
        const deviceTypeCount = {};
    
        // Objek untuk menyimpan penggunaan watt per device
        const deviceUsage = {};
    
        selectedDeviceTypes.forEach(deviceType => {
            // Mengecek apakah deviceType sudah ada dalam deviceTypeCount
            if (deviceTypeCount.hasOwnProperty(deviceType)) {
                // Jika sudah ada, tambahkan jumlahnya
                deviceTypeCount[deviceType]++;
            } else {
                // Jika belum ada, inisialisasikan dengan jumlah 1
                deviceTypeCount[deviceType] = 1;
            }
    
            // Menyimpan penggunaan watt per device
            deviceUsage[deviceType] = deviceWattageMap[deviceType];
        });
    
        const recommendedProducts = [];
        let hasRecommendedDevice = false; // Menandakan apakah ada setidaknya satu perangkat dengan rekomendasi
    
        // Melakukan iterasi pada setiap deviceType yang ada dalam deviceTypeCount
        for (const deviceType in deviceTypeCount) {
            if (deviceTypeCount.hasOwnProperty(deviceType)) {
                const count = deviceTypeCount[deviceType];
                const wattage = deviceWattageMap[deviceType];
                let productsOfType = [];
    
                // Filter produk yang sesuai dengan tipe perangkat dan memiliki kapasitas (watt) terkecil yang memenuhi kebutuhan penggunaan
                if (deviceType === 'Fridge') {
                    productsOfType = products.filter(product => product.category === 'Fridge' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'Microwave') {
                    productsOfType = products.filter(product => product.spesific === 'Microwave' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'Rice Cooker') {
                    productsOfType = products.filter(product => product.spesific === 'Rice cooker' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'Blender') {
                    productsOfType = products.filter(product => product.spesific === 'Blender' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'Washing Machine') {
                    productsOfType = products.filter(product => product.spesific === 'Wasing Machine' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'Vaccum Cleaner') {
                    productsOfType = products.filter(product => product.spesific === 'Vacuum' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'Fan') {
                    productsOfType = products.filter(product => product.spesific === 'Kipas' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'TV') {
                    productsOfType = products.filter(product => product.category === 'Televisions' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'Iron') {
                    productsOfType = products.filter(product => product.spesific === 'Iron' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'LED Lamp') {
                    productsOfType = products.filter(product => product.spesific === 'Lamp' && parseInt(product.capacity) < wattage);
                } else if (deviceType === 'AC') {
                    productsOfType = products.filter(product => product.category === 'Air Conditioner' && parseInt(product.capacity) < wattage);
                }
    
                // Jika ada rekomendasi untuk tipe perangkat ini, ambil kapasitas (watt) terkecil dari produk-produk yang memenuhi kriteria
                if (productsOfType.length > 0) {
                    const smallestWattage = productsOfType.reduce((min, product) => Math.min(min, parseInt(product.capacity)), Infinity);
                    // Tambahkan kapasitas (watt) terkecil sebanyak jumlah deviceType yang ditambahkan
                    totalRecommendedUsage += (smallestWattage * count);
                    // Menambahkan produk yang memenuhi kriteria sebanyak jumlah deviceType yang ditambahkan
                    recommendedProducts.push(...Array(count).fill().map(() => productsOfType).flat());
                    hasRecommendedDevice = true; // Setel menjadi true karena ada setidaknya satu perangkat dengan rekomendasi
                } else {
                    // Jika tidak ada rekomendasi, set penggunaan watt per device untuk device tersebut menjadi 0
                    deviceUsage[deviceType] = 0;
                }
    
                // Hitung total penggunaan watt dari semua perangkat yang telah ditambahkan oleh pengguna
                totalDeviceUsage += deviceUsage[deviceType] * count;
            }
        }
    
        // Hitung total penghematan watt
        let savings = 0;
        if (hasRecommendedDevice) {
            savings = totalDeviceUsage - totalRecommendedUsage;
        }
    
        // nilai savings "You can save"
        const savingsAmount = document.querySelector('.savings-amount').textContent = "You can save: ± " + savings + " W";
    
        renderProducts(recommendedProducts);
        updateRecommendations(filteredProducts);

    }

    deviceList.addEventListener('click', (e) => {
        if (e.target.classList.contains('qty-btn')) {
            const input = e.target.closest('.quantity-control').querySelector('input');
            const currentValue = parseInt(input.value);
            const wattageEl = e.target.closest('.device-item').querySelector('.wattage');
            const totalWattageEl = e.target.closest('.device-item').querySelector('.total-wattage');
            const wattage = parseInt(wattageEl.textContent);

            if (e.target.textContent === '-') {
                if (currentValue > 1) {
                    input.value = currentValue - 1;
                    totalUsage -= wattage;
                }
            } else {
                input.value = currentValue + 1;
                totalUsage += wattage;
            }

            totalWattageEl.textContent = `${wattage * parseInt(input.value)} Watt`;
            updateTotalUsage();
            updateResult();
        } else if (e.target.classList.contains('remove-btn')) {
            const deviceItem = e.target.closest('.device-item');
            const totalWattageEl = deviceItem.querySelector('.total-wattage');
            const totalWattage = parseInt(totalWattageEl.textContent);

            totalUsage -= totalWattage;
            deviceItem.remove();
            updateTotalUsage();
            updateResult();
        }
    });

    deviceList.addEventListener('input', (e) => {
        if (e.target.classList.contains('qty-input')) {
            const input = e.target;
            const currentValue = parseInt(input.value);
            const deviceItem = e.target.closest('.device-item');
            const wattageEl = deviceItem.querySelector('.wattage');
            const totalWattageEl = deviceItem.querySelector('.total-wattage');
            const wattage = parseInt(wattageEl.textContent);
            const oldTotalWattage = parseInt(totalWattageEl.textContent);

            if (!isNaN(currentValue) && currentValue > 0) {
                const newTotalWattage = wattage * currentValue;
                totalUsage += (newTotalWattage - oldTotalWattage);
                totalWattageEl.textContent = `${newTotalWattage} Watt`;
                updateTotalUsage();
                updateResult();
            }
        }
    });

    function updateTotalUsage() {
        totalUsageEl.textContent = totalUsage;
    }

    function updateResult() {
        const resultEl = document.getElementById('result');
        const resultDescEl = document.getElementById('resultDesc');

        if (selectedCapacity !== null) {
            const isOptimal = totalUsage <= selectedCapacity;
            resultEl.textContent = isOptimal ? 'Optimal' : 'Not optimal';
            resultDescEl.textContent = isOptimal ? "Your house electricity capacity can handle your device optimally" : "Your house electricity capacity can't handle your device optimally";

            if (isOptimal) {
                resultEl.style.backgroundColor = '#E3F2C2';
                resultEl.style.color = '#00534F';
            } else {
                resultEl.style.backgroundColor = '#f44336';
                resultEl.style.color = '#fff';
            }
        } else {
            resultEl.textContent = '';
            resultDescEl.textContent = '';
            resultEl.style.backgroundColor = '';
            resultEl.style.color = '';
        }
    }

    const capacityOptions = document.querySelectorAll('.capacity-btn, .capacity-btn-2');

    capacityOptions.forEach(option => {
        option.addEventListener('click', () => {
            const isActive = option.classList.contains('active');
            let capacity = option.textContent.trim();
    
            if (capacity === 'Other') {
                // Show custom modal or prompt for user input
                const userCapacity = parseInt(prompt('Input your house electrical capacity (in VA):'));
                if (isNaN(userCapacity)) {
                    alert('Please input a valid number');
                    return;
                } else {
                    selectedCapacity = userCapacity;
                    option.textContent = `${userCapacity}VA`;
                }
            } else {
                selectedCapacity = parseInt(capacity);
                if (isNaN(selectedCapacity)) {
                    alert('Please input a valid number');
                    selectedCapacity = null;
                    return;
                }
            }
    
            updateCapacityButtons(option, isActive);
            updateResult();
        });
    });
    
    function updateCapacityButtons(option, isActive) {
        capacityOptions.forEach(btn => {
            btn.classList.remove('active');
        });
    
        if (!isActive) {
            option.classList.add('active');
        } else {
            selectedCapacity = null;
        }
    }

    document.querySelector('.checkout-btn').addEventListener('click', () => {
        document.getElementById('recommendationSection').style.display = 'block';
    });

    const products = [
        //kitchen electronics
        {
            name: "SHARP Microwave R-21D0(S)",
            category: "Kitchen Electronics",
            spesific: "Microwave",
            brand: "Sharp",
            price: 1189000,
            capacity: "450 W",
            image: "https://id.sharp/sites/default/files/styles/resize_640x640/public/2018-11/R-21D0%28S%29IN.jpg?itok=Eyl6rtCW",
            link: "description/microwave sharp.html"
        },
        {
            name: "Panasonic 25 Ltr Microwave NN-ST32NBTTE",
            category: "Kitchen Electronics",
            spesific: "Microwave",
            brand: "Panasonic",
            price: 2449000,
            capacity: "450 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_400,h_400/f_auto,q_auto:eco/v1682523004/Products/10521776_1.jpg",
            link: "description/Microwave Panasonic.html"
        },
        {
            name: "SAMSUNG 23 Ltr Microwave MS23K3515AS/SE",
            category: "Kitchen Electronics",
            spesific: "Microwave",
            brand: "Samsung",
            price: 1479000,
            capacity: "900 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_400,h_400/f_auto,q_auto:eco/v1611846241/Products/10198032_1.jpg",
            link: "description/Microwave Samsung.html"
        },
        {
            name: "Kels 300 MI Rice Cooker Mini",
            category: "Kitchen Electronics",
            spesific: "Rice cooker",
            brand: "Kels",
            price: 699000,
            capacity: "250 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_500,h_500/f_auto,q_auto:eco/v1637247881/Products/10453251_1.jpg",
            link: "description/Rice Cooker Kels.html"
        },
        {
            name: "Philips 1.8 L Rice Cooker Digital HD4515/85",
            category: "Kitchen Electronics",
            spesific: "Rice cooker",
            brand: "Philips",
            price: 939000,
            capacity: "400 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload//f_auto,q_auto:eco/v1629127230/Products/10448645_1.jpg",
            link: "description/Rice Cooker Philips.html"
        },
        {
            name: "Panasonic 1.8 L Rice Cooker SR-CEZ18SR ",
            category: "Kitchen Electronics",
            spesific: "Rice cooker",
            brand: "Panasonic",
            price: 779000,
            capacity: "400 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_360,h_360,f_auto,q_auto/f_auto,q_auto:eco/v1706583982/Products/10535926_1.jpg",
            link: "description/Rice Cooker Panasonic.html"
        },
        {
            name: "Philips Blender HR2042/13 1L - Red",
            category: "Kitchen Electronics",
            spesific: "Blender",
            brand: "Philips",
            price: 479000,
            capacity: "290 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_500,h_500/f_auto,q_auto:eco/v1690844789/Products/10535920_1.jpg",
            link: "description/Blender Philips.html"
        },
        {
            name: "Sharp Blender EM-151P-WH 1.5L White",
            category: "Kitchen Electronics",
            spesific: "Blender",
            brand: "Sharp",
            price: 429000,
            capacity: "350 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_500,h_500/f_auto,q_auto:eco/v1697562447/Products/10516561_1.jpg",
            link: "description/Blender Sharp.html"
        },
            {
            name: "Beko Blender TBN7400W 1.75L White",
            category: "Kitchen Electronics",
            spesific: "Blender",
            brand: "Beko",
            price: 649000,
            capacity: "400 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload//f_auto,q_auto:eco/v1645685889/Products/10238809_1.jpg",
            link: "description/Blender Beko.html"
        },
    
        //televisions
        {
            name: "Xiaomi TV A2 32\"",
            category: "Televisions",
            brand: "Xiaomi",
            price: 2150000,
            capacity: "55 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_360,h_360,f_auto,q_auto/f_auto,q_auto:eco/v1713924233/Products/10581904_1.jpg",
            link: "description/TV Xiaomi.html"
        },
        {
            name: "Smart TV 4K LG UHD UR7500PSC 43 inci",
            category: "Televisions",
            brand: "LG",
            price: 5349000,
            capacity: "80 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_360,h_360,f_auto,q_auto/f_auto,q_auto:eco/v1686229546/Products/10537135_1.jpg",
            link: "description/TV LG.html"
        },
        {
            name: "Sharp 4TC55FJI X 55 Inch UHD Google TV",
            category: "Televisions",
            brand: "Sharp",
            price: 8899000,
            capacity: "50 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_500,h_500/f_auto,q_auto:eco/v1709132758/Products/10579132_1.jpg",
            link: "description/TV Sharp.html"
        },
    
        //ac
        {
            name: "Samsung 2 PK Wall-mounted Air Conditioner AR5000HM",
            category: "Air Conditioner",
            brand: "Samsung",
            price: 7529000,
            capacity: "1400 W (2 PK)",
            image: "https://images.samsung.com/is/image/samsung/p6pim/id/ar18ayhlawknse/gallery/id-am5000hmar05ayhlawknse-ar18ayhlawknse-534498743?$730_584_PNG$",
            link: "description/AC Samsung.html"
        },
        {
            name: "Daikin AC Single STC15NV ½ PK",
            category: "Air Conditioner",
            brand: "Daikin",
            price: 5039000,
            capacity: "800 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_360,h_360,f_auto,q_auto/f_auto,q_auto:eco/v1637594013/Products/10312990_1.jpg",
            link: "description/AC Daikin.html"
        },
        {
            name: "Panasonic AC CS/CU-XPU5XKJ ½ PK (U/3)",
            category: "Air Conditioner",
            brand: "Panasonic",
            price: 8729000,
            capacity: "410 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_360,h_360,f_auto,q_auto/f_auto,q_auto:eco/v1652973773/Products/10466877_1.jpg",
            link: "description/AC Panasonic.html"
        },
    
        //home electronics
        {
            name: "Aqua Top Loading AQW-800F",
            category: "Home Electronics",
            spesific: "Wasing Machine",
            brand: "Aqua",
            price: 2469000,
            capacity: "290 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_200,h_200/v1708680323/Products/10571684_2.webp",
            link: "description/mc aqua.html"
        },
        {
            name: "SHARP Top Loading ES-M8500XT",
            category: "Home Electronics",
            spesific: "Wasing Machine",
            brand: "Sharp",
            price: 3637000,
            capacity: "170 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_400,h_400/f_auto,q_auto:eco/v1640013136/Products/10431882_1.jpg",
            link: "description/mc sharp.html"
        },
        {
            name: "LG Top Loading T2107VSPCK",
            category: "Home Electronics",
            spesific: "Wasing Machine",
            brand: "LG",
            price: 4719000,
            capacity: "400 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_400,h_400/f_auto,q_auto:eco/v1651123581/Products/10350339_1.jpg",
            link: "description/mc LG.html"
        },
        {
            name: "Kris Kipas Angin Berdiri Mechanical",
            category: "Home Electronics",
            spesific: "Kipas",
            brand: "Krisbow",
            price: 699000,
            capacity: "40 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_500,h_500/f_auto,q_auto:eco/v1710511673/Products/10509403_1.jpg",
            link: "description/kipas Kris.html"
        },
        {
            name: "Kels Shea Kipas Angin USB Rechargeable",
            category: "Home Electronics",
            spesific: "Kipas",
            brand: "Kels",
            price: 199000,
            capacity: "5 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_400,h_400/f_auto,q_auto:eco/v1605885508/Products/10420761_1.jpg",
            link: "description/kipas Kels.html"
        },
        {
            name: "Krisbow 16 Inci Kipas Angin Uap",
            category: "Home Electronics",
            spesific: "Kipas",
            brand: "Krisbow",
            price: 1899000,
            capacity: "25 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_400,h_400/f_auto,q_auto:eco/v1589173555/Products/10378644_1.jpg",
            link: "description/kipas Krisbow.html"
        },
        {
            name: "Kels Dry Iron",
            category: "Home Electronics",
            spesific: "Iron",
            brand: "Kels",
            price: 159000,
            capacity: "350 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload//f_auto,q_auto:eco/v1662615546/Products/10487084_1.jpg",
            link: "description/Setrika Kels.html"
        },
        {
            name: "Philips Dry Iron HD1173/80",
            category: "Home Electronics",
            spesific: "Iron",
            brand: "Philips",
            price: 369000,
            capacity: "350 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_500,h_500/f_auto,q_auto:eco/v1526400662/Products/10084266_1.jpg",
            link: "description/Setrika Philips.html"
        },
        {
            name: "Cosmos Iron CIS-418",
            category: "Home Electronics",
            spesific: "Iron",
            brand: "Cosmos",
            price: 149000,
            capacity: "400 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_500,h_500/f_auto,q_auto:eco/v1641878535/Products/10186072_1.jpg",
            link: "description/Setrika Cosmos.html"
        },
        {
            name: "Sharp Vacuum Cleaner EC-NS-18-RD Red",
            category: "Home Electronics",
            spesific: "Vacuum",
            brand: "Sharp",
            price: 920550,
            capacity: "450 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_500,h_500/f_auto,q_auto:eco/v1619450475/Products/10218915_1.jpg",
            link: "description/Vacuum Sharp.html"
        },
        {
            name: "Samsung Vacuum Cleaner Robot VR05R5050WK/SE 0.2 L",
            category: "Home Electronics",
            spesific: "Vacuum",
            brand: "Samsung",
            price: 4409000,
            capacity: "55 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload//f_auto,q_auto:eco/v1666110510/Products/10469309_2.jpg",
            link: "description/Vacuum Samsung.html"
        },
        {
            name: "Electrolux Vacuum Ergorapido WQ61-10GG",
            category: "Home Electronics",
            spesific: "Vacuum",
            brand: "Electrolux",
            price: 4279000,
            capacity: "18 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/l_2.1:c5f05d:8cb583/w_738,h_738/f_auto,q_auto:eco/v1637766498/Products/10443175_1.jpg",
            link: "description/Vacuum Electrolux.html"
        },
    
        //fridge
        {
            name: "SHARP Kulkas 2 Pintu SJ-450-GP-SD",
            category: "Fridge & Freezer",
            brand: "Sharp",
            price: 4279000,
            capacity: "100 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_400,h_400/f_auto,q_auto:eco/v1526313750/Products/10084478_1.jpg",
            link: "description/kulkas Sharp.html"
        },
        {
            name: "LG Kulkas 2 Pintu GN-G222SCLB",
            category: "Fridge & Freezer",
            brand: "LG",
            price: 5359000,
            capacity: "70 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_400,h_400/f_auto,q_auto:eco/v1638508098/Products/10444370_1.jpg",
            link: "description/kulkas LG.html"
        },
        {
            name: "SAMSUNG Kulkas 2 Pintu RT-22FARBDSA",
            category: "Fridge & Freezer",
            brand: "Samsung",
            price: 5529000,
            capacity: "100 W",
            image: "https://res.cloudinary.com/ruparupa-com/image/upload/w_400,h_400/f_auto,q_auto:eco/v1611846804/Products/X141805_1.jpg",
            link: "description/kulkas samsung.html"
        }
        // Tambahkan produk lain 
    ];
    
        const productContainer = document.querySelector('.product-list');

        productContainer.addEventListener('click', (event) => {
            // Periksa apakah elemen yang diklik adalah tombol
            if (event.target.tagName === 'BUTTON' && event.target.closest('.product-item')) {
                // Dapatkan informasi produk dari elemen .product-item
                const productItem = event.target.closest('.product-item');
                const productName = productItem.querySelector('h2').textContent;
                
                // Cari produk yang sesuai dalam array produk
                const clickedProduct = products.find(product => product.name === productName);
                
                // Redirect pengguna ke halaman produk yang sesuai
                if (clickedProduct && clickedProduct.link) {
                    sessionStorage.setItem('recommendationVisible', recommendationSection.style.display);
                    window.open(clickedProduct.link, '_blank');
                } else {
                    console.error("Product link not found for:", productName);
                }
            }
        });
    
        const previousRecommendationStatus = sessionStorage.getItem('recommendationVisible');
        if (previousRecommendationStatus && previousRecommendationStatus === 'block') {
            recommendationSection.style.display = 'block';
        }
    
        function renderProducts(products) {
            productContainer.innerHTML = ''; // Bersihkan kontainer produk terlebih dahulu
            
            products.forEach(product => {
    
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
    
                productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Capacity: ${product.capacity}</p>
                    <div class="button-container">
                        <button>View</button>
                    </div>
                `;
                productContainer.appendChild(productItem);
            });
        }
    
        renderProducts(products);
    
        const filterButton = document.getElementById('openFilterPopup');
        const filterPopup = document.getElementById('filterPopup');
        const closePopup = document.getElementById('closePopup');
    
        filterButton.addEventListener('click', function () {
            filterPopup.style.display = 'flex';
        });
    
        closePopup.addEventListener('click', function () {
            filterPopup.style.display = 'none';
        });
    
        window.addEventListener('click', function (event) {
            if (event.target == filterPopup) {
                filterPopup.style.display = 'none';
            }
        });
    
        function setupDropdown(selectMenuId) {
            const selectMenu = document.getElementById(selectMenuId);
            const selectBtn = selectMenu.querySelector('.select-btn');
            const options = selectMenu.querySelectorAll('.option');
            const sBtnText = selectMenu.querySelector('.sBtn-text');
    
            selectBtn.addEventListener('click', () => {
                selectMenu.classList.toggle('active');
            });
    
            options.forEach(option => {
                option.addEventListener('click', () => {
                    let selectedOption = option.querySelector('.option-text').innerText;
                    sBtnText.innerText = selectedOption;
                    selectMenu.classList.remove('active');
                });
            });
    
            window.addEventListener('click', (e) => {
                if (!selectMenu.contains(e.target)) {
                    selectMenu.classList.remove('active');
                }
            });
        }
    
        setupDropdown('category-select-menu');
        setupDropdown('brand-select-menu');
        setupDropdown('watt-select-menu');
    
        const resetFilterButton = document.getElementById('resetFilterButton');
    
        resetFilterButton.addEventListener('click', () => {
            // Mengatur nilai default untuk setiap dropdown
            const defaultCategory = 'Category';
            const defaultBrand = 'Brand';
            const defaultWatt = 'Watt';
    
            // Mengatur kembali teks pada tombol dropdown sesuai dengan nilai default
            document.querySelector('#category-select-menu .sBtn-text').innerText = defaultCategory;
            document.querySelector('#brand-select-menu .sBtn-text').innerText = defaultBrand;
            document.querySelector('#watt-select-menu .sBtn-text').innerText = defaultWatt;

            document.querySelector('.savings-amount').textContent = "Here's all our recommended products";

            renderProducts(products);
    
        });
    
        const applyFilterButton = document.getElementById('applyFilterButton');
    
        applyFilterButton.addEventListener('click', () => {
            const selectedCategory = document.querySelector('#category-select-menu .sBtn-text').innerText;
            const selectedBrand = document.querySelector('#brand-select-menu .sBtn-text').innerText;
            const selectedCapacity = document.querySelector('#watt-select-menu .sBtn-text').innerText;
    
            let filteredProducts = products;
    
            if (selectedCategory !== 'Category') {
                filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
            }
    
            if (selectedBrand !== 'Brand') {
                filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
            }
    
            if (selectedCapacity === 'Lowest') {
                filteredProducts = filteredProducts.sort((a, b) => parseInt(a.capacity) - parseInt(b.capacity));
            } else if (selectedCapacity === 'Highest') {
                filteredProducts = filteredProducts.sort((a, b) => parseInt(b.capacity) - parseInt(a.capacity));
            }
    
            renderProducts(filteredProducts);
            filterPopup.style.display = 'none';
        });
    });
    