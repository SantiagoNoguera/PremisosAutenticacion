// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Se importa el contrato que permite gestionar usuarios.
import "./IdentidadAdmin.sol";

//Este contrato va permitir que los usuarios autorizados registren datos.
contract RegistroDatos {
    GestorUsuarios private gestorUsuarios;
    mapping (address => string[]) private resgistrosUsuario;

    constructor (address _direccionGestorUsuarios) {
        gestorUsuarios = GestorUsuarios(_direccionGestorUsuarios);
    }

    //Función para registrar los datos.
    function registrarDato(string memory _dato) public {
        require(gestorUsuarios.estaUsuarioRegistrado(msg.sender), "Debes estar registrado para registrar datos.");
        resgistrosUsuario[msg.sender].push(_dato);
    }

    //Función para obtener los registros.
    function obtenerRegistros() public view returns (string[] memory) {
        return resgistrosUsuario[msg.sender];
    }
}