// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Este contrato va a gestionar los usuarios con permisas de escritura en un contrato.
contract GestorUsuarios {
    address public administrador;

    struct Usuario {
        bool registrado;
        string nombre;
    }

    mapping(address => Usuario) private usuarios;

    modifier soloAdministrador() {
        require(msg.sender == administrador, "Solo el administrador puede ejecutar esta funcion.");
        _;
    }

    constructor() {
        administrador = msg.sender;
    }

    //Función para registrar un usuario.
    function registrarUsuario(address _usuario, string memory _nombre) public soloAdministrador {
        require(!usuarios[_usuario].registrado, "El usuario ya esta registrado.");
        usuarios[_usuario] = Usuario(true, _nombre);
    }

    //Función para eliminar un usuario.
    function eliminarUsuario(address _usuario) public soloAdministrador {
        require(usuarios[_usuario].registrado, "El usuario no esta registrado.");
        delete usuarios[_usuario];
    }

    //Función para verificar si un usuario está o no registrado.
    function estaUsuarioRegistrado(address _usuario) public view returns(bool) {
        return usuarios[_usuario].registrado;
    }

    function obtenerNombreRegistrado(address _usuario) public view returns(string memory) {
        return usuarios[_usuario].nombre;
    }
}
