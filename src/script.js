const contractAddress = "0xA79842b4316d1D2ed6dE0b0cbb8844e3Fdc2896C";
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "administrador",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_usuario",
                "type": "address"
            }
        ],
        "name": "eliminarUsuario",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_usuario",
                "type": "address"
            }
        ],
        "name": "estaUsuarioRegistrado",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_usuario",
                "type": "address"
            }
        ],
        "name": "obtenerNombreRegistrado",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_usuario",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_nombre",
                "type": "string"
            }
        ],
        "name": "registrarUsuario",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

let provider;
let signer;
let contract;

document.getElementById('connectButton').addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        alert('Connected to Metamask');

        // Mostrar las funciones del contrato solo si está conectado
        document.getElementById('contractFunctions').classList.remove('hidden');
    } else {
        alert('Metamask not detected');
    }
});

document.getElementById('registerButton').addEventListener('click', async () => {
    const userAddress = document.getElementById('userAddress').value;
    const userName = document.getElementById('userName').value;
    try {
        const tx = await contract.registrarUsuario(userAddress, userName);
        await tx.wait();
        alert('User registered successfully');
    } catch (error) {
        console.error(error);
        alert('Error registering user');
    }
});

document.getElementById('checkUserButton').addEventListener('click', async () => {
    const address = document.getElementById('checkUserAddress').value;
    try {
        const isRegistered = await contract.estaUsuarioRegistrado(address);
        alert(`Is user registered? ${isRegistered}`);
    } catch (error) {
        console.error(error);
        alert('Error checking user registration');
    }
});

document.getElementById('getAdminButton').addEventListener('click', async () => {
    try {
        const admin = await contract.administrador();
        alert(`Admin address: ${admin}`);
    } catch (error) {
        console.error(error);
        alert('Error fetching admin address');
    }
});

document.getElementById('deleteUserButton').addEventListener('click', async () => {
    const address = document.getElementById('deleteUserAddress').value;
    try {
        const tx = await contract.eliminarUsuario(address);
        await tx.wait();
        alert('User deleted successfully');
    } catch (error) {
        console.error(error);
        alert('Error deleting user');
    }
});

document.getElementById('getUserNameButton').addEventListener('click', async () => {
    const address = document.getElementById('getUserNameAddress').value;
    try {
        const name = await contract.obtenerNombreRegistrado(address);
        alert(`User name: ${name}`);
    } catch (error) {
        console.error(error);
        alert('Error fetching user name');
    }
});
