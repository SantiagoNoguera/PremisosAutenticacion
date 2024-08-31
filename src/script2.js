const contractAddress2 = "0x1b25E67008AAe7B4c5d1977207D4Ac42596A7E13";
const contractABI2 = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_direccionGestorUsuarios",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "obtenerRegistros",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_dato",
                "type": "string"
            }
        ],
        "name": "registrarDato",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let provider2;
let signer2;
let contract2;

document.getElementById('connectButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider2 = new ethers.providers.Web3Provider(window.ethereum);
        signer2 = provider2.getSigner();
        contract2 = new ethers.Contract(contractAddress2, contractABI2, signer2);
        alert('Connected to Metamask');

        // Mostrar las funciones del contrato solo si está conectado
        document.getElementById('contractFunctions').classList.remove('hidden');
    } else {
        alert('Metamask not detected');
    }
});

document.getElementById('registerDataButton').addEventListener('click', async () => {
    const data = document.getElementById('dataInput').value;
    try {
        const tx = await contract2.registrarDato(data);
        await tx.wait();
        alert('Data registered successfully');
    } catch (error) {
        console.error(error);
        alert('Error registering data');
    }
});

document.getElementById('fetchDataButton').addEventListener('click', async () => {
    try {
        const data = await contract2.obtenerRegistros();
        alert(`Fetched data: ${data.join(', ')}`);
    } catch (error) {
        console.error(error);
        alert('Error fetching data');
    }
});
